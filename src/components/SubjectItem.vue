<template>
  <view class="container">
    <view class="base">
    	<!-- 左容器 -->
    	<view class="left-box">
    		<!-- 图片容器 -->
    		<view class="image-box" v-if="img" @click.stop="previewImage(img)">
    			<image :src="getimg(img)" :class="[`${avatarSize()}`]" v-if="avatar" mode="aspectFill"></image>
    			<image :src="getimg(img)" :class="[`${imageSize()}`]"  mode="aspectFill" v-else></image>
    		</view>
    		<!-- 文本信息容器 -->
    		<view class="content-box">
    			<!-- 主标题 -->
    			<view class="title-box">
    				<view :class="[`${titleSize()}`]" mode="aspectFill" v-if="title">
    					<text>{{title}}</text>
    				</view>
    				<view class="badge" v-if="badge">
    					<text>{{badge}}</text>
    				</view>
    				<view class="tag" v-if="tag">
    					<text>{{tag}}</text>
    				</view>
    			</view>
    			<!-- 副标题 -->
    			<view class="subtitle-box">
    				<!-- 副标题 -->
    				<view class="subtitle" v-if="subtitle">
    					<text class="global-subtitle">{{subtitle}}</text>
    				</view>
    				<!-- tags -->
    				<view class="tags-box" v-if="tags.length > 0">
    					<view class="tags" v-for="(item,index) of chackTagsValue(tags)" :key="index">
    						{{item}}
    					</view>
    				</view>
    			</view>
    		</view>
    	</view>

    	<!-- 右容器 -->
    	<view class="right-box">
    		<!-- 路由按钮 -->
    		<view class="">
    			<view v-for="(item,index) of actions" :key="index" class="actions" v-if="actions.length > 0">
    				<image class="actions-img" :src="item.img + '?color=8a8a8a'" @click="requestApi(item.nav)">
    				</image>
    			</view>
    		</view>
    		<!-- status -->
    		<view class="status">
    			<text>{{status}}</text>
    		</view>
    		<!-- 按钮 -->
    		<view :class="navigation.container ? navigation.container : 'button-on'" @click="requestApi(navigation.nav)"
    			v-if="navigation">
    			<image :src="navigation.icon" class="button-icon" v-if="navigation.icon"></image>
    			<text v-if="navigation.label" class="textStyle">{{navigation.label}}</text>
    		</view>
    		<!-- <view class="navigation-seitch-off" v-else>
    			<image :src="navigation.switchoff.icon" class="button-icon" v-if="navigation.switchoff.icon"></image>
    			<text v-if="navigation.switchoff.label">{{navigation.switchoff.label}}</text>
    		</view> -->
    	</view>
    </view>

    <view class="footer" v-if="note">
      {{note}}
    </view>
  </view>

</template>

<script>
	import {
		globalConfig
	} from '@/config.js'

	export default {
		props: {
			item: Object
		},
		data() {
			return {
				// toRightIcon: 'http://static.smallsaas.cn/house/2022/svg/houseAppIcon/toRight.svg?color=8a8a8a'
				img: this.item.img || '', // img  图片
				tag: this.item.tag || '', // tag  标题右侧标签
				title: this.item.title || '', // title  标题，使用全局样式
				subtitle: this.item.subtitle || '', // subtitle  副标题，使用全局样式
				avatar: this.item.avatar || '', // avatar  头像标识，任意值，有则将图片转为头像
				badge: this.item.badge || '', // badge  用于在标题右侧显示数量
				tags: this.item.tags || '', // tags  副标题下面的小标签
				status: this.item.status || '', // status  组件右侧状态信息
				size: this.item.size || '', // size  头像大小
        note: this.item.note || '', //note 描述

				navigation: this.item.navigation || '', // navigation	操作按钮定义, 数据类型为object
				// navigation.status 按钮状态
				// navigation.icon	按钮图标
				// navigation.label	按钮标题
				// navigation.container	按钮容器风格css,或风格集名称
				// navigation.nav	默认api
				// navigation.switchoff.label	切换后标题
				// navigation.switchoff.icon	切换后图标
				// navigation.switchoff.container	切换后图标
				// navigation.switchoff.nav	 切换api
				// navigation.button	直接引用框架定义的按钮名称(字符), 或一个组件引用

				actions: this.item.actions || '' // actions	 组件右上角的操作列表，灰色小图标靠右排列,大小固定
				// actions[].{}.img	图标链接
				// actions[].{}.nav	点击图标触发的路由
			}
		},
		mounted() {
			// console.log('item 111 ==', this.item)
		},
		methods: {
			// 请求 api
			requestApi(nav) {
				const that = this
				// 解析 nav
				let methods
				let api
				let params
				methods = nav.slice(0, nav.indexOf(' '))
				if (nav.indexOf('?') != -1) {
					if (nav.indexOf('{') < nav.indexOf('?')) {
						api = nav.slice(nav.indexOf(' ') + 1, nav.indexOf('{'))
						params = nav.slice(nav.indexOf('{'))
					} else {
						api = nav.slice(nav.indexOf(' ') + 1, nav.indexOf('?'))
						params = nav.slice(nav.indexOf('?') + 1)
					}
				} else {
					api = nav.slice(nav.indexOf(' ') + 1, nav.indexOf('{'))
					params = nav.slice(nav.indexOf('{'))
				}
				// console.log('methods',methods)
				// console.log('api',api)
				// console.log('params',params)
				/**
				 * 判断请求方法
				 * 两个大类的判断，GET 和 其他（POST/PUT/DELETE，目的是只区分带body和不带body
				 * 在（POST/PUT/DELETE）的api中存在路径参和body同时存在的情况
				 */
				let requestParam
				if (methods === 'GET') {
					requestParam = that.packageGetParams(params)
					uni.showLoading({
						mask: true
					})
					uni.request({
						url: `${globalConfig.endpoint}` + api + requestParam,
						method: 'GET',
						header: {
							Authorization: `Bearer ${that.$cache(globalConfig.tokenStorageKey)}`
						},
						success: (res) => {
							uni.hideLoading()
							console.log('res===', res)
						}
					})
				} else {
					requestParam = that.packageParams(params)
					if (requestParam['pathVariable'] && requestParam['body']) {
						uni.showLoading({
							mask: true
						})
						uni.request({
							url: `${globalConfig.endpoint}` + api + requestParam['pathVariable'],
							method: methods,
							data: requestParam['body'],
							header: {
								'content-type': 'application/json',
								Authorization: `Bearer ${that.$cache(globalConfig.tokenStorageKey)}`
							},
							success: (res) => {
								uni.hideLoading()
							}
						})
					} else if (requestParam['pathVariable']) {
						uni.showLoading({
							mask: true
						})
						uni.request({
							url: `${globalConfig.endpoint}` + api + requestParam['pathVariable'],
							method: methods,
							header: {
								Authorization: `Bearer ${that.$cache(globalConfig.tokenStorageKey)}`
							},
							success: (res) => {
								uni.hideLoading()
							}
						})
					} else if (requestParam['body']) {
						console.log('requestParam[]', requestParam['body'])
						uni.showLoading({
							mask: true
						})
						uni.request({
							url: `${globalConfig.endpoint}` + api,
							method: methods,
							data: requestParam['body'],
							header: {
								'content-type': 'application/json',
								Authorization: `Bearer ${that.$cache(globalConfig.tokenStorageKey)}`
							},
							success: (res) => {
								uni.hideLoading()
							}
						})
					}
				}
			},

			// 获取头像或图片img
			getimg (img) {
        return this.handleImgUrl(img)
				// if (img.search('https://') != -1 || img.search('http://') != -1) {
				// 	return img
				// } else {
				// 	let result = `${globalConfig.endpoint}` + img
				// 	return result
				// }
			},

			// 预览图片
			previewImage(url){
				const str = this.getimg(url)
				let imgsArray = [];
				imgsArray[0] = str;
				uni.previewImage({
					current: 0,
					urls: imgsArray,
				});
			},

			// GET请求参数封装
			packageGetParams(params) {
				console.log('封装参数', params)
				const that = this
				// 判断是否是多个参数
				if (params.indexOf('&') != -1) {
					let paramsArray = params.split('&')
					// 单个参数
				} else {
					// 判断是否有{ }，如果有则判断是变量
					if (params.indexOf('{') != -1) {
						// 判断是requestParam还是pathVariable
						let paramName = ''
						if (params.indexOf('=') != -1) {
							paramName = params.slice(0, params.indexOf('=') + 1)
						}
						let param = params.slice(params.indexOf('{') + 1, params.indexOf('}'))
						let paramValue = that.item[param]

						// console.log('laozi jin lai le',param)
						// console.log('paramsValue',paramValue)
						// console.log('param',paramName + paramValue)

						return paramName + paramValue
						// 没有{ }，则判断为字符串
					} else {
						return params
					}
				}
			},

			// POST/PUT/DELETE请求参数封装
			packageParams(params) {
				const that = this
				let result = {}
				let pathVariable = ''
				let body = {}
				//参数格式： {}
				if (params.indexOf('=') === -1) {
					let pathVariableName = params.slice(1, params.indexOf('}'))
					pathVariable = that.item[pathVariableName]

					result['pathVariable'] = pathVariable
					return result

					//参数格式： {}?id={}
				} else if (params.indexOf('{') < params.indexOf('?')) {
					let pathVariableName = params.slice(1, params.indexOf('}'))
					pathVariable = that.item[pathVariableName]

					let bodyString = params.slice(params.indexOf('?') + 1)
					let bodyArray = bodyString.split('&')
					for (let i = 0; i < bodyArray.length; i++) {
						let key = bodyArray[i].slice(0, bodyArray[i].indexOf('='))
						let value = bodyArray[i].slice(bodyArray[i].indexOf('=') + 1)
						if (value.indexOf('{') === -1) {
							body[key] = value
						} else {
							body[key] = that.item[value.slice(1, value.indexOf('}'))]
						}
					}

					result['pathVariable'] = pathVariable
					result['body'] = body
					return result
					//参数格式： id={}&name={}
				} else {
					let bodyArray = params.split('&')
					for (let i = 0; i < bodyArray.length; i++) {
						let key = bodyArray[i].slice(0, bodyArray[i].indexOf('='))
						let value = bodyArray[i].slice(bodyArray[i].indexOf('=') + 1)
						if (value.indexOf('{') === -1) {
							body[key] = value
						} else {
							body[key] = that.item[value.slice(1, value.indexOf('}'))]
						}
					}

					result['body'] = body
					return result
				}
			},

			// 状态判断
			statusJudge(status) {
				if (status == true || status == 1) {
					return true
				} else {
					return false
				}
			},

			// 判断头像大小
			avatarSize() {
				// console.log('itemaaa ==', this.title)
				if (this.size == 'large') {
					return 'avatar-large'
				} else if (this.size == 'small') {
					return 'avatar-small'
				} else {
					return 'avatar-normal'
				}
			},


			// 判断图片大小
			imageSize() {
				// console.log('itemaaa ==', this.title)
				if (this.size == 'large') {
					return 'image-large'
				} else if (this.size == 'small') {
					return '.image-small'
				} else {
					return 'image-normal'
				}
			},

			// 判断title大小
			titleSize() {
				// console.log('itemaaa ==', this.title)
				if (this.size == 'large') {
					return 'title-large'
				} else if (this.size == 'small') {
					return 'title-small'
				} else {
					return 'title-normal'
				}
			},


			chackTagsValue(value) {

				if (!value) {
					return []
				}
				if (!Array.isArray(value)) {
					return [value]
				}
				return value
			},

      handleImgUrl(value) {
      	if(value && value !== '[]'){
      		let imgData = ''
      		if(value.indexOf('[') != -1){
      			imgData = JSON.parse(value)[0]
      			if(imgData.url){
      				imgData = imgData.url.indexOf('http') != -1 ?  imgData.url : `${globalConfig.endpoint}${imgData.url}`
      			}else{
      				imgData = imgData.indexOf('http') != -1 ? imgData : `${globalConfig.endpoint}${imgData}`
      			}
      		}else{
      			imgData = value.indexOf('http') != -1 ? value : `${globalConfig.endpoint}${value}`
      		}
      		return imgData
      	}else{
      		return ''
      	}
      }
		}
	}
</script>

<style lang="scss">

  .container {
    display: flex;
    flex-direction: column;
		background-color: #fff;
		border-radius: 12px;
		padding: 12px 0px 12px 12px;
		margin: 6px;
  }

	.base {
		display: flex;
		justify-content: space-between;
		align-items: center;
    margin-bottom: 8px;

		.left-box {
			display: flex;

			.image-box {
				display: flex;
				justify-content: center;
				margin-right: 12px;

				.image-large  {
					max-width: 80px;
					max-height: 80px;
					border-radius: 12px;
				}
				.image-normal  {
					max-width: 60px;
					max-height: 60px;
					border-radius: 12px;
				}

				.image-small {
					max-width: 40px;
					max-height: 40px;
					border-radius: 12px;
				}

				.avatar-large {
					max-width: 80px;
					max-height: 80px;
					border-radius: 40px;
				}

				.avatar-normal {
					max-width: 60px;
					max-height: 60px;
					border-radius: 30px;
				}

				.avatar-small {
					max-width: 40px;
					max-height: 40px;
					border-radius: 20px;
				}
			}

			.content-box {
				display: flex;
				flex-direction: column;

				.title-box {
					display: flex;
					align-items: center;

					.title-large {
						margin-right: 6px;
						font-size: 20px;
						font-weight: bold;
					}

					.title-normal {
						margin-right: 6px;
						font-size: 17px;
						font-weight: bold;
					}


					.title-small {
						margin-right: 6px;
						font-size: 15px;
						font-weight: bold;
					}

					.badge {
						margin-right: 12px;
						color: #1772b4;
						font-weight: bold;
					}

					.tag {
						display: flex;
						justify-content: center;
						align-items: center;
						color: #1772b4;
						background-color: rgba(23, 114, 180, 0.2);
						border-radius: 2px;
						font-size: 12px;
						padding: 0px 6px;
					}
				}

				.subtitle-box {
					display: flex;
					flex-direction: column;

					.subtitle {
						margin-bottom: 12px;
						font-size: 14px;
						color: #515151;
					}

					.tags-box {
						display: flex;
						flex-wrap: wrap;
						width: 180px;


						.tags {
							display: flex;
							margin: 2px;
							border-radius: 14px;
							background-color: #e6e6e6;
							color: #8a8a8a;
							padding: 2px 6px;
							font-size: 12px;
						}

					}
				}
			}
		}

		.right-box {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			.actions {
				display: flex;
				justify-content: flex-end;
				margin-bottom: 6px;

				.actions-img {
					width: 16px;
					height: 16px;
					border-radius: 10px;
					margin-right: 6px;
				}
			}

			.status {
				display: flex;
				justify-content: flex-end;
				margin: 0px 12px 0px 0px;
			}

			.button-on {
				display: flex;
				justify-content: center;
				align-items: center;
				// padding: 6rpx 12rpx;
				color: #f5f5dc;
				border-radius: 6px;
				background-color: #097bd0;
				margin: 6px 12px 6px 0px;
				font-size: 14px;
			}

			.button-off {
				display: flex;
				justify-content: center;
				align-items: center;
				// padding: 0rpx 10rpx;
				color: #f5f5dc;
				border-radius: 6px;
				background-color: #ee3f4d;
				margin: 6px 0px;
			}

			.textStyle {
				margin: 4px 6px;
			}

			.button-icon {
				width: 20px;
				height: 20px;
				margin-right: 6px;
			}
		}
	}

  .footer{
    margin-right: 12px;
    padding: 8px 0px 0px 0px;
    border-top: 1px solid #dedede;
    font-size: 30rpx;
  }
</style>
