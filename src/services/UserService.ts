import { Observable } from "../utils/Observable";
import { User, Credentials } from "../utils";
import { auth, firestore } from '../utils/firebase';

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

    // Firebase login
    login(credentials: Credentials) {
        return new Promise((resolve, reject) => {

            auth.signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(res => {
                    let user = res.user!;

                    console.log("test");

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

                    resolve(this.user);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    isAuthenticated() {
        return this.getUser().isAuthenticated();
    }

    getUser(): User {
        return this.user.get();
    }
}