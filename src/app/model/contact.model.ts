export interface Contact{
    contact_id : number;
    name : string;
    email : string;
    phone : number;
    subject:string;
    message : string;
}
export interface CreateContactRespone{
    message:string;
    error?:string;
    action?: string;
    success: boolean;
    contactCount:number;
}