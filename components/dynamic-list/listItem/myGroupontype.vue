<template>
  <view class="decorate-plan-item" v-if="item">
  	<view class="my-group" style="padding-bottom: 16rpx;">
  		<!-- <text class="group-text">装修方案</text> -->
  		<view class="productData">
  			<view class="productImg">
  				<image :src="handleImg(item.houseDecoratePlan.cover)" mode="widthFix"></image>
  			</view>
  			<view class="productContent">
  				<text class="productTitle">{{item.houseDecoratePlan.decorateStyleName}}</text>
  				<text class="productDsc">商家：{{item.houseDecoratePlan.merchant}}</text>
  			</view>
  			<!-- <view class="moreImg">
  				<image src="../../static/myimg/more.png" mode="widthFix"></image>
  			</view> -->
  		</view>
  		<view class="add-renovation-scheme">
  			<text class="label">地址：</text>
  			<text class="address-txt">{{item.houseAsset.address}}{{item.houseAsset.communityName}} {{item.houseAsset.buildingCode}} {{item.houseAsset.number}}</text>
  		</view>
  	</view>
  </view>
</template>

<script>
// import { handleImgUrl } from '@/utils/tools.js'
export default {
  name: "myGroupontypeItem",
  props: {
    item: Object,
    ext: Object
  },
  components: {},
  data () {
    return {
    }
  },

  methods: {
	
	//处理图片路劲
	handleImg(value){
		return handleImgUrl(value)
	},

  },

}
</script>

<style lang="scss" scoped>

	.decorate-plan-item{
		margin-bottom: 16rpx;
	}
	
	.my-group {
		// height: 220rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		
		.group-text {
			margin-left: 6px;
			color: #000000ad;
			font-size: 30rpx;
			font-weight: 700;
			padding-top: 10rpx;
		}
		
		.Content {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding-left: 8px;
			
			.title{
				padding: 10rpx 0;
				color: #000000;
				font-weight: bold;
				opacity: 0.8;
				font-size: 32rpx;
			}
			
			.txt{
				padding: 5rpx 0;
				color: #555555;
				font-size: 28rpx;
			}
		}
		
		.productData {
			display: flex;
			flex-direction: row;
			// height: 290rpx;
			background-color: #ffffff;
			margin-bottom: 16rpx;
			padding: 12rpx 16rpx 0 16rpx
		}
		
		.productImg {
			width: 150rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-items: center;
			
			image{
			  width: 150rpx;
			  height: 240rpx;
			  border-radius: 8px;
			}
		}
		
		.productContent{
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 25rpx;
			
			.productTitle {
			  color: #4b4c4cd9;
			  font-size: 32rpx;
			  font-weight: 600;
			}
			
			.productDsc {
			  color: #686b6bdb;
			  font-size: 30rpx;
			  margin-top: 10rpx;
			}
		}
		
		.moreImg{
			display: flex;
			height: 100%;
			align-items: center;
			
			image{
				width: 26px;
			}
		}
		
		.add-renovation-scheme{
			display: flex;
			flex-direction: row;
			padding: 20rpx 30rpx;
			background: #ffffff;
			font-size: 26rpx;
			color: #505050;
			
			.label{
				width: 50px;
			}
			
			.address-txt{
				flex: 1;
			}
			
		}
		
	}
</style>
