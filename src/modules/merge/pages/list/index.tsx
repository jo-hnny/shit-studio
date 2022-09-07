import React, { useEffect, useState } from 'react';
import { Table, Tabs } from 'antd';
import { useSelector } from 'react-redux';

import { ExcelUploadButton } from './excelUpload';

const { TabPane } = Tabs;

export function MergeListPage() {
  const { mainFileData, subFileData } = useSelector(state => state.merge);

  const [mainColumns, setMainColumns] = useState<any[]>([]);
  const [subColumns, setSubColumns] = useState<any[]>([]);

  const formatTableData = (data: any[]) => {
    const keys = Object.keys(data[0]);
    const columns = keys.map(v => ({
      title: v,
      dataIndex: v,
      width: 200,
    }));
    return columns;
  };

  useEffect(() => {
    if (mainFileData) {
      setMainColumns(formatTableData(mainFileData.sheetJson));
    }
    if (subFileData) {
      setSubColumns(formatTableData(subFileData.sheetJson));
    }
  }, [mainFileData, subFileData]);

  // 主副表tab切换

  return (
    <>
      <ExcelUploadButton />
      <Tabs defaultActiveKey="main">
        {mainFileData && (
          <TabPane tab={mainFileData.fileName} key="main">
            <Table
              columns={mainColumns}
              dataSource={mainFileData.sheetJson}
              rowKey="id"
            />
          </TabPane>
        )}
        {subFileData && (
          <TabPane tab={subFileData.fileName} key="sub">
            <Table
              columns={subColumns}
              dataSource={subFileData.sheetJson}
              rowKey="id"
            />
          </TabPane>
        )}
      </Tabs>
    </>
  );
}
