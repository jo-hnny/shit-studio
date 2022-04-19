import { TableColumnProps } from 'antd';

export const listColumns: TableColumnProps<any>[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },

  {
    title: '行数',
    dataIndex: 'rowSize',
  },

  {
    title: '备注',
    dataIndex: 'remark',
  },
];
