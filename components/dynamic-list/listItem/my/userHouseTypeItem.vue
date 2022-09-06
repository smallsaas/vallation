<template>
	<block>
		<view class="content" @click="showItemPopup">
			<view class="title" >
				{{_get(item, 'area')}}平方
				<view class="vr_tag" v-if="_get(item, 'vrId')">
					VR
				</view>
			</view>
			<view class="item" style="margin-top: 8px; margin-bottom: 8px" >
				<text class="item_value">{{_get(item, 'houseType')}}</text>
			</view>
			<view class="item">
				<text class="item_label" style="justify-content: flex-end;">面积</text>
				<text class="item_value">{{_get(item, 'area')}}</text>
				<text class="item_label" style="justify-content: flex-start;">平方</text>
			</view>
		</view>
		
		<uni-popup ref="itemPopup">
			<view class="popup-content">
				<view class="item" style="margin-bottom: 16px;">
					<button :class="[`btn outlineBg`]"  @click="showVRListPopup">
						<text>绑定VR图</text>
					</button>
					<button :class="[`btn outlineBg`]"  @click="goToPage">
						<text>编辑</text>
					</button>
				</view>
				
				<view class="item">
					<button :class="[`btn delete-button`]"  @click="confirmDel">
						<text>删除</text>
					</button>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="vrListPopup" :isMaskClick="vrListPopupMaskClick">
			<view class="vr-list-popup-body">
				
				<view class="tab_content">
					<view :class="['tab-bar__item', {'tab-bar__item--active': currentTabIndex == vrCateIndex}]" 
						v-for="(vrCateItem, vrCateIndex) in vrList" :key="vrCateIndex" @click="handleTabSelect(vrCateIndex)">
						<view class="tab-bar__item-title">{{_get(vrCateItem, 'name')}}</view>
					</view>
					<!--tab选择栏区域和list的分隔区域  -->
					<view :style="{ backgroundColor: '#fff', height:' 15px' }"></view>
				</view>
				
					
				<radio-group class="vr-list-popup" @change="radioChange" v-if="vrPictureList">
					<view class="item" v-for="(vrPictureItem, vrPictureIndex) in vrPictureList" :key="vrPictureIndex">
						<image-combination :url="handleImg(vrPictureItem.snapshot)"></image-combination>
						<view class="text_name">{{_get(vrPictureItem, 'name')}}</view>
						<view class="radio-btn">
							<radio color="#097BD0" :value="vrPictureItem.id"  :checked="selectedVRItemId == vrPictureItem.id"></radio>
						</view>
					</view>
				</radio-group>
			</view>
			<view class="uploadCommitBtn" >
				<view class="global-button-cancel flex1" @click="cancelConfirm">
					取消
				</view>
				<view class="global-button flex1" @click="confirmBtn">
					确定
				</view>
			</view>
		</uni-popup>
	</block>
	
</template>
<script>
	import _ from 'lodash'
	import {
		handleImgUrl
	} from '@/utils/tools.js'
	import imageCombination from '@/components/imageCombination'
	import tab from '@/components/multiFilter/defaultTabbar.vue'
	export default {
		name: 'userHouseTypeItem',
		components:{
			imageCombination
		},
		data(){
			return {
				tickIcom: `${this.$config.staticImgEndpoint}/2022/svg/tick.svg`,
				vrList:[],
				currentTabIndex: 0,
				vrPictureList:[],
				selectedVRPicture:{},
				selectedVRItemId:''
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		computed: {

		},
		methods: {
			_get(data, field, defaultValue='-'){
				return _.get(data, field, defaultValue)
			},
			handleImg(value) {
				return handleImgUrl(value)
			},
			showItemPopup(){
				this.$refs.itemPopup.open('bottom')
			},
			closeItemPopup(){
				this.$refs.itemPopup.close()
			},
			showVRListPopup(){
				this.getVRList()
			},
			closeVRListPopup(){
				this.$refs.vrListPopup.close()
			},
			goToPage(){
				uni.navigateTo({
					url: `/pages/my/seniorConfig/index?id=20055632&userHouseTypeId=${this.item.id}`
				})
			},
			confirmDel(){
				const that = this
				uni.showModal({
					title: '提示',
					content: `确定删除此户型吗？`,
					success: function (res) {
						if (res.confirm) {
							that.del()
						} else if (res.cancel) {
						}
					}
				});
			},
			getVRList(){
				this.$api.getVRList(this.item.communityId).then(resp => {
					if(resp.code == 200){
						if(_.get(resp, 'data', []).length > 0){
							this.vrList = resp.data
							this.$refs.vrListPopup.open('center')
							this.vrPictureList = this.vrList[this.currentTabIndex].items
						}else{
							uni.showToast({
								title: '该小区没有VR图库',
								icon:'none'
							})
						}
					}else{
						console.log('获取vr列表信息失败')
					}
				})
			},
			handleTabSelect(index){
				this.currentTabIndex = Number(index)
				this.vrPictureList = this.vrList[Number(index)].items
			},
			handleItemSelect(index){
				this.selectedVRPicture = this.vrPictureList[Number(index)]
			},
			radioChange(evt){
				this.selectedVRItemId = evt.detail.value
			},
			confirmBtn(){
				
				if(!this.selectedVRItemId){
					uni.showToast({
						title: '请选择要绑定的VR图片',
						icon:'none'
					})
					return
				}
				
				const query = {
					vrId: this.selectedVRItemId
				}
				
				this.$api.bindingVRPicture(this.item.id, query).then(resp => {
					if(resp.code == 200){
						uni.showToast({
							title: '绑定成功',
							icon:'none'
						})
						this.closeVRListPopup()
						this.closeItemPopup()
						this.selectedVRItemId = ''
						setTimeout(() => {
							this.$emit('refresh')
						}, 1000)
					}else{
						uni.showToast({
							title: '绑定失败',
							icon:'none'
						})
					}
				})
				
			},
			del(){
				const id = this.item.id
				this.$api.delUserHouseById(id).then(res => {
					if(res.code == 200){
						uni.showToast({
							title:"删除成功",
							icon:'none'
						})
						this.closeItemPopup()
						this.$emit('refresh')
					}else{
						uni.showToast({
							title:"删除失败",
							icon:'none'
						})
					}
				})
			},
			cancelConfirm(){
				this.selectedVRItemId = ''
				this.closeVRListPopup()
			}
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="scss" scoped>
	$defaultColor: #2C88D9;
	$warningColor: #AE3549;
	.content {
		// height: 52rpx;
		width: 272rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2rpx solid #cdcdcd;
		border-radius: 8rpx;
		margin: 20rpx 20rpx;
		padding: 7px;
		
		.title {
			// min-width: 75rpx;
			font-weight: bold;
			font-size: 30rpx;
			padding: 6rpx 30rpx;
			background: #2C88D9;
			text-align: center;
			border-radius: 18px;
			color: #ffffff;
			position: relative;
			margin: 10rpx 0rpx;
			
			.vr_tag{
				position: absolute;
				top: -6px;
				right: -22px;
				padding: 3rpx 16rpx;
				background: #FBE192;
				font-size: 24rpx;
				border-radius: 15px;
				color: #000000;
				font-weight: 100;
			}
		}
		
		.item {
			width: 220rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 28rpx;
			color: #293845;
			font-weight: bold;
			
			.item_label{
				flex: 1;
				font-size: 24rpx;
				color: #788896;
				display: flex;
				justify-content: center;
			}
			
			.item_value{
				flex: 1;
				display: flex;
				justify-content: center;
			}
			
			.svg-css{
				width: 25px;
				height: 25px;
			}
		}
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
	
	.vr-list-popup-body{
		padding: 0rpx 20rpx 20rpx 20rpx;
		background-color: #ffffff;
		position: relative;
		width: 260px;
		height: 300px;
		overflow-y: scroll;
		
		.tab_content {
			position: sticky;
			top: 0;
			z-index: 99;
			display: flex;
			flex-direction: row;
			overflow-x: scroll;
			background-color: #ffffff;
			
			.tab-bar{
				position: relative;
				display: flex;
				font-size: 35rpx;
				white-space: nowrap;
				&__item{
					text-align: center;
					line-height: 40px;
					color: #000;
					font-weight: bold;
					
					&--active{
						color: rgba(42, 130, 228, 1);
						font-weight: bold;
					}
					
					&-title {
						margin: 0 22rpx;
					}
				}
					
				
			}
			
			
		}
		
		.vr-list-popup{
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			.item{
			}
			.radio-btn{
				display: flex;
				justify-content: center;
				padding: 6px 0;
			}
		}
	}
	
	.uploadCommitBtn {
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		.flex1{
			flex: 1;
			margin-bottom: 0;
			border-radius: 0;
		}
	}
	
	.text_name {
		color: black;
		display: flex;
		font-size: 24rpx;
		font-weight: bold;
		padding: 4px;
	}
</style>
