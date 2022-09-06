<template>
	<view class="content">
		<image-combination :url="handleImg(item.image)"></image-combination>
		<view class="del" @click="confirmDel">
			<image :src="delIcon"  />
		</view>
	</view>
</template>
<script>
	// import {
	// 	handleImgUrl
	// } from '@/utils/tools.js'
	import imageCombination from '@/components/imageCombination'
	export default {
		name: 'userBuildingItem',
		components:{
			imageCombination
		},
		data(){
			return {
				delIcon: `${this.$config.staticImgEndpoint}/2022/image/delete-icon.png`,
			}
		},
		props: {
			item: Object,
		},
		computed: {

		},
		methods: {
			//处理图片路劲
			handleImg(value) {
				return handleImgUrl(value)
			},
			confirmDel(){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定删除此海报吗？`,
					success: function (res) {
						if (res.confirm) {
							that.del()
						} else if (res.cancel) {
						}
					}
				});
			},
			del(){
				const id = this.item.id
				this.$api.delBannerItem(id).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:"删除成功",
							icon:'none'
						})
						this.$emit('refresh')
					}else{
						uni.showToast({
							title:"删除失败",
							icon:'none'
						})
					}
				})
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
		position: relative;
		
		.del{
			position:absolute;
			top: -7px;
			right: -8px;
			width: 25px;
			height: 25px;
			background-color: #ffffff;
			image{
				width: 25px;
				height: 25px;
			}
		}
	}
</style>
