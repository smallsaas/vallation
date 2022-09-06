<template>
	<view>
		<!-- 图片块 -->
		<view class="imageContent">
			<view class="thumbnail-box" v-model="certificateImage">
				<image class="thumbnail" :src="url" @click="previewImage()" mode="aspectFit"></image>
			</view>
		</view>
		<uni-popup ref="popup" maskBackgroundColor="rgba(0,0,0,0.9)">
			<view class="popup-box" @click="closePopup">
				<image :src="url" :style="{width: `${windowWidth}px`}" mode="widthFix"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:'imageCombination',
		props: {
			url: {
				type: String,
				default: ''
			}
		},
		computed:{
			showImg(){
				if(this.url){
					// this.previewImage()
				}
			}
		},
		data(){
			return {
				windowWidth: uni.getSystemInfoSync().windowWidth ,//获取页面宽度
			}
		},
		methods:{
			// 点击预览
			previewImage(){
				this.$refs.popup.open()
			},
			// 关闭预览
			closePopup(){
				this.$refs.popup.close()
			},
		}
	}
</script>

<style lang="scss" scoped>
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
		// margin: 8rpx 16rpx 0 0;
	}
	
	// 缩略图
	.thumbnail {
		max-height: 160rpx;
		max-width: 160rpx;
		
	}
</style>