<template>
	<view class="item">
		<button :class="[`btn ${handleBg(item.option)}`]"  @click="goToPage()"
			:style="item.spacer ? `margin-bottom: ${item.spacer}px`:''"
		>
			<text>{{item.label}}</text>
		</button>
	</view>
</template>

<script>
	import _ from 'lodash'
	import qs from 'qs'
	import { formatQueryUrl, formatApiParams } from '@/components/utils/compxTools.js'
	export default {
		name: "defaultItem",
		props: {
			item: Object,
		},
		data() {
			return {
				bgMap:{
					'default': 'defaultBg',
					'warning': 'delete-button',
					'outline': 'outlineBg',
					'disabled': 'disabledBg'
				},
				
			}
		},
		methods: {
			//按钮背景色
			handleBg(value){
				return this.bgMap[value]
			},
			//跳转页面
			goToPage(){
				// console.log('this.item',this.item)
				
				let navString = this.item.navigation
				if(navString){
					let subMethod, hasSpace = false;
					if(navString.indexOf(' /') != -1){
						subMethod = navString.split(' /')[0]
						hasSpace = true
					}else{
						subMethod = navString.split('/')[0]
						hasSpace = false
					}
					if(['post', 'put'].includes(subMethod.toLowerCase())){
						const method = subMethod
						if(hasSpace){
							subMethod += ' '
						}
						navString = navString.substring(subMethod.length, navString.length)
						const api = this.handleUpdateApiUrl(navString, _.get(this.item, 'data', {}), method)
					} else if(subMethod.toLowerCase() == 'delete'){
						if(hasSpace){
							subMethod += ' '
						}
						navString = navString.substring(subMethod.length, navString.length)
						const api = this.handleDeleteApiUrl(navString, _.get(this.item, 'data', {}))
						this.comfirnDelete(api)
					}else{
						this.$emit('closePop','')
						const pathString = formatQueryUrl(navString, _.get(this.item, 'data', {}))
						uni.navigateTo({
						  url: pathString
						})
					}
				}else{
					this.showTips('跳转失败', 'error')
				}
				
			},
			handleUpdateApiUrl(api, data, method){
				const apiStringList = api.split('?')
				const pathString = formatApiParams(apiStringList[0], data)
				const query = this.handleQueryData(apiStringList[1], data)
				this.comfirnUpdate(pathString, query, method)
			},
			handleQueryData(queryString, data){
				const qsObj = qs.parse(queryString)
				const bindData = {}
				Object.keys(qsObj).map(key => {
					bindData[key] = data[qsObj[key]] || qsObj[key]
				})
				return bindData
			},
			//处理删除API
			handleDeleteApiUrl(api, data){
				let apiUrlString = api
				if(apiUrlString.indexOf('?') != -1){
					const apiUrl = apiUrlString.split('?')[0]
					const query = apiUrlString.split('?')[1]
					apiUrlString = `${apiUrl}/${data[query]}`
				}else if(apiUrlString.indexOf('<') != -1){
					apiUrlString = formatApiParams(apiUrlString, data)
				} else {
					return apiUrlString
				}
				return apiUrlString
			},
			//确认修改提示框
			comfirnUpdate(api, query, method){
				const that = this
				uni.showModal({
					title: '提示',
					content: this.item.tips || `确定进行修改操作吗？`,
					success: function (res) {
						if (res.confirm) {
							that.requestAction(api,query,method)
						} else if (res.cancel) {
						}
					}
				});
			},
			//确认删除提示框
			comfirnDelete(api){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定删除吗？`,
					success: function (res) {
						if (res.confirm) {
							that.requestAction(api,{},'DELETE')
						} else if (res.cancel) {
						}
					}
				});
			},
			//访问操作
			requestAction(api, query={}, method='GET'){
				const that = this
				uni.showLoading({ title:'', mask: true })
				uni.request({
					url: `${that.$config.endpoint}${api}`,
					header: {
						'content-type': 'application/json',
						'Authorization': `Bearer ${uni.getStorageSync(`${that.$config.tokenStorageKey}`) || ''}`,
					},
					data: query,
					method: method,
					success(res) {
						// console.log('res=== ', res)
						uni.hideLoading()
						if (res.statusCode == 200) {
							
							that.showTips('操作成功', 'success')
							setTimeout(() => {
								if(!that.item.noReset){
									that.$emit('closePop','')
								}
							}, 1000)
						} else {
							that.showTips(res.data.message)
						}
					},
					fail(err) {
						uni.hideLoading()
						console.log('操作失败 == ', err)
					}
				})
			},
			showTips(message, icon='none'){
				
				uni.showToast({
					title: message,
					icon: icon
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$defaultColor: #2C88D9;
	$warningColor: #AE3549;
	.item {
		margin-bottom: 4px;
		
		.outlineBg{
			background-color: #ffffff;
			border: 2rpx solid $defaultColor;
			color: $defaultColor;
		}
		
		.warningBg{
			background-color: $warningColor;
			color: #fff;
		}
		
		.defaultBg{
			background-color: $defaultColor;
			color: #fff;
		}
		
		.disabledBg{
			background-color: #C2CFD7;
			color: #fff;
		}
		
		.btn{
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 10rpx 40rpx;
			border-radius: 6rpx;
			// background-color: #418FF4;
			font-size: 30rpx;
			font-weight: bold;
		}
	}

	
</style>
