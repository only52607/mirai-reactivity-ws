# mirai-reactivity-ws

vue3 composition响应式风格 [mah](https://github.com/project-mirai/mirai-api-http)  websocket客户端实现，支持浏览器和nodejs。



## 安装

```
npm install mirai-reactivity-ws --save
```



## 基本API

#### 创建api实例

```typescript
const { api } = await createMiraiWebsocketApi(miraiWsConnectParams)
```

> MiraiWsConnectParams类型

```typescript
type VerifyKeyAuthentication = { qq?: number, verifyKey?: string }
type SessionKeyAuthentication = { sessionKey?: string }
type WsAuthentication = VerifyKeyAuthentication & SessionKeyAuthentication
export interface MiraiWsConnectParams {
  address: string,
  authentication: WsAuthentication
}
```



#### 注册全局API实例

```typescript
registerGlobalMiraiApi(api)
```



#### 获取响应式的API引用

```typescript
const miraiApi = useMiraiApi()
```

> miraiApi是一个Ref值，当miraiApi被注册时，其内容会响应式更新



#### 调用mirai api接口

```typescript
const miraiApi = useMiraiApi()
console.log(await miraiApi.value.about())	// 输出插件信息
```



## 响应式API

#### 获取插件信息（响应式）

```typescript
const { pluginInfo, emitUpdate } = usePluginInfo()
```

> pluginInfo是一个响应式的Ref引用，当MiraiApi实例被注册后，会响应式更新内容。
>
> 同时也可以通过emitUpdate手动触发更新。



#### 获取Bot信息（响应式）

```typescript
const { botProfile, state, emitUpdate } = useBotProfile()
```

> pluginInfo是一个响应式的Ref引用，当MiraiApi实例被注册后，会响应式更新内容。
>
> 同时也可以通过emitUpdate手动触发更新。
>
> state表示了当前的数据状态，包含"pending" | "loading" | "done"



#### 获取好友列表、群列表、群成员列表（响应式）

```typescript
const { friends, state, emitUpdate } = useFriends()	// 获取响应式好友列表

const { groups, state, emitUpdate } = useGroups()	// 获取响应式群列表

const groupId = ref(123456789)
const { members, state, emitUpdate } = useMemberList(groupId)	// 获取响应式群成员列表、数据会随着groupId更新
```

> friends、groups是一个响应式的Ref引用，当MiraiApi实例被注册后，会响应式更新内容。
>
> 同时也可以通过emitUpdate手动触发
>
> state表示了当前的数据状态，包含"pending" | "loading" | "done"



### 其他API

请自行查阅源码



## Thanks

本项目部分实现参考了以下项目

[YunYouJun/mirai-ts](https://github.com/YunYouJun/mirai-ts)



## License

[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)

本项目仅供学习参考，禁止用于任何商业用途。任何单位或个人认为本项目可能涉嫌侵犯其合法权益，应该及时提出反馈，我们将会第一时间对违规内容给予删除等相关处理。