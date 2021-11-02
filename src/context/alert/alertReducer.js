import { HIDE_ALERT, SHOW_ALERT } from "../types";

const handlers = {
    [SHOW_ALERT]: (state, {payload}) => ({...payload, visible: true}), 
    //почему payload в скобках, а state - нет? зачем тут вообще state, если он не используется? 
    [HIDE_ALERT]: state => ({...state,visible : false}),
    DEFAULT: state => state
}

export const alertReducer = (state, action) => {
    const handle =handlers[action.type] || handlers.DEFAULT;
    return handle(state, action)
     
}