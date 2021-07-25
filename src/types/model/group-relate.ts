/**
 * 群设置与成员信息设置
 * @packageDocumentation
 */

/**
 * 群设置
 */
export interface GroupConfig {
  /**
   * 群名
   */
  name?: string;
  /**
   * 群公告
   */
  announcement?: string;
  /**
   * 是否开启坦白说
   */
  confessTalk?: boolean;
  /**
   * 是否允许群员邀请
   */
  allowMemberInvite?: boolean;
  /**
   * 是否开启自动审批入群
   */
  autoApprove?: boolean;
  /**
   * 是否允许匿名聊天
   */
  anonymousChat?: boolean;
}

/**
 * 群员信息
 */
export interface MemberInfo {
  /**
   * 群名片
   */
  name?: string;
  /**
   * 群头衔
   */
  specialTitle?: string;
}

/**
 * 群文件
 */
export interface GroupFile {
  name: string;
  id: string;
  path: string;
  isFile: boolean;
}

/**
* 群文件信息
*/
export interface GroupFileInfo {
  /**
   * 文件名字
   */
  name: string;
  /**
   * 文件绝对位置
   */
  path: string;
  /**
   * 文件唯一ID
   */
  id: string;
  /**
   * 文件长度
   */
  length: number;
  /**
   * 下载次数
   */
  downloadTimes: number;
  /**
   * 上传者QQ
   */
  uploaderId: number;
  /**
   * 上传时间
   */
  uploadTime: number;
  /**
   * 最后修改时间
   */
  lastModifyTime: number;
  /**
   * 文件下载链接
   */
  downloadUrl: string;
  /**
   * 文件 sha1 值
   */
  sha1: string;
  /**
   * 文件 md5 值
   */
  md5: string;
}