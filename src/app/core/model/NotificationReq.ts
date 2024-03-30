export class NotificationUser{
    content: string;
    fromUser: string;
    toUser: String;

    constructor(content: string, fromUser: string, toUser: String){
        this.content= content;
        this.fromUser = fromUser;
        this.toUser = toUser
    }
}