import {HTTP} from '../utils/http.js'
class ClassicModel extends HTTP{
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic (index, nextOrPrevious, sCallback) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = this._getKey(nextOrPrevious === 'next' ? index + 1 : index - 1)
    let classicData = wx.getStorageSync(key)
    if (classicData) {
        sCallback(classicData)
        return
    }
    this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
    })
  }

  isFirst (index) {
    return index === 1
  }

  isLatest (index) {
    let latestIndex = this._getLatestIndex()
    return index === latestIndex
  }

  _setLatestIndex (index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex () {
    let index = wx.getStorageSync('latest')
    return index
  }
  _getKey (index) {
    let key = `classic-${index}`
    return key
  }
}

export {ClassicModel}
