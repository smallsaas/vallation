<template>
	<view class="btn-box">
		<image class="btn-img" :src="increase" ></image>
	</view>
</template>

<script>
	export default {
		name: 'addUserHouseTypeBtn',
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
		width: 272rpx;
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2rpx dashed #cdcdcd;
		border-radius: 30rpx;
		margin: 20rpx 20rpx;
		padding: 7px;
		
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