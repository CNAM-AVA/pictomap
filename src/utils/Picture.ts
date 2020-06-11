interface PictureProps {
    uuid: string;
    uri: string;
    latitude?: string;
    longitude?: string;
    created_at: Date;
    author_uuid: string;
}

export default class Picture implements PictureProps {
    uuid: string;
    uri: string;
    latitude?: string;
    longitude?: string;
    created_at: Date;
    author_uuid: string;

    constructor(props: PictureProps) {
        this.uuid = props.uuid;
        this.uri = props.uri;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.created_at = props.created_at;
        this.author_uuid = props.author_uuid;
    }
}