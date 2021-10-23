import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({ providedIn: 'root' })
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(content: { fileName: string, sheets: any[] }): void {
    let worksheet: XLSX.WorkSheet
    const workbook: XLSX.WorkBook = {
      Sheets: {},
      SheetNames: []
    };

    for (let i = 0; i < content.sheets.length; i++) {
      worksheet = XLSX.utils.json_to_sheet(content.sheets[i].data);
      XLSX.utils.book_append_sheet(workbook, worksheet, content.sheets[i].title);
    }

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, content.fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
