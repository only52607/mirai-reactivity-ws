import * as Contact from "../model/contact";
import { MessageChain, MessageReceipt, Source } from "../model/message";

interface BaseMessageEvent {
    type: "GroupMessage" | "TempMessage" | "FriendMessage" | "SentMessage";
    messageChain: MessageChain & {
        0: Source;
    };
    sender: Contact.User;
}

export interface FriendMessageEvent extends BaseMessageEvent {
    type: "FriendMessage";
    sender: Contact.Friend;
}

export interface GroupMessageEvent extends BaseMessageEvent {
    type: "GroupMessage";
    sender: Contact.Member;
}

export interface TempMessageEvent extends BaseMessageEvent {
    type: "TempMessage";
    sender: Contact.Member;
}

// 主动触发的发送事件
export interface SentMessageEventBase {
    type: "SentMessage";
    receipt?: MessageReceipt;
    bot: Contact.BotProfile
    messageChain: MessageChain
    botId: number
    targetType: "group" | "friend" | "temp"
    target:  Contact.Friend | Contact.Group |  Contact.Member
}

export interface SentFriendMessageEvent extends SentMessageEventBase {
    targetType: "friend"
    target:  Contact.Friend
}

export interface SentGroupMessageEvent extends SentMessageEventBase {
    targetType: "group"
    target:  Contact.Group
}

export interface SentTempMessageEvent extends SentMessageEventBase {
    targetType: "temp"
    target:  Contact.Member
}

export type SentMessageEvent = SentFriendMessageEvent | SentGroupMessageEvent | SentTempMessageEvent

/**
 * 包括 FriendMessage GroupMessage TempMessage SentMessage
 */
export type MessageEvent = GroupMessageEvent | TempMessageEvent | FriendMessageEvent | SentMessageEvent;

/**
 * 聊天消息类型
 */
export type MessageEventType = MessageEvent["type"];

export type MessageEventMap = {
    message: MessageEvent;
    GroupMessage: GroupMessageEvent;
    FriendMessage: FriendMessageEvent;
    TempMessage: TempMessageEvent;
    SentMessage: SentMessageEvent;
};