<template>
  <view>
    <pano 
      :panolist="panolist" 
      :autoinit="false"
    />
  </view>
</template>
<script>
  const wxPano = requirePlugin('wxPano')
  const sysInfo = uni.getSystemInfoSync() || {}
  export default {
    props: {
      panolist: {
        type: Array,
        default: () => []
      },
      width: {
        type: Number,
        default: sysInfo.windowWidth || 375
      },
      height: {
        type: Number,
        default: sysInfo.windowHeight || 812
      },
      autoRotation: {
        type: Boolean,
        default: true
      },
      fov: {
        type: Number,
        default: 120
      },
      defaultEntryid: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {}
    },
    mounted () {
      if (this.panolist.length === 0) {
        return
      }
      uni.showLoading({ title: '加载中...', mask: true })
      // wxPano初始化
      wxPano.config({
        panolist: this.panolist,
        request: wx.request,
        loader: 'GLLoader',
        entryid: this.defaultEntryid || 0
      })

      wxPano.onReady = () => {
        uni.hideLoading()
        wxPano.setCanvasWidth(this.width)
        wxPano.setCanvasHeight(this.height)
        // 默认开启自动旋转
        if (this.autoRotation) {
          wxPano && wxPano.enableAutoRotation(1)
        }
        wxPano.setCameraFov(this.fov)
        console.log('******', wxPano)
        // wxPano.initDeviceOrientation()
        // wxPano.enableCheckObjectsIntersect()
      }
    }
  }
</script>