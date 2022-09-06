<template>
	<view class="btn-box">
		<image class="btn-img" :src="increase" ></image>
	</view>
</template>

<script>
	export default {
		name: '',
		data(){
			return {
				increase: `${this.$config.staticImgEndpoint}/2022/image/myhouse/increase.svg`,
			}
		},
		props: {
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

<style lang="scss" scoped>
	.btn-box {
			padding: 10rpx 0rpx 10rpx 0rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			border-radius: 16rpx;
			flex-direction: column;
			height: 250rpx;
			width: 230rpx;
			border: 2rpx solid #cdcdcd;
			margin: 10rpx;
					
		.btn-img {
			width: 80rpx;
			height: 80rpx;
			font-size: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
		}
	}
</style>