<template>
	<!-- app显示项 -->
	<view class="app-item">
		<!-- app图标，如果为 null 则使用默认图标 -->
		<image class="app-icon" :src="handleImg(item.icon) || defaultAppIcon"/>
		<!-- app名 -->
		<view class="app-name">{{item.name}}</view>
	</view>
</template>

<script>
	// import { handleImgUrl } from '@/utils/tools.js'
	export default {
		data() {
			return {
				// 没有app图标时显示该图片
				defaultAppIcon: `${this.$config.staticImgEndpoint}/2022/image/dajiang.png`,
			}
		},
		methods: {
			//处理图片路径
			handleImg: (value) => handleImgUrl(value)
		},
		props: {
			item: Object,
			index: Number
		}
	}
</script>

<style>
	/* app项 */
	.app-item {
		padding: 10rpx 0rpx 10rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 16rpx;
		flex-direction: column;
		height: 250rpx;
		width: 220rpx;
		border: 2rpx solid #cdcdcd;
		margin: 10rpx;
	}

	/* app图标 */
	.app-icon {
		width: 150rpx;
		height: 150rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin-bottom: 10rpx;
	}
	
	/* app名字 */
	.app-name {
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0rpx 10rpx 0rpx 10rpx;
	}

	/* 增加按钮 */
	.app-add {
		width: 80rpx;
		height: 80rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
	}
</style>
