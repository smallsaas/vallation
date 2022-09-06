<template>
	<!-- 外边框 -->
	<view class="item">
		<!-- 左边个人房屋信息 -->
		<view class="item-personal">
			<!-- 房号 -->
			<view class="RoomNumber">{{item.buildingCode}}-{{item.number}}
				<view class="button" @click="goToAddReplacement()">修改意向</view>
			</view>
			<!-- 地址 -->
			<view class="address">
				<view class="address-a">
					<text>{{item.communityName}}</text>
				</view>
				<view class="address-b">
					<text>{{item.houseType}}</text>
				</view>
			</view>
		</view>

		<!-- 右边意向信息 -->
		<view class="item-intention" @click="goToMatching(item.id)">
			<!-- 查看结果 -->
			<view class="checkResult">查看结果...</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'replacementItem',
		props: {
			item: Object,
			ext: Object,
		},
		data() {
			return {
				// 图片路径
				switchicon: `${this.$config.staticImgEndpoint}/2022/image/dealSquare/switch.svg`,
			}
		},
		methods: {
			goToMatching() {
				uni.navigateTo({
					url: `/pages/ResourceReplacement/matching`
				})
			},
			goToAddReplacement() {
				uni.navigateTo({
					url: `/pages/ResourceReplacement/addReplacement`
				})
			}
		},
		onLoad() {

		},
		created() {

		}
	}
</script>

<style>
	.item {
		display: flex;
		background-color: #ffffff;
		height: 160rpx;
		margin: 10rpx;
		border-radius: 16rpx;
		padding: 8rpx;
		flex-wrap: nowrap;
	}

	.item-personal {
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.RoomNumber {
		display: flex;
		align-items: center;
		font-size: 70rpx;
		height: 130rpx;

	}

	.address {
		font-size: 20rpx;
		display: flex;
	}

	.item-intention {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex: 1;
	}
	
	.address-a {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30rpx;
		width: 88rpx;
		border: solid;
		border-radius: 8rpx;
		border-color: orange;
		border-width: 1rpx;
		color: orange;
	}

	.address-b {
		color: #8F939C;
		margin-left: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.replacementButton {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 130rpx;
		height: 50rpx;
		border-radius: 12rpx;
		color: white;
		background-image: linear-gradient(to right, #04befe, #3f86ed);
		font-size: 26rpx;
		margin-left: 12rpx;
	}

	.checkResult {
		color: #8F939C;
	}
</style>
