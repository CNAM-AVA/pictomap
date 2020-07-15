import { Observable } from "../utils/Observable";
import { User, Credentials, Picture } from "../utils";
import { auth, firestore } from '../utils/firebase';
import { locationService } from ".";

export default class UserService {

    constructor() {

        // Reset local user if remote user state is changed
        auth.onAuthStateChanged((user) => {
            if (user == null) {
                this.user = new Observable<User>(new User({
                    uuid: '',
                    name: '',
                    mail: '',
                    profile_picture: '',
                    indiana_jones: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                    is_authenticated: false,
                }));
            }
        })
    }

    user = new Observable<User>(new User({
        uuid: '',
        name: '',
        mail: '',
        profile_picture: '',
        indiana_jones: false,
        created_at: new Date(),
        updated_at: new Date(),
        is_authenticated: false,
    }));

    /**
     * Sign in the user.
     * Populate local user object.
     * @param credentials
     */
    login(credentials: Credentials) {
        return new Promise((resolve, reject) => {

            auth.signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(res => {
                    let user = res.user!;

                    firestore.collection("users").doc(user.uid).get()
                        .then((doc) => {

                            if (!doc.exists)
                                reject("No such document");

                            let data = doc.data();
                            this.user = new Observable<User>(new User({
                                uuid: user.uid,
                                name: data!.name,
                                mail: user.email!,
                                profile_picture: data!.profile_picture,
                                indiana_jones: data!.indiana_jones,
                                created_at: data!.created_at,
                                updated_at: data!.updated_at,
                                is_authenticated: true
                            }))

                            locationService.startWatching();
                            locationService.refreshCurrentLocation();

                            resolve(this.user);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch(err => {
                    reject(err);
                })
        });
    }

    /**
     * Registers the user in firebase's auth system.
     * Adds its entry into firestore.
     * Populate local user object
     * @param credentials 
     */
    register(credentials: Credentials) {
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
                .then(res => {
                    let user = res.user!;
                    this.user = new Observable<User>(new User({
                        uuid: user.uid,
                        name: credentials.pseudo!,
                        mail: user.email!,
                        profile_picture: user.photoURL!,
                        indiana_jones: false,
                        created_at: new Date(),
                        updated_at: new Date(),
                        is_authenticated: true
                    }))

                    // Save in database
                    this.user.get().save();

                    locationService.startWatching();
                    locationService.refreshCurrentLocation();

                    resolve(this.user);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    /**
     * Logout the user from firebase's auth system.
     * Clears the local user object
     */
    logout() {
        return new Promise((resolve, reject) => {
            auth.signOut()
                .then(() => {
                    this.user = new Observable<User>(new User({
                        uuid: '',
                        name: '',
                        mail: '',
                        profile_picture: '',
                        indiana_jones: false,
                        created_at: new Date(),
                        updated_at: new Date(),
                        is_authenticated: false,
                    }));

                    locationService.stopWatching();

                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                })
        })
    }

    /**
     * Sends an reset password email
     */
    resetPassword(email: string) {
        return new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    resolve({
                        success: true,
                        message: ""
                    })
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error
                    })
                })
        })
    }

    isAuthenticated() {
        return this.getUser().isAuthenticated();
    }

    getUser(): User {
        return this.user.get();
    }

    updateCurrentUser(data: any) {
        this.updateUser(this.getUser(), data);
    }

    updateUser(u: User, data: any) {
        if (data.mail !== u.mail) auth.currentUser?.updateEmail(data.mail);
        if (data.password) auth.currentUser?.updatePassword(data.password);
        let newUser: User = new User({ ...u, ...data });
        console.log(this.getUser())
        newUser.save();
    }

    getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key:any, value:any) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
    };

    searchUser(searchedName: string) {
        return new Promise((resolve, reject) => {
            if (searchedName === this.getUser().name) {
                resolve(false);
            } else {
                firestore.collection("users")
                    .orderBy('name')
                    .startAt(searchedName)
                    .endAt(searchedName+'\uf8ff')
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot.empty)
                            resolve(false);
                        let nbResults = querySnapshot.size;
                        let i = 0;
                        let results:any = [];
                        querySnapshot.forEach((doc) => {
                            //Vérifier qu'il n'existe pas déjà une demande
                            const result = doc.data();
                            result.friend = false;
                            result.requested = false;
                            firestore.collection("friends")
                            .where('friend_uuid', '==', result.uuid)
                            .where('uuid', '==', this.getUser().uuid).get()
                            .then((querySnapshot) => {
                                i++;
                                if(!querySnapshot.empty){
                                    result.requested = true;
                                    querySnapshot.forEach((doc) => {
                                        if(doc.data().accept_date !== null)
                                            result.friend = true
                                    });
                                }
                                results.push(result);
                                if(i === nbResults)
                                    resolve(results);
                            })
                            .catch((error) => {
                                console.log("Error getting friend requests : ", error);
                                reject(error);
                            });
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting user : ", error);
                        reject(error);
                    });
            }
        });
    }

    getUserById(userId: string) {
        return new Promise((resolve, reject) => {
            firestore.collection("users").doc(userId).get()
                .then((doc) => {
                    if (doc.exists) {
                        resolve(doc.data())
                    } else {
                        // doc.data() will be undefined in this case
                        reject("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting user : ", error);
                    reject(error);
                });
        });

    }

    getSubscribeRequests() {
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
                .where("friend_uuid", "==", this.getUser().uuid)
                .where('accept_date', '==', null).get()
                .then((querySnapshot) => {
                    let requests: string[] = [];
                    let requesters: {}[] = [];
                    if (querySnapshot.empty) {
                        resolve([]);
                    }
                    else {
                        querySnapshot.forEach((request) => {
                            requests.push(request.data().uuid);
                        });
                        firestore.collection("users").where("uuid", "in", requests).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((requester) => {
                                    requesters.push(requester.data());
                                });
                                resolve(requesters);
                            })
                            .catch((error) => {
                                reject(error);
                                console.log("Error getting requesters : ", error);
                            })
                    }
                })
                .catch((error) => {
                    console.log("Error getting subscribe requests : ", error);
                    reject(error);
                });
        });
    }

    acceptRequest(requester_uuid: string) {
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
                .where("friend_uuid", "==", this.getUser().uuid)
                .where('uuid', '==', requester_uuid).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        resolve(false);
                    }
                    else {
                        const request_id = querySnapshot.docs[0].id;
                        firestore.collection("friends").doc(request_id).update({
                            accept_date: new Date()
                        })
                            .then(() => {
                                resolve(true);
                            })
                            .catch((error) => {
                                console.log("Error updating accept_date field of request: ", error);
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    console.log("Error getting subscribe requests : ", error);
                    reject(error);
                });
        });
    }

    refuseRequest(requester_uuid: string) {
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
                .where("friend_uuid", "==", this.getUser().uuid)
                .where('uuid', '==', requester_uuid).get()
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        resolve(false);
                    }
                    else {
                        const request_id = querySnapshot.docs[0].id;
                        firestore.collection("friends").doc(request_id).delete()
                            .then(() => {
                                resolve(true);
                            })
                            .catch((error) => {
                                console.log("Error deleting request: ", error);
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    console.log("Error getting subscribe requests : ", error);
                    reject(error);
                });
        });
    }

    hasPicture(p: Picture) {
        let user = this.getUser();
        return new Promise((resolve, reject) => {
            firestore.collection("found_pictures").where("picture_uuid", "==", p.uuid).where("user_uuid", "==", user.uuid).get().then(r => {
                resolve(!r.empty)
            });
        })
    }

    addFoundPicture(p: Picture) {
        this.hasPicture(p).then(r => {
            if (!r) {
                // User does not have picture, add it
                firestore.collection("found_pictures").add({
                    created_at: new Date(),
                    user_uuid: this.getUser().uuid,
                    picture_uuid: p.uuid
                })
            }
        })
    }
}