import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  filedownloadType={
    pdf:'application/pdf',
    xls:'application/vnd.ms-excel',
    xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
  keywords=["MODIFY","START","EXCLUSIVE","NOAUDIT","SESSION","FILE","NOTFOUND","SHARE","NOWAIT","SQLBUF","SUCCESSFUL","AUDIT","OFFLINE","SYNONYM","SYSDATE","IMMEDIATE","ONLINE","CHAR","IN","THEN","INCREMENT","TO","TRIGGER","COLUMN","INITIAL","UID","COMMENT","PRIVILEGES","CONNECT","RAW","USER","VALIDATE","LOCK","ROW","LONG","MAXEXTENTS","WHENEVER","ROWS","ADMIN","FOUND","MOUNT","AFTER","CYCLE","NEXT","ALLOCATE","GO","ANALYZE","DATAFILE","NOARCHIVELOG","ARCHIVE","DBA","GROUPS","NOCACHE","ARCHIVELOG","DEC","INCLUDING","NOCYCLE","AUTHORIZATION","DECLARE","INDICATOR","NOMAXVALUE","AVG","DISABLE","INITRANS","NOMINVALUE","BACKUP","DISMOUNT","INSTANCE","NONE","BEGIN","DOUBLE","INT","NOORDER","BECOME","DUMP","KEY","NORESETLOGS","BEFORE","EACH","LANGUAGE","NORMAL","BLOCK","ENABLE","LAYER","NOSORT","BODY","END","LINK","NUMERIC","CACHE","ESCAPE","LISTS","OFF","CANCEL","EVENTS","LOGFILE","OLD","CASCADE","EXCEPT","MANAGE","ONLY","CHANGE","EXCEPTIONS","MANUAL","OPEN","CHARACTER","EXEC","MAX","OPTIMAL","CHECKPOINT","EXPLAIN","MAXDATAFILES","OWN","CLOSE","EXECUTE","MAXINSTANCES","PACKAGE","COBOL","EXTENT","MAXLOGFILES","PARALLEL","COMMIT","EXTERNALLY","MAXLOGHISTORY","PCTINCREASE","COMPILE","FETCH","MAXLOGMEMBERS","PCTUSED","CONSTRAINT","FLUSH","MAXTRANS","PLAN","CONSTRAINTS","FREELIST","MAXVALUE","PLI","CONTENTS","FREELISTS","MIN","PRECISION","CONTINUE","FORCE","MINEXTENTS","PRIMARY","CONTROLFILE","FOREIGN","MINVALUE","PRIVATE","COUNT","FORTRAN","MODULE","PROCEDURE","PROFILE","SAVEPOINT","SQLSTATE","TRACING","QUOTA","SCHEMA","STATEMENT_ID","TRANSACTION","READ","SCN","STATISTICS","TRIGGERS","REAL","SECTION","STOP","TRUNCATE","RECOVER","SEGMENT","STORAGE","UNDER","REFERENCES","SEQUENCE","SUM","UNLIMITED","REFERENCING","SHARED","SWITCH","UNTIL","RESETLOGS","SNAPSHOT","SYSTEM","USE","RESTRICTED","SOME","TABLES","USING","REUSE","SORT","TABLESPACE","WHEN","ROLE","SQL","TEMPORARY","WRITE","ROLES","SQLCODE","THREAD","WORK","ROLLBACK","SQLERROR","TIME","ABORT","BETWEEN","CRASH","DIGITS","ACCEPT","BINARY_INTEGER","CREATE","DISPOSE","ACCESS","CURRENT","DISTINCT","ADD","BOOLEAN","CURRVAL","DO","ALL","BY","CURSOR","DROP","ALTER","CASE","DATABASE","ELSE","AND","DATA_BASE","ELSIF","ANY","CHAR_BASE","DATE","ARRAY","CHECK","ENTRY","ARRAYLEN","DEBUGOFF","EXCEPTION","AS","CLUSTER","DEBUGON","EXCEPTION_INIT","ASC","CLUSTERS","EXISTS","ASSERT","COLAUTH","DECIMAL","EXIT","ASSIGN","COLUMNS","DEFAULT","FALSE","AT","DEFINITION","COMPRESS","DELAY","FLOAT","DELETE","FOR","BASE_TABLE","CONSTANT","DELTA","FORM","DESC","FROM","FUNCTION","NEW","RELEASE","GENERIC","NEXTVAL","REMR","TABAUTH","GOTO","NOCOMPRESS","RENAME","TABLE","GRANT","NOT","RESOURCE","GROUP","NULL","RETURN","TASK","HAVING","NUMBER","REVERSE","TERMINATE","IDENTIFIED","NUMBER_BASE","REVOKE","IF","OF","ON","ROWID","TRUE","INDEX","ROWLABEL","TYPE","INDEXES","OPTION","ROWNUM","UNION","OR","ROWTYPE","UNIQUE","INSERT","ORDER","RUN","UPDATE","INTEGER","OTHERS","INTERSECT","OUT","VALUES","INTO","SELECT","VARCHAR","IS","PARTITION","SEPARATE","VARCHAR2","LEVEL","PCTFREE","SET","VARIANCE","LIKE","POSITIVE","SIZE","VIEW","LIMITED","PRAGMA","SMALLINT","VIEWS","LOOP","PRIOR","SPACE","WHERE","WHILE","MINUS","PUBLIC","SQLERRM","WITH","MLSLABEL","RAISE","MOD","RANGE","STATEMENT","XOR","MODE","STDDEV","NATURAL","RECORD","SUBTYPE"];
  constructor(private datePipe:DatePipe) { }

  public getCurrentDateTime():any{
    return this.datePipe.transform(new Date(),'yyyy-MM-ddThh:mm:ss')
  }
  
}
