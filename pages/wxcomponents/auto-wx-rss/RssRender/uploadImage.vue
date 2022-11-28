<template>
	<!-- 自定义上传图片 -->
	<view class="image-upload">
		<!-- 图片缩略图 -->
		<view class="thumbnail-box" v-for="(imgItem, imgIndex) of imgList" :key="imgIndex">
			<image class="thumbnail" :src="echoImage(imgItem)" @click="previewImage(imgItem)" mode="aspectFit"></image>
			<image class="delete-icon" :src="deleteIcon" @click="deleteImage(imgIndex, itemIndex, imgItem.id)"></image>
		</view>
		<view class="add-image-box" @click="upoadingImage()" v-if="list.length < size">
			<image :src="addIcon" class="add-image" />
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		props:{
			list: Array,
			bindField: String,
			itemIndex: [Number,String],
			size: {
				type: Number,
				default: function(){
					return 9
				}
			}
		},
		data(){
			return {
				addIcon: `${this.$config.staticImgEndpoint}/2022/svg/plus.svg`, //增加图片按钮图标
				deleteIcon: `${this.$config.staticImgEndpoint}/2022/svg/x-circle-fill.svg`, //删除图片按钮图标
				imgList:[]
			}
		},
		computed:{
			init(){
				if(this.bindField){
					this.imgList = this.bindImgData(this.list, this.bindField)
				}
			}
		},
		methods:{
			bindImgData(list, bindField){
				const newList = []
				list.map(item => {
					newList.push(item[bindField])
				})
				return newList
			},
			echoImage(value) {
				let echoImageUrl = `${_.has(value, 'url') ? value.url : value}`
				if(echoImageUrl.indexOf('http') != -1){
					return echoImageUrl
				}
				return `${this.$config.endpoint}${echoImageUrl}`
			},
			previewImage(value) {
				let img = `${_.has(value, 'url') ? value.url : value}`
				let imgsArray = []
				if(img.indexOf('http') != -1){
					imgsArray = [`${_.has(value, 'url') ? value.url : value}`]
				}else{
					imgsArray = [`${this.$config.endpoint}${_.has(value, 'url') ? value.url : value}`]
				}
				
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			// 上传图片
			upoadingImage(){
				let that = this
				uni.chooseImage({
					count:1,
					success: async function(res) {
						// 上传成功后获取图片本地路径列表
						let imagePaths = res.tempFilePaths
						// 遍历获取列表
						for(let i = 0 ; i < imagePaths.length ; i++){
							let imagePath = imagePaths[i]
							let webPath = await that.$upload('/api/u/fs/uploadfile',imagePath)
							that.imgList.push(webPath)
							that.$emit('uploadAction', webPath, that.itemIndex)
						}
						
					},
					fail: async function(res){
						console.log('上传失败或者被取消：',res)
						// uni.showToast({
						// 	title: '上传失败',
						// 	icon:'error'
						// })
					}
				})
				
			},
			// 删除图片
			deleteImage(picIndex){
				this.imgList.filter((pitem, pindex) => pindex != picIndex)
				this.$emit('deleteAction', picIndex, this.itemIndex)
			},
		}
	}
</script>

<style lang="scss">
	//图片容器
	.image-upload {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		background-color: #fff;		
		margin: 8px 0;
	}
	
	// 缩略图容器
	.thumbnail-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 190rpx;
		width: 190rpx;
		margin: 15rpx;
		position: relative;
	}
	
	// 删除图标
	.delete-icon {
		height: 50rpx;
		width: 50rpx;
		right: -25rpx;
		top: -25rpx;
		position: absolute;
		background-color: #fff;
		border-radius: 50%;
	}
	
	// 缩略图
	.thumbnail {
		max-height: 190rpx;
		max-width: 190rpx;
	}
	
	// ‘增加图片’容器
	.add-image-box {
		margin: 15rpx;
		width: 186rpx;
		height: 186rpx;
		border: 2rpx dashed #e6e6e6;
		display: flex;
		justify-content: center;
		align-items: center;
	
		//‘增加图片’图标
		.add-image {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>