<template>
	<view class="content" >
		<view class="textContent" @click="toUploadCertificate">
			<!-- 左边颜色快 -->
			<view class="statusColor" :style="{backgroundColor:status===0?'#b987e1':'#dfe6ed'}">
			</view>
			
			<view class="clashInfo">
				<!-- 小区名 -->
				<view class="communityName">
					{{item.houseAssetModel.communityName}}
				</view >
				<!-- 楼栋房号 -->
				<view class="roomCode">
					{{item.houseAssetModel.buildingCode}}-{{item.houseAssetModel.number}}
				</view>
				
				<!-- 电话号码 -->
				<view class="userPhone">
					{{item.userPhone}}
				</view>
			</view>
			<!-- 申诉按钮 -->
			<view class="complaintButton">
				<view v-if="item.solveStatus === 0" class="">
					<text class="compaintT">申诉</text>
				</view>
				<view v-if="item.solveStatus === 1" style="color: #788896;">
					<text>已确认</text>
				</view>
				<view v-if="item.solveStatus === 2" style="color: #788896;">
					<text>拒绝</text>
				</view>
			</view>
		</view>
		<!-- 图片块 -->
		<view class="imageContent" v-if="certificateImage">
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
		</view>
	</view>
</template>

<script>
	export default {
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
			changeBg(){
				if(this.status===0){
					console.log("状态0");
					return "background-colo: #dfe6ed";
				}else{
					return "background-colo: #b987e1";
				}
			}
		},
		methods: {
			initData(){
				
				//处理图片列表
				if(this.item.clashCertificate!=null && this.item.clashCertificate!=""){
					this.certificateImage = this.item.clashCertificate.split(',')
				}
				if(this.item.solveStatus!=null && this.item.solveStatus===0){
					this.status=0
				}else if(this.item.solveStatus!=null && this.item.solveStatus===1){
					this.status=1
				}else if(this.item.solveStatus!=null && this.item.solveStatus===2){
					this.status=2
				}
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
			// 跳转上传页面
			toUploadCertificate(){
				console.log("touploadCertificate被点击")
				const id = this.item.id;
				console.log(id)
				if(this.item.id!=null){
					uni.navigateTo({
						url:"/pages/sub/my/seniorConfig/uploadCertificate"+"?id="+id
					})
				}
				
			}
		},
		mounted(){
			console.log('this.item = ', this.item)
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
		height: 60rpx;
		line-height:60rpx;
	}
	
	.clashInfo{
		width: 84%;
		margin-left: 10rpx;
		margin-right: 30rpx;
		display: flex;
		flex-direction: row;
		align-items:center;
		justify-content:left;
	}
	// 颜色状态
	.statusColor{
		width:2%;
		height: 60rpx;
	}
	.communityName{
		width: 33%;
	}
	.userPhone{
		width: 33%;
	}
	.roomCode{
		width: 33%;
		font-weight:bold;
	}
	.complaintButton{
		width: 15%;
	}
	.compaintT{
		border:none;
		outline:none;
		color:#ff0000;
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
