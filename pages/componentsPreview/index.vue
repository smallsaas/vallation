<template>
	<view class="base">
		<view class="componentContainer">
			<view class="tip-title">
				<text>ToggleItem组件</text>
			</view>
			<ToggleItem title="测试"></ToggleItem>
		</view>
	</view>
</template>

<script>
	import ToggleItem from '../wxcomponents/ToggleItem.vue'
	
	export default {
		components: {
			ToggleItem
		}
	}
</script>

<style lang="scss" scoped>
	.base {
		display: flex;
		flex-direction: column;
		padding: 6px;
		
		.tip-title {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 12px;
		}
		
		.componentContainer {
			display: flex;
			flex-direction: column;
			margin-bottom: 30px;
			background-color: rgba(255, 255, 255, 0.1);
			padding: 10px 10px;
			border-radius: 10px;
			box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
		}
	}
</style>