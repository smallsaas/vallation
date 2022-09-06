<template>
	<view class="item">
		<view class="mainImg">
			<image class="icon" :src="item.avatar || defaultAvatar" mode="widthFix"/>
		</view>
		<view class="item-txt">
			<text class="name">{{item.name || '-'}}</text>
			<text class="phone">{{item.phone || '-'}}</text>
		</view>
		<view class="type-list">
			<view 
				class="type-item" 
				:style="[changeBg(type)]" 
				v-for="(type, index) in item.typeList" 
				:key="index"
				v-if="typeMap[type]"
			>
				{{changeTyleName(type)}}
			</view>
		</view>
		
	</view>
</template>
<script>
	export default {
		name: 'userListItem',
		data(){
			return {
				typeMap:{
					128: { name: '运维', styles: {'backgroundColor': '#4B5C6B', 'color': '#ffffff'} },
					// 2: { name: '普通用户', styles: {'backgroundColor': '#ff7675', 'color': '#ffffff'} },
					4: { name: '供应商', styles: {'backgroundColor': '#fab1a0', 'color': '#ffffff'} },
					// 8: { name: '租户', styles: {'backgroundColor': '#fdcb6e', 'color': '#ffffff'} },
					16: { name: '房东', styles: {'backgroundColor': '#00b894', 'color': '#ffffff'} },
					32: { name: '置业顾问', styles: {'backgroundColor': '#0984e3', 'color': '#ffffff'} },
					// 64: { name: '代理商', styles: {'backgroundColor': '#00cec9', 'color': '#ffffff'} },
					// 128: { name: '运维', styles: {'backgroundColor': '#6c5ce7', 'color': '#ffffff'} },
					256: { name: '体验用户', styles: {'backgroundColor': '#fd79a8', 'color': '#ffffff'} }
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
				if(type != null && type >= 0){
					if(this.typeMap[type]){
						return this.typeMap[type].name
					}
				} else {
					return '未设置'
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
		justify-content: center;
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
				// height: 42rpx;
				border-radius: 50%;
			}
		}
		
		.item-txt{
			// flex: 1;
			min-width: 220rpx;
			display: flex;
			flex-direction: column;
		}
		
		.name{
			font-size: 32rpx;
			font-family: PingFang SC-Medium, PingFang SC;
			font-weight: 600;
			color: #000000;
		}
		
		.phone{
			font-size: 28rpx;
			color: #7E8D9B;
		}
		
		.type-list{
			flex: 1;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-end;
			
			.type-item{
				// width: 113rpx;
				// display: flex;
				// justify-content: center;
				// align-items: flex-end;
				font-size: 24rpx;
				padding: 10rpx 12rpx;
				border-radius: 20px;
				font-weight: bold;
				margin: 2px;
			}
		}
		
		
	}
</style>
