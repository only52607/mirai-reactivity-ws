export type PluginInfoCommand = "about"

export type TempCommand = "messageFromId"

export type AccountInfoCommand = "botProfile" 

export type FriendCommand = 
    "friendList" | 
    "friendProfile" | 
    "deleteFriend"

export type GroupCommand = 
    "groupList" | 
    "memberList" | 
    "memberProfile" | 
    "mute" | 
    "unmute" | 
    "kick" | 
    "quit" | 
    "muteAll" | 
    "unmuteAll" | 
    "setEssence" | 
    "groupConfig" | 
    "memberInfo" | 
    "unmuteAll" 

export type MessageCommand = 
    "sendFriendMessage" |
    "sendGroupMessage" |
    "sendGroupMessage" |
    "sendTempMessage" |
    "sendNudge" |
    "recall" 

export type FileCommand = 
    "file_list" |
    "file_info" |
    "file_mkdir" |
    "file_delete" |
    "file_move" |
    "file_rename" 

export type EventCommand = 
    "resp_newFriendRequestEvent" |
    "resp_memberJoinRequestEvent" |
    "resp_botInvitedJoinGroupRequestEvent" 

export type WsCommand = 
    PluginInfoCommand |
    TempCommand |
    AccountInfoCommand |
    FriendCommand | 
    GroupCommand | 
    FriendCommand | 
    MessageCommand | 
    FileCommand | 
    EventCommand

export type GetOrUpdate = "get"|"update"

export type SubCommandOwner = "groupConfig"|"memberInfo"

export type WsSubCommand<T extends WsCommand> = T extends SubCommandOwner ? GetOrUpdate : null