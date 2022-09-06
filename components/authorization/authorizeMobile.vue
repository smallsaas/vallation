<template>
	<view class="authorize_block">
		<button
		    class="login_but"
		    open-type="getPhoneNumber" 
		    @getphonenumber="handleGetPhoneNumber" 
		>
		    <slot></slot>
		</button>
	</view>
</template>

<script>
	import _ from 'lodash'
	import { globalConfig } from '@/config.js'
	export default {
		methods: {
			handleGetPhoneNumber (e) {
			    if (_.get(e, 'detail.errMsg') === 'getPhoneNumber:fail user deny') {
			        // uni.showToast({ title: '需授权手机才能进行换房操作', icon: 'none' })
			    } else {
					uni.showLoading({ title: '授权中...', mask: true })
					const { code } = e.detail
					let userInfoCache = this.$cache("userInfo") || {}
					const query = {
						phoneToken: code,
						userId: _.get(userInfoCache, 'userId'),
						app: 1
					}
					this.$api.getPhoneNumber(query).then(res=>{
						uni.hideLoading()
						console.log('获取手机号 == ', res)
						uni.showToast({ title: `授权${res.code === 200 ? '成功' : '失败'}`, icon: 'none' })
						if(res.code === 200){
							userInfoCache = {
								...userInfoCache,
								type: _.get(res, 'data.type'),
								typeList: _.get(res, 'data.typeList'),
								phone: _.get(res, 'data.phone')
							}
							this.$cache("userInfo", userInfoCache)
							uni.setStorageSync(globalConfig.tokenStorageKey, _.get(res, 'data.accessToken'))
						}
						this.$emit('onOK', res.code === 200)
					})
				}
			}
		}
	}
</script>

<style lang='less'>
	.authorize_block {
		width: 100%;
		.login_but {
			width: 100%;
			height: 100%;
			padding: 0;
			background-color: transparent;
			border: none;
			border-radius: 0;
			color: transparent;
			display: flex;
			align-items: center;
			&::after {
				border: none;
			}
		}
	}
</style>