import React from 'react';
import { Table } from 'antd';
import { listColumns } from './constants';
import { ExcelUploadButton } from './excelUpload';

export function MergeListPage() {
  const data = [
    {
      name: '热鼠标',
      rowSize: 10,
      remark: '阿水煎豆腐那块',
    },
  ];

  return (
    <>
      <ExcelUploadButton />

      <Table columns={listColumns} dataSource={data} />
    </>
  );
}
