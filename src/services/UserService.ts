import { Observable } from "../utils/Observable";
import { User, Credentials } from "../utils";
import { auth } from '../utils/firebase';

export default class UserService {

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
        // return new Promise((resolve, reject) => {
        //     fetch('/api/login', credentials)
        //     .then(res => {
        //         this.user = new Observable<User>(new User({
        //             uuid: res.data.uuid,
        //             name: res.data.name,
        //             mail: res.data.mail,
        //             profile_picture: res.data.profile_picture,
        //             indiana_jones: res.data.indiana_jones,
        //             created_at: res.data.created_at,
        //             updated_at: res.data.updated_at
        //         }))
        //     }).catch(err => {
        //         reject(err);
        //     })
        // });
    }

    register(credentials: Credentials) {
        // Todo: Register and populate this.user

        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
                .then(res => {
                    let user = res.user!;
                    this.user = new Observable<User>(new User({
                        uuid: user.uid,
                        name: user.displayName!,
                        mail: user.email!,
                        profile_picture: user.photoURL!,
                        indiana_jones: false,
                        created_at: new Date(),
                        updated_at: new Date(),
                        is_authenticated: true
                    }))

                    // If user is disconnected from firebase, also update local model
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

                    resolve(this.user);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    save() {

    }

    isAuthenticated() {
        return this.user.get().isAuthenticated();
    }
}