<template>

  <view class="item-order">

    <view class="order-header">
      <view>
        <view class ="view-space-between"> 订单编号：</view>
        <view class = "order-number view-space-between">{{ item.orderNumber }} </view>
      </view>
       <view style = "text-align: right;">
         <view class="avatar view-space-between">
           <image mode="widthFix" :src="item.avatar" style="width : 100% " />
         </view>
         <view class ="view-space-between display-mid">{{item.userName}}</view> 
         <view style = "font-weight: 300; ">  {{item.userPhone || '无联系电话'}}</view>
      </view>
      
      <!-- <view class="order-status main-color">{{ handleStatus(item.status)}}</view> -->
    </view>
    <view class="order-body">
      <!-- item good -->

      <view class="item-good">
        <block v-for="(childItem, index) in item.orderItemRecordList">
<!--          <image class="cover" :src="childItem.cover ? endpoint + childItem.cover : ''" v-if="index < 3"></image>-->
          <view class="good-right" v-if="index < 1">
            <view class="good-name">
              <view>{{ childItem.productName }}</view>
              <view class="good-body">
                <view class="money-number">￥{{ childItem.costPrice }}</view>
                <view class="item-quantity">x {{ childItem.quantity || 1 }} </view>
              </view>

            </view>
          </view>
        </block>
      </view>

    </view>
    <view class="item-foot">
      <view class="total-price">
       <view>地址： {{ item.detail || ''}} </view> 

      </view>

      <view class="total-price">
        <view>总价：</view>
        <view class="money-height">￥ {{ item.totalPrice }}</view>
      </view>
    </view>
  </view>

</template>

<script>

import {globalConfig} from '@/config.js'

export default {

  name: "supplierItem",
  props: {
    item: Object,
    ext: Object
  },
  created(){
    let children = this.item.orderItemRecordList;
    children.map(item => {this.num += item.quantity ,console.log(this.num)})
  },
  data() {
    return {
      num : 0,
      endpoint: this.$config.endpoint
    }
  },
  onLoad() {
    // console.log('order item == ', this.item)
  },
  methods: {
    handleStatus(value) {
      const statusMap = this.$orderStatusMap
      return statusMap[value]
    },
    goToOrderDetail() {
      uni.navigateTo({
        url: `/pages/sub/order/orderDetail?orderId=${this.item.id}`
      })
    }
  }
}

</script>

<style lang="scss">

.display-mid{
  vertical-align:top;
}

.view-space-between{
  justify-content: space-between;
  display: inline-block;
}

.avatar{
  margin-right: 3rpx;
  width: 30rpx;
  height: 30rpx;
  border: 1rpx solid rgb(192, 192, 192);
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img{
  width: 30rpx;
  height: 30rpx;
}

.order-body{
  font-size: 26rpx;
  color: #333333;
}



.order-header {
  display: flex;
  flex-direction: row;
 // padding: 10rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #333333;
  justify-content: space-between;
  /*border-bottom: 2rpx solid #F2F2F2;*/
}

.order-number{
  font-size: 26rpx;
}

.item-good {
  display: flex;
  flex-direction: row;
  // padding: 20rpx;
  background-color: #FFFFFF;
  border-top: 2rpx solid #F2F2F2;
}

.good-name {
  color: #333333;
    display: flex;
  justify-content: space-between;
}

.good-body{
  text-align:right;
}
.money-number {
  color: #333333;
  //font-weight:600;
}

.item-quantity{
   font-weight:400;
}


.money-height {
  color: #050505;
  font-weight:900;
  font-size: 31rpx;
}

.item-order {
  padding-left: 3%;
  padding-top: 1%;
  padding-right: 1%;
  font-size: 30rpx;
  height: 100%;
  color: #999999;
  background-color: #fff;
  margin-top: 8px;
}



.order-status {
  margin: auto;
  margin-right: 20rpx;
}



.item-good image {
  width: 150 rpx;
  height: 150 rpx;
}

.good-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 30 rpx;
}



/*.good-right text {
  display: block;
}*/
.description {
  flex: 1;
  margin-left: 20 rpx;
}

.number-view {
  display: flex;
  justify-content: space-between;
  /*width: 150rpx;*/
}

.number-view text {
  display: block;
  text-align: right;
  line-height: 60 rpx;
}

.total_price {
  text-align: right;
  padding: 20 rpx;
  border-bottom: 2 rpx solid #ccc;
}

.total_price text {
  color: red;
  font-size: 36 rpx;
}

.button-view {
  display: flex;
  flex-direction: row;
  margin: 15 rpx 0;
}

.button-view button {
  margin-right: 20 rpx;
  font-size: 30 rpx;
  padding: 10 rpx 20 rpx;
  line-height: 1.5
}

.payment {
  margin-left: 20 rpx;
  margin-right: 20 rpx;
  background-color: #7A44A0;
  color: #FFFFFF;
  margin: auto;
}

.item-foot {
  display: flex;
  justify-content: space-between;
  font-size: 30 rpx;
  border-top: 2 rpx solid #F2F2F2;
  border-bottom: 2 rpx solid #F2F2F2;
  padding: 16 rpx 30 rpx;
  align-items: center;
}

.total-price {
  display: flex;
  margin-left: 50 rpx;
  align-items: center;
}

.total-price view {
  font-size: 36 rpx;
}

.foot-btn {
  display: flex;
  justify-content: flex-end;
}

.item-btn {
  width: 160 rpx;
  border: 2 rpx solid #cccccc;
  text-align: center;
  padding: 6 rpx 0;
  border-radius: 16 rpx;
  font-size: 26 rpx;
  margin: 16 rpx 0;
  margin-right: 30 rpx;
  /* color: #505050; */
}
</style>