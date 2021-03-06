/**
 * 消息类型，与 [Mirai-api-http 消息类型一览](https://github.com/project-mirai/mirai-api-http/blob/master/docs/MessageType.md) 保持一致
 * @packageDocumentation
 */

import { ClassifiedEntity, IdentifiableEntity, NumeralIdentifiableEntity } from "./base";

/**
 * 源消息类型
 */
export interface Source extends ClassifiedEntity<string>, NumeralIdentifiableEntity {
  type: "Source";
  /**
   * 	消息的识别号，用于引用回复（Source 类型永远为 chain 的第一个元素）
   */
  id: number;
  /**
   * 时间戳
   */
  time: number;
}

/**
 * 引用消息类型
 */
export interface Quote extends ClassifiedEntity<string>, NumeralIdentifiableEntity {
  type: "Quote";
  /**
   * 	被引用回复的原消息的messageId
   */
  id: number;
  /**
   * 被引用回复的原消息所接收的群号，当为好友消息时为0
   */
  groupId?: number;
  /**
   * 被引用回复的原消息的发送者的QQ号
   */
  senderId?: number;
  /**
   * 被引用回复的原消息的接收者者的QQ号（或群号）
   */
  targetId?: number;
  /**
   * 被引用回复的原消息的消息链对象
   */
  origin?: MessageChain;
}

/**
 * 艾特某人消息
 */
export interface At extends ClassifiedEntity<string> {
  type: "At";
  /**
   * 群员QQ号
   */
  target: number;
  /**
   * 	At时显示的文字，发送消息时无效，自动使用群名片
   */
  display: string;
}

/**
 * 艾特全体成员消息
 */
export interface AtAll extends ClassifiedEntity<string> {
  type: "AtAll";
}

/**
 * 原生表情消息
 */
export interface Face extends ClassifiedEntity<string> {
  type: "Face";
  /**
   * QQ表情编号，可选，优先高于name
   */
  faceId: number;
  /**
   * QQ表情拼音，可选
   */
  name: string;
}

/**
 * 文本消息
 */
export interface Plain extends ClassifiedEntity<string> {
  type: "Plain";
  /**
   * 文字消息
   */
  text: string;
}

/**
 * 图片消息
 */
export interface Image extends ClassifiedEntity<string> {
  type: "Image";
  /**
   * 图片的 imageId，群图片与好友图片格式不同。不为空时将忽略 url 属性
   */
  imageId: string | null;
  /**
   * 图片的 URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
   */
  url: string | null;
  /**
   * 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
   */
  path: string | null;
}

/**
 * 闪照消息
 */
export interface FlashImage extends ClassifiedEntity<string> {
  type: "FlashImage";
  /**
   * 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
   */
  imageId: string | null;
  /**
   * 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
   */
  url: string | null;
  /**
   * 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
   */
  path: string | null;
}

/**
 * 语音消息
 */
export interface Voice extends ClassifiedEntity<string> {
  type: "Voice";
  /**
   * 语音的 voiceId，不为空时将忽略 url 属性
   */
  voiceId: string | null;
  /**
   * 语音的URL，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载
   */
  url: string | null;
  /**
   * 语音的路径，发送本地语音，相对路径于 `data/net.mamoe.mirai-api-http/voices`
   */
  path: string | null;
}

/**
 * 富文本消息（譬如合并转发）
 */
export interface Xml extends ClassifiedEntity<string> {
  type: "Xml";
  /**
   * XML文本
   */
  xml: string;
}

/**
 * Json消息
 */
export interface Json extends ClassifiedEntity<string> {
  type: "Json";
  /**
   * Json文本
   */
  json: string;
}

/**
 * 小程序消息
 */
export interface App extends ClassifiedEntity<string> {
  type: "App";
  /**
   * 内容
   */
  content: string;
}

/**
 * 戳一戳消息
 */
export interface Poke extends ClassifiedEntity<string> {
  type: "Poke";
  /**
   * 戳一戳的类型
  * "Poke": 戳一戳
  * "ShowLove": 比心
  * "Like": 点赞
  * "Heartbroken": 心碎
  * "SixSixSix": 666
  * "FangDaZhao": 放大招
  */
  name: "Poke" | "ShowLove" | "Like" | "Heartbroken" | "SixSixSix" | "FangDaZhao";
}

/**
 * 转发
 */
export interface Forward extends ClassifiedEntity<string> {
  type: "Forward";
  /**
   * 标题，XX的聊天记录
   */
  title: string;
  /**
   * 简介，[聊天记录]
   */
  brief: string;
  /**
   * 源
   */
  source: string;
  /**
   * 摘要，查看 3 条转发消息
   */
  summary: string;
  /**
   * 转发内容
   */
  nodeList: Array<{
    /**
     * 发送者 id
     */
    senderId: number;
    /**
     * 时间戳, 单位 秒
     */
    time: number;
    /**
     * 发送者姓名
     */
    senderName: string;
    messageChain: MessageChain;
  }>;
}

/**
 * 文件
 */
export interface File extends ClassifiedEntity<string>, IdentifiableEntity<string> {
  type: "File";
  /**
   * 文件唯一id
   */
  id: string;
  /**
   * 服务器需要的ID
   */
  internalId: number;
  /**
   * 文件名字
   */
  name: string;
  /**
   * 文件大小
   */
  size: number;
}

/**
 * 音乐分享
 */
export interface MusicShare extends ClassifiedEntity<string> {
  type: "MusicShare";
  /**
   * 音乐应用类型
   */
  kind: "NeteaseCloudMusic" | "QQMusic" | "MiguMusic";
  /**
   * 消息卡片标题
   */
  title: string;
  /**
   * 消息卡片内容
   */
  summary: string;
  /**
   * 点击卡片跳转网页 URL
   */
  jumpUrl: string;
  /**
   * 消息卡片图片 URL
   */
  pictureUrl: string;
  /**
   * 音乐文件 URL
   */
  musicUrl: string;
  /**
   * 简介，在消息列表显示，默认为 `[分享]$title`
   */
  brief?: string;
}

export type SingleMessageMap = {
  Source: Source;
  Quote: Quote;
  At: At;
  AtAll: AtAll;
  Face: Face;
  Plain: Plain;
  Image: Image;
  FlashImage: FlashImage;
  Voice: Voice;
  Xml: Xml;
  Json: Json;
  App: App;
  Poke: Poke;
  Forward: Forward;
  File: File;
  MusicShare: MusicShare;
};

/**
 * FriendMessage | GroupMessage | TempMessage 下的 MessageChain 中的单条消息类型
 * 单条消息 此处命名与 mamoe/mirai-core 保持一致
 */
export type SingleMessage = SingleMessageMap[keyof SingleMessageMap];

/**
 * 消息链
 */
export type MessageChain = Array<SingleMessage>;

export type ReceivedMessageChain = MessageChain & { 0: Source }

/**
 * 消息回执
 */
export interface UploadImageReceipt {
  imageId: string;
  url: string;
  path: string;
}

export interface UploadVoiceReceipt {
  voiceId: string;
  url: string;
  path: string;
}

export interface MessageReceipt {
  /**
   * 一个Int类型属性，标识本条消息，用于撤回和引用回复
   */
  messageId: number;
}