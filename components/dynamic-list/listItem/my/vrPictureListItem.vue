<template>
	<view class="content">
		<image-combination :url="handleImg(item.snapshot)"></image-combination>
		<view class="del" @click="showItemPopup">
			<image :src="delIcon"  />
		</view>
		<view class="text_name">{{_get(item, 'name')}}</view>
		<view class="unshelves" v-if="item.status === 0">
			<img :src="unshelvesIcon"/>
		</view>
		
		
		<uni-popup ref="itemPopup">
			<view class="popup-content">
				
				<view class="item" style="margin-bottom: 16px;">
					<button :class="[`btn outlineBg`]"  @click="showConfirm(item)" v-if="item.status === 0">
						<text>上架</text>
					</button>
					<button :class="[`btn outlineBg`]"  @click="showConfirm(item)" v-if="item.status === 1">
						<text>下架</text>
					</button>
				</view>
				
				<view class="item">
					<button :class="[`btn outlineBg`]"  @click="goToPage">
						<text>编辑</text>
					</button>
					<button :class="[`btn delete-button`]"  @click="confirmDel">
						<text>删除</text>
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	// import {
	// 	handleImgUrl
	// } from '@/utils/tools.js'
	import imageCombination from '@/components/imageCombination'
	export default {
		name: 'vrPictureListItem',
		components:{
			imageCombination
		},
		data(){
			return {
				delIcon: `${this.$config.staticImgEndpoint}/2022/image/setting-fill.png`,
				unshelvesIcon:`${this.$config.staticImgEndpoint}/2022/image/myimg/unshelves-icon.png`,
			}
		},
		props: {
			item: Object,
		},
		computed: {

		},
		methods: {
			_get(data, field, defaultValue) {
				return _.get(data, field, defaultValue) || '-'
			},
			//处理图片路劲
			handleImg(value) {
				return handleImgUrl(value)
			},
			showItemPopup(){
				this.$refs.itemPopup.open('bottom')
			},
			closeItemPopup(){
				this.$refs.itemPopup.close()
			},
			goToPage(){
				uni.navigateTo({
					url: `/pages/my/seniorConfig/index?id=20055722&vrPictureId=${this.item.id}`
				})
			},
			confirmDel(){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定删除此VR图片吗？`,
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
				this.$api.delVRPictureItem(id).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:"删除成功",
							icon:'none'
						})
						this.closeItemPopup()
						setTimeout(()=>{
							this.$emit('refresh')
						}, 500)
					}else{
						uni.showToast({
							title:"删除失败",
							icon:'none'
						})
					}
				})
			},
			//确定上下架提示框
			showConfirm(item){
				const that = this
				let tipsTxt
				if(item.status === 0){
					tipsTxt = '确定上架吗？'
				}else if(item.status === 1){
					tipsTxt = '确定下架吗？'
				}
				uni.showModal({
					title: item.name || '提示',
					content: tipsTxt || '',
					success: function (res) {
						if (res.confirm) {
							if(item.status === 0){
								that.putShelvesVrPicture(item.id)
							}else if(item.status === 1){
								that.putUnshelvesVrPicture(item.id)
							}
						} else if (res.cancel) {
						}
					}
				});
			},
			//上架
			putShelvesVrPicture(id){
				this.$api.putShelvesVrPicture(id).then(res => {
					if(res.code === 200){
						uni.showToast({
							title:"上架成功",
							icon:'none'
						})
						this.closeItemPopup()
						setTimeout(()=>{
							this.$emit('refresh')
						}, 500)
					}else{
						uni.showToast({
							title:"上架失败",
							icon:'none'
						})
					}
				})
			},
			//下架
			putUnshelvesVrPicture(id){
				this.$api.putUnshelvesVrPicture(id).then(res => {
					if(res.code === 200){
						uni.showToast({
							title:"下架成功",
							icon:'none'
						})
						this.closeItemPopup()
						setTimeout(()=>{
							this.$emit('refresh')
						}, 500)
					}else{
						uni.showToast({
							title:"下架失败",
							icon:'none'
						})
					}
				})
			},
			
		}
	}
</script>
<style lang="scss" scoped>
	
	$defaultColor: #2C88D9;
	$warningColor: #AE3549;
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
		
		.text_name{
			color: black;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			// font-weight: bold;
			white-space: nowrap;
			font-size: 25rpx;
			font-weight: bold;
			
		}
		
		.popup-content{
			padding: 20rpx;
			background-color: #ffffff;
			
			.item {
				margin-bottom: 4px;
				
				.outlineBg{
					background-color: #ffffff;
					border: 2rpx solid $defaultColor;
					color: $defaultColor;
				}
				
				.warningBg{
					background-color: $warningColor;
					color: #fff;
				}
				
				.defaultBg{
					background-color: $defaultColor;
					color: #fff;
				}
				
				.disabledBg{
					background-color: #C2CFD7;
					color: #fff;
				}
				
				.btn{
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 10rpx 40rpx;
					border-radius: 6rpx;
					// background-color: #418FF4;
					font-size: 30rpx;
					font-weight: bold;
				}
			}
		}
		
		.del{
			position:absolute;
			top: -7px;
			right: -8px;
			background-color: #ffffff;
			image{
				width: 25px;
				height: 25px;
			}
		}
		
		.unshelves{
			position:absolute;
			top: -1px;
			left: -1px;
			image{
				width: 40px;
				height: 40px;
			}
		}
	}
</style>
