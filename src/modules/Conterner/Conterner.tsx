import { useCallback, useEffect } from "react";
import Wrapper from "./../Wrapper";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import requester from "~/core/fetch";

interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

/**
 * 容器
 */
const Conterner: Modules<Props> = (props) => {
  const { eventEmitter, events = {}, api } = props;
  const onClick = useCallback(async () => {
    const apiArguments = api?.filter(item => item.apiId === 'findEmployeeByPhone');

    // 事先准备数据。
    if (apiArguments?.length) {
        await requester({...Conterner.exposeApi![0], ...apiArguments[0]})
    }

    // 再点击时间中执行事件队列数据。
    if (eventEmitter.events) {
      eventEmitter.emit(events.onClick);
    }
    
  }, [api, eventEmitter, events]);

  return (
    <Wrapper {...props}>
      <div onClick={onClick}>{props.content.text}</div>
    </Wrapper>
  );
};

Conterner.exposeEvents = [
  {
    name: 'didMount',
    description: "挂载",
  },
  {
    name: "unMount",
    description: "卸载",
  },
  {
    name: "onClick",
    description: "点击",
  },
  {
    name: "onChange",
    description: "修改地址",
  },
];

Conterner.exposeApi = [
  {
    apiId: "findEmployeeByPhone",
    name: "获取雇员信息",
    url: "https://wx-test1.by-health.com/scrm/employee/findEmployeeByPhone",
    method: "GET",
    body: [
      {
        type: "string",
        data: "{{search.mobilePhone}}",
        name: "mobilePhone",
        describe: "店员手机号码",
      },
    ],
  },
  {
    apiId: "record",
    name: "记录",
  },
];

export default Conterner;
