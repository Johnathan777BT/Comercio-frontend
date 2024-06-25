import { Departamento } from "./departamento";
import { Municipio } from "./municipio";

export class Comerciante {
    id_com:number=0;
    nombre:string="";
    departamentos: Departamento= new Departamento();
    municipios: Municipio = new Municipio();
    telefono:string="";
    correo_electronico:string="";
    fecha_registro:string="";
    estado:boolean=false;
}