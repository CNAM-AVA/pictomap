import { firestore } from '../utils/firebase';

interface UserProps {
    uuid: string,
    name: string,
    mail: string,
    profile_picture?: string,
    indiana_jones: boolean,
    created_at: Date,
    updated_at: Date,
    is_authenticated: boolean
}

export default class User implements UserProps {

    uuid: string;
    name: string;
    mail: string;
    profile_picture?: string;
    indiana_jones: boolean;
    created_at: Date;
    updated_at: Date;
    is_authenticated: boolean;

    constructor(props: UserProps) {
        this.uuid = props.uuid;
        this.name = props.name;
        this.mail = props.mail;
        this.profile_picture = props.profile_picture;
        this.indiana_jones = props.indiana_jones;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
        this.is_authenticated = props.is_authenticated;
    }

    public getFriends() {
        
    }

    public save() {
        return new Promise((resolve, reject) => {
            firestore.collection("users").doc(this.uuid).set({
                uuid: this.uuid,
                name: this.name,
                mail: this.mail,
                profile_picture: this.profile_picture,
                indiana_jones: this.indiana_jones,
                created_at: this.created_at,
                updated_at: this.updated_at
            })
            .then(() => {
                resolve(true);
            })
            .catch((err) =>  {
                reject(err)
                console.log("error writing user: ", err)
            });
        })
    }

    public isAuthenticated() {
        return this.is_authenticated;
    }
}