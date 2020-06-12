import { firestore } from './firebase';

interface FriendProps {
    uuid: string,
    friend_uuid: string,
}

export default class Friend implements FriendProps {

    uuid: string;
    friend_uuid: string;

    constructor(props: FriendProps) {
        this.uuid = props.uuid;
        this.friend_uuid = props.friend_uuid;
    }

    public getFriends(uuid: string) {
        
    }
}