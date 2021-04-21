export class FormatDataDtls {
    headermapinfo:any; 
    mappings :Array<MappingsData>;
    constructor(headermapinfo:any,mappings:Array<MappingsData>){
        this.headermapinfo=headermapinfo;
        this.mappings=mappings
    }
} 
export class MappingsData{
    seqId:number=0;
    col:string='';
    tabcol:string='';
    configId:number=0;
    dateIns:string='';
    datatype:string='';
    datasize:number=0;
    defaultvalue:string='';
    constructor(seqId:number,col:string,tabcol:string,configId:number,
        dateIns:string,datatype:string,datasize:number,defaultvalue:string){
            this.seqId=seqId;
            this.col=col;
            this.tabcol=tabcol;
            this.configId=configId;
            this.dateIns=dateIns;
            this.datatype=datatype;
            this.datasize=datasize;
            this.defaultvalue=defaultvalue;
    }
    
}
export class RrrCommonDtls{
    companyId:number=0;
    userIns:string='';
    dateIns:string='';
}
export class ConfigData{
    tablename:string="";
    desc:string="";
    formatname:string="";
    fileExt:string="";
    colCount:number=0;
    delimiter:string="";
    headerTag:string='';
    nestedTag:string='';
    rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls();
    mappings :Array<MappingsData>=new Array<MappingsData>();   

    //  constructor(tablename:string,desc:string,formatname:string,fileext:string,colscount:string,
    //  formatid:string,delimiter:any,mappings :Array<MappingsData>
    //  ){
    //  this.tablename= tablename;
    //  this.desc=desc;
    //  this.formatname=formatname;
    //  this.fileext=fileext;
    //  this.colscount=colscount;
    //  this.formatid=formatid;
    //  this.delimiter=delimiter; 
    //  this.mappings=mappings;    
    //  }


}