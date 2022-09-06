<template>
	<view class="cust-page-title" :style="{height: statusBarHeight + 'px'}">
		<view class="cust-page-title-content"> {{title}} </view>
	</view>
</template>

<script>
	
	export default {
		name:'titleBar',
		props:{
			title: {
				type: String,
				default: ''
			}
		},
		data(){
			return {
				statusBarHeight: this.$statusBarHeight
			}
		},
		mounted() {
		},
	}
</script>

<style lang="scss" scoped>
	.cust-page-title{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #F8F8F8;
		z-index: 999;
		line-height: 1;
		
		.cust-page-title-content {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			font-size: 30rpx;
			position: relative;
			bottom: 25rpx;
		}
		
	}
</style>