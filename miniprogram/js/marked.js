// import { escape } from "lodash-es";
var app = getApp()

const CODE_BLOCK_REG = /```[\s\S]*?\n([\s\S]*?)\n```/g;
const HORIZONTAL_RULES_REG = /\n---\n|\n\*\*\*\n|\n___\n/g;
const SHORT_CODE_BLOCK_REG = /`([\s\S]*?)`/g;
const BOLD_TEXT_REG = /\*\*(.+?)\*\*/g;
const EM_TEXT_REG = /\*(.+?)\*/g;
const TODO_BLOCK_REG = /- \[ \] (.+?)(\n|$)/g;
const DONE_BLOCK_REG = /- \[x\] (.+?)(\n|$)/g;
const DOT_LI_REG = /[^|\n]*( *)[*-] (.+?)(\n|$)/g;
const NUM_LI_REG = /[^|\n]*( *\d+)\. (.+?)(\n|$)/g;
const TAG_REG = /#([^\s#]+)/g;
const IMAGE_URL_REG = /!\[.*?\]\(http(.+?)\)/g;
const IMAGE_LOCAL_URL_REG = /!\[.*?\]\((.+?)\)/g;
const LINK_URL_REG = /\[(.*?)\]\((.+?)\)/g;
const MEMO_LINK_REG = /@\[(.+?)\]\((.+?)\)/g;
const TITLE_TEXT_REG = /(^|\n)#{1,6}\s(.+)/g;
const BLOCKQUOTE_REG = /[\n]*> (.+?)(?:\r?\n|$)/g;

const parseMarkedToHtml = (markedStr) => {
  const htmlText = markedStr
    // 注释自动在英文和中文间添加空格的正则
    // .replace(/([\u4e00-\u9fa5])([A-Za-z0-9?.,;[\]]+)/g, "$1 $2")
    // .replace(/([A-Za-z0-9?.,;[\]]+)([\u4e00-\u9fa5])/g, "$1 $2")
    .replace(BLOCKQUOTE_REG, "<div class='quote'>$1</div>")
    .replace(CODE_BLOCK_REG, (match, offset) => {
      let iterator = match.matchAll(CODE_BLOCK_REG);
      for (let res of iterator) {
        // console.log(res);
        let code = res[1].replace(/\</g, '&lt;')
          .replace(/\>/g, '&gt;')
          .replace(/\#/g, '&330917e8-c0c2-4d64-b25c-3b6a6a165ce535;')
          .replace(/\*/g, '&330917e8-c0c2-4d64-b25c-3b6a6a165ce542;')
          .replace(/\[/g, '&330917e8-c0c2-4d64-b25c-3b6a6a165ce591;')
          .replace(/\]/g, '&330917e8-c0c2-4d64-b25c-3b6a6a165ce593;')
          .replace(/\`/g, '&330917e8-c0c2-4d64-b25c-3b6a6a165ce596;')
        return `<pre class='code' lang=''>${code}</pre>`;
      }
      return '';
    })
    .replace(SHORT_CODE_BLOCK_REG, (match, offset) => {
      let iterator = match.matchAll(SHORT_CODE_BLOCK_REG);
      for (let res of iterator) {
        // console.log(res);
        let code = res[1].replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\#/g, '&#35;').replace(/\*/g, '&#42;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;').replace(/\`/g, '&#96;')
        return `<pre class='shortCode' lang=''>${code}</pre>`;
      }
      return '';
    })
    .replace(TODO_BLOCK_REG, "<div class='listDiv'><span class='todo-block todo' data-value='TODO'></span><span class='todo-text'>$1</span><br></div>")
    .replace(DONE_BLOCK_REG, "<div class='listDiv'><span class='todo-block done' data-value='DONE'></span><span class='todo-text todo-text-done'>$1</span><br></div>")
    .replace(DOT_LI_REG, "<div class='counter-block'><div class='dotlist-dot'>$1•</div><div class='dotlist-content'>$2</div></div>")
    .replace(NUM_LI_REG, "<div class='counter-block'><div class='orderlist-dot'>$1.</div><div class='orderlist-content'>$2</div></div>")
    .replace(BOLD_TEXT_REG, "<strong>$1</strong>")
    .replace(EM_TEXT_REG, "<em class='xieti'>$1</em>")
    .replace(TITLE_TEXT_REG, (match, offset) => {
      let iterator = match.matchAll(TITLE_TEXT_REG);
      for (let res of iterator) {
        // console.log(res);
        let num = res[0].length - res[1].length - res[2].length - 1;
        return `<span style='font-size: ${30-num}px; font-weight: bold; padding-bottom: 5px; '>${res[2]}</span>`;
      }
      return '';
    })
    .replace(HORIZONTAL_RULES_REG, "<hr class='line'>");
  return htmlText;
};

const parseHtmlToRawText = (htmlStr) => {
  const tempEl = document.createElement("div");
  tempEl.className = "memo-content-text";
  tempEl.innerHTML = htmlStr;
  const text = tempEl.innerText;
  return text;
};

const defaultFormatterConfig = {
  inlineImage: false,
};

const formatMemoContent = (content, addtionConfig) => {
  const config = {
    ...defaultFormatterConfig,
    ...addtionConfig,
  };
  const tempElement = parseMarkedToHtml(content);
  let outputString = tempElement;
  var url = wx.getStorageSync('url');

  outputString = outputString
    .replace(IMAGE_URL_REG, "<img lazy-load class='img' src='http" + "$1'/>")
    .replace(IMAGE_LOCAL_URL_REG, "<img lazy-load class='img' src='" + url + "$1'" + "/>");

  return outputString
    .replace(MEMO_LINK_REG, "<span class='memo-link-text' data-value='$2'>$1</span>")
    .replace(LINK_URL_REG, "<a class='link' data-href='$1' href='$2'>$2</a>")
    .replace(TAG_REG, "<span class='tag-span'>#$1</span> ")
    .replace(/(330917e8-c0c2-4d64-b25c-3b6a6a165ce5)/g, "#")
};

export {
  formatMemoContent,
  parseHtmlToRawText
};