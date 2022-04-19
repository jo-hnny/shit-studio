import React, { useState } from 'react';
import { Button, Modal, Upload, Form, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { readXlslFileToJson } from '../../../../../helps';

const { Dragger } = Upload;

export function ExcelUploadButton() {
  const [visible, setVisible] = React.useState(false);
  const [fileName, setFileName] = useState('');
  const [remark, setRemark] = useState('');
  const [fileData, setFileData] = useState<Array<any> | null>(null);

  const handleUpload = async (file: File) => {
    console.log(file);

    const data = await readXlslFileToJson(file);

    setFileName(file?.name ?? '');

    setFileData(data);

    return false;
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: '15px' }}
        onClick={() => setVisible(true)}
      >
        上传
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
              disabled={fileData !== null}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者拖拽文件到这里进行上传</p>
            </Dragger>
          </Form.Item>

          <Form.Item label="文件名">
            <Input
              value={fileName}
              onChange={e => setFileName(e?.target?.value ?? '')}
            />
          </Form.Item>

          <Form.Item label="备注">
            <Input value={remark} onChange={e => setRemark(e?.target?.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
