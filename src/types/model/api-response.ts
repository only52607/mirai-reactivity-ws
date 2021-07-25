
/**
 * API 响应格式
 * @packageDocumentation
 */

/**
 * 基础响应格式
 */

export interface MiraiApiResponse<T> {
    code: number;
    msg: string;
    data?: T;
}

// RequestEvent 
export interface BaseRequestEvent {
    /**
     * session key
     */
    sessionKey?: string;
    /**
     * 事件标识
     */
    eventId: number;
    /**
     * 发起者 QQ
     */
    fromId: number;
    /**
     * 来源群号
     */
    groupId: number;
    /**
     * 响应的操作类型
     */
    operate: number;
    /**
     * 回复的信息
     */
    message: string;
}
