/**
 * 联系实体类型，参考 [mirai-core 命名](https://github.com/mamoe/mirai/tree/master/mirai-core/src/commonMain/kotlin/net.mamoe.mirai/contact)
 * @packageDocumentation
 */

import { NumeralIdentifiableEntity } from "./base";

/**
 * 好友信息类型
 */
export interface Friend extends NumeralIdentifiableEntity {
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
export interface Member extends NumeralIdentifiableEntity {
  /**
   * 群名片
   */
  memberName: string;
  /**
   * 群权限 OWNER、ADMINISTRATOR或MEMBER
   */
  permission: "OWNER" | "ADMINISTRATOR" | "MEMBER";
  /**
   * 所在的群
   */
  group: Group;
  /**
   * 群头衔
   */
  specialTitle: string;
  /**
   * 加群时间
   */
  joinTimestamp: number;
  /**
   * 上次发言时间
   */
  lastSpeakTimestamp: number;
  /**
   * 禁言剩余时间
   */
  muteTimeRemaining: number;
}

/**
 * 群的信息
 */
 export interface Group extends NumeralIdentifiableEntity {
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
  permission: Member["permission"];
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

export interface Bot extends BotProfile, NumeralIdentifiableEntity {}