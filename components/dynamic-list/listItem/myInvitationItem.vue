<template>
	<view class="item" v-if="item.childrenId">
		<view class="mainImg">
			<image class="icon" :src="item.childrenAvatar || defaultAvatar" mode="widthFix"/>
		</view>
		<view class="item-txt">
			<text class="name">{{item.childrenName || '-'}} ({{item.childrenCounts || '0'}})</text>
			<text class="phone">{{item.childrenPhone || '-'}}</text>
			<!-- <view class="children-count">
				团队: {{item.childrenCounts || '0'}}
			</view> -->
		</view>
		
	</view>
</template>
<script>
	export default {
		name: 'myInvitationItem',
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
			changeBg(type){
				if(type != null && type >= 0){
					if(this.typeMap[type]){
						return this.typeMap[type].styles
					}
				}else {
					return {'backgroundColor': '#cccccc', 'color': '#000000'}
				}
			},
			changeTyleName(type){
				if(type != null && type >= 0){
					if(this.typeMap[type]){
						return this.typeMap[type].name
					}
				} else {
					return '未设置'
				}
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
		// align-items: center;
		justify-content: flex-start;
		margin-bottom: 2rpx;
		padding: 12rpx 12rpx;
		
		.mainImg{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 110rpx;
			.icon {
				width: 80rpx;
				height: 80rpx;
				// height: 42rpx;
				border-radius: 50%;
			}
		}
		
		.item-txt{
			// flex: 1;
			min-width: 220rpx;
			display: flex;
			flex-direction: column;
		}
		
		.name{
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
		}
		
		.phone{
			font-size: 28rpx;
			color: #7E8D9B;
			margin: 4px 0;
		}
		
		.children-count{
			font-size: 28rpx;
			color: #7E8D9B;
		}
		
	}
</style>
