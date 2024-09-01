export interface Customer{
    customer_id : number;
    first_name : string;
    last_name : string;
    gender : string;
    email:string;
    password : string;
}

export interface CreateCustomerResponse {
    success: boolean;
    error?: string;
    message?: string;
    action:  string;
    customerCount:number;
   
}