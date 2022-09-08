<template>
	<view class="content">
		<view class="title" >
			{{_get("title")}}
		</view>
		<view class="describe">
			{{item.pageDescrip==null?"":item.pageDescrip}}
		</view>
	</view>
</template>
<script>
	import _ from 'lodash'
	export default {
		name: 'allPageItem',
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
			},
			
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less" scoped>
	.content {
		height: 200rpx;
		width: 170rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border: 4rpx solid #cdcdcd;
		border-radius: 8rpx;
		margin: 20rpx 20rpx;
		padding: 7px;
		
		.title {
			width: 150rpx;
			// max-width: 170rpx;
			// min-width: 75rpx;
			height: 80rpx;
			font-weight: bold;
			font-size: 30rpx;
			padding: 6rpx 10rpx;
			text-align: left;
			word-break: break-all;
			
			 overflow: hidden; 
			  text-overflow: ellipsis;
			  display: -webkit-box; 
			  -webkit-box-orient: vertical;
			  -webkit-line-clamp: 2; 
		}
		
		.describe {
			width: 150rpx;
			height: 90rpx;
			font-size: 24rpx;
			line-height: 24rpx;
			padding: 6rpx 10rpx;
			text-align: left;
			word-break: break-all;
			
			overflow: hidden;
			 text-overflow: ellipsis;
			 display: -webkit-box; 
			 -webkit-box-orient: vertical;
			 -webkit-line-clamp: 4; 
			
		}
	}
</style>
