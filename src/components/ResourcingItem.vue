<template>
	<view class="content">
		
		<!-- 列表展示形式 LIST -->
		<view v-if="item.itemType === 'LIST'" class="listContainer">
			<view class="list-title" >
				{{item[item.listTitle.value]}}<text v-if="item.listTitle.unit">{{item.listTitle.unit}}</text>
				<view class="vr_tag" v-if="item.vrId && item.superscript">
					VR
				</view>
			</view>
			<view class="list-item" v-for="(subitem,index) of item.listLayout">
				<text>{{item[subitem.value]}}<text class="list-item-unit" v-if="subitem.unit">{{subitem.unit}}</text></text>
			</view>
		</view>
		
		<!-- 图文展示形式 defalult-->
		<!-- 显示图片 -->
		<image :src="imageUrl" class="image" mode="aspectFit" @click="previewExpandAndContract(imageUrl)" v-on:click.stop v-else></image>
		<!-- 右上角图标 -->
		<view class="del" v-if="item.setting !== false">
			<image :src="setIcon"  />
		</view>
		<!-- <view class="del" @click="confirmDel" v-else-if="item.clickEvent === clickEvent_delete">
			<image :src="delIcon"  />
		</view> -->
		<!-- 标题 -->
		<view class="text_name" v-if="item.isTitle === true">{{_get(item, 'name')}}</view>
		<!-- 左上角角标 -已下架- -->
		<view class="unshelves" v-if="item.superscript === true && item.status === 0">
			<img :src="unshelvesIcon"/>
		</view>
		
		<!-- 查看大图弹窗 -->
		<uni-popup ref="popupImage" maskBackgroundColor="rgba(0,0,0,0.9)">
			<view @click="closePopup">
				<image :src="imageUrl" :style="windowWidth" mode="widthFix"></image>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	import {
		handleImgUrl
	} from '@/utils/tools.js'
	export default {
		name: 'ResourceingItem',
		components:{
			
		},
		mounted() {
			// console.log('this.item',this.item)
			this.handleImg(this.item)
		},
		data(){
			return {
				setIcon: `${this.$config.staticImgEndpoint}/2022/image/setting-fill.png`, //设置图标
				// delIcon: `${this.$config.staticImgEndpoint}/2022/image/delete-icon.png`, //删除图标
				unshelvesIcon:`${this.$config.staticImgEndpoint}/2022/svg/houseAppIcon/unshelvesIcon.png`, //已下架图标
				imageUrl: '', //图片路径
				windowWidth: {
					width: uni.getSystemInfoSync().windowWidth
				}, //窗口宽度
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
			handleImg(item) {
				let value = item.snapshot ? item.snapshot : item.image
				this.imageUrl = handleImgUrl(value)
				// return handleImgUrl(value)
			},
			// 查看图片-双指缩放
			previewExpandAndContract(imageUrl) {
				let imageList = []
				imageList.push(imageUrl)
				uni.previewImage({
					urls: imageList,
			
				})
			},
			//查看图片
			preview(imageUrl) {
				this.$refs.popupImage.open()
			},
			closePopup() {
				this.$refs.popupImage.close()
			}
			// showItemPopup(){
			// 	this.$refs.itemPopup.open('bottom')
			// },
			// closeItemPopup(){
			// 	this.$refs.itemPopup.close()
			// },
			// goToPage(){
			// 	uni.navigateTo({
			// 		url: `/pages/my/seniorConfig/index?id=20055722&vrPictureId=${this.item.id}`
			// 	})
			// },
			// confirmDel(){
			// 	const that = this
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: `确定删除吗？`,
			// 		success: function (res) {
			// 			if (res.confirm) {
			// 				that.del()
			// 			} else if (res.cancel) {
			// 			}
			// 		}
			// 	});
			// },
			// del(){
			// 	const id = this.item.id
			// 	this.$api.delVRPictureItem(id).then(res => {
			// 		if(res.code == 200){
			// 			uni.showToast({
			// 				title:"删除成功",
			// 				icon:'none'
			// 			})
			// 			this.closeItemPopup()
			// 			setTimeout(()=>{
			// 				this.$emit('refresh')
			// 			}, 500)
			// 		}else{
			// 			uni.showToast({
			// 				title:"删除失败",
			// 				icon:'none'
			// 			})
			// 		}
			// 	})
			// },
			//确定上下架提示框
			// showConfirm(item){
			// 	const that = this
			// 	let tipsTxt
			// 	if(item.status === 0){
			// 		tipsTxt = '确定上架吗？'
			// 	}else if(item.status === 1){
			// 		tipsTxt = '确定下架吗？'
			// 	}
			// 	uni.showModal({
			// 		title: item.name || '提示',
			// 		content: tipsTxt || '',
			// 		success: function (res) {
			// 			if (res.confirm) {
			// 				if(item.status === 0){
			// 					that.putShelvesVrPicture(item.id)
			// 				}else if(item.status === 1){
			// 					that.putUnshelvesVrPicture(item.id)
			// 				}
			// 			} else if (res.cancel) {
			// 			}
			// 		}
			// 	});
			// },
			//上架
			// putShelvesVrPicture(id){
			// 	this.$api.putShelvesVrPicture(id).then(res => {
			// 		if(res.code === 200){
			// 			uni.showToast({
			// 				title:"上架成功",
			// 				icon:'none'
			// 			})
			// 			this.closeItemPopup()
			// 			setTimeout(()=>{
			// 				this.$emit('refresh')
			// 			}, 500)
			// 		}else{
			// 			uni.showToast({
			// 				title:"上架失败",
			// 				icon:'none'
			// 			})
			// 		}
			// 	})
			// },
			//下架
			// putUnshelvesVrPicture(id){
			// 	this.$api.putUnshelvesVrPicture(id).then(res => {
			// 		if(res.code === 200){
			// 			uni.showToast({
			// 				title:"下架成功",
			// 				icon:'none'
			// 			})
			// 			this.closeItemPopup()
			// 			setTimeout(()=>{
			// 				this.$emit('refresh')
			// 			}, 500)
			// 		}else{
			// 			uni.showToast({
			// 				title:"下架失败",
			// 				icon:'none'
			// 			})
			// 		}
			// 	})
			// },
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
		
		.listContainer {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.list-title {
				min-width: 75rpx;
				font-weight: bold;
				font-size: 30rpx;
				padding: 6rpx 10rpx;
				background: #2C88D9;
				text-align: center;
				border-radius: 18px;
				color: #ffffff;
				display: flex;
				justify-content: center;
				margin-bottom: 12px;
				position: relative;
				
				.vr_tag{
					position: absolute;
					top: -6px;
					right: -22px;
					padding: 3rpx 16rpx;
					background: #FBE192;
					font-size: 24rpx;
					border-radius: 15px;
					color: #000000;
					font-weight: 400;
				}
			}
			
			.list-item {
				width: 150rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				font-size: 28rpx;
				color: #293845;
				font-weight: bold;
				
				.list-item-unit {
					color: #8a8a8a;
					margin-left: 6px;
					font-size: 12px;
				}
			}
		}
		
		.image {
			max-width: 160rpx;
			max-height: 160rpx;
		}
		
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
			display: flex;
			top: -12px;
			right: -12px;
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
