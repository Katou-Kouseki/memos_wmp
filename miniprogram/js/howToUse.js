 const newMemoContent = ` #Welcom 
欢迎注册麦默🎉现在你需要了解一下麦默以及它的使用方法~
麦默是基于**笔记类**开源web项目[memos](https://github.com/usememos/memos)定制的微信小程序客户端，并且[麦默](https://github.com/Rabithua/memos_wmp)也是开源的。因此你也可以通过网页使用memo，网址是**https://memos.wowow.club**，以下是使用说明：

 - 【三种模式】\`正常/归档/删除\`，笔记卡片右上角第二个是删除按钮，单击归档[No/Yes]📦，长按删除🗑。

 - 【置顶卡片📌】卡片右上角第一个是置顶按钮，单击置顶[No/Yes]，另外还有一个隐藏功能，长按可以分享当前卡片，不过目前仅支持纯文字，语法无法支持。

 - 【编辑✒】右上角第三个按钮是编辑，单击可以对笔记卡片进行编辑。

 - 【创建✨】主页向左滑动可以创建新的内容。

 - 【快捷按钮💡】编辑页面三个快捷按钮分别是 标签、TODO、代码块。

 - 【话题🏷】话题后方有一个空格，这个是话题语法结束的标志，不可或缺。

 - 【TODO📋】 中括号内空格渲染出来是待办，空格替换为英文字母小写 \`x\` 渲染出来是已完成。\`另外 TODO 内容编写完毕后最后一条后面也要添加回车\`，因为回车是TODO语法结束的标志。

 - 【代码块🎃】第三个是代码块按钮，语法前后都需要回车来包裹。

#语法示例 

- [ ] 待办事项
- [x] 已完成

这句话包含了一个\`行内代码\`。

 - 这是一个list
 - 还有一件事
 - 还有一件事
 - 还有一件事

**我被加粗了**，*我是斜体*。

\`\`\`
.todo-text {
  display:initial;
  vertical-align: middle;
}
\`\`\`
`
 export {
  newMemoContent
 }