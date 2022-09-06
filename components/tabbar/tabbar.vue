<template>
	<view class="uni-tabbar">
		<view class="uni-tabbar-item" v-for="(item, index) in tabbar" :key="index" @tap="changeTab(item)">
			<view class="uni-tabbar-bd">
				<view class="uni-tabbar-icon">
					<image v-if="item.pagePath == pagePath" class="icon-img" mode="aspectFit" :src="validateHttp(item.selectedIconPath)" />
					<image v-else class="icon-img" mode="aspectFit" :src="validateHttp(item.iconPath)" />
				</view>
			</view>
			<view class="uni-tabbar-label" :class="{ active: item.pagePath === pagePath }">{{ item.text }}</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
// import { isHttpOrHttps } from '@/utils/replace.js';
export default {
	props: {
		// 当前页面路径
		pagePath: {
			type: String,
			required: true
		},
		// tabbar 底部导航栏数据
		tabbar: {
			type: Array,
			required: true
		}
	},
	computed: {
		...mapGetters(['tabBarList'])
	},
	// watch: {
	// 	pagePath: {
	// 		handler(val) {
	// 			// console.log('pagePath监听===val', val);
	// 		},
	// 		immediate: true
	// 	}
	// },
	methods: {
		// 检验拼接url地址
		validateHttp(url) {
			return url;
		},
		changeTab(item) {
			this.page = item.pagePath;
			uni.switchTab({ url: this.page });
			this.$emit('onTabTap');
		}
	}
};
</script>

<style lang="scss" scoped>
	$font-size-sm: 24rpx;
	$color: #393939;
.uni-tabbar {
	position: fixed;
	bottom: 0;
	z-index: 50;
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
	box-sizing: border-box;
	border-top: solid 1rpx #dddddd;
	background-color: #fff;

	.uni-tabbar-item {
		width: 25%;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.uni-tabbar-icon {
		height: 64rpx;
	}

	.icon {
		display: inline-block;
	}

	.uni-tabbar-label {
		line-height: 24rpx;
		font-size: $font-size-sm;
		color: $color;

		&.active {
			font-weight: 600;
		}
	}

	.icon-img {
		width: 64rpx;
		height: 64rpx;
	}
}
</style>

