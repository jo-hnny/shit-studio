import * as XLSX from 'xlsx';

export function readXlslFileToJson(
  file: File,
  fileList?: File[]
): Promise<Array<any>> {
  if (fileList) {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      let len = 0;
      fileList.forEach(e => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e?.target?.result;
          const workbook = XLSX.read(data, {
            type: 'binary',
            cellStyles: true,
          });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const result = XLSX.utils.sheet_to_json(worksheet);
          results.push(result);
          len += 1;
          if (len === fileList.length) {
            resolve(results);
          }
        };
        reader.onerror = e => {
          reject(e);
        };
        reader.readAsBinaryString(e);
      });
    });
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const result = XLSX.utils.sheet_to_json(worksheet);
      resolve(result);
    };
    reader.onerror = e => {
      reject(e);
    };
    reader.readAsBinaryString(file);
  });
}
