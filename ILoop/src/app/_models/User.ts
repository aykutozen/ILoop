
export class User {
    id: number;
    name: string;
    surname: string;
    email:string;
    userName: string;  
    phone: string;
    birthDay: Date;
    address: string; 
    startDate: Date; 
}
export class UserForCreateDTO {
    name: string;
    surname: string;
    email:string;
    userName: string;  
    phone: string;
    birthDay: Date;
    address: string; 
    startDate: Date; 
    password: string; 

}
export class UserForUpdateDTO {
    name: string;
    surname: string;
    email:string;
    userName: string;  
    phone: string;
    birthDay: Date;
    address: string; 
    startDate: Date; 

}


