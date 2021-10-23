import { Injectable } from '@nestjs/common';
import { WorkBook, utils, write } from 'xlsx';

@Injectable()
export class XlsxService {
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  public exportAsExcelFile(content: {
    fileName: string,
    sheets: { title: string, data: any[] }[]
  }) {
    const workbook: WorkBook = {
      Sheets: {},
      SheetNames: []
    };

    for (const sheet of content.sheets) {
      const worksheet = utils.json_to_sheet(sheet.data);
      utils.book_append_sheet(workbook, worksheet, sheet.title);
    }

    const xlsxBuffer = write(workbook, { type: 'buffer', bookType: 'xlsx', bookSST: false });
    return xlsxBuffer;
  }
}
