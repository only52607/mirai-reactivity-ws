import * as Contact from "../model/contact";
import { MessageChain, Source } from "../model/message";

interface BaseMessageEvent {
    type: "GroupMessage" | "TempMessage" | "FriendMessage";
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

/**
 * 包括 FriendMessage GroupMessage TempMessage
 */
export type MessageEvent = GroupMessageEvent | TempMessageEvent | FriendMessageEvent;

/**
 * 聊天消息类型
 */
export type MessageEventType = MessageEvent["type"];

export type MessageEventMap = {
    message: MessageEvent;
    GroupMessage: GroupMessageEvent;
    FriendMessage: FriendMessageEvent;
    TempMessage: TempMessageEvent;
};