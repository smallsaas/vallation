<template>
	<view class="msg-sys">
			<!-- 用户名 -->
			<view class="user-name">
				<view></view>
			</view>
			
			<!-- 电话号码 -->
			<view class="msg-sys-title">
				<view class="msg-sys-text" >{{item.phoneNumber ? item.phoneNumber : '-'}}</view>
				<view class="user-name">{{item.username ? item.username : '-'}}</view>
				<view class="create-time">{{item.simpleTime}}</view>
			</view>
			
			
			<!-- 面积 -->
			<view class="area">
				<text style="color: #8F939C;font-size: 20rpx; width: 80rpx;">{{tip}}</text>
				<text style="font-weight:600;width: 70rpx;">  {{item.area}}  </text>
			</view>
	</view>
</template>
<script>
	export default {
		name:"temp3",
		props:{
			item: Object,
			ext: Object,
			routeParams: Object,
		},
		data(){
			return {
				// 根据状态修改提示标语
				tip: this.routeParams.type == 1 ? '出售方数' : '购买方数'
			}
		},
		methods:{
			
		},
		created() {
			
		}
	}
</script>

<style lang='scss'>
	.msg-sys{
		display: flex;
		flex-direction: row;
		border-radius: 15rpx;
		background-color: #ffffff;
		margin: 10rpx 10rpx 10rpx 10rpx;
		 height: 80rpx; 
		
		.msg-sys-text {
			font-size: 30rpx;
			overflow: hidden;
			display: -webkit-box; 
			text-overflow: ellipsis;
			word-break:break-all; 
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			color: #333333;
			margin: 10rpx;
		}
		
		.msg-sys-title {
			flex: 1;
			display: flex;
			align-items: center;
		}
		
		.area{
			margin-right: 5rpx;
			display: flex;
			align-items: center;
			float: left;
			text-align: center;
			
		}
		
		.user-name {
			margin-left: 8rpx;
			font-size: 30rpx;
			color: #333333;
		}
		
		.create-time {
			color: #8F939C;
			font-size: 20rpx;
			margin-left: 8rpx;
		}
	}
</style>