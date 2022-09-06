<template>
	<view class="content">
		<view class="title" >
			{{_get("code")}}
		</view>
		<view class="item" style="margin-top: 8px;" >
			<image :src="tickIcom" class="svg-css"/>
			<text>{{_get("floors")}} 层</text>
		</view>
		<view class="item" >
			<image :src="tickIcom" class="svg-css"/>
			<text>{{_get("units")}} 单元</text>
		</view>
		<view class="item" >
			<image :src="tickIcom" class="svg-css"/>
			<text>第{{_get("issue")}}期</text>
		</view>
	</view>
</template>
<script>
	import _ from 'lodash'
	export default {
		name: 'userBuildingItem',
		data(){
			return {
				tickIcom: `${this.$config.staticImgEndpoint}/2022/svg/tick.svg`
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		computed: {

		},
		methods: {
			_get(field){
				// console.log(`${field}===`, _.get(this.item, field, '-'))
				return _.get(this.item, field, '-')
			},
			changeBg(){
				if(this.index > this.bgList.length){
					return this.bgList[this.index%this.bgList.length]
				}else{
					return this.bgList[this.index]
				}
			}
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less" scoped>
	.content {
		// height: 52rpx;
		width: 170rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 4rpx solid #cdcdcd;
		border-radius: 8rpx;
		margin: 20rpx 20rpx;
		padding: 7px;
		
		.title {
			min-width: 75rpx;
			font-weight: bold;
			font-size: 30rpx;
			padding: 6rpx 10rpx;
			background: #2C88D9;
			text-align: center;
			border-radius: 18px;
			color: #ffffff;
		}
		
		.item {
			width: 150rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 28rpx;
			color: #293845;
			font-weight: bold;
			
			.svg-css{
				width: 25px;
				height: 25px;
			}
		}
	}
</style>
