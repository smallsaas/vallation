<template>
	     <view class="selected-all">
				<view :style="{
					width:'100%',
					height:'30rpx',
					position:'relative'}">
					<view class="img">
						<image class="dropdown-icon" 
							:src="downchange" 
							:style="{width:'30rpx',height:'30rpx'}"
						/>
					</view>
				</view>
				<view :style="{height:'10rpx',width:'100%'}"></view>
				<!-- <view class="dialog-view"> -->
				    <view class="rectangle">
						<view
							 :class="choiceIndex ==index ?'dialog-title-selected':'dialog-title'"
							 v-for="(item,index) in choiceList" @click="btnChoiceClick(index)">
							<view class="floor">{{item}}</view>
						</view>
					</view>
				<!-- </view> -->
				<view :style="{height:'10rpx',width:'100%'}"></view>
				<view :style="{
					width:'100%',
					height:'30rpx',
					position:'relative'}">
					<view class="img1">
						<image class="dropdown-icon" 
							:src="pulldown" 
							:style="{width:'30rpx',height:'30rpx'}"
						/>
					</view>
				</view>
	    </view>
</template>

<script>
	export default {
		name:"ChoiceSelected",
		props:{
			choiceList:Array,
		},
		data() {
			return {
				pulldown:`${this.$config.staticImgEndpoint}/2022/image/dealSquare/pulldown.svg?color=BFBFBF`,
				downchange:`${this.$config.staticImgEndpoint}/2022/image/dealSquare/downchange.svg?color=BFBFBF`,
				choiceIndex:-1,

			};
		},
		computed:{
			init(){
				// console.log('choiceList222222 == ',this.choiceList)
			}
		},
		mounted(){
			// console.log('choiceList222222 == ',this.choiceList)
		},
		methods:{
			btnChoiceClick(index){
				this.choiceIndex = index
				this.$emit('clickFloor',index+1)
			},
		}
	}
</script>

<style lang="less" scoped>
	.selected-all{
		position: relative;
		background-color: #ffffff;
		height:515rpx;
		width: 100%;
		padding: 0rpx 20rpx;
		border-radius: 50rpx;
		box-shadow: 0 0px 4px rgba(0, 0, 0, 0.20);
		box-sizing: border-box;
	}
	.img{
		position: absolute;
		top:6rpx;
		left: 10rpx;
	}
	.img1{
		position: absolute;
		bottom:-6rpx;
		left: 10rpx;
	}
	.dialog-view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
	.rectangle{
		overflow:scroll; 
		height: 425rpx;
	}
	.dialog-title-selected{
		color:#12b7f5;
		margin: 15rpx 0;
		font-size: 28rpx;
	}
	.dialog-title{
		margin: 15rpx 0;
		color:black;
		font-size: 28rpx;
	}
	.floor{
		display: flex;
		justify-content: center;
	}
</style>