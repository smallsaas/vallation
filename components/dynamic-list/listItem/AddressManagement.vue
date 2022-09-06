<template>
	<view class="item-address">
		<view class="address-main">
			<view class="user">

				<view class="first-left">
					<view class="communityName">{{ item.community }}</view>
					<view class="buildingCode">
						<view class="buildingCode-text">{{ item.buildingCode }}-</view>
						<view class="roomNumber-text">{{ item.roomNumber }}</view>
					</view>
				</view>

				<view class="first-right">
					<!-- <view class=" "> -->
					<view class="name">{{ item.userName }}</view>
					<view class="phone">{{ item.userPhone }}</view>

					<!-- </view> -->
				</view>
				<!-- <view class="edit" @click="goToEdit()">
					<image :src="edit" class="editimg" />
				</view> -->
				<!-- <text class="default" v-if="item.isDefault==1">默认地址</text> -->
			</view>
			<view class="address">
				<view class="address-text">{{ item.address }}</view>
			</view>
		</view>

		<!-- <view class="delete">
			<image :src="deleteimg" class="deleteimg" />
		</view> -->
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
				edit: `${this.$config.staticImgEndpoint}/2022/svg/edit.svg`,
				deleteimg: `${this.$config.staticImgEndpoint}/2022/svg/delete.svg`,
			}
		},
		onShow(){
			console.log('order item == ', this.item)
		},
		onLoad() {
			console.log('order item == ', this.item)
		},
		methods: {
			//修改个人信息页面
			goToEdit() {
				// console.log('ddd')
				uni.navigateTo({
					url: "/pages/sub/address/ModifyInformation"
				})
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
		width: 90%;
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
			width: 118px;
			height: 26px;

			//小区名
			.communityName {
				font-size: 12px;
				line-height: 10px;
				font-weight: bold;
				min-width: 50px;
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
				margin-left: 3px;

				//楼栋号
				.buildingCode-text {
					// margin-left: 2px;
				}

				//房间号
				.roomNumber-text {}
			}
		}
	}


	.first-right {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding-right: 10px;

		.name {
			font-size: 14px;
			line-height: 20px;
			height: 20px;
			max-width: 70px;
			overflow: hidden;
			//超出之后，显示的形式，这儿是省略号
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.phone {
			// margin-left: 20px;
			font-size: 13px;
			line-height: 20px;
			width: 76px;
			color: #a6a6a6;
			margin-left: 6px;
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
		display: flex;
		color: #a6a6a6;
		font-size: 13px;
		width: 100%;
		height: 30px;
		line-height: 36px;
	}

	// .default {
	// 	margin: auto;
	// 	margin-right: 0;
	// 	background-color: red;
	// 	padding: 10rpx;
	// 	border-radius: 10rpx;
	// 	font-size: 24rpx;

	// }

	.delete {
		display: flex;
		justify-content: center;
		align-items: center;
		// position: fixed;
		right: 8px;
		width: 18px;
		margin-left: 4px;
		// background-color: #f5f5f5;

		.deleteimg {
			width: 20px;
			height: 100%;
		}
	}




	.edit {

		height: 20px;

		.editimg {
			width: 18px;
			height: 16px;
		}

	}


	// .img image {
	// 	width: 30rpx;
	// 	height: 30rpx;
	// }
</style>
