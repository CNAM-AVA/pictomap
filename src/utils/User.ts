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

    }

    public isAuth() {
        return this.is_authenticated;
    }
}