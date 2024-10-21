export interface Ichat {
    created_at: string;
    editable: boolean;
    id: FileSystemWriteChunkType;
    sender: string;
    text: string;

    users: {
        avatar_url: string;
        id: string;
        full_name: string;
    }
}