import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import config from './Broadcast.config';
import Wrapper from '../Wrapper';
import useLifeCycle from '~/hooks/useLifeCycle';
import useStyles from './Broadcast.useStyles';

export interface BroadcastProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Broadcast:Modules<BroadcastProps> = (props) => {
    const { style, moduleId } = props;
    // inject class from jss
    const userClass = useStyles(style);
    // Register events and publish functions
    const [eventsDispatch] = useLifeCycle(
        moduleId,
        // register events
        {
            mount: '初始化',
            unmount: '卸载'
        },
        // publish functions
        { }
    );

    return (
        <Wrapper {...props}>
            <div className={userClass.wrap}>
             Broadcast
            </div>
        </Wrapper>
    )
}

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Broadcast[key] = config[key];
    }
}

export default Broadcast;