/**
 * API 请求格式
 * @packageDocumentation
 */

import * as MessageType from "./message";
export * as Response from "./api-response";

/**
 * 基础的发送消息格式
 */
export interface SendMessage {
    sessionKey: string;
    target: number;
    messageChain: MessageType.MessageChain;
}

/**
 * 发送好友消息的请求格式
 */
export interface SendFriendMessage extends SendMessage {
    quote?: number;
}

export interface SendGroupMessage extends SendMessage {
    quote?: number;
}

export interface SendTempMessage {
    sessionKey: string;
    messageChain: MessageType.MessageChain;
    qq: number;
    group: number;
    quote?: number;
}