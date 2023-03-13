<template>
  <view>
    <pano 
      :panolist="panolist" 
      :autoinit="false"
    >
      
    </pano>
  </view>
</template>
<script>
  const wxPano = requirePlugin('wxPano')
  export default {
    props: {
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
      },
      panolist: {
        type: Array,
        default: () => []
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
        // 默认开启自动旋转
        if (this.autoRotation) {
          wxPano && wxPano.enableAutoRotation(1)
        }
        wxPano.setCameraFov(this.fov)
        // wxPano.initDeviceOrientation()
        // wxPano.enableCheckObjectsIntersect()
      }
    }
  }
</script>