<!-- 个人换房报告列表item -->
<template>
	<view class="item">

		<!-- 我的房屋 -->
		<view class="my-house">
			<!-- 根据不同楼栋号显示对应的色块 -->
			<view v-if="myBuiding == 'B1'" class="colorLump-B1"></view>
			<view v-else-if="myBuiding == 'B2'" class="colorLump-B2"></view>
			<view v-else-if="myBuiding == 'B3'" class="colorLump-B3"></view>
			<view v-else-if="myBuiding == 'B4'" class="colorLump-B4"></view>
			<view v-else-if="myBuiding == 'B5'" class="colorLump-B5"></view>
			<view v-else-if="myBuiding == 'B6'" class="colorLump-B6"></view>
			<view v-else-if="myBuiding == 'B7'" class="colorLump-B7"></view>
			<view v-else-if="myBuiding == 'B8'" class="colorLump-B8"></view>
			<text class="myHouse-address">{{item.owner.buildingCode}}-{{item.owner.number}}</text>
		</view>
		
		<image class="separator" :src="api"></image>
		
		<!-- 匹配到的房屋 -->
		<view class="matching-house">
			<!-- 根据不同楼栋号显示对应的色块 -->
			<view v-if="matchingBuiding == 'B1'" class="colorLump-B1"></view>
			<view v-else-if="matchingBuiding == 'B2'" class="colorLump-B2"></view>
			<view v-else-if="matchingBuiding == 'B3'" class="colorLump-B3"></view>
			<view v-else-if="matchingBuiding == 'B4'" class="colorLump-B4"></view>
			<view v-else-if="matchingBuiding == 'B5'" class="colorLump-B5"></view>
			<view v-else-if="matchingBuiding == 'B6'" class="colorLump-B6"></view>
			<view v-else-if="matchingBuiding == 'B7'" class="colorLump-B7"></view>
			<view v-else-if="matchingBuiding == 'B8'" class="colorLump-B8"></view>
			<text class="matchingHouse-address">{{item.matcher.buildingCode}}-{{item.matcher.number}}</text>
		</view>
	</view>
	
</template>
<script>
	export default {
		name: "matchingItem",
		props: {
			item: Object,
		},
		data() {
			return {
				api:`${this.$config.staticImgEndpoint}/2022/image/myhouse/switch.svg`,
				myBuiding: this.item.owner.buildingCode,
				matchingBuiding: this.item.matcher.buildingCode
			}
		},
		onLoad() {
		
		},
		methods: {

		},
		created() {
		
		},
		onShow() {
			
		}
	}
</script>

<style lang='scss'>
	.item {
		display: flex;
		border-radius: 16rpx;
		background-color: #ffffff;
		margin: 10rpx 10rpx 10rpx 10rpx;
		height: 80rpx;
		justify-content: space-between;
		padding: 12rpx;
	}
	
	.my-house {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.myHouse-address {
		font-weight: 500;
		margin-left: 12rpx;
		/* width: 168rpx; */
	}
	
	.separator {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		width: 80rpx;
		height: 80rpx;
	}
	
	.matching-house {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	
	.matchingHouse-address {
		/* width: 168rpx; */
		font-weight: 500;
		margin-left: 12rpx;
	}
	
	/* ⬇️⬇️⬇️ 楼栋对应色块 ⬇⬇️⬇️ */
	.colorLump-B1 {
		background-color: #ee2e27;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	
	.colorLump-B2 {
		background-color: #ff9a00;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	.colorLump-B3 {
		background-color: #dce334;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	
	.colorLump-B4 {
		background-color: #2ecc22;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	
	.colorLump-B5 {
		background-color: #1087a3;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	
	.colorLump-B6 {
		background-color: #1dcbd2;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	
	.colorLump-B7 {
		background-color: #871dd2;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	
	.colorLump-B8 {
		background-color: #ed1acc;
		width: 50rpx;
		height: 10rpx;
		border-radius: 8rpx;
	}
	/* ⬆️⬆️⬆️️ 楼栋对应色块 ⬆️⬆️⬆️️ */
	
	
</style>
