import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useCallback, useState } from "react";
import Api from "~/components/App";
import { Api as ApiType } from "~/types/appData";
import ApiConfig from "../ApiConfig";
import Background from "../Background";
import EventGroup from "../EventsSetting/EventGroup";
import reject from 'lodash/reject';
import { v4 as uuidv4 } from 'uuid';
import s from "./PageSetting.module.less";
const Option = Select.Option;
const { Panel } = Collapse;

interface Props {}

const units = ["px", "rem", "vw", "vh"];

const Pagesetting: React.FC<Props> = () => {
  // 修改页面事件数据，to do 维护到redux
  const [currentMountEvn, setCurrentMountEvn] = useState([]);
  const [currentUnmountEvn, setCurrentUnmountEvn] = useState([]);
  const [pageApi, setpageApi] = useState<ApiType[]>([])

  const onChangeEnv = useCallback((envinfo, data) => {
    if (envinfo.name === "mount") {
      setCurrentMountEvn(data);
    }
    if (envinfo.name === "unmount") {
      setCurrentUnmountEvn(data);
    }
  }, []);

  const onPlus = useCallback(
    () => {
      const optPageApi = [...pageApi];
      optPageApi.push({
        name: `Api_${optPageApi.length + 1}`,
        apiId: uuidv4()
      });
      setpageApi(optPageApi)
    },
    [pageApi],
  )

  const onRemoveApi = useCallback(
    (_, data: ApiType) => {
      const optPageApi = reject([...pageApi], { apiId:  data.apiId});
      setpageApi(optPageApi)
    },
    [pageApi],
  )

  return (
    <>
      <Collapse bordered={false}>
        <Panel header="基本信息" key="baseset">
          <Row className={s.row}>
            <Col className={s.label} span={4}>
              页面名称：
            </Col>
            <Col span={19}>
              <Input placeholder="请输入页面名称" className={s.num} />
            </Col>
            <Col span={1} />
          </Row>
          <Row className={s.row}>
            <Col className={s.label} span={4}>
              背景设置：
            </Col>
            <Col span={19}>
              <div className={s.bg}>
                <Background onChange={(data) => console.log(data)} />
              </div>
            </Col>
            <Col span={1} />
          </Row>
          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              页面单位：
            </Col>
            <Col span={7}>
              <Select placeholder="请选择" className={s.select}>
                {units.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>终端页面显示单位</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
            <Col className={s.label} span={4}>
              编辑单位：
            </Col>
            <Col span={7}>
              <Select placeholder="请选择" className={s.select}>
                {units.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>编辑面板使用单位</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>

          <Row gutter={4} className={s.row}>
            <Col className={s.label} span={4}>
              UI宽度：
            </Col>
            <Col span={7}>
              <InputNumber placeholder="px" className={s.num} />
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>终端页面显示单位</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
            <Col className={s.label} span={4}>
              基准字体：
            </Col>
            <Col span={7}>
              <InputNumber placeholder="px" className={s.num} />
            </Col>
            <Col className={s.info} span={1}>
              <Tooltip title={<div>编辑面板使用单位</div>}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
        </Panel>
        <Panel header="页面挂载" key="pagemount">
          <div className={s.events}>
            <h4 className={s.apititle}>
              <div className={s.title}>Api</div>
              <Button
                  size="small"
                  icon={<PlusOutlined onClick={onPlus} />}
              />
            </h4>
            <ApiConfig
              onRemove={onRemoveApi}
              apiData={pageApi}
              defaultApiData={pageApi}
              onChange={(data) => console.log(data)}
            />
          </div>
          <div className={s.events}>
            <h4>事件</h4>
            <>
              {Api.exposeEvents?.map((item, index) => (
                <EventGroup
                  key={index}
                  value={
                    item.name === "mount" ? currentMountEvn : currentUnmountEvn
                  }
                  curentEventInfomation={item}
                  onChange={onChangeEnv}
                />
              ))}
            </>
          </div>
        </Panel>
        <Panel header="百度统计" key="pagecounter">
          <Row className={s.row}>
            <Col className={s.label} span={4}>
              统计Id：
            </Col>
            <Col span={20}>
              <Input
                placeholder="请在百度账号下创建站点，获取统计Id"
                className={s.num}
              />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};

export default Pagesetting;
