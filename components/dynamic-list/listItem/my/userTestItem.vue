<template>
	<view class="item">
		<view class="mainImg">
			<image class="icon" :src="item.avatar || defaultAvatar" />
		</view>
		<view class="item-txt">
			<view class="item-title-txt">
				<text class="name">{{item.name || '-'}}</text>
			</view>
			<text class="phone">{{item.phone || '-'}}</text>
		</view>
		<view  class="del-btn" @click="showDelConfirm">
			深度删除
		</view>
		
	</view>
</template>
<script>
	import _ from 'lodash'
	export default {
		name: 'communityChildrenTypeItem',
		data(){
			return {
				defaultAvatar: `${this.$config.staticImgEndpoint}/2022/image/default-avatar.png`
			}
		},
		props: {
			item: Object
		},
		computed: {

		},
		methods: {
			showDelConfirm(){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定删除 ${this.item.name} 用户吗？`,
					success: function (res) {
						if (res.confirm) {
							that.delUserData()
						} else if (res.cancel) {
						}
					}
				});
			},
			delUserData(){
				this.$api.delUserDataById(this.item.id).then(res => {
					if(_.get(res, 'code') === 200){
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
						setTimeout(()=>{
							this.$emit('refresh')
						}, 1000)
					}else{
						uni.showToast({
							title: '删除失败',
							icon: 'error'
						})
					}
				})
			}
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less" scoped>
	.item{
		min-height: 140rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
		// justify-content: center;
		margin-bottom: 2rpx;
		padding: 0 12rpx;
		
		.mainImg{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 110rpx;
			.icon {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
		
		.item-txt{
			flex: 1;
			min-width: 220rpx;
			display: flex;
			flex-direction: column;
			
			.item-title-txt{
				display: flex;
				align-items: center;
			}
		}
		
		.name{
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
			margin-right: 10px;
		}
		
		.phone{
			font-size: 28rpx;
			color: #7E8D9B;
		}
		
		.del-btn{
			font-size: 30rpx;
			padding: 10rpx 20rpx;
			border-radius: 20px;
			font-weight: bold;
			margin: 2px;
			background-color: #4B5C6B;
			color: #ffffff;
		}
		
	}
</style>
