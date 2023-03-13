#Uniapp小程序VR全景组件使用介绍#

## 引入插件

在使用插件前，首先要在小程序管理后台的“设置 - 第三方服务 - 插件管理”中添加插件。开发者可登录小程序管理后台，通过 appid 查找插件并添加。如果插件无需申请，添加后可直接使用；否则需要申请并等待插件开发者通过后，方可在小程序中使用相应的插件。可参考(https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/using.html)
插件版本信息：
APPID：wx386c038238531f87
最新版本：2.1.4

## 使用准备
 ### manifest.json
 在manifest.json中mp-weixin添加plugins，如下：
 
 ```
 "mp-weixin" : {
        "plugins" : {
            "wxPano" : {
                "version" : "2.1.4",
                "provider" : "wx386c038238531f87"
            }
        },
        "usingComponents" : true
    },
 ```

### pages.json
在pages.json中globalStyle中添加usingComponents
```
"usingComponents": {
   "pano": "plugin://wxPano/pano"
}
```

### 页面中使用
这里对wxPano进行了一层封装，使用实例如下：
```
<template>
	<view>
    <VRPano
      :panolist="panolist"
      :defaultEntryid="0"
    />
  </view>
</template>

<script>
  import VRPano from '@/components/VRPano'
  export default {
    components: { VRPano },
    data () {
      return {
        panolist: [
          {
			name: '全景图片唯一名称',
            src: 全景图片网址''
          }
        ]
      }
    }
  }
</script>
```
VRPano 组件参数如下：

| 参数        | 类型   | 是否必填  | 描述  | 默认值 | 
| --------   | -----:  | :----:  | :----:   | :----:   | 
| panolist  | Array  |   是     | 全景图片信息集合 | [] | 
|defaultEntryid | Number | 否 |进入的全景id（按panolist中的顺序） | 0  |
| autoRotation  |  Boolean   |   否   | 是否开启自动旋转| true |
| fov        |    Number    |  否  | 摄像机视场角，范围[1-120] | 120 |