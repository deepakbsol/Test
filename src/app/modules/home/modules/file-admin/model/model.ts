import { RrrCommonDtls } from "../../file-format/model/file-format-model";

export class UploadedFile{
    
    uploadId:number=0;
    configId:number=0;
    fileName:string='';
    filePath:string='';
    fileSize:number=0;
    status:string='';
    donotProcess:string='';
    isprocessable:boolean=false;
    archiveStatus:string='';
    errorLog:string='';
    recordCount:number=0;
    typeOfUpload:string='';
    originalFileName:string='';
    rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls();
}