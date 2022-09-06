<template>
    <view :style="[_get(config, 'outStyle', {})]">
        <swiper
            class="swiper" 
            :indicator-dots="indicatorDots"
            :indicator-color="indicator_color"
            :indicator-active-color="indicator_active_color"
            :autoplay="autoplay" 
            :interval="interval" 
            :duration="duration"
            :circular="circular"
            :vertical="vertical"
            v-if="Array.isArray(list) && list.length > 0"
            :style="{
                height: `${swiperHeight * 2}rpx`
            }"
        >
            <swiper-item v-for="(item, index) in list" :key="index">
                <navigator :url="getNavigationUrl(item.itemNavigation)" hover-class="navigator-hover">
                    <image :src="item.img" mode="scaleToFill" class="swiper_image"             
						:style="{
							height: `${swiperHeight * 2}rpx`
						}"/>
                </navigator>
            </swiper-item>
        </swiper>
   </view>
</template>

<script>
    import _ from 'lodash'
    import qs from 'qs'
    import {globalConfig} from '@/config.js'
	// import { handleImgUrl } from '@/utils/tools.js'
    export default {
        props: {
            config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
        },
        computed: {
            indicatorDots () {
                if (this.indicatorDot === false) {
                    return false
                }
                if (_.isArray(this.list) && this.list.length === 1) {
                    return false
                }
            return true
          },
        },
        data () {
            return {
                swiperHeight: 180,
                list:[],
				// 是否自动切换？
				autoplay: true,
				// 自动切换间隔的时间
			    interval:5000,
				// 滑动动画时长
				duration:500,
				// 是否采用衔接滑动，即播放到末尾后重新回到开头
				circular: true,
				// 滑动方向是否为纵向
				vertical: false,
				// 是否显示面板指示点
				indicatorDot: '',
				// 指示点颜色
				indicator_color:'rgba(0, 0, 0, .3)',
				// 当前选中的指示点颜色
				indicator_active_color:'#000000',
            }
        },
		created() {
			if (_.get(this.config, 'loadApi')) {
			   this.getBannerList()
			}else{
                this.getBannerAutoList()
            }
			this.getChange()
		},
        mounted() {
			if (_.get(this.config, 'loadApi')) {
			   this.getBannerList()
			}else{
                this.getBannerAutoList()
            }
        },
        methods: {
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			// 处理后台返回前端页面的图片路径
			handleImg(value){
				return handleImgUrl(value)
			},
			// 获取有关参数
			getChange(){
				let control = _.get(this.config,'control',{})
				this.autoplay = control.autoplay ? control.autoplay:this.autoplay
				this.interval = control.interval ? control.interval:this.interval
				this.duration = control.duration ? control.duration:this.duration
				this.vertical = control.vertical ? control.vertical:this.vertical
				this.swiperHeight = control.swiperHeight ? control.swiperHeight : this.swiperHeight
				this.indicatorDot = control.indicatorDot ? control.indicatorDot : this.indicatorDot
				this.indicator_color = control.indicator_color ? control.indicator_color: this.indicator_color
			},
            // 格式化loaAPI
             formatLoadApi (api) {
                let that = this
                let apistring
	            if (api.indexOf("{{") !== -1) {
                    let string = api.split("{{")[1]
                    let string1 = string.split("}}")[0]
                    if (string1.indexOf('.') !== -1) {
                        let cache = that.$cache.get(string1)
                        let itemString = string1.split(".")[1]
                        let value = cache[itemString]
                        apistring = api.replace(`{{${string1}}}`, value)
                    } else {
                        let cache = that.$cache.get(string1)
                        console.log(cache, "cache", string1)
                        apistring = api.replace("{{" + string1 + "}}", cache)
                    }
                    } else {
                        apistring = api
                }
                return apistring
            },
		
            // 获取轮播图的列表
          getBannerList(){
				let that = this
                // 显示loading提示框, 需主动调用uni.hideLoading才能关闭提示框。
			    uni.showLoading({ title:'加载中', mask: true })
                // 发起网络请求
			    uni.request({
                // 开发者服务器接口地址
			    url: this.$config.endpoint + this.formatLoadApi(_.get(this.config, 'loadApi')),
			    method: _.get(this.config, 'method', 'GET'),
			    data: {},
			    header: {
			      Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`
			    },
			    complete: (res) => {
                  // 隐藏loading
			      uni.hideLoading()
				  if(res.statusCode == 200){
					  if(res.data.code == 200){
						  const data = _.get(res,'data.data')
						  const listField = _.get(this.config, 'response.list', 'list')
						  const listImg = _.get(this.config,'response.image','image')
						  const listNavgation = _.get(this.config,'response.itemNavgation','itemNavgation')
						  this.list = _.get(data,listField,[])
						  this.list.map((item)=>{
							 item.img = this.handleImg(_.get(item,listImg,'img')) 
							 item.itemNavgation = _.get(item,listNavgation,'itemNavgation')
						  })
					  }
				  }
			      that.$forceUpdate()
			    },
			  })
		  },
          getBannerAutoList(){
              this.list =  _.get(this.config,'banners',[])
              this.list.map((item)=>{
                    item.img = _.get(item,'img','')
                    item.itemNavgation = _.get(item,'nav','')
                })
                console.log(this.list)
           },
            // 获取参数路径
            getNavigationUrl (str) {
                let text = ''
                if (str) {
                   const route = str.split('?')[0]
                   const query = str.split('?')[1] ? qs.parse(str.split('?')[1]) : {}
                   text += (`/pages${route.charAt(0) !== '/' ? '/' : ''}` + route)
                   if (Object.keys(query).length > 0) {
                       for (const i in query) {
                           if (query[i] === '') {
                               query[i] = this.item[i] || ''
                           }
                       }
                       text += '?query=' + encodeURIComponent(JSON.stringify(query))
                   }
                }
                return text
            },
            // 自适应图片高度
            handleGetSwiperHeight () {
                uni.getImageInfo({
                    src: _.get(this.list, '[0].img'),
                    success: (res) => {
                        const screenWidth =  uni.getSystemInfoSync().screenWidth - 32
                        this.swiperHeight = res.height * screenWidth / res.width
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .swiper_image {
        height: auto;
        width: 100%;
    }
</style>
