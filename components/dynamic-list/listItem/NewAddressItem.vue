<template>
	<view class="item-address">
		<view class="address-main">
			<view class="user">

				<view class="first-left">
					<view class="communityName">{{ item.communityName }}</view>
					<view class="buildingCode">
						<view class="buildingCode-text">{{ item.buildingCode }}-</view>
						<view class="roomNumber-text">{{ item.roomNumber }}</view>
					</view>
				</view>
			</view>
			<view class="address">
				<view class="address-text">{{ item.address }}</view>
			</view>
		</view>
		<view v-if="!item.showStatus" class="select" @click="selectClick(item)">
			<image :src="clickStatus ? select_off : select_on" class="selectimg" />
		</view>
	</view>

</template>

<script>
	export default {
		name: "addressItem",
		props: {
			item: Object,
			ext: Object
		},
		data() {
			return {
				select_off: `${this.$config.staticImgEndpoint}/2022/svg/senior/address_off.svg?color=097bd0`,
				select_on: `${this.$config.staticImgEndpoint}/2022/svg/senior/address_on.svg?color=097bd0`,
				clickStatus: true,
				// assetId: assetId,
				// assetId:'',
			}
		},
		onLoad() {
			// console.log('order item == ', this.item)
		},
		onShow() {},
		methods: {
			async selectClick(item) {
				// this.clickStatus = !this.clickStatus
				let assetId = item.assetId
				item.showStatus = true
				let parma = {
					assetId: assetId
				}

				const res = await this.$api.getNewAddressItem(assetId, parma)
				if (res.code == 200) {
					uni.showToast({
						title: '添加成功',
						icon: "none"
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)

				} else {
					uni.showToast({
						title: res.message,
						icon: "none"
					})
				}
			}
		},


	}
</script>

<style lang="scss" scoped>
	.item-address {
		display: flex;
		flex-direction: row;
		width: 100%;
		color: #020203;
		font-size: 30rpx;
		padding-right: 0rpx;
		background-color: #f2f4f8;
		margin-bottom: 2px;
		margin-left: 8px;
		margin-top: 8px;
		border-top: 1px solid #F2F4F8;
	}

	.address-main {
		display: flex;
		flex-direction: column;
		padding: 8px;
		width: 80%;
		background-color: #ffffff;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		padding-bottom: 8px;
	}

	//第一行个人信息
	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 8px;
		border-bottom: #a6a6a620 solid 1px;

		.first-left {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 128px;
			height: 26px;

			//小区名
			.communityName {
				font-size: 12px;
				line-height: 10px;
				font-weight: bold;
				// min-width: 50px;
				margin-right: 8px;
			}


			//楼栋号和房间号整体
			.buildingCode {
				display: flex;
				flex-direction: row;
				width: 68px;
				align-items: center;
				font-size: 16px;
				line-height: 16px;
				font-weight: bold;

				//楼栋号
				.buildingCode-text {
					// margin-left: 2px;
				}

				//房间号
				.roomNumber-text {}
			}
		}
	}



	//第二行地址信息
	.address {
		display: flex;
		flex-direction: row;
		padding-bottom: 8px;
	}



	//地址详情
	.address-text {
		// margin-top: 20rpx;
		// display: flex;
		color: #a6a6a6;
		font-size: 13px;
		width: 100%;
		height: 30px;
		line-height: 36px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}



	.select {
		display: flex;
		justify-content: center;
		align-items: center;
		// position: fixed;
		right: 8px;
		width: 20px;
		// background-color: red;
		margin-left: 10px;
		// background-color: #f5f5f5;

		.selectimg {
			width: 20px;
			height: 100%;
		}
	}
</style>
