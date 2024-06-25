import { Comerciante } from "./comerciante";

export class Establecimiento{
   id_est:number=0;
   nombre_establecimiento:string="";
   comerciantes:Comerciante=new Comerciante();
   ingresos:number=0;
   nro_empleados:number=0;
}