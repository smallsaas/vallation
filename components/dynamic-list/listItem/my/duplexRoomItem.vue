<template>
	<view class="item-content">
		<view class="list-item" :style="[changeBg()]" @click="showItemPopup">
			<view class="item-txt" >
				{{_get('houseNumber')}}
			</view>
		</view>
		
		<uni-popup ref="itemPopup">
			<view class="popup-content">
				<view class="item" style="margin-bottom: 16px;">
					<button :class="[`btn outlineBg`]"  @click="showHouseTypeListPopup">
						<text>绑定户型</text>
					</button>
					<!-- <button :class="[`btn outlineBg`]"  @click="goToPage">
						<text>编辑</text>
					</button> -->
				</view>
				
				<!-- <view class="item">
					<button :class="[`btn delete-button`]"  @click="confirmDel">
						<text>删除</text>
					</button>
				</view> -->
			</view>
		</uni-popup>
		
		<uni-popup ref="houseTypeListPopup" :isMaskClick="vrListPopupMaskClick">
			<view class="houseType-list-popup-body">
				
				<radio-group class="houseType-list-popup" @change="radioChange">
					<view class="item" v-for="(item, index) in houseTypeList" :key="index">
						<image-combination :url="handleImg(item.houseTypePicture)"></image-combination>
						<view class="radio-btn">
							<radio color="#097BD0" :value="item.id"  :checked="selectedHouseTypeItemId == item.id"></radio>
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
		
	</view>
</template>
<script>
	import _ from 'lodash'
	// import {
	// 	handleImgUrl
	// } from '@/utils/tools.js'
	import imageCombination from '@/components/imageCombination'
	export default {
		name: 'duplexRoomItem',
		components:{
			imageCombination
		},
		data(){
			return {
				bgList:{
					0: {'backgroundColor': '#ff7675', 'color': '#ffffff'},
					1: {'backgroundColor': '#fab1a0', 'color': '#ffffff'},
					2: {'backgroundColor': '#fdcb6e', 'color': '#ffffff'},
					3: {'backgroundColor': '#00b894', 'color': '#ffffff'},
					4: {'backgroundColor': '#0984e3', 'color': '#ffffff'},
					5: {'backgroundColor': '#00cec9', 'color': '#ffffff'},
					6: {'backgroundColor': '#6c5ce7', 'color': '#ffffff'},
					7: {'backgroundColor': '#fd79a8', 'color': '#ffffff'},
					8: {'backgroundColor': '#00b894', 'color': '#ffffff'},
					9: {'backgroundColor': '#0984e3', 'color': '#ffffff'},
				},
				houseTypeList:[],
				selectedHouseTypeItemId:''
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		computed: {

		},
		methods: {
			_get(field){
				return _.get(this.item, field, '-')
			},
			handleImg(value) {
				return handleImgUrl(value)
			},
			changeBg(){
				if(this.index > this.bgList.length){
					return this.bgList[this.index%this.bgList.length]
				}else{
					return this.bgList[this.index]
				}
			},
			showItemPopup(){
				this.$refs.itemPopup.open('bottom')
			},
			closeItemPopup(){
				this.$refs.itemPopup.close()
			},
			showHouseTypeListPopup(){
				this.getHouseTypeList()
			},
			closeHouseTypeListPopup(){
				this.$refs.houseTypeListPopup.close()
			},
			getHouseTypeList(){
				this.$api.getHouseTypeList(this.item.communityId).then(resp => {
					if(resp.code == 200){
						if(_.get(resp, 'data', []).length > 0){
							this.houseTypeList = resp.data
							this.$refs.houseTypeListPopup.open('center')
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
			radioChange(evt){
				this.selectedHouseTypeItemId = evt.detail.value
			},
			confirmBtn(){
				if(!this.selectedHouseTypeItemId){
					uni.showToast({
						title: '请选择要绑定户型',
						icon:'none'
					})
					return
				}
				const query = {
					houseTypeId: this.selectedHouseTypeItemId
				}
				this.$api.bindingHouseType(this.item.id, query).then(resp => {
					if(resp.code == 200){
						uni.showToast({
							title: '绑定成功',
							icon:'none'
						})
						this.closeHouseTypeListPopup()
						this.closeItemPopup()
						this.selectedHouseTypeItemId = ''
						// setTimeout(() => {
						// 	this.$emit('refresh')
						// }, 1000)
					}else{
						uni.showToast({
							title: '绑定失败',
							icon:'none'
						})
					}
				})
			},
			cancelConfirm(){
				this.selectedHouseTypeItemId = ''
				this.closeHouseTypeListPopup()
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
	.list-item {
		height: 60rpx;
		min-width: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #bfbfbf; 
		// border: 4rpx solid #cdcdcd;
		border-radius: 30rpx;
		margin: 28rpx;
		background-color: #ffffff;
		
		.item-txt {
			font-weight: bold;
			font-size: 28rpx;
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
	
	.houseType-list-popup-body{
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
		
		.houseType-list-popup{
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
</style>
