<template>
	<view class="item">
		<view class="mainImg">
			<image class="icon" :src="item.avatar || defaultAvatar" />
		</view>
		<view class="item-txt">
			<view class="item-title-txt">
				<text class="name">{{item.name || '-'}}</text>
				<view class="type-list">
					<view
						class="type-item" 
						:style="[changeBg(type)]" 
						v-for="(type, index) in item.userTypeList" 
						:key="index"
						v-if="typeMap[type]"
					>
						{{changeTyleName(type)}}
					</view>
				</view>
				
			</view>
			<text class="phone">{{item.phone || '-'}}</text>
		</view>
		<!-- <view class="type-list">
			<view 
				class="type-item" 
				:style="[changeBg(type)]" 
				v-for="(type, index) in item.userTypeList" 
				:key="index"
				v-if="typeMap[type]"
			>
				{{changeTyleName(type)}}
			</view>
		</view> -->
		
	</view>
</template>
<script>
	export default {
		name: 'communityChildrenTypeItem',
		data(){
			return {
				typeMap:{
					128: { name: '运维', styles: {'backgroundColor': '#ffffff', 'color': '#BD34D1', 'border': '1px solid #E2B2EB'} },
					512: { name: '社区管理员', styles: {'backgroundColor': '#ffffff', 'color': '#2C88D9', 'border': '1px solid #AED0EE'} },
					// 4: { name: '供应商', styles: {'backgroundColor': '#fab1a0', 'color': '#ffffff'} },
					// 8: { name: '租户', styles: {'backgroundColor': '#fdcb6e', 'color': '#ffffff'} },
					// 16: { name: '房东', styles: {'backgroundColor': '#00b894', 'color': '#ffffff'} },
					// 32: { name: '置业顾问', styles: {'backgroundColor': '#0984e3', 'color': '#ffffff'} },
					// 64: { name: '代理商', styles: {'backgroundColor': '#00cec9', 'color': '#ffffff'} },
					// 128: { name: '运维', styles: {'backgroundColor': '#6c5ce7', 'color': '#ffffff'} },
					// 256: { name: '体验用户', styles: {'backgroundColor': '#fd79a8', 'color': '#ffffff'} }
				},
				defaultAvatar: `${this.$config.staticImgEndpoint}/2022/image/default-avatar.png`
			}
		},
		props: {
			item: Object
		},
		computed: {

		},
		methods: {
			changeBg(type){
				if(type != null && type >= 0){
					if(this.typeMap[type]){
						return this.typeMap[type].styles
					}
				}else {
					return {'backgroundColor': '#cccccc', 'color': '#000000'}
				}
			},
			changeTyleName(type){
				console.log('type == ', type)
				if(type != null && type >= 0){
					if(this.typeMap[type]){
						return this.typeMap[type].name
					}
				} else {
					return '-'
				}
			}
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less" scoped>
	.item{
		min-height: 140rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
		// justify-content: center;
		margin-bottom: 2rpx;
		padding: 0 12rpx;
		
		.mainImg{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 110rpx;
			.icon {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
		
		.item-txt{
			// flex: 1;
			min-width: 220rpx;
			display: flex;
			flex-direction: column;
			
			.item-title-txt{
				display: flex;
				align-items: center;
			}
		}
		
		.name{
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
			margin-right: 10px;
		}
		
		.phone{
			font-size: 28rpx;
			color: #7E8D9B;
		}
		
		.type-list{
			display: flex;
			flex-direction: row-reverse;
			
			.type-item{
				font-size: 24rpx;
				padding: 7rpx 12rpx;
				border-radius: 20px;
				font-weight: bold;
				margin: 2px;
			}
		}
		
	}
</style>
