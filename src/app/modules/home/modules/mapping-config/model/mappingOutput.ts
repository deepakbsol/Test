export class MappingOutput{
    mappingId:number=0;
    mappingName:string='';
    sourceTable:Array<Tables>=new Array<Tables>();
    coreTable:CoreTable=new CoreTable();
}

export class Tables{
    configId:number=0;
    tablename:string='';
    formatname:string='';
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
    columns:Array<CoreTableColumns>=new Array<CoreTableColumns>();
}
export class CoreTableColumns{
    columnId:number=0;
    columnName:string='';
    dataType:string='';
    dataSize:number=0;
    nullable:string='';
}
