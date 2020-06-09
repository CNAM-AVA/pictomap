import { Observable } from "../utils/Observable";
import { User, Credentials } from "../utils";
import { auth, firestore } from '../utils/firebase';
import { userService } from '../services';

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

    getUser(){
        return userService.user.get().name;
    }
}