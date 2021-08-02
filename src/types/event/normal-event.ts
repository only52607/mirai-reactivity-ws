/**
 * 事件类型，与 [mirai-api-http 事件类型一览](https://github.com/project-mirai/mirai-api-http/blob/master/docs/EventType.md) 保持一致
 * @packageDocumentation
 */

import { ClassifiedEntity } from "../model/base";
import { Group, Member } from "../model/contact";

/**
 * Bot 登录成功
 */
export interface BotOnlineEvent extends ClassifiedEntity<string> {
    type: "BotOnlineEvent";
    qq: number;
}

/**
 * Bot 主动离线
 */
export interface BotOfflineEventActive extends ClassifiedEntity<string> {
    type: "BotOfflineEventActive";
    qq: number;
}

/**
 * Bot被挤下线
 */
export interface BotOfflineEventForce extends ClassifiedEntity<string> {
    type: "BotOfflineEventForce";
    qq: number;
}

/**
 * Bot被服务器断开或因网络问题而掉线
 */
export interface BotOfflineEventDropped extends ClassifiedEntity<string> {
    type: "BotOfflineEventDropped";
    qq: number;
}

/**
 * Bot主动重新登录.
 */
export interface BotReloginEvent extends ClassifiedEntity<string> {
    type: "BotReloginEvent";
    qq: number;
}

/**
 * 群消息撤回
 */
export interface GroupRecallEvent extends ClassifiedEntity<string> {
    type: "GroupRecallEvent";
    authorId: number;
    messageId: number;
    time: number;
    group: Group;
    operator: Member | null;
}

/**
 * 好友消息撤回
 */
export interface FriendRecallEvent extends ClassifiedEntity<string> {
    type: "FriendRecallEvent";
    authorId: number;
    messageId: number;
    time: number;
    operator: number;
}

/**
 * Bot在群里的权限被改变. 操作人一定是群主
 */
export interface BotGroupPermissionChangeEvent extends ClassifiedEntity<string> {
    type: "BotGroupPermissionChangeEvent";
    origin: Member["permission"];
    current: Member["permission"];
    group: Group;
}

/**
 * Bot被禁言
 */
export interface BotMuteEvent extends ClassifiedEntity<string> {
    type: "BotMuteEvent";
    durationSeconds: number;
    operator: Member;
}

/**
 * Bot被取消禁言
 */
export interface BotUnmuteEvent extends ClassifiedEntity<string> {
    type: "BotUnmuteEvent";
    operator: Member;
}

/**
 * Bot加入了一个新群
 */
export interface BotJoinGroupEvent extends ClassifiedEntity<string> {
    type: "BotJoinGroupEvent";
    group: Group;
}

/**
 * Bot主动退出一个群
 */
export interface BotLeaveEventActive extends ClassifiedEntity<string> {
    type: "BotLeaveEventActive";
    group: Group;
}

/**
 * Bot被踢出一个群
 */
export interface BotLeaveEventKick extends ClassifiedEntity<string> {
    type: "BotLeaveEventKick";
    group: Group;
}

/**
 * 某个群名改变
 */
export interface GroupNameChangeEvent extends ClassifiedEntity<string> {
    type: "GroupNameChangeEvent";
    origin: string;
    current: string;
    group: Group;
    operator: Member | null;
}

/**
 * 某群入群公告改变
 */
export interface GroupEntranceAnnouncementChangeEvent extends ClassifiedEntity<string> {
    type: "GroupEntranceAnnouncementChangeEvent";
    origin: string;
    current: string;
    group: Group;
    operator: Member | null;
}

/**
 * 全员禁言
 */
export interface GroupMuteAllEvent extends ClassifiedEntity<string> {
    type: "GroupMuteAllEvent";
    origin: boolean;
    current: boolean;
    group: Group;
    operator: Member | null;
}

/**
 * 匿名聊天
 */
export interface GroupAllowAnonymousChatEvent extends ClassifiedEntity<string> {
    type: "GroupAllowAnonymousChatEvent";
    origin: boolean;
    current: boolean;
    group: Group;
    operator: Member | null;
}

/**
 * 坦白说
 */
export interface GroupAllowConfessTalkEvent extends ClassifiedEntity<string> {
    type: "GroupAllowConfessTalkEvent";
    origin: boolean;
    current: boolean;
    group: Member;
    isByBot: boolean;
}

/**
 * 允许群员邀请好友加群
 */
export interface GroupAllowMemberInviteEvent extends ClassifiedEntity<string> {
    type: "GroupAllowMemberInviteEvent";
    origin: boolean;
    current: boolean;
    group: Group;
    operator: Member | null;
}

/**
 * 新人入群的事件
 */
export interface MemberJoinEvent extends ClassifiedEntity<string> {
    type: "MemberJoinEvent";
    member: Member;
}

/**
 * 成员被踢出群（该成员不是Bot）
 */
export interface MemberLeaveEventKick extends ClassifiedEntity<string> {
    type: "MemberLeaveEventKick";
    member: Member;
    operator: Member | null;
}

/**
 * 成员主动离群（该成员不是Bot）
 */
export interface MemberLeaveEventQuit extends ClassifiedEntity<string> {
    type: "MemberLeaveEventQuit";
    member: Member;
}

/**
 * 群名片改动
 */
export interface MemberCardChangeEvent extends ClassifiedEntity<string> {
    type: "MemberCardChangeEvent";
    origin: string;
    current: string;
    member: Member;
    operator: Member | null;
}

/**
 * 群头衔改动（只有群主有操作限权）
 */
export interface MemberSpecialTitleChangeEvent extends ClassifiedEntity<string> {
    type: "MemberSpecialTitleChangeEvent";
    origin: string;
    current: string;
    member: Member;
}

/**
 * 成员权限改变的事件（该成员不可能是Bot，见 BotGroupPermissionChangeEvent）
 */
export interface MemberPermissionChangeEvent extends ClassifiedEntity<string> {
    type: "MemberPermissionChangeEvent";
    origin: Member["permission"];
    current: Member["permission"];
    member: Member;
}

/**
 * 群成员被禁言事件（该成员不可能是Bot，见 BotMuteEvent）
 */
export interface MemberMuteEvent extends ClassifiedEntity<string> {
    type: "MemberMuteEvent";
    durationSeconds: number;
    member: Member;
    operator: Member | null;
}

/**
 * 群成员被取消禁言事件（该成员不可能是Bot，见 BotUnmuteEvent）
 */
export interface MemberUnmuteEvent extends ClassifiedEntity<string> {
    type: "MemberUnmuteEvent";
    member: Member;
    operator: Member | null;
}

/**
 * 戳一戳事件
 */
export interface NudgeEvent extends ClassifiedEntity<string> {
    type: "NudgeEvent";
    /**
     * 戳一戳发起人 QQ 号
     */
    fromId: number;
    /**
     * 被戳人的 QQ 号
     */
    target: number;
    /**
     * 动作，如：戳一戳
     */
    action: string;
    /**
     * 后缀，如：脸
     */
    suffix: string;
    /**
     * 戳一戳事件发生的主体 (上下文)
     */
    subject: {
        /**
         * 事件发生主体的 ID (群号 / 好友 QQ 号)
         */
        id: number;
        /**
         * 戳一戳事件发生的主体的类型
         */
        kind: "Friend" | "Group";
    };
}

/**
 * 基础请求事件格式
 */
interface RequestEventMeta extends ClassifiedEntity<string> {
    /**
     * 事件标识，响应该事件时的标识
     */
    eventId: number;
}

/**
 * 添加好友申请
 */
export interface NewFriendRequestEvent extends RequestEventMeta {
    type: "NewFriendRequestEvent";
    /**
     * 申请人QQ号
     */
    fromId: number;
    /**
     * 申请人如果通过某个群添加好友，该项为该群群号；否则为 0
     */
    groupId: number;
    /**
     * 	申请人的昵称或群名片
     */
    nick: string;
    /**
     * 申请消息
     */
    message: string;
}

/**
 * 用户入群申请（Bot需要有管理员权限）
 */
export interface MemberJoinRequestEvent extends RequestEventMeta {
    type: "MemberJoinRequestEvent";
    /**
     * 申请人 QQ号
     */
    fromId: number;
    /**
     * 申请人申请入群的群号
     */
    groupId: number;
    /**
     * 申请人申请入群的群名称
     */
    groupName: string;
    /**
     * 申请人的昵称或群名片
     */
    nick: string;
    /**
     * 申请消息
     */
    message: string;
}

/**
 * Bot被邀请入群申请
 */
export interface BotInvitedJoinGroupRequestEvent extends RequestEventMeta {
    type: "BotInvitedJoinGroupRequestEvent";
    /**
     * 邀请人（好友）的 QQ号
     */
    fromId: number;
    /**
     * 被邀请进入群的群号
     */
    groupId: number;
    /**
     * 被邀请进入群的群名称
     */
    groupName: string;
    /**
     * 邀请人（好友）的昵称
     */
    nick: string;
    /**
     * 邀请消息
     */
    message: string;
}

export type RequestEvent =
    | NewFriendRequestEvent
    | MemberJoinRequestEvent
    | BotInvitedJoinGroupRequestEvent;

export type EventMap = {
    BotOnlineEvent: BotOnlineEvent;
    BotOfflineEventActive: BotOfflineEventActive;
    BotOfflineEventForce: BotOfflineEventForce;
    BotOfflineEventDropped: BotOfflineEventDropped;
    BotReloginEvent: BotReloginEvent;
    GroupRecallEvent: GroupRecallEvent;
    FriendRecallEvent: FriendRecallEvent;
    BotGroupPermissionChangeEvent: BotGroupPermissionChangeEvent;
    BotMuteEvent: BotMuteEvent;
    BotUnmuteEvent: BotUnmuteEvent;
    BotJoinGroupEvent: BotJoinGroupEvent;
    BotLeaveEventActive: BotLeaveEventActive;
    BotLeaveEventKick: BotLeaveEventKick;
    GroupNameChangeEvent: GroupNameChangeEvent;
    GroupEntranceAnnouncementChangeEvent: GroupEntranceAnnouncementChangeEvent;
    GroupMuteAllEvent: GroupMuteAllEvent;
    GroupAllowAnonymousChatEvent: GroupAllowAnonymousChatEvent;
    GroupAllowConfessTalkEvent: GroupAllowConfessTalkEvent;
    GroupAllowMemberInviteEvent: GroupAllowMemberInviteEvent;
    MemberJoinEvent: MemberJoinEvent;
    MemberLeaveEventKick: MemberLeaveEventKick;
    MemberLeaveEventQuit: MemberLeaveEventQuit;
    MemberCardChangeEvent: MemberCardChangeEvent;
    MemberSpecialTitleChangeEvent: MemberSpecialTitleChangeEvent;
    MemberPermissionChangeEvent: MemberPermissionChangeEvent;
    MemberMuteEvent: MemberMuteEvent;
    MemberUnmuteEvent: MemberUnmuteEvent;
    NewFriendRequestEvent: NewFriendRequestEvent;
    MemberJoinRequestEvent: MemberJoinRequestEvent;
    BotInvitedJoinGroupRequestEvent: BotInvitedJoinGroupRequestEvent;
    NudgeEvent: NudgeEvent;
};

export type NormalEvent = EventMap[keyof EventMap];

export interface RequestEventReceiptMeta {
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

export interface NewFriendRequestEventReceipt extends RequestEventReceiptMeta {}

export interface MemberJoinRequestEventReceipt extends RequestEventReceiptMeta {}

export interface BotInvitedJoinGroupRequestEventReceipt extends RequestEventReceiptMeta {}