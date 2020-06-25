import { User} from "../utils";
import { firestore } from '../utils/firebase';

export default class FriendService {

    addFriend(user_uuid:string, friend_uuid: string) {
        return new Promise((resolve, reject) => {
            firestore.collection("friends").add({
                uuid: user_uuid,
                friend_uuid: friend_uuid,
                accept_date: null,
                request_date: new Date(),
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                })
                .catch((error) => {
                    console.log("Error adding friend : ", error);
                    reject(error);
                });
        });
    }

    deleteFriend(user_uuid:string, friend_uuid: string) {
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
                .where('friend_uuid', '==', friend_uuid)
                .where('uuid', '==', user_uuid).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete().then(() => {
                            resolve('Document successfully deleted');
                        })
                        .catch((err) => {
                            reject(err)
                        })
                    });
                })
                .catch((error) => {
                    console.log("Error deleting friend : ", error);
                    reject(error);
                });
        });
    }

    getFriends(user_uuid:string) {
        return new Promise((resolve, reject) => {
            firestore.collection("friends").where("uuid", "==", user_uuid)
            .where("accept_date", "<", new Date()).get()
                .then((querySnapshot) => {
                    let friendsUuidList: string[] = [];
                    let friendsList: {}[] = [];
                    if (querySnapshot.empty) {
                        resolve(false);
                    }
                    else {
                        querySnapshot.forEach((doc) => {
                            friendsUuidList.push(doc.data().friend_uuid);
                        });
                        firestore.collection("users").where("uuid", "in", friendsUuidList).get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach((friend) => {
                                    friendsList.push(friend.data());
                                });
                                resolve(friendsList);
                            })
                            .catch((error) => {
                                reject(error);
                                console.log("Error getting friends : ", error);
                            })
                    }
                })
                .catch((error) => {
                    console.log("Error getting friends uuid : ", error);
                    reject(error);
                });
        });
    }

    getSubscribeRequests(user_uuid:string){
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
            .where("friend_uuid", "==", user_uuid)
            .where('accept_date', '==', null).get()
            .then((querySnapshot) => {
                let requests:string[] = [];
                let requesters:{}[] = [];
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

    acceptRequest(user_uuid:string, requester_uuid: string){
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
            .where("friend_uuid", "==", user_uuid)
            .where('uuid', '==', requester_uuid).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    resolve(false);
                }
                else {
                    const request_id = querySnapshot.docs[0].id;
                    firestore.collection("friends").doc(request_id).update({
                        accept_date : new Date()
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

    refuseRequest(user_uuid:string, requester_uuid: string){
        return new Promise((resolve, reject) => {
            firestore.collection("friends")
            .where("friend_uuid", "==", user_uuid)
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
}