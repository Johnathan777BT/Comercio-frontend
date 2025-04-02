import { Rol } from "./rol";

export interface User {
    roles: Rol[];
    id:number;
    email:string;
    password:string;
    
}