<template>
	
	<view class="item-order">
		<view  @click="goToOrderDetail()">
			
	      <view class="order-header">
	        <view>订单编号：{{ item.orderNumber}}</view>
	        <view class="order-status main-color">{{ handleStatus(item.status)}}</view>
	      </view>
	      <view class="goods">
			  <!-- item good -->
	        <view class="item-good" >
				<block v-for="(childItem, index) in item.orderItemRecordList">
	              <image class="cover" :src="childItem.cover ? endpoint + childItem.cover : ''"  v-if="index < 3"></image>
				  <view class="good-right" v-if="index < 1">
					<view class="good-name">{{childItem.productName}}</view>
					<view class="number-view">
					  <view class="main-color">￥{{childItem.costPrice}}</view>
					  <view>x {{childItem.quantity || 1}}</view>
					</view>
				  </view>
				</block>
	        </view>
			
	      </view>
	      <view class="item-foot">
	        <!-- <view>共 0 件商品</view> -->
	        <view class="total-price">
	          <view>总价：</view>
	          <view class="main-color">￥ {{item.totalPrice}}</view>
	        </view>
	      </view>
		</view>
	      <view class="foot-btn">
	        <block v-if="item.status=='CREATED_PAY_PENDING'">
	          <view class="item-btn" >取消订单</view>
	          <view class="item-btn main-bg" >去付款</view>
	        </block>
	        <block v-else-if="item.status=='CONFIRMED_DELIVER_PENDING'">
	          <view class="item-btn">立即退款</view>
	          <view class="item-btn">提醒发货</view>
	        </block>
	 
	        <block v-else-if="item.status=='CLOSED_PAY_TIMEOUT'">
	          <view class="item-btn" >删除订单</view>
	        </block>
	
	        <block v-else="item.status=='DELIVERED_CONFIRM_PENDING'">
	          <!-- <view class="item-btn" catchtap="openPage" data-url="./apply-back?order_number={{item.order_number}}" data-order-number="{{item.order_number}}" data-operation="service" data-index="{{index}}" data-order-number="{{item.order_number}}">申请售后</view> -->
	          <view class="item-btn">退款</view>
	          <view class="item-btn" >查看物流</view>
	          <view class="item-btn" >确认收货</view>
	        </block>
	
	        <!-- TODO评价暂时隐藏 -->
	        <block v-if="false">
	          <view class="item-btn" >评价</view>
	        </block>
	      </view>
	    </view>
	
</template>

<script>
	
	import { globalConfig } from '@/config.js'
	
	export default {
		
		name: "orderItem",
		props: {
			item: Object,
		    ext: Object
		},
		data(){
			return {
				endpoint: this.$config.endpoint
			}
		},
		onLoad() {
			// console.log('order item == ', this.item)
		},
		methods:{
			handleStatus(value){
				const statusMap = this.$orderStatusMap 
				return statusMap[value]
			},
			goToOrderDetail(){
				uni.navigateTo({
					url: `/pages/sub/order/orderDetail?orderId=${this.item.id}`
				})
			}
		}
	}
	
</script>

<style lang="scss">
	.item-order {
		font-size: 30rpx;
		height: 100%;
		color: #999999;
		background-color: #fff;
		margin-top: 8px;
	}
	.order-header {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		font-size: 28rpx;
		/*border-bottom: 2rpx solid #F2F2F2;*/
	}
	.order-status {
		margin: auto;
		margin-right: 20rpx;
	}
	.item-good {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid #F2F2F2;
	}
	.item-good image {
		width: 150rpx;
		height: 150rpx;
	}
	.good-right {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 30rpx;
	}
	.good-name {
		color: #333333;
	}
	/*.good-right text {
		display: block;
	}*/
	.description {
		 flex: 1;
		 margin-left: 20rpx;
	}
	.number-view {
		display: flex;
		justify-content: space-between;
		/*width: 150rpx;*/
	}
	
	.number-view text {
		display: block;
		text-align: right;
		line-height: 60rpx;
	}
	.total_price {
		text-align: right;
		padding: 20rpx;
		border-bottom: 2rpx solid #ccc;
	}
	.total_price text {
		color: red;
		font-size: 36rpx;
	}
	.button-view {
		display: flex;
		flex-direction: row;
		margin: 15rpx 0;
	}
	.button-view button {
		margin-right: 20rpx;
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		line-height: 1.5
	}
	.payment {
		margin-left: 20rpx;
		margin-right: 20rpx;
		background-color: #7A44A0;
		color: #FFFFFF;
		margin: auto;
	}
	
	.item-foot {
		display: flex;
		justify-content: flex-end;
		font-size: 30rpx;
		border-top: 2rpx solid #F2F2F2;
		border-bottom: 2rpx solid #F2F2F2;
		padding: 16rpx 30rpx;
		align-items: center;	
	}
	.total-price {
		display: flex;
		margin-left: 50rpx;
		align-items: center;
	}
	.total-price view{
		font-size: 36rpx;
	}
	.foot-btn {
		display: flex;
		justify-content: flex-end;
	}
	.item-btn {
		width: 160rpx;
		border: 2rpx solid #cccccc;
		text-align: center;
		padding: 6rpx 0;
		border-radius: 16rpx;
		font-size: 26rpx;
		margin: 16rpx 0;
		margin-right: 30rpx;
		/* color: #505050; */
	}
</style>