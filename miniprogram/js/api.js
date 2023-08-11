export const getNotice = (url, memoId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/getnotice?openapi=${wx.getStorageSync('openId')}${memoId ? '&memoId=' + memoId : ''}`,
      method: "GET",
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const createNotice = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/addnotice?openapi=${wx.getStorageSync('openId')}`,
      method: "POST",
      data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const getMemos = (url, limit, offset, rowStatus) => {
  return new Promise((resolve, reject) => {
    let data = {
      limit,
      offset,
      openId: wx.getStorageSync('openId')
    }
    if (rowStatus) {
      data = {
        rowStatus,
        ...data
      }
    }
    wx.request({
      url: `${url}/api/v1/memo`,
      data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const getResource = (url, limit, offset) => {
  return new Promise((resolve, reject) => {
    let data = {
      limit,
      offset,
      openId: wx.getStorageSync('openId')
    }
    wx.request({
      url: `${url}/api/v1/resource`,
      data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const deleteResource = (url, id) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/resource/${id}?openId=${wx.getStorageSync('openId')}`,
      method: "DELETE",
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        reject(err)
      }
    })
  })
}

export const deleteMemoResource = (url, memoId, resourceId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/${memoId}/resource/${resourceId}?openId=${wx.getStorageSync('openId')}`,
      method: "DELETE",
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        reject(err)
      }
    })
  })
}

export const createResource = (url, file) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/resource/blob?openId=${wx.getStorageSync('openId')}`,
      method: "POST",
      data: {
        file
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const getMemo = (url, id) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/${id}`,
      data: {
        openId: wx.getStorageSync('openId')
      },
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const getMe = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/user/me`,
      data: {
        openId: wx.getStorageSync('openId')
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}

export const getUserInfo = (url, userId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/user/${userId}`,
      data: {
        openId: wx.getStorageSync('openId')
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}

export const getStats = (url, creatorId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/stats`,
      data: {
        creatorId,
        openId: wx.getStorageSync('openId')
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}

export const sendMemo = (url, content, resourceIdList) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo?openId=${wx.getStorageSync('openId')}`,
      method: "POST",
      data: {
        content,
        resourceIdList
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '发送失败',
        })
        reject(err)
      }
    })
  })
}

export const signUp = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/auth/signup`,
      method: "POST",
      data: data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: 'something wrong',
        })
        reject(err)
      }
    })
  })
}

export const deleteMemo = (url, memoId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/${memoId}?openId=${wx.getStorageSync('openId')}`,
      method: "DELETE",
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
        reject(err)
      }
    })
  })
}

export const editMemo = (url, memoId, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/${memoId}?openId=${wx.getStorageSync('openId')}`,
      method: "PATCH",
      data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '更新失败',
        })
        reject(err)
      }
    })
  })
}

export const changeUserSetting = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/user/setting?openId=${wx.getStorageSync('openId')}`,
      method: "POST",
      data: {
        ...data
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '更新失败',
        })
        reject(err)
      }
    })
  })
}

export const changeMemoPinned = (url, memoId, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/${memoId}/organizer?openId=${wx.getStorageSync('openId')}`,
      method: "POST",
      data: {
        ...data
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '置顶失败',
        })
        reject(err)
      }
    })
  })
}

export const signIn = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/auth/signin`,
      method: "POST",
      data: data,
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '登录失败',
        })
        reject(err)
      }
    })
  })
}

export const getTags = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/tag`,
      data: {
        openId: wx.getStorageSync('openId')
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}

export const getTagsSuggestionList = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/tag/suggestion`,
      data: {
        openId: wx.getStorageSync('openId')
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}

export const upsertTag = (url, TagName) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/tag?openId=${wx.getStorageSync('openId')}`,
      method: "POST",
      data: {
        name: TagName
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}

export const deleteTag = (url, TagName) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/tag/delete?openId=${wx.getStorageSync('openId')}`,
      method: "POST",
      data: {
        name: TagName
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '失败',
        })
        reject(err)
      }
    })
  })
}

export const status = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/status`,
      success(res) {
        resolve(res)
      },
      fail(err) {
        // wx.vibrateLong()
        // wx.showToast({
        //   icon: 'none',
        //   title: '获取失败',
        // })
        reject(err)
      }
    })
  })
}

export const getExploreMemos = (url, offset, limit) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo/all?offset=${offset}&limit=${limit}`,
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}
export const getUserMemos = (url, offset, limit, creatorId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}/api/v1/memo?creatorId=${creatorId}&offset=${offset}&limit=${limit}&rowStatus=NORMAL`,
      success(res) {
        resolve(res)
      },
      fail(err) {
        wx.vibrateLong()
        wx.showToast({
          icon: 'none',
          title: '获取失败',
        })
        reject(err)
      }
    })
  })
}