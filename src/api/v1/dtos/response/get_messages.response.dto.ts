export default class GetMessagesResponseDTO {
    id?: string;
    
    message?: string;

    opened?: boolean;

    read_all?: boolean;

    user_id?: string;

    owner?: boolean;

    created_at?: Date;
}