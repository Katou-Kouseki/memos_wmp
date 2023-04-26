import {
  formatMemoContent
} from '../../js/marked'

var app = getApp()

Page({

  data: {
    memo: '',
    memoFocus: false,
    keyBoardHeight: '0',
    sendLoading: false,
    eventChannel: null,
    tags: []
  },

  onLoad(o) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    this.setData({
      eventChannel: eventChannel,
      tags: wx.getStorageSync('tags')
    })

    try {
      let memoDraft = wx.getStorageSync('memoDraft')
      if (memoDraft) {
        let formatMemo = formatMemoContent(memoDraft)
        that.setData({
          memo: memoDraft,
          formatContent: formatMemo,
          cursor: memoDraft.length
        })
      }
    } catch (error) {}

    //页面监听器
    if (eventChannel.listener) {
      eventChannel.once('acceptDataFromOpenerPage', function (data) {
        let formatMemo = formatMemoContent(data.memo)
        that.setData({
          ...data,
          formatContent: formatMemo,
          cursor: data.memo.length
        })
      })
    }

    if (wx.getStorageSync('openId')) {
      that.setData({
        url: app.globalData.url,
        language: app.language[wx.getStorageSync('language') ? wx.getStorageSync('language') : 'chinese']
      })
    } else {
      wx.redirectTo({
        url: '../welcom/index',
      })
    }

    if (o.edit) {
      wx.setNavigationBarTitle({
        title: that.data.language.edit.pageTitle_edit
      })
      that.setData({
        memoFocus: true
      })
    } else {
      wx.setNavigationBarTitle({
        title: that.data.language.edit.pageTitle_add
      })
      that.setData({
        memoFocus: true
      })
    }
  },

  setTapPoint(e) {
    this.setData({
      bottomTapPoint: e.touches[0]
    })
  },

  none() {},

  inputUserTag(e) {
    console.log(e.currentTarget.dataset.tag)
    let tag = e.currentTarget.dataset.tag
    this.setData({
      memoFocus: false
    })
    wx.vibrateShort()
    setTimeout(() => {
      let memo = this.data.memo
      let cursor = this.data.cursor
      let newmemo = `${memo.slice(0, cursor)} #${tag} ${memo.substring(cursor, memo.length)}`
      let formatMemo = formatMemoContent(newmemo)
      this.setData({
        memo: newmemo,
        formatContent: formatMemo,
        memoFocus: true,
        cursor: cursor + 2,
      })
    }, 100);
  },

  slideFocus(e) {
    if (this.data.keyBoardHeight == 0) {
      if (e.touches[0].clientY - this.data.bottomTapPoint.clientY < -50 && Math.abs(e.touches[0].clientX - this.data.bottomTapPoint.clientX) < 20) {
        wx.vibrateShort()
        this.setData({
          memoFocus: true
        })
      }
    }
  },

  setKeyBoard(e) {
    wx.vibrateShort()
    this.setData({
      keyBoardHeight: (e.detail.height - 30).toString()
    })
  },

  memoFocus() {
    wx.vibrateShort()
    this.setData({
      memoFocus: true
    })
  },

  memoBlur(e) {
    wx.vibrateShort()
    this.setData({
      keyBoardHeight: '0',
      cursor: this.data.memo.length,
      memoFocus: false
    })
  },

  memoInput(e) {
    let formatMemo = formatMemoContent(e.detail.value)
    this.setData({
      memo: e.detail.value,
      formatContent: formatMemo,
      cursor: e.detail.cursor
    })
    wx.setStorageSync('memoDraft', e.detail.value)
  },

  inputTag(e) {
    wx.vibrateShort()
    setTimeout(() => {
      let memo = this.data.memo
      let cursor = this.data.cursor
      let newmemo = `${memo.slice(0, cursor)} #todo ${memo.substring(cursor, memo.length)}`
      let formatMemo = formatMemoContent(newmemo)
      this.setData({
        memo: newmemo,
        formatContent: formatMemo,
        memoFocus: true,
        cursor: newmemo.length,
      })
    }, 100);
  },

  inputTodo() {
    wx.vibrateShort()
    this.setData({
      memoFocus: false
    })
    setTimeout(() => {
      let memo = this.data.memo
      let cursor = this.data.cursor
      let newmemo = memo.slice(0, cursor) + '\n- [ ] ' + memo.substring(cursor, memo.length)
      let formatMemo = formatMemoContent(newmemo)
      this.setData({
        memo: newmemo,
        formatContent: formatMemo,
        memoFocus: true,
        cursor: cursor + 7,
      })
    }, 100);
  },

  inputCode() {
    wx.vibrateShort()
    this.setData({
      memoFocus: false
    })
    setTimeout(() => {
      let memo = this.data.memo
      let cursor = this.data.cursor
      let newmemo = memo.slice(0, cursor) + '\n```\n\n```' + memo.substring(cursor, memo.length)
      let formatMemo = formatMemoContent(newmemo)
      this.setData({
        memo: newmemo,
        formatContent: formatMemo,
        memoFocus: true,
        cursor: cursor + 5,
      })
    }, 100);
  },

  send() {
    wx.vibrateShort()
    var that = this
    var content = this.data.memo
    if (content !== '') {
      this.setData({
        sendLoading: true
      })
      if (!this.data.editMemoId) {
        this.sendMemo()
      } else {
        var url = this.data.url
        var id = this.data.editMemoId
        var data = {
          content: content
        }
        that.editMemoContent(url, id, data)
      }
    } else {
      wx.vibrateLong()
      wx.showToast({
        icon: 'error',
        title: that.data.language.home.editErr,
      })
    }
  },

  editMemoContent(url, id, data) {
    let that = this
    app.api.editMemo(url, id, data)
      .then(res => {
        // console.log(res)
        if (res.data) {
          wx.setStorageSync('memoDraft', '')
          let eventChannel = that.data.eventChannel
          eventChannel.emit('acceptDataFromOpenedPage', 'refresh', res.data)
          wx.navigateBack()
        }
      })
      .catch((err) => console.log(err))
  },


  sendMemo() {
    var content = this.data.memo
    var url = this.data.url
    var that = this
    app.api.sendMemo(url, content)
      .then(res => {
        // console.log(res.data)
        if (res.data) {
          wx.setStorageSync('memoDraft', '')
          if (getCurrentPages().length > 1) {
            let eventChannel = that.data.eventChannel
            eventChannel.emit('acceptDataFromOpenedPage', 'add', res.data)
            wx.navigateBack()
          }
        } else {
          wx.vibrateLong()
          wx.showToast({
            icon: 'error',
            title: that.data.language.common.wrong,
          })
          that.setData({
            sendLoading: false
          })
        }
      })
      .catch((err) => console.log(err))
  },

  onShow() {
    this.setData({
      language: app.language[wx.getStorageSync('language') ? wx.getStorageSync('language') : 'chinese']
    })
  }

})