export default interface Picture {
    uuid: string;
    uri: string;
    latitude?: string;
    longitude?: string;
    created_at: Date;
    author_uuid: string;
}