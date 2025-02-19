import { createModel } from '@rematch/core';
import { RootModel } from './models';
import queryString from 'query-string';

const parsed = queryString.parse(window.location.search);
const height = window.innerHeight;
const width = window.innerWidth;

const windowSize = {
    height,
    width,
}

interface RunningTimesItem {
    [keys: string]: any;
}

const defaultData : {
    [keys: string]: RunningTimesItem;
} = {
    search: parsed,
    window: windowSize,
    unit: {
        vw: width/100,
        vh: height/100,
    },
};

/**
 * 全局变量，被动增加，被动使用，
 */
export const runningTimes = createModel<RootModel>()({
    state: defaultData, 

    reducers: {
        setRunningTimes(state, payload: RunningTimesItem) {
            return { ...state, ...payload };
        },
        setRemSize({unit, ...other}, payload: number) {
            return {...other, unit:{...unit, rem: payload}}
        },
        initRunningTimes() {
            return defaultData
        }
    }
});
