<template>

  <view class="item-order">

    <!-- <view class="avatar view-space-between">
      <image mode="widthFix" :src="item.cover?endpoint + item.cover : ''" style="width : 100% "/>
    </view> -->
     <view class="font-size-small view-space-between inventory-number">{{ item.skuCode }}</view>
    <view class="font-size-normal view-space-between ">{{ item.productName }}</view>
    <view class="font-size-small" style="font-weight: 600; ">  {{item.quantity}}</view>


  </view>

</template>

<script>

import {globalConfig} from '@/config.js'

export default {

  name: "supplierInventoryItem",
  props: {
    item: Object,
    ext: Object
  },
  created() {
    // let children = this.item.orderItemRecordList;
    // children.map(item => {this.num += item.quantity ,console.log(this.num)})
  },
  data() {
    return {
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


.view-space-between {
  justify-content: space-between;
  display: inline-flex;
}

.avatar {
  margin-right: 3rpx;
  width: 40rpx;
  // height: 30rpx;
  // border: 1rpx solid rgb(192, 192, 192);
  // border-radius: 50%;
  overflow: hidden;
}

.avatar-img {
  width: 30rpx;
  height: 30rpx;
}


.font-size-normal {
  font-size: 26rpx;
}

.font-size-small {
  font-size: 24rpx;
}



</style>