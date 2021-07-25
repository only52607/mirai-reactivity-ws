export declare type PluginInfoCommand = "about"

export declare type TempCommand = "messageFromId"

export declare type AccountInfoCommand = "botProfile" 

export declare type FriendCommand = 
    "friendList" | 
    "friendProfile" | 
    "deleteFriend"

export declare type GroupCommand = 
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

export declare type MessageCommand = 
    "sendFriendMessage" |
    "sendGroupMessage" |
    "sendGroupMessage" |
    "sendTempMessage" |
    "sendNudge" |
    "recall" 

export declare type FileCommand = 
    "file_list" |
    "file_info" |
    "file_mkdir" |
    "file_delete" |
    "file_move" |
    "file_rename" 

export declare type EventCommand = 
    "resp_newFriendRequestEvent" |
    "resp_memberJoinRequestEvent" |
    "resp_botInvitedJoinGroupRequestEvent" 

export declare type WsCommand = 
    PluginInfoCommand |
    TempCommand |
    AccountInfoCommand |
    FriendCommand | 
    GroupCommand | 
    FriendCommand | 
    MessageCommand | 
    FileCommand | 
    EventCommand

export declare type GetOrUpdate = "get"|"update"

export declare type SubCommandOwner = "groupConfig"|"memberInfo"

export declare type WsSubCommand<T extends WsCommand> = T extends SubCommandOwner ? GetOrUpdate : null