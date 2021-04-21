import { AbstractControl,ValidatorFn } from "@angular/forms";

export function nameValidation():ValidatorFn{
    return(control:AbstractControl):{[key:string]:boolean}|null =>{
        let firstChar=control.value.charAt(0)
        if( firstChar=='0'|| firstChar=='1'||firstChar=='2'||firstChar=='3'||firstChar=='4'||firstChar=='5'
        ||firstChar=='6'||firstChar=='7'||firstChar=='8'||firstChar=='9'){
            console.log("strating with digit");
            return {'NotStartWithDigit':true};
        }else if(control.value.includes('_')||control.value.includes('$')||control.value.includes('#')||control.value.includes('@')||control.value.includes('%')||control.value.includes('^')||control.value.includes('&')||control.value.includes('*')){
            console.log('not allowed characters---')
            return {'NotAllowedCharacter':true};
        }

        return null;
    };
}


