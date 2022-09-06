<template>
	<view class="land-lord-item">
		<view class="title_content">
			<view class="avatar" @click="showBtnPopup">
				<image :src="_get(accountInfo, 'avatar', defaultAvatar)"></image>
			</view>
			<view class="feeback-info" @click="showBtnPopup">
				<view class="user-info">
					<text class="name" style="flex: 1;">{{_get(accountInfo, 'name', '-')}}</text>
					<view class="exist-rent" v-if="item.existRent">
						出租
					</view>
					<view class="asset-number">
						{{_get(item, 'assetNumber', '0')}} 套
					</view>
				</view>
				<view class="user-info" style="margin-bottom: 7px;">
					<text class="phone">{{_get(accountInfo, 'phone', '-')}}</text>
				</view>
				<view class="tag-content" v-if="tagList && tagList.length > 0">
					<view class="tag-item" v-for="(tagItem, tagIndex) in tagList">{{_get(tagItem, 'tagName', '-')}}</view>
				</view>
			</view>
			<view class="arrow" @click="showList">
				<image :class="[isShowNoteList ? 'down':'up']" :src="upIcon" />
			</view>
		</view>
		
		<view :class="[ isShowNoteList ? 'content-open' : 'content-close']" v-if="noteList && noteList.length && isShowNoteList" >
			<view :class="[ 'content']">
				<view style="width: 46px;" :class="[ isShowNoteList ? 'content-item-open' : 'content-item-close']">
				</view>
				<view :class="['feeback-info']" >
					<view class="note-content" v-if="noteList.length > 0">
						<view class="note-item" v-for="(noteItem, noteIndex) in noteList" :key="noteIndex" v-if="noteIndex < 2">
							<image :src="clockIcon"/>
							<text style="color: #788896; margin-right: 8px">{{cutTimeString(_get(noteItem, 'createTime'))}}</text>
							<text class="note-text">{{_get(noteItem, 'note', '-')}}</text>
						</view>
						<view class="note-item" v-if="noteList.length >= 3">
							<text class="more-btn" @click="showMorePopup">更多...</text>
						</view>
					</view>
					<view v-if="!noteList && noteList.length === 0" style="font-size: 26rpx;color: #788896; margin-bottom: 8px">暂无备注信息</view>
				</view>
			</view>
			
		</view>
		
		<uni-popup ref="btnListPopup">
			<view class="popup-content">
				<view class="item" style="margin-bottom: 16px;">
					<button v-for="(btnItem, btnIndex) in options" :key="btnIndex" 
						:class="['btn', `${btnItem.option}`]"
						:style="btnItem.spacer ? `margin-bottom: ${btnItem.spacer}px`:''"
						@click="handleItemPopupclick(btnItem)">
						<text>{{btnItem.label}}</text>
					</button>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="moreNotePopup">
			<view class="more-note-body">
				<view class="note-item" v-for="(noteItem, noteIndex) in noteList" :key="noteIndex">
					<image :src="clockIcon"/>
					<text style="color: #788896; margin-right: 8px">{{cutTimeString(_get(noteItem, 'createTime'))}}</text>
					<text class="note-text">{{_get(noteItem, 'note', '-')}}</text>
				</view>
			</view>
		</uni-popup>
		
	</view>
	
</template>

<script>
	import _ from 'lodash'
	import popupBtnItem from '@/components/dynamic-list-popup/popupItem/btnItem.vue'
	export default {
		name:'landlordItem',
		components:{
			popupBtnItem
		},
		props:{
			item: Object
		}, 
		data(){
			return {
				defaultAvatar: `${this.$config.staticImgEndpoint}/2022/image/default-avatar.png`,
				accountInfo:{},
				noteList:[],
				tagList:[],
				isShowNoteList:false,
				upIcon: `${this.$config.staticImgEndpoint}/2022/image/up-arrow-icon.png`,
				downIcon: `${this.$config.staticImgEndpoint}/2022/image/down-arrow-icon.png`,
				clockIcon: `${this.$config.staticImgEndpoint}/2022/svg/clock-icon.svg?color=C3CFD9`,
				options:[
					{
						label:"添加备注",
						option: "outlineBg",
						showModal: 'addNoteModal',
						spacer: 20
					},
					// {
					// 	label:"房东出租意向",
					// 	option: "outlineBg",
					// 	navigation:'',
					// 	spacer: 20
					// },
					{
						label:"房东画像",
						option: "outlineBg",
						navigation: `/my/seniorConfig/index?id=5665662660&userId=${this.item.id}`
					},
					{
						label:"查看产权列表",
						option: "defaultBg",
						navigation: `/sub/houseProperty/housePropertyList?id=${this.item.id}`
					}
				],
			}
		},
		computed: {
			init(){
				this.accountInfo = _.get(this.item, 'userAccount', {})
				this.noteList = _.get(this.item, 'userNoteList', [])
				this.tagList = _.get(this.item, 'userTagList', [])
			}
		},
		mounted() {
			this.accountInfo = _.get(this.item, 'userAccount', {})
			this.noteList = _.get(this.item, 'userNoteList', [])
			this.tagList = _.get(this.item, 'userTagList', [])
		},
		methods:{
			_get(data, field, defauleValue){
				return _.get(data, field, defauleValue)
			},
			cutTimeString(value){
				if(value){
					const hms = value.split(' ')[1]
					const hmList = hms.split(':')
					return `${hmList[0]}:${hmList[1]}`
				}
				return '-'
			},
			showList(){
				this.isShowNoteList = !this.isShowNoteList
				// console.log('this.isShowNoteList == ', this.isShowNoteList)
			},
			goToMorePage(){
				uni.navigateTo({
					url: '/my/seniorConfig/index?id=5665662660'
				})
			},
			showBtnPopup(){
				this.$refs.btnListPopup.open('bottom')
			},
			closeBtnPopup(){
				this.$refs.btnListPopup.close()
			},
			showMorePopup(){
				this.$refs.moreNotePopup.open('center')
			},
			closeMorePopup(){
				this.$refs.moreNotePopup.close()
				this.$emit('dynamicListPopupCencalClose','')
			},
			handleItemPopupclick(item){
				
				if(item.navigation){
					this.goToPage(item.navigation)
				}else if(item.showModal){
					if(item.showModal === 'addNoteModal'){
						this.showAddNoteModal()
					}
				}
				
			},
			goToPage(pathUrl){
				if(pathUrl){
					uni.navigateTo({
						url: `/pages${pathUrl}`
					})
				}
			},
			//添加备注
			showAddNoteModal(userId){
				const that = this
				uni.showModal({
					title: '备注',
					content: '',
					editable: true,
					placeholderText: '请输入',
					success: function (res) {
						if (res.confirm) {
							that.addNote(res.content)
						} else if (res.cancel) {
							console.log('点击取消');
						}
					}
				});
			},
			addNote(content){
				const query = {
					note: content,
					userId: this.item.id
				}
				console.log('query == ', query)
				this.$api.postAddNote(query).then(res => {
					if(res.code === 200){
						this.showTips('添加成功')
						setTimeout(()=>{
							this.closeBtnPopup()
							this.$emit('refresh')
						}, 1500)
					}else{
						this.showTips('添加失败')
					}
				})
			},
			showTips(content, icon='none'){
				uni.showToast({
					title: content,
					icon: icon
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	$defaultColor: #2C88D9;
	$warningColor: #AE3549;
	
	.title_content{
		display: flex;
		flex-direction: row;
		padding: 10px 10px 0px 10px;
		align-items: center;
		min-height: 45px;
		
		.avatar{
			padding: 4px;
			
			image{
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}
		
		.feeback-info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.user-info{
				flex: 1;
				color: #293845;
				padding: 3px 8px;
				display: flex;
				align-items: center;

				.name {
					font-size: 32rpx;
					font-weight: bold;
				}
				.phone {
					flex: 1;
					font-size: 28rpx;
				}
				
				.exist-rent{
					font-size: 28rpx;
					border: 1px solid #C7C3FB;
					color: #6558F5;
					padding: 1px 7px;
					border-radius: 30px;
					margin-right: 10px;
				}
				
				.asset-number{
					color: #293845;
					font-size: 26rpx;
				}
			}
			
			.tag-content{
				padding: 0px 8px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				
				.tag-item{
					font-size: 28rpx;
					border: 1px solid #EAB8C1;
					color: #D3455B;
					padding: 1px 7px;
					border-radius: 30px;
					margin-right: 10px;
					margin-bottom: 4px;
				}
			}
			
		}
		
		
		.arrow{
			padding: 10px 5px 10px 15px;
			image{
				width: 14px;
				height: 14px;
			}
			
			.up{
				transition: all 0.5s;
			}
			
			.down{
				transform:rotate(180deg);
				transition: all 0.5s;
			}
			
		}
		
	}
	
	.content{
		display: flex;
		flex-direction: row;
		padding: 0px 10px;
		// border: 1rpx solid #E8E8E8;
		
		.feeback-info{
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.note-content{
				padding: 8px 8px;
				
				.more-btn{
					font-size: 26rpx;
					color: #788896;
					padding: 5px 10px 5px 0;
				}
			}
			
		}
		
	}
	
	.content-open {
		// height: 170rpx;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
		border-bottom: 1px solid #d4d4d4;
	}
	.content-close {
		height: 0;
		transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
	.content-item-open {
		// height: 180 rpx;
		transition: all 0.4s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
	.content-item-close {
		height: 0;
		// transition: all 0.5s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
	
	.more-note-body{
		padding: 20rpx;
		background-color: #ffffff;
		position: relative;
		width: 260px;
		height: 220px;
		overflow-y: scroll;
		border-radius: 15px;
	}
	
	.note-item{
		display: flex;
		flex-direction: row;
		font-size: 30rpx;
		align-items: center;
		margin-bottom: 6px;
		
		image{        
			width: 18px;
			height: 18px;
			margin-right: 4px;
		}
		
		.note-text{
			flex: 1;
			display: flex; 
			flex-wrap: wrap;
			color: #293845;  
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
</style>