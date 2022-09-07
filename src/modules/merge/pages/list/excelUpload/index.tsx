import React, { useState } from 'react';
import { Button, Modal, Upload, Form, Input, Select } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateMainFileData,
  updateSubFileData
} from '../../../../../redux/merge';
import { readXlslFileToJson } from '../../../../../helps';

interface excelDataInterface {
  fileName: string;
  sheetJson: any[];
}

interface stateInterface {
  mainFileData: excelDataInterface;
  subFileData: excelDataInterface;
}

const { Dragger } = Upload;
const { Option } = Select;
export function ExcelUploadButton() {
  const { mainFileData, subFileData } = useSelector(
    (state: stateInterface) => state.merge
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [subVisible, setSubVisible] = React.useState(false);
  const [fileType, setFileType] = React.useState('main');
  const [remark, setRemark] = useState('');
  const [mergeVisible, setMergeVisible] = useState(false);
  const handleUpload = async (file: File) => {
    const data = await readXlslFileToJson(file);
    if (fileType === 'main') {
      dispatch(
        updateMainFileData({
          fileName: file?.name ?? '',
          sheetJson: data,
        })
      );
    } else {
      dispatch(
        updateSubFileData({
          fileName: file?.name ?? '',
          sheetJson: data,
        })
      );
    }
    return false;
  };

  const [mainColumns, setMainColumns] = useState('');
  const [subColumns, setSubColumns] = useState('');
  const [subMergeColumns, setSubMergeColumns] = useState('');
  const [relation, setRelation] = useState(1);
  const handleMerge = () => {
    setMergeVisible(true);
    const mainData = [];
    mainFileData.sheetJson.forEach(e => {
      const rowData = {
        ...e,
      };
      subFileData.sheetJson.forEach(sub => {
        // console.log(sub.__EMPTY_2, e.__EMPTY_2);
        let flag = false;
        if (relation === 1) {
          flag = sub[subColumns] === e[mainColumns];
        }
        if (flag) {
          rowData[subMergeColumns] = sub[subMergeColumns];
        }
      });
      mainData.push(rowData);
    });
    const sheets = XLSX.utils.json_to_sheet(mainData);
    const wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary',
    };
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheets, 'Sheet1');

    XLSX.writeFile(wb, '合并数据.xlsx', wopts);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: '15px', marginRight: '15px' }}
        onClick={() => {
          setVisible(true);
          setFileType('main');
        }}
      >
        上传主表格
      </Button>
      <Button
        type="primary"
        style={{ marginBottom: '15px', marginRight: '15px' }}
        onClick={() => {
          setSubVisible(true);
          setFileType('sub');
        }}
      >
        上传副表格
      </Button>
      <Button
        type="primary"
        style={{ marginBottom: '15px' }}
        onClick={() => {
          setMergeVisible(true);
        }}
      >
        合并
      </Button>
      <Modal
        title="上传表格"
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form labelAlign="left" labelCol={{ span: 3 }}>
          <Form.Item label="文件">
            <Dragger
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              beforeUpload={handleUpload}
              // disabled={fileData !== null}
              multiple
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者拖拽文件到这里进行上传</p>
            </Dragger>
          </Form.Item>

          <Form.Item label="文件名">
            <Input value={mainFileData?.fileName} />
          </Form.Item>

          <Form.Item label="备注">
            <Input value={remark} onChange={e => setRemark(e?.target?.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="上传副表格"
        visible={subVisible}
        onCancel={() => setSubVisible(false)}
      >
        <Form labelAlign="left" labelCol={{ span: 3 }}>
          <Form.Item label="文件">
            <Dragger
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              beforeUpload={handleUpload}
              // disabled={fileData !== null}
              multiple
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者拖拽文件到这里进行上传</p>
            </Dragger>
          </Form.Item>

          <Form.Item label="文件名">
            <Input value={subFileData?.fileName} />
          </Form.Item>

          <Form.Item label="备注">
            <Input value={remark} onChange={e => setRemark(e?.target?.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="合并表格"
        visible={mergeVisible}
        okText="合并"
        onOk={handleMerge}
        onCancel={() => setMergeVisible(false)}
      >
        <Form labelAlign="left" labelCol={{ span: 10 }}>
          <Form.Item label="主表格列">
            <Select onChange={e => setMainColumns(e)}>
              {Object.keys(mainFileData?.sheetJson[0] || {}).map(
                (item: string) => (
                  <Option value={item}>{item}</Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item label="副表格列">
            <Select onChange={e => setSubColumns(e)}>
              {Object.keys(subFileData?.sheetJson[0] || {}).map(
                (item: string) => (
                  <Option value={item}>{item}</Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item label="选择比较条件">
            <Select onChange={e => setRelation(e)}>
              <Option value={1}>等于</Option>
            </Select>
          </Form.Item>

          <Form.Item label="满足条件时需要合并的数据列">
            <Select onChange={e => setSubMergeColumns(e)}>
              {Object.keys(subFileData?.sheetJson[0] || {}).map(
                (item: string) => (
                  <Option value={item}>{item}</Option>
                )
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
