export interface Booking{
    booking_id : number;
    name : string;
    email : string;
    phone : number;
    number_of_rooms:number;
    number_of_guests: number;
    arrival_date : Date;
}

export interface CreateBookingresponse{
    message: string;
    error?: string;
    success: boolean;
    action: string;
    bookingCount:number;

}