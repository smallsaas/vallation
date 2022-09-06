<template>
	<view class="autowx-comingSoon">
		<!-- 带返回按钮的顶部标题栏 -->
		<view class="menu-titleBar">
			<image class="goback" @click="goback" src="../../static/svg/goBack.svg"></image>
		</view>

		<!-- 菜单栏 列表样式-->
		<view>
			<view class="menu-container" v-for="(menuItem,menuIndex) of menu" :key="index">
				<view class="menu-item" @click="goToPage(item.path)" hover-class="menu-item-click" v-for="(item,index) of menuItem">
					{{item.title}}
				</view>
			</view>
		</view>

		<!-- 菜单栏 九宫格样式-->
		<!-- <view>
			<view class="menu-container">
				<view class="menu-item" hover-class="menu-item-click" v-for="(item,index) of menu">
					{{item.title}}
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 菜单数据
				menu: [
					[{
						title: '设计',
						path: ''
					},
					{
						title: '资源页面',
						path: ''
					},
					{
						title: '录入表单',
						path: ''
					},],

					[{
						title: '动态小程序',
						path: '/pages/DynamicApplets/ListApps'
					},
					{
						title: '动态页面',
						path: ''
					},],

					[{
						title: '标准页面入库',
						path: ''
					},
					{
						title: '标准组件入库',
						path: ''
					},
					{
						title: '标准属性入库',
						path: ''
					}]
				]
			}
		},
		methods: {
			// 退回上一页
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			// 路由到下一页
			goToPage(path){
				uni.navigateTo({
					url: `${path}`
				})
			},
		}
	}
</script>

<style lang="scss">
	/* 标题栏 */
	.menu-titleBar {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 55px;
		margin-bottom: 20px;

		// 回退按钮
		.goback {
			width: 30px;
			height: 30px;
		}
	}

	// 菜单容器
	.menu-container {
		// 九宫格样式
		// display: grid;
		// grid-template-columns: repeat(3, 1fr);
		// grid-gap: 30px 10px;
		// padding: 10px;

		display: flex;
		flex-direction: column;
		margin-bottom: 30px;
		background-color: rgba(255, 255, 255, 0.1);
		padding: 10px 10px;
		border-radius: 10px;
		box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);

		/* 菜单项 */
		.menu-item {
			// 九宫格样式
			// display: flex;
			// justify-content: center;
			// align-items: center;
			// border-radius: 10px;
			// height: 130px;
			// background-color: rgba(255, 255, 255, 0.5);
			// box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);

			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			border-radius: 10px;
			background-color: rgba(255, 255, 255, 0.3);
			height: 50px;
			margin: 5px 0px;
		}

		// 点击样式
		.menu-item-click {
			// 九宫格样式
			// display: flex;
			// justify-content: center;
			// align-items: center;
			// border-radius: 10px;
			// height: 150px;
			// background-color: rgba(255, 255, 255, 0.1);

			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.1);
			height: 50px;
			margin: 5px 0px;
		}
	}
</style>
