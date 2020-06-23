import { Picture } from "../utils";
import { storage, firestore, taskState } from '../utils/firebase';

export default class PictureService {

    constructor() {
        // Reset local user if remote user state is changed
        // auth.onAuthStateChanged((user) => {
        //     if (user == null) {
        //         this.user = new Observable<User>(new User({
        //             uuid: '',
        //             name: '',
        //             mail: '',
        //             profile_picture: '',
        //             indiana_jones: false,
        //             created_at: new Date(),
        //             updated_at: new Date(),
        //             is_authenticated: false,
        //         }));
        //     }
        // })

    }

    picture = new Picture({
        uuid: '',
        uri: '',
        latitude: '',
        longitude: '',
        created_at: new Date(),
        author_uuid: '',
    });

    authorId = '';

    uriToBlob = (uri: any) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };
            // this helps us get a blob
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);

            xhr.send(null);
        });
    }

    savePicture(newPicture: any, userId: string) {
        return new Promise((resolve, reject) => {
            let newPictureRef = firestore.collection("pictures").doc();
            this.authorId = userId;
            let storageRef = storage.ref();
            let pictureRef = storageRef.child(newPictureRef.id + '.jpg');

            this.uriToBlob(newPicture.uri)
                .then((blob: any) => {
                    let uploadTask = pictureRef.put(blob, { contentType: 'image/jpeg' })

                    // Register three observers:
                    // 1. 'state_changed' observer, called any time the state changes
                    // 2. Error observer, called on failure
                    // 3. Completion observer, called on successful completion
                    uploadTask.on('state_changed', (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case taskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case taskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, (error) => {
                        // Handle unsuccessful uploads
                        reject(error);
                    }, () => {
                        console.log(newPicture);
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        console.log('Uploaded a picture!');
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log("authorId : " + this.authorId);
                            newPictureRef.set({
                                uuid: newPictureRef.id,
                                uri: downloadURL,
                                latitude: newPicture?.location?.coords?.latitude,
                                longitude: newPicture?.location?.coords?.longitude,
                                created_at: new Date(),
                                author_uuid: this.authorId,
                            });
                        });
                        blob.close();
                        resolve('Successfully uploaded the picture!');
                    });
                });
        });
    }

    async getUserPictures(userId: string) {
        return new Promise((resolve, reject) => {
            let userPictures: any = [];
            firestore.collection("pictures").where("author_uuid", "==", userId).get()
            .then((querySnapshot) => {
                if(querySnapshot.empty){
                    resolve([{'uuid':'0'}]);
                } else {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        userPictures.push(doc.data());
                    });
                    resolve(userPictures);
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                reject(error);
            });
        });
    }
}