<template>
	<view :style="{marginTop:item.groupFirst ? '20rpx' : '0rpx'}">
		<view class="magic_item_container"
			@click="navigationUrl(item.nav || item.url)"
			:style="[container || {}]">
			  <view class="magic_item" :style="[item.container || {}]">
					<image :src="imageUrl" v-if="item.img" mode="aspectFit" class="image" :style="[item.size || {}]"></image>
					<view class="title" :style="{color:container.textColor}">{{item.title}}</view>
					<view><image class="enter" :src="arrow" ></image></view>
			  </view>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	import qs from 'qs'
	import { globalConfig } from '@/config.js'
	export default {
		name:'RowItem',
		props: {
			item: {
				type: Object,
				default: function () {
					return {}
				}
			},
			container:{
				type: Object,
				default: function () {
					return {}
				}
			},
		},
		computed:{
			imageUrl(){
				const imgUrl = this.item.img
				if(this.item.color){
					const color = this.item.color.slice(1)
					return imgUrl+'?color='+color
				}
					return imgUrl
			}
		},
		data(){
			return{
				icon:null,
				arrow:`${this.$config.staticImgEndpoint}/2022/svg/Router/enter.svg`,
			}
		},
		methods: {
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			navigationUrl (str) {
				uni.navigateTo({
					url:str
				})
			},
		}
	}
</script>

<style lang="less">
	.magic_item_container {
		// transition: all .2s;
		// background-color: white;
		.magic_item {
			border-bottom: 1rpx solid #f4f4f4;
			display: flex;
			justify-content: flex-start;
			border-radius: 6rpx;
			padding: 10rpx 30rpx;
			position: relative;
			align-items: center;
			.image {
				width: 20px;
				height: 20px;
			    border-radius: 50%;
				padding: 0 20rpx;
				vertical-align: middle;
			}
			>.title {
				font-size: 30rpx;
				text-overflow: ellipsis;
			    white-space: wrap;
				line-height: 70rpx;
				text-align: center;
			    overflow: hidden;
			}
		}
	}
	.enter{
		width: 12px;
		height: 12px;
		position: absolute;
		top:18px;
		right:40rpx;
		
	}
	.magic_item_container:active {
		// background-color: #f2f2f2;
		.magic_item{
			opacity: .7;
			transition: all .2s;
		}
	}
</style>
