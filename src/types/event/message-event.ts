import { Bot, Friend, Group, Member, User } from "../model/contact";
import { MessageChain, MessageReceipt, Source } from "../model/message";

interface MessageEventMeta {
    type: "GroupMessage" | "TempMessage" | "FriendMessage" | "SentMessage";
    messageChain: MessageChain
}

interface ReceiveMessageEventMeta extends MessageEventMeta {
    type: "GroupMessage" | "TempMessage" | "FriendMessage";
    messageChain: MessageChain & {
        0: Source;
    };
}

// 主动触发的发送事件
interface SentMessageEventMeta extends MessageEventMeta {
    type: "SentMessage";
    targetType: "group" | "friend" | "temp"
    receipt?: MessageReceipt;
    messageChain: MessageChain
    bot: Bot
    target:  Friend | Group |  Member
}

export interface FriendMessageEvent extends ReceiveMessageEventMeta {
    type: "FriendMessage";
    sender: Friend;
}

export interface GroupMessageEvent extends ReceiveMessageEventMeta {
    type: "GroupMessage";
    sender: Member;
}

export interface TempMessageEvent extends ReceiveMessageEventMeta {
    type: "TempMessage";
    sender: Member;
}

export interface SentFriendMessageEvent extends SentMessageEventMeta {
    targetType: "friend"
    target:  Friend
}
 
export interface SentGroupMessageEvent extends SentMessageEventMeta {
    targetType: "group"
    target:  Group
}

export interface SentTempMessageEvent extends SentMessageEventMeta {
    targetType: "temp"
    target:  Member
}

export type ReceivedMessageEvent = GroupMessageEvent | FriendMessageEvent | TempMessageEvent

export type SentMessageEvent = SentGroupMessageEvent | SentFriendMessageEvent | SentTempMessageEvent

export type MessageEvent = ReceivedMessageEvent | SentMessageEvent