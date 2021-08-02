import { BotInvitedJoinGroupRequestEventReceipt, BotProfile, Event, EventListener, File, FriendProfile, GroupConfig, MemberJoinRequestEventReceipt, MemberProfile, MessageChain, MessageEvent, MessageReceipt, NewFriendRequestEventReceipt } from "../types";
import { PluginInfo, FriendList, GroupFile, GroupFileInfo, GroupList, MemberList, UploadImageReceipt, UploadVoiceReceipt, Member } from "../types/model";


/**
 * Mirai 基本api接口定义
 */

interface EventListenerApi {
    /**
     * 添加监听器
     * @param listener 
     */
    addMiraiEventListener(listener: EventListener): void

    /**
     * 移除监听器
     * @param listener 
     */
    removeMiraiEventListener(listener: EventListener): void

    /**
     * 监听连接开启事件
     * @param listener 
     */
    addOpenListener(listener: () => void): void

    /**
     * 监听连接被关闭事件
     * @param listener 
     */
    addCloseListener(listener: () => void): void

    /**
     * 监听错误事件
     * @param listener 
     */
    addErrorListener(listener: (reason: any) => void): void

    /**
     * 主动触发事件
     */
    emitEvent(event: Event): void
}

interface EventProcessApi {
    /**
     * 处理 添加好友申请事件(NewFriendRequestEvent)
     */
    processNewFriendRequestEvent(receipt: NewFriendRequestEventReceipt): Promise<void>

    /**
     * 处理 用户入群申请事件(MemberJoinRequestEvent)
     */
    processMemberJoinRequestEvent(receipt: MemberJoinRequestEventReceipt): Promise<void>

    /**
     * 处理 Bot被邀请入群申请事件(BotInvitedJoinGroupRequestEvent)
     */
    processBotInvitedJoinGroupRequestEvent(receipt: BotInvitedJoinGroupRequestEventReceipt): Promise<void>
}

interface AccountInfoApi {
    /**
     * 获取 bot 的好友列表
     */
    friendList(): Promise<FriendList>

    /**
     * 获取 bot 的群列表
     */
    groupList(): Promise<GroupList>

    /**
     * 获取 BOT 的群成员列表
     * @param target 指定群的群号
     */
    memberList(target: number): Promise<MemberList>

    /**
     * 获取 bot 的群列表
     */
    botProfile(): Promise<BotProfile>

    /**
    * 获取 bot 的群列表
    */
    friendProfile(target: number): Promise<FriendProfile>

    /**
     * 获取 bot 的群列表
     */
    memberProfile(target: number, memberId: number): Promise<MemberProfile>
}

interface MessageTempStoreApi {
    /**
         * 通过 messageId 获取一条被缓存的消息
         * @param id 获取消息的messageId
         */
    messageFromId(id: number): Promise<undefined | MessageEvent>;
}

interface ChatMessageApi {
    /**
         * 使用此方法向指定好友发送消息
         * @param messageChain 消息链，是一个消息对象构成的数组
         * @param target 发送消息目标好友的 QQ 号
         * @param quote 引用一条消息的messageId进行回复
         * @returns { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
         */
    sendFriendMessage(
        messageChain: string | MessageChain,
        target: number,
        quote?: number
    ): Promise<MessageReceipt>

    /**
     * 使用此方法向指定群发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标群的群号
     * @param quote 引用一条消息的messageId进行回复
     * @return { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    sendGroupMessage(
        messageChain: string | MessageChain,
        target: number,
        quote?: number
    ): Promise<MessageReceipt>

    /**
     * 发送临时会话消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param qq 临时会话对象QQ号
     * @param group 临时会话群号
     * @param quote 引用一条消息的messageId进行回复
     */
    sendTempMessage(
        messageChain: string | MessageChain,
        qq: number,
        group: number,
        quote?: number
    ): Promise<MessageReceipt>

    /**
     * 使用此方法向指定对象（群或好友）发送图片消息 除非需要通过此手段获取imageId，否则不推荐使用该接口
     * @param urls 是一个url字符串构成的数组
     * @param target 发送对象的QQ号或群号，可能存在歧义
     * @param qq 发送对象的QQ号
     * @param group 发送对象的群号
     */
    sendImageMessage(
        urls: string[],
        target?: number,
        qq?: number,
        group?: number
    ): Promise<string[]>

    /**
     * 使用此方法上传图片文件至服务器并返回 ImageId
     * @param type
     * @param img 图片文件 fs.createReadStream(img)
     */
    uploadImage(
        type: "friend" | "group" | "temp",
        img: File
    ): Promise<UploadImageReceipt>

    /**
     * 使用此方法上传语音文件至服务器并返回 VoiceId
     * @param type 当前仅支持 "group"
     * @param voice 语音文件 fs.createReadStream(voice)
     */
    uploadVoice(
        type: "friend" | "group" | "temp",
        voice: File
    ): Promise<UploadVoiceReceipt>

    /**
     * 文件上传
     * @param type 当前仅支持 "Group"
     * @param target 指定群的群号
     * @param path 文件上传目录与名字
     * @param file 文件内容
     */
    uploadFileAndSend(
        type: "Group",
        target: number,
        path: string,
        file: File
    ): Promise<void>

    /**
     * 撤回消息
     * 使用此方法撤回指定消息。对于bot发送的消息，有2分钟时间限制。对于撤回群聊中群员的消息，需要有相应权限
     * @param target 需要撤回的消息的messageId
     */
    recall(
        target: number | MessageEvent
    ): Promise<void>


    /**
    * 戳一戳
    * @param target 戳一戳的目标, QQ号, 可以为 bot QQ号
    * @param subject 戳一戳接受主体(上下文), 戳一戳信息会发送至该主体, 为群号/好友QQ号
    * @param kind 上下文类型
    */
    sendNudge(
        target: number,
        subject: number,
        kind: "Friend" | "Group"
    ): Promise<void>
}

interface GroupManagerApi {
    /**
     * 指定群进行全体禁言
     * @param target 指定群的群号
     */
    muteAll(target: number): Promise<void>

    /**
     * 指定群解除全体禁言
     * @param target 指定群的群号
     */
    unmuteAll(target: number): Promise<void>

    /**
     * 指定群禁言指定群员
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     * @param time 禁言时长，单位为秒，最多30天，默认为 60 秒
     */
    mute(
        target: number,
        memberId: number,
        time: number
    ): Promise<void>

    /**
     * 指定群解除群成员禁言
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     */
    unmute(
        target: number,
        memberId: number
    ): Promise<void>

    /**
     * 移除群成员
     * @param target 指定群的群号
     * @param memberId 指定群员QQ号
     * @param msg 信息
     */
    kick(
        target: number,
        memberId: number,
        msg: string
    ): Promise<void>

    /**
     * 退出群聊
     * @param target 群号
     * bot为该群群主时退出失败并返回code 10(无操作权限)
     */
    quit(target: number): Promise<void>

    /**
    * 传入 config 时，修改群设置
    * 未传入 config 时，获取群设置
    * @param target 指定群的群号
    * @param config 群设置
    */
    groupConfig(
        target: number,
        config?: GroupConfig
    ): Promise<undefined | GroupConfig>

    /**
     * 传入 info 时，修改群员资料
     * 未传入 info 时，获取群员资料
     * @param targer 指定群的群号
     * @param memberId 群员QQ号
     * @param info 群员资料
     */
    memberInfo(
        target: number,
        memberId: number,
        info?: Member
    ): Promise<undefined | Member>

    /**
     * 获取 Managers
     */
    managers(): Promise<number[]>

    /**
     * 设置群精华消息
     * @param target 消息ID
     */
    setEssence(target: number): Promise<void>
}

interface GroupFileManagerApi {
    /**
         * 获取群文件列表
         * @param target 指定群的群号
         * @param dir 指定查询目录，不填为根目录
         */
    groupFileList(
        id: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<GroupFile[]>

    /**
     * 获取群文件详细信息
     * @param target 指定群的群号
     * @param id 文件唯一ID
     */
    groupFileInfo(
        id: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<GroupFileInfo>

    /**
     * 重命名群文件/目录
     * @param target
     * @param id
     * @param rename
     */
    groupFileRename(
        id: string,
        renameTo: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<void>

    /**
     * 创建群文件目录
     * @param group
     * @param dir
     */
    groupMkdir(
        id: string,
        directoryName: string,
        target?: number,
        group?: number,
        qq?: number
    ): Promise<void>

    /**
     * 移动群文件
     * @param target
     * @param id
     * @param movePath 移动到的目录，根目录为/，目录不存在时自动创建
     * @returns
     */
    groupFileMove(
        id: string,
        moveTo: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<void>

    /**
     * 删除群文件/目录
     * @param target
     * @param id
     * @returns
     */
    groupFileDelete(
        id: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<void>
}

interface PluginApi {
    /**
     * 使用此方法获取插件的信息，如版本号
     * data.data: { "version": "v1.0.0" }
     */
    about(): Promise<PluginInfo>;
}

export interface MiraiApi extends EventListenerApi, GroupManagerApi, GroupFileManagerApi, EventProcessApi, AccountInfoApi, MessageTempStoreApi, ChatMessageApi, PluginApi {
}