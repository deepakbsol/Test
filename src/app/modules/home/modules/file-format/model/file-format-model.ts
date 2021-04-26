export class FormatDataDtls {
    headermapinfo:any; 
    mappings :Array<MappingsData>;
    constructor(headermapinfo:any,mappings:Array<MappingsData>){
        this.headermapinfo=headermapinfo;
        this.mappings=mappings
    }
} 
export class MappingsData{
    siNo:number=0;
    seqId:number=0;
    col:string='';
    tabcol:string='';
    dateIns:string='';
    datatype:string='';
    datasize:number=0;
    defaultvalue:string='';
    isSelected:boolean=true;

    constructor(seqId:number,col:string,tabcol:string,
        dateIns:string,datatype:string,datasize:number,defaultvalue:string){
            this.seqId=seqId;
            this.col=col;
            this.tabcol=tabcol;
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
    configId:number=0;
    tablename:string="";
    desc:string="";
    formatname:string="";
    fileExt:string="";
    colCount:number=0;
    delimiter:string="";
    headerTag:string='';
    nestedTag:string='';
    flag:boolean=false;
    rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls();
    mappings :Array<MappingsData>=new Array<MappingsData>();
    }