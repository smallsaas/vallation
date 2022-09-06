<template>
	<view class="renovation-scheme-item" >
		<view class="floorBlue">
			<text class="floorBluetext">{{ item.decorateStyleName }}方案</text>
		</view>
		<view class="item-content">
			<image class="plan-image" :src="handleImg(item.cover)" mode="widthFix"></image>
			
			<view class="item-content-txt">
				<view class="Businessman">
					<text class="Businessmantext">商家：{{ item.merchant }} </text>
				</view>
				<view class="Star">
					人气： <text class="Startext">{{ item.star }}</text>
				</view>
				<view class="totalPrice">
					总价：<text class="totalPricetext">{{ item.totalBudget }} </text>
				</view>
			</view>
		</view>
		<view class="footer-content">
			<!-- <view class="selectAddress" v-if="text == 'A'"> 安装地址:<text>广州市黄埔区开泰大道与科丰路交汇 处（万达旁）大壮名城G3栋308室</text>
			</view> -->
			<view class="detailedAddress">
				<text class="detailedAddress-text" @click="showUseConfirm(item.decorateStyleName)">使用此方案</text>
			</view>
		</view>
	</view>
</template>

<script>
	// import { handleImgUrl } from '@/utils/tools.js'
	export default {
		name:'renovationSchemeItem',
		data(){
			return {
				type: ''
			}
		},
		created() {
			this.type = this.routeParams.type
			console.log('this.type = ', this.type)
		},
		props:{
			item:Object,
			routeParams:Object
		},
		methods:{
			//处理图片路劲
			handleImg(value){
				return handleImgUrl(value)
			},
			
			showUseConfirm(tipsTxt){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定使用${tipsTxt}方案吗？`,
					success: function (res) {
						if (res.confirm) {
							that.useScheme()
						} else if (res.cancel) {
						}
					}
				});
			},
			
			useScheme(){
				
				const assetId = this.routeParams.assetId
				const query = {
					decoratePlanId: this.item.id,
					assetId: assetId
				}
				
				let method = 'POST'
				if(this.type == 'edit'){
					method = 'PUT'
				}
				
				this.$api.addRenovationScheme(query, method).then(res => {
					if(res.code == 200){
						uni.showToast({
							title: '使用成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1500)
					}else{
						uni.showToast({
							title: '使用失败'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
		.renovation-scheme-item {
			color: #505050;
			background-color: #ffffff;
			margin-bottom: 16rpx;
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			padding-bottom: 0;
			
			.floorBlue {
				padding: 12px 8px;
				
			}
				
			.floorBluetext {
				font-size: 32rpx;
				font-weight: 600;
			}
			
			.item-content{
				display: flex;
				flex-direction: row;
			}
			
			.plan-image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 3px;
			}
			
			.item-content-txt{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 20rpx;
			}
				
			.Businessman {
			}
				
			.Businessmantext {
				font-size: 13px;
				
			}
				
			.Star {
				font-size: 13px;
			}
				
			.Startext {
				font-size: 18px;
				color: #ff0000;
			}
				
			.totalPrice {
				font-size: 14px;
				
			}
				
			.totalPricetext {
				font-size: 18px;
				color: #bf0000;
			}
				
			.selectAddress {
				width: 96%;
				height: 40px;
				background-color: #ffffff;
				border-radius: 8px;
				text-align: center;
				font-size: 14px;
				
			}
			
			.footer-content{
				display: flex;
				justify-content: center;
				padding: 20rpx 0;
			}
				
			.detailedAddress {
				width: 100%;
				text-align: center;
				border-radius: 8px;
				text-align: center;
			}
				
			.detailedAddress-text {
				font-size: 30rpx;
				color: #418FF4;
			}
				
			.arrowsimg {
				width: 26px;
				height: 26px;
			}
			
		}
	
		
</style>