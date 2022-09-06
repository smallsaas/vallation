<template>
	
	<view class="roomNumber">
		<!-- 平层 -->
		<view class="room-num-content final" v-if="item.assetFlag == 1">
			<text>{{item.houseNumber||'-'}}</text>
			<text class="houseNumber final_hm_txt">[{{item.number || '-'}}]</text>
		</view>
		<!-- 复式 -->
		<view class="room-num-content multi" v-else-if="item.assetFlag == 2">
			<text>{{item.houseNumber||'-'}}</text>
			<text class="houseNumber multi_hm_txt">[{{item.number || '-'}}]</text>
		</view>
		<!-- 无效 -->
		<view class="room-num-content invalid" v-else-if="item.assetFlag == 0">
			<text>{{item.houseNumber||'-'}}</text>
			<text class="houseNumber invalid_hm_txt">[{{item.number || '-'}}]</text>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'assetItem',
		props:{
			item: Object
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.roomNumber {
		/* display: grid; */
		font-size: 32rpx;
		font-weight: 600;
		border: 2rpx solid #e6e6e6;
		
		.room-num-content {
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			height: 70rpx;
			width: 156rpx;
			position: relative;
			padding: 6px;
		}
		
		/* 无效 */
		.invalid {
			color: #C2CFD7;
			background-color: #C2CFD7;
		}
		
		.invalid_hm_txt{
			font-weight: 300;
			font-size: 28rpx;
		}
		
		/* 平层 */
		.final {
			color: #2C88D9;
			background-color: #ffffff;
		}
		
		.final_hm_txt{
			color: #788896;
			font-weight: 300;
			font-size: 28rpx;
		}
		
		/* 复式 */
		.multi{
			background-color: #2C88D9;
			color: #ffffff;
		}
		
		.multi_hm_txt{
			font-weight: 300;
			font-size: 28rpx;
		}
		
		.houseNumber{
			position: absolute;
			top: 2px;
			right: 8px;
		}
	}
	
</style>