import { AbstractControl,ValidatorFn } from "@angular/forms";

export function lengthValidation ():ValidatorFn{
  return(control:AbstractControl):{[key:string]:boolean}|null =>{
      let length=control.value;
      let datatype='data';
      if(datatype=='VARCHAR' && length<=0){
          console.log("Length is less then or equal to zero");
          return {'LessThenEqualToZero':true};
      }

      return null;
  };
}