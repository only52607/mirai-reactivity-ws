/**
 * 生成对应消息格式
 * @packageDocumentation
 */

import * as MessageType from "../types/model/message";

/**
 * 生成引用的消息格式
 * @param messageId 消息 ID
 */
function buildQuote(messageId: number): MessageType.Quote {
  return {
    type: "Quote",
    id: messageId,
  };
}

/**
 * 生成艾特默认的消息格式
 * @param target QQ 号
 */
function buildAt(target: number): MessageType.At {
  return {
    type: "At",
    target,
    display: "",
  };
}

/**
 * 生成艾特全体成员的消息格式
 */
function buildAtAll(): MessageType.AtAll {
  return {
    type: "AtAll",
  };
}

/**
 * 生成 QQ 原生表情消息格式
 * @param faceId QQ表情编号
 * @param name QQ表情拼音，可选
 */
function buildFace(faceId: number, name = ""): MessageType.Face {
  return {
    type: "Face",
    faceId,
    name,
  };
}

/**
 * 生成文本消息格式
 * @param text 文本
 */
function buildPlain(text: string): MessageType.Plain {
  return {
    type: "Plain",
    text,
  };
}

/**
 * 生成图片消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
 */
function buildImage(
  imageId: string | null = null,
  url: string | null = null,
  path: string | null = null
): MessageType.Image {
  return {
    type: "Image",
    imageId,
    url,
    path,
  };
}

/**
 * 生成闪照消息格式
 * @param imageId 图片的imageId，群图片与好友图片格式不同。不为空时将忽略url属性
 * @param url 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载
 * @param path 图片的路径，发送本地图片，相对路径于 `data/net.mamoe.mirai-api-http/images`
 */
function buildFlashImage(
  imageId: string | null = null,
  url: string | null = null,
  path: string | null = null
): MessageType.FlashImage {
  return {
    type: "FlashImage",
    imageId,
    url,
    path,
  };
}

/**
 * 需要 mirai-api-http 1.8.2 以上，mirai-console 1.0 以上
 * 生成语音消息格式
 * @param voiceId 语音的 voiceId，不为空时将忽略 url 属性
 * @param url 语音的URL，发送时可作网络语音的链接；接收时为腾讯语音服务器的链接，可用于语音下载
 * @param path 语音的路径，发送本地语音，相对路径于 `data/net.mamoe.mirai-api-http/voices`
 */
function buildVoice(
  voiceId: string | null = null,
  url: string | null = null,
  path: string | null = null
): MessageType.Voice {
  return {
    type: "Voice",
    voiceId,
    url,
    path,
  };
}

/**
 * 富文本消息（譬如合并转发）
 * @param xml
 */
function buildXml(xml: string): MessageType.Xml {
  return {
    type: "Xml",
    xml,
  };
}

/**
 * Json 消息格式（我也还没看懂这哪里用，欢迎 PR）
 * @param json
 */
function buildJson(json: string): MessageType.Json {
  return {
    type: "Json",
    json,
  };
}

/**
 * 小程序
 * @param content
 */
function buildApp(content: string): MessageType.App {
  return {
    type: "App",
    content,
  };
}

/**
 * - "Poke": 戳一戳
 * - "ShowLove": 比心
 * - "Like": 点赞
 * - "Heartbroken": 心碎
 * - "SixSixSix": 666
 * - "FangDaZhao": 放大招
 * @param name 戳一戳的类型
 */
function buildPoke(name: MessageType.PokeName): MessageType.Poke {
  return {
    type: "Poke",
    name,
  };
}

/**
 * 音乐分享
 * @param kind 音乐应用类型
 * @param title 消息卡片标题
 * @param summary 消息卡片内容
 * @param jumpUrl 点击卡片跳转网页 URL
 * @param pictureUrl 消息卡片图片 URL
 * @param musicUrl 音乐文件 URL
 * @param brief 在消息列表显示，可选，默认为 `[分享]$title`
 * @returns
 */
function buildMusicShare(
  kind: MessageType.MusicShareKind,
  title: string,
  summary: string,
  jumpUrl: string,
  pictureUrl: string,
  musicUrl: string,
  brief?: string
): MessageType.MusicShare {
  return {
    type: "MusicShare",
    kind,
    title,
    summary,
    jumpUrl,
    pictureUrl,
    musicUrl,
    brief,
  };
}

export const messageBuilder = {
  buildQuote,
  buildAt,
  buildAtAll,
  buildFace,
  buildPlain,
  buildImage,
  buildFlashImage,
  buildVoice,
  buildXml,
  buildJson,
  buildApp,
  buildPoke,
  buildMusicShare,
};


/**
 * 转化为标准的 MessageChain
 */
export function ensureMessageChain(
  messageChain: string | MessageType.SingleMessage | MessageType.MessageChain
): MessageType.MessageChain {
  if (typeof messageChain === "string") {
    messageChain = [buildPlain(messageChain)];
  } else if (!Array.isArray(messageChain)) {
    messageChain = [messageChain];
  }
  return messageChain;
}



type BaseCardType = "bilibili";

/**
 * 获取卡片类型
 * @param type
 */
function getInfoByType(type: BaseCardType) {
  const info = {
    icon: "",
    name: "",
  };
  switch (type) {
    case "bilibili":
      info.name = "哔哩哔哩";
      info.icon =
        "http://miniapp.gtimg.cn/public/appicon/432b76be3a548fc128acaa6c1ec90131_200.jpg";
      break;

    default:
      break;
  }
  return info;
}

/**
 * 卡片信息格式
 */
interface CardInfo {
  type?: BaseCardType;
  /**
   * 简介
   */
  brief?: string;
  /**
   * 卡片链接
   */
  url: string;
  /**
   * 卡片标题
   */
  title?: string;
  /**
   * 卡片摘要
   */
  summary?: string;
  /**
   * 卡片封面图
   */
  cover: string;
  /**
   * 卡片图标
   */
  icon?: string;
  /**
   * 卡片名称
   */
  name?: string;
}

/**
 * 生成卡片 XML 消息模版
 * Example:
 * msg.reply([
 *   Message.Xml(
 *     template.card({
 *       type: "bilibili",
 *       url: "https://www.bilibili.com/video/BV1bs411b7aE",
 *       cover:
 *         "https://cdn.jsdelivr.net/gh/YunYouJun/cdn/img/meme/love-er-ci-yuan-is-sick.jpg",
 *       summary: "咱是摘要", // 从前有座山...
 *       title: "咱是标题", // 震惊，xxx！
 *       brief: "咱是简介", // QQ小程序[哔哩哔哩]
 *     })
 *   )
 * ]);
 * @param info
 */
export function card(info: CardInfo) {
  if (info.type) {
    info = Object.assign(getInfoByType(info.type), info);
  }
  return `<?xml version='1.0' encoding='UTF-8' standalone='yes'?><msg templateID="123" url="${info.url}" serviceID="1" action="web" actionData="" a_actionData="" i_actionData="" brief="${info.brief}" flag="0"><item layout="2"><picture cover="${info.cover}"/><title>${info.title}</title><summary>${info.summary}</summary></item><source url="${info.url}" icon="${info.icon}" name="${info.name}" appid="0" action="web" actionData="" a_actionData="tencent0://" i_actionData=""/></msg>`;
}