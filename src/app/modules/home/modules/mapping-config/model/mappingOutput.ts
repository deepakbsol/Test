import { RrrCommonDtls } from "../../file-format/model/file-format-model";

export class MappingOutput{
    mappingId:number=0;
    mappingName:string='';
    destTableId:number=0;
    startDate:string='';
    endDate:string='';
    relation:string='';
    status:string='';
    mode:string='';
    sourceTable:Array<Tables>=new Array<Tables>();
    coreTable:CoreTable=new CoreTable();
    columnMappingDtls:Array<ColumnMappingDtls>=new Array<ColumnMappingDtls>();
    rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls();
}

export class ColumnMappingDtls{
    colMappId:number=0;
    destColumn:string='';
    mappRule:string='';
    destType:string='';
    conversionRule:string='';
    isMasterMap:string='';
    rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls();
}

export class Tables{
    configId:number=0;
    tablename:string='';
    formatname:string='';
    rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls();
    columns:Array<ColumnsDtls>=new Array<ColumnsDtls>();
}

export class ColumnsDtls{
    siNo:number=0;
    seqId:number=0;
    col:string='';
    tabcol:string='';
    datatype:string='';
    datasize:number=0;
    defaultvalue:string='';
}

export class CoreTable{
    tableId:number=0;
    tableName:string='';
    totalColumn:number=0;
    rrrCoreTableColDtls:Array<CoreTableColumns>=new Array<CoreTableColumns>();
}
export class CoreTableColumns{
    columnId:number=0;
    columnName:string='';
    dataType:string='';
    dataSize:number=0;
    nullable:string='';
}
