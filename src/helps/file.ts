import * as XLSL from 'xlsx';

export function readXlslFileToJson(file: File): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e?.target?.result;
      const workbook = XLSL.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const result = XLSL.utils.sheet_to_json(worksheet);
      resolve(result);
    };
    reader.onerror = e => {
      reject(e);
    };
    reader.readAsBinaryString(file);
  });
}
