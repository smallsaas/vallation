<template>
	<view class="contain">
		<view class="component-box">
			<view class="dot"></view>
			<view class="component-type">
				{{item.componentType}}
			</view>
			<view class="component-name">{{item.name}}</view>
		</view>
	</view>
	
</template> 

<script>
	export default {
		data(){
			return {
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		computed: {
	
		},
		methods: {
			
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less">
	.dot{
		width: 30rpx;
		height: 30rpx;
		background-color: #96c3ec;
		border-radius: 50%;
		 margin-right: 20rpx;
	}
	.contain{
		margin: 20rpx 10rpx;
	}
	.component-box{
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: center;
	}
	.component-type{
		padding: 16rpx 24rpx;
		border-radius: 48rpx;
		line-height: 24rpx;
		font-size: 24rpx;
		margin-right: 20rpx;
		border: 2rpx solid #ced4d9;
	}
	.component-name{
		font-weight: 600;
	}
</style>