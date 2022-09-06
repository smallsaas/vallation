<template>
	<view class="rent-house-item">

		<view class="item-data">
			<view class="item-img"  @click="handleViewVr(item)">
				<image class="cover" :src="handleImg(item.rentCover)" mode="widthFix"></image>
				<view class="vr-img">
					<image :src="overview"></image>
				</view>
			</view>
			<view class="item-content" @click="gotoDetail(item.id)">
				<text class="title">
					{{item.rentTitle}}
				</text>
				<text class="dsc">
					{{item.houseType}}
				</text> 
				<view class="tags">
					<view class="tag" v-for="(tag, index) in JSON.parse(item.extra).tags" :key="index">
						{{tag.tagName}}
					</view>
				</view>
				<view class="rent-price">
					<text>{{item.rentPrice}}</text>
					<text style="font-size: 16rpx;margin-left: 15rpx;">元/月</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import {
	// 	handleImgUrl
	// } from '@/utils/tools.js'
	export default {
		name: "rentHouseItem",
		data() {
			return {
				overview: `${this.$config.staticImgEndpoint}/2022/svg/badge-vr.svg`,
			}
		},
		created() {},
		props: {
			item: Object,
			options: Object
		},
		methods: {
			//处理图片路劲
			handleImg(value) {
				return handleImgUrl(value)
			},
			
			gotoDetail(id){
				///pages/rentHouse/rentHouseDetail?id
				uni.navigateTo({
					url: `/pages/sub/rentHouse/rentHouseDetail?id=${id}`
				})
			},
			
			handleViewVr(data) {
				const url = data.link || data.vrLink
				if (!url) {
					return
				}
				uni.navigateTo({
					url: `/pages/vr/webview?url=${encodeURIComponent(JSON.stringify(url))}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rent-house-item {
		// background-color: #ffffff;
		display: flex;
		flex-direction: column;
		margin-bottom: 10rpx;

		.item-data {
			display: flex;
			flex-direction: row;
			background-color: #ffffff;
			// margin-top: 16rpx;
			margin-bottom: 16rpx;
			padding-top: 15rpx;
			padding-left: 15rpx;
			padding-bottom: 15rpx;
		}

		.item-img {
			width: 240rpx;
			height: 100%;
			display: flex;
			position: relative;
			align-items: flex-start;
			justify-items: center;

			.cover {
				width: 240rpx;
				height: 240rpx;
				border-radius: 8px;
				margin-left: 8px;
			}

			.vr-img {
				position: absolute;
				top: 0;
				right: 0;
				margin: 0;
				padding-left: 5px;
				padding-right: 5px;
				width: 24px;
				height: 16px;
				border-radius: 3px;
				image {
					background-color: rgba(255, 255, 255, 0.8);
					width: 90%;
					height: 100%;
				}
			}
			// .vr-link {
			// 	font-size: 16px;
			// 	color:rgb(126, 126, 126);
			// 	padding: 10rpx 20rpx;
			// 	position: absolute;
			// 	top: 10rpx;
			// 	right: 5rpx;
			// 	font-size: 20rpx;
			// 	background: rgba(255,255,255,0.8);
			// 	border-radius: 15px;
				
			// }
		}

		.item-content {
			display: flex;
			flex-direction: column;
			padding: 0 25rpx;

			.title {
				color: #181818d9;
				font-size: 33rpx;
				font-weight: 700;
				overflow: hidden;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;

			}

			.dsc {
				color: #808282d9;
				font-size: 25rpx;
				font-weight: 500;
				margin-top: 15rpx
			}

			.tags {
				margin-top: 15rpx;
				display: table;

				.tag {
					background-color: #f2f3f9;
					padding-top: 8rpx;
					padding-left: 12rpx;
					padding-right: 12rpx;
					padding-bottom: 8rpx;
					border-radius: 10rpx;
					font-size: 24rpx;
					display: table-cell;
					vertical-align: middle;
				}
			}

			.rent-price {
				font-size: 40rpx;
				font-weight: 800;
				margin-top: 26rpx;
				color: crimson;

			}

			.wx-info {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.wx-info image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}

			.wx-info-content {
				display: flex;
				flex-direction: column;
				margin-left: 8px;
			}

			.wx-info-content-txt {
				color: #686b6bad;
				font-size: 24rpx;
			}
		}

	}
</style>
