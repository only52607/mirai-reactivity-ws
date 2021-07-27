/**
 * 联系实体类型，参考 [mirai-core 命名](https://github.com/mamoe/mirai/tree/master/mirai-core/src/commonMain/kotlin/net.mamoe.mirai/contact)
 * @packageDocumentation
 */

export type Permission = "OWNER" | "ADMINISTRATOR" | "MEMBER";

/**
 * 群的信息
 */
export interface Group {
  /**
   * 群号
   */
  id: number;
  /**
   * 群的群名称
   */
  name: string;
  /**
   * 群中，Bot的群限权
   */
  permission: Permission;
}

/**
 * 基础用户信息
 */
interface BaseUser {
  /**
   * QQ 号
   */
  id: number;
}

/**
 * 好友信息类型
 */
export interface Friend extends BaseUser {
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户备注
   */
  remark: string;
}

/**
 * 群成员信息类型
 */
export interface Member extends BaseUser {
  /**
   * 群名片
   */
  memberName: string;
  /**
   * 群权限 OWNER、ADMINISTRATOR或MEMBER
   */
  permission: Permission;
  /**
   * 所在的群
   */
  group: Group;

  specialTitle: string;

  joinTimestamp: number;
  lastSpeakTimestamp: number;
  muteTimeRemaining: number;
}

export type User = Friend | Member;

export type FriendList = Friend[];
export type GroupList = Group[];
export type MemberList = Member[];

export interface UserProfile {
  nickname: string,
  email: string,
  age: number,
  level: number,
  sign: string,
  sex: "UNKNOWN" | "MALE" | "FEMALE" 
}

export interface BotProfile extends UserProfile {}

export interface FriendProfile extends UserProfile {}

export interface MemberProfile extends UserProfile {}