<template>
	<view class="btn-box">
		<image class="btn-img" :src="increase" ></image>
	</view>
</template>

<script>
	export default {
		name: 'createBtn',
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
		height: 52rpx;
		width: 172rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: #bfbfbf; */
		border: 4rpx dashed #cdcdcd;
		border-radius: 30rpx;
		margin: 28rpx 28rpx;
		
		.btn-img {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			height: 40rpx;
			width: 80rpx;
			/* background-color: #8F939C; */
			font-weight: bold;
		}
	}
</style>