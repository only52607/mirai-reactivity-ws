import { BotProfile, File, FriendProfile, GroupConfig, MemberInfo, MemberProfile, MessageChain, MessageEvent, MessageReceipt, WsResponseBody } from "../types";
import { PluginInfo, FriendList, GroupFile, GroupFileInfo, GroupList, MemberList, MessageFromId, UploadImageReceipt, UploadVoiceReceipt, MiraiApiResponse } from "../types/model";
import { MiraiApi } from "./mirai-api";
import { MiraiApiWebSocketClient } from "./websocket-client";

export class MiraiApiWebSocketImpl implements MiraiApi {

    constructor(public miraiApiWebSocket: MiraiApiWebSocketClient) { }


    /** PluginApi */

    /**
    * 使用此方法获取插件的信息，如版本号
    * data.data: { "version": "v1.0.0" }
    */
    async about(): Promise<PluginInfo> {
        const reponse: WsResponseBody<MiraiApiResponse<PluginInfo>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "about"
        })
        return reponse.data.data!
    }



    /** AccountInfoApi */

    /**
     * 获取 bot 的资料
     */
    async botProfile(): Promise<BotProfile> {
        const reponse: WsResponseBody<MiraiApiResponse<BotProfile>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "botProfile"
        })
        return reponse.data.data!
    }

    /**
     * 获取 好友 的资料
     */
    async friendProfile(target: number): Promise<FriendProfile> {
        const reponse: WsResponseBody<MiraiApiResponse<FriendProfile>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "friendProfile",
            content: { target }
        })
        return reponse.data.data!
    }

    /**
     * 获取 群成员 的资料
     */
    async memberProfile(target: number, memberId: number): Promise<MemberProfile> {
        const reponse: WsResponseBody<MiraiApiResponse<MemberProfile>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "memberProfile",
            content: { target, memberId }
        })
        return reponse.data.data!
    }

    /**
     * 获取 bot 的好友列表
     */
    async friendList(): Promise<FriendList> {
        const reponse: WsResponseBody<MiraiApiResponse<FriendList>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "friendList"
        })
        return reponse.data.data!
    }

    /**
     * 获取 bot 的群列表
     */
    async groupList(): Promise<GroupList> {
        const reponse: WsResponseBody<MiraiApiResponse<GroupList>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "groupList"
        })
        return reponse.data.data!
    }

    /**
     * 获取 BOT 的群成员列表
     * @param target 指定群的群号
     */
    async memberList(target: number): Promise<MemberList> {
        const reponse: WsResponseBody<MiraiApiResponse<MemberList>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "memberList",
            content: { target }
        })
        return reponse.data.data!
    }

    /** MessageTempStoreApi */

    /**
     * 通过 messageId 获取一条被缓存的消息
     * @param id 获取消息的messageId
     */
    async messageFromId(target: number): Promise<void | MessageEvent> {
        const reponse: WsResponseBody<MiraiApiResponse<void | MessageEvent>> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "messageFromId",
            content: { target }
        })
        return reponse.data.data
    }

    /**
     * 使用此方法向指定好友发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标好友的 QQ 号
     * @param quote 引用一条消息的messageId进行回复
     * @returns { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    async sendFriendMessage(
        messageChain: string | MessageChain,
        target: number,
        quote?: number
    ): Promise<MessageReceipt> {
        const reponse: WsResponseBody<MessageReceipt> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "sendFriendMessage",
            content: { messageChain, target, quote }
        })
        return reponse.data
    }

    /**
     * 使用此方法向指定群发送消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param target 发送消息目标群的群号
     * @param quote 引用一条消息的messageId进行回复
     * @return { code: 0, msg: "success", messageId: 123456 } messageId 一个Int类型属性，标识本条消息，用于撤回和引用回复
     */
    async sendGroupMessage(
        messageChain: string | MessageChain,
        target: number,
        quote?: number
    ): Promise<MessageReceipt> {
        const reponse: WsResponseBody<MessageReceipt> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "sendGroupMessage",
            content: { messageChain, target, quote }
        })
        return reponse.data
    }

    /**
     * 发送临时会话消息
     * @param messageChain 消息链，是一个消息对象构成的数组
     * @param qq 临时会话对象QQ号
     * @param group 临时会话群号
     * @param quote 引用一条消息的messageId进行回复
     */
    async sendTempMessage(
        messageChain: string | MessageChain,
        qq: number,
        group: number,
        quote?: number
    ): Promise<MessageReceipt> {
        const reponse: WsResponseBody<MessageReceipt> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "sendTempMessage",
            content: { messageChain, qq, group, quote }
        })
        return reponse.data
    }

    /**
     * 使用此方法向指定对象（群或好友）发送图片消息 除非需要通过此手段获取imageId，否则不推荐使用该接口
     * @param urls 是一个url字符串构成的数组
     * @param target 发送对象的QQ号或群号，可能存在歧义
     * @param qq 发送对象的QQ号
     * @param group 发送对象的群号
     */
    async sendImageMessage(
        urls: string[],
        target?: number,
        qq?: number,
        group?: number
    ): Promise<string[]> {
        throw Error("Not yet implement.")
    }

    /**
     * 使用此方法上传图片文件至服务器并返回 ImageId
     * @param type
     * @param img 图片文件 fs.createReadStream(img)
     */
    async uploadImage(
        type: "friend" | "group" | "temp",
        img: File
    ): Promise<UploadImageReceipt> {
        throw Error("Not yet implement.")
    }

    /**
     * 使用此方法上传语音文件至服务器并返回 VoiceId
     * @param type 当前仅支持 "group"
     * @param voice 语音文件 fs.createReadStream(voice)
     */
    async uploadVoice(
        type: "friend" | "group" | "temp",
        voice: File
    ): Promise<UploadVoiceReceipt> {
        throw Error("Not yet implement.")
    }

    /**
     * 文件上传
     * @param type 当前仅支持 "Group"
     * @param target 指定群的群号
     * @param path 文件上传目录与名字
     * @param file 文件内容
     */
    async uploadFileAndSend(
        type: "Group",
        target: number,
        path: string,
        file: File
    ): Promise<BaseResponse> {
        throw Error("Not yet implement.")
    }

    /**
     * 撤回消息
     * 使用此方法撤回指定消息。对于bot发送的消息，有2分钟时间限制。对于撤回群聊中群员的消息，需要有相应权限
     * @param target 需要撤回的消息的messageId
     */
    async recall(
        target: number | MessageEvent
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "recall",
            content: { target }
        })
        return reponse.data
    }


    /**
     * 指定群进行全体禁言
     * @param target 指定群的群号
     */
    async muteAll(target: number): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "muteAll",
            content: { target }
        })
        return reponse.data
    }

    /**
     * 指定群解除全体禁言
     * @param target 指定群的群号
     */
    async unmuteAll(target: number): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "unmuteAll",
            content: { target }
        })
        return reponse.data
    }

    /**
     * 指定群禁言指定群员
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     * @param time 禁言时长，单位为秒，最多30天，默认为 60 秒
     */
    async mute(
        target: number,
        memberId: number,
        time: number
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "mute",
            content: { target, memberId, time }
        })
        return reponse.data
    }

    /**
     * 指定群解除群成员禁言
     * @param target	指定群的群号
     * @param memberId 指定群员QQ号
     */
    async unmute(
        target: number,
        memberId: number
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "unmute",
            content: { target, memberId }
        })
        return reponse.data
    }

    /**
     * 移除群成员
     * @param target 指定群的群号
     * @param memberId 指定群员QQ号
     * @param msg 信息
     */
    async kick(
        target: number,
        memberId: number,
        msg: string
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "kick",
            content: { target, memberId, msg }
        })
        return reponse.data
    }

    /**
     * 退出群聊
     * @param target 群号
     * bot为该群群主时退出失败并返回code 10(无操作权限)
     */
    async quit(target: number): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "quit",
            content: { target }
        })
        return reponse.data
    }

    /**
     * 传入 config 时，修改群设置
     * 未传入 config 时，获取群设置
     * @param target 指定群的群号
     * @param config 群设置
     */
    async groupConfig(
        target: number,
        config?: GroupConfig
    ): Promise<GroupConfig> {
        const reponse: WsResponseBody<BaseResponse | GroupConfig> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "groupConfig",
            content: { target, config }
        })
        return reponse.data
    }

    /**
     * 传入 info 时，修改群员资料
     * 未传入 info 时，获取群员资料
     * @param targer 指定群的群号
     * @param memberId 群员QQ号
     * @param info 群员资料
     */
    async memberInfo(
        target: number,
        memberId: number,
        info?: MemberInfo
    ): Promise<BaseResponse | MemberInfo> {
        const reponse: WsResponseBody<BaseResponse | MemberInfo> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "memberInfo",
            content: { target, memberId, info }
        })
        return reponse.data
    }


    // 配置相关
    /**
     * 获取 Mangers
     */
    async managers(): Promise<number[]> {
        throw Error("Not yet implement.")
    }

    /**
     * 设置群精华消息
     * @param target 消息ID
     */
    async setEssence(target: number): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "setEssence",
            content: { target }
        })
        return reponse.data
    }

    /**
     * 戳一戳
     * @param target 戳一戳的目标, QQ号, 可以为 bot QQ号
     * @param subject 戳一戳接受主体(上下文), 戳一戳信息会发送至该主体, 为群号/好友QQ号
     * @param kind 上下文类型
     */
    async sendNudge(
        target: number,
        subject: number,
        kind: "Friend" | "Group"
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "sendNudge",
            content: { target, subject, kind }
        })
        return reponse.data
    }


    // 群文件管理
    /**
     * 获取群文件列表
     * @param target 指定群的群号
     * @param dir 指定查询目录，不填为根目录
     */
    async groupFileList(
        id: string = "",
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<GroupFile[]> {
        const reponse: WsResponseBody<GroupFile[]> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "file_list",
            content: { id, target, group, qq }
        })
        return reponse.data
    }

    /**
     * 获取群文件详细信息
     * @param target 指定群的群号
     * @param id 文件唯一ID
     */
    async groupFileInfo(
        id: string = "",
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<GroupFileInfo> {
        const reponse: WsResponseBody<GroupFileInfo> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "file_info",
            content: { id, target, group, qq }
        })
        return reponse.data
    }

    /**
     * 重命名群文件/目录
     * @param target
     * @param id
     * @param rename
     */
    async groupFileRename(
        id: string = "",
        renameTo: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "file_rename",
            content: { id, renameTo, target, group, qq }
        })
        return reponse.data
    }

    /**
     * 创建群文件目录
     * @param group
     * @param dir
     */
    async groupMkdir(
        id: string = "",
        directoryName: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "file_mkdir",
            content: { id, directoryName, target, group, qq }
        })
        return reponse.data
    }

    /**
     * 移动群文件
     * @param target
     * @param id
     * @param movePath 移动到的目录，根目录为/，目录不存在时自动创建
     * @returns
     */
    async groupFileMove(
        id: string = "",
        moveTo: string,
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "file_move",
            content: { id, moveTo, target, group, qq }
        })
        return reponse.data
    }

    /**
     * 删除群文件/目录
     * @param target
     * @param id
     * @returns
     */
    async groupFileDelete(
        id: string = "",
        target?: number,
        group?: number,
        qq?: number,
    ): Promise<BaseResponse> {
        const reponse: WsResponseBody<BaseResponse> = await this.miraiApiWebSocket.sendRequestForResult({
            command: "file_delete",
            content: { id, target, group, qq }
        })
        return reponse.data
    }
}