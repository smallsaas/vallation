<template>
	<view class="content" @click="goToPage">
		<view class="textContent">
			<!-- 左边颜色快 -->
			<view class="statusColor" :style="{backgroundColor:status===0? '#b987e1': status===1 ? '#DFE6ED' : '#FFFFFF'}"></view>
			
			<view class="clashInfo">
				<view class="user-info">
					<view class="user-name">
						{{item.name || '-'}}
					</view>
					<view class="userPhone">
						{{item.phone || '-'}}
					</view>
				</view>
				
				<view class="organization">
					{{item.organization || '-'}}
				</view>
				
			</view>
			<view class="complaintButton">
				<text v-if="status===0" style="color: #2C88D9;" >申请</text>
				<text v-if="status===1" style="color: #788896;" >拒绝</text>
				<text v-if="status===2" style="color: #788896;" >通过</text>
			</view>
		</view>
		<!-- 图片块 -->
		<!-- <view class="imageContent" v-if="certificateImage">
			<view class="thumbnail-box" v-for="(item,index) of certificateImage" :key="index" v-model="certificateImage">
				<image class="thumbnail" :src="item" @click="previewImage(item)" mode="aspectFit"></image>
			</view>
		</view>
		<view>
			<uni-popup ref="popupImage" maskBackgroundColor="rgba(0,0,0,0.9)">
				<view class="popup-box" @click="closePopup">
					<image :src="previewImageUrl" :style="{width: `${windowWidth}px`}" mode="widthFix"></image>
				</view>
			</uni-popup>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'userApplicationIntermediaryItem',
		data() {
			return {
				status:0,
				certificateImage:[],
				previewImageUrl:""
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		computed: {
			init(){
				this.initData()
			},
		},
		methods: {
			initData(){
				
				//处理图片列表
				// if(this.item.clashCertificate!=null && this.item.clashCertificate!=""){
				// 	this.certificateImage = this.item.clashCertificate.split(',')
				// }
				this.status= this.item.status || 0
			},
			// 点击预览
			previewImage(imageUrl) {
				console.log(imageUrl);
				this.previewImageUrl = imageUrl
				this.$refs.popupImage.open()
			},
			// 关闭预览
			closePopup() {
				this.$refs.popupImage.close()
			},
			
			goToPage(){
				const id = this.item.id;
				if(this.item.id!=null){
					uni.navigateTo({
						url:"/pages/sub/my/seniorConfig/userApplicationIntermediaryDetail"+"?id="+id
					})
				}
				
			}
		},
		mounted(){
			// console.log('this.item = ', this.item)
		},
	}
</script>

<style lang="less" scoped>
	.content{
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 16rpx;
		background-color: white;
		border-radius: 20rpx;
		
	}
	// 文字块
	.textContent{
		display: flex;
		flex-direction: row;
		align-items:center;
		justify-content:left;
		font-size: 30rpx;
		height: 70rpx;
	}
	
	.clashInfo{
		flex: 1;
		margin-left: 20rpx;
		margin-right: 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	.user-info{
		display: flex;
		flex-direction: row;
	}
	// 颜色状态
	.statusColor{
		width:2%;
		height: 60rpx;
	}
	.organization{
		// width: 33%;
		font-size: 28rpx;
	}
	.userPhone{
		// width: 33%; */
		margin-left: 12px;
	}
	.user-name{
		// width: 33%;
		font-weight:bold;
	}
	.complaintButton{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	// 图片块
	.imageContent{
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content:left;
	}
	// 缩略图容器
	.thumbnail-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 160rpx;
		width: 160rpx;
		overflow:hidden;
		border: 2rpx solid #f2f4f8;
		border-radius: 10rpx;
		background-color: white;
		margin: 8rpx 16rpx 0 0;
	}
	
	// 缩略图
	.thumbnail {
		max-height: 160rpx;
		max-width: 160rpx;
		
	}
</style>
