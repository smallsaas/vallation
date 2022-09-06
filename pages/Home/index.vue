<template>
	<view class="autowx-comingSoon" style="justify-content: center;align-items: center;">
		<view class="autowx-title-white">欢迎使用 筑垒</view>
		<view class="autowx-subtitle-white">页面可视化配置小程序</view>
		<view class="autowx-button" hover-class="autowx-button-click" @click="goToMenu">开始使用</view>
	</view>
</template>

<script>
	export default {
		methods: {
			goToMenu(){
				uni.navigateTo({
					url: '/pages/Menu/index',
					// url: '/pages/DynamicApplets/ListApps',
				})
			}
		}
	}
</script>

<style>
</style>