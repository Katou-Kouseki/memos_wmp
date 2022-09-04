<h1 align='center'>麦默</h1>

<p align='center'>（基于开源项目[usememos/memos](https://github.com/usememos/memos)）的微信小程序版</p>

> 麦默只是 memos 的一个 api 调用器，所以想要使用这个小程序，你需要先搭建一个 memos ，具体搭建教程参考[碎片化知识卡片管理工具——Memos](https://blog.laoda.de/archives/docker-install-memos)，另外微信小程序对request域名有较[苛刻的限制](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)，具体可以百度了解一下，应该会有奇奇怪怪的办法能够曲线救国（合法域名代理访问），喜欢折腾的可以自己摸索一下，不然就老实备案。

### 预览 测试openId: `15ba8dce-ed28-4940-9b3f-265ad9fd4f3d`

![preview](https://user-images.githubusercontent.com/34543831/188306443-d7e1d601-e258-43ab-ad10-f9174a350e24.png)

### 目前功能有：

- [x] 浏览 memos，支持解析部分 memos 语法，使用的是修改版的原 memos 解析方法
- [x] 发送 memo，目前仅支持纯文本的 memo，不过个人感觉已经足够了😂
- [x] 编辑 memo，删除 memo
- [x] 切换用户 openId
- [x] 内容缓存到手机，没有网络的环境也可以查看，后续可能考虑推出一个单机版？

### 获取openId

网页端memo账号登陆后，`setting` - `Open Api` ，其中 `openid=` 后面字段便是 openId

## 开始搭建

好了，现在假装你已经有了一个合法的域名搭建好了 memos 并且开启了 https ~

1. 申请一个微信小程序，类目选择 `工具-备忘录`，`开发-开发管理-服务器域名-request合法域名` 填写你搭建 memos 的域名。
2. 本地创建一个文件夹，拉取项目
```cmd
git clone https://github.com/Rabithua/memos_wmp
```
3. 下载微信小程序[开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
4. 导入当前文件夹，选择测试号或者使用你注册好的微信小程序的 appid ，不使用云开发。
5. 不出意外的话编译完毕你就可以看到麦默的欢迎界面了~🎉
6. 在 `app.js` 中修改 `this.globalData.url` 为你自己的域名。
