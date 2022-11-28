<template>
	<view class="content">
		<view class="avatar">
			<image :src="item.avatar || defaultAvatar"></image>
		</view>
		<view class="feeback-info">
			<view class="user-info">
				<text class="name">{{item.userName || '-'}}</text>
				<text class="phone">{{item.userPhone || '-'}}</text>
			</view>
			<view class="create-time">
				发表于：{{item.createTime || '-'}}
			</view>
			<view class="feeback-content">
				<text>{{item.content || '-'}}</text?>
			</view>
			<view class="feeback-images">
				<view class="thumbnail-box" v-for="(item,index) of imagePathList" :key="index"
					v-model="imagePathList">
					<image-combination :url="item.url"></image-combination>
				</view>
			</view>
		</view>
		<view class="item-status">
			<text class="feedback" v-if="item.requestType === 'PROPOSAL'">建议</text>
			<text class="proposal" v-else-if="item.requestType === 'FEEDBACK'">投诉</text>
			<text class="proposal" v-else>-</text>
		</view>
	</view>
</template>

<script>
	import imageCombination from '@/components/imageCombination'
	export default {
		name: "userFeebackItem",
		components:{
			imageCombination
		},
		props:{
			item: Object
		},
		data(){
			return {
				defaultAvatar: `${this.$config.staticImgEndpoint}/2022/image/default-avatar.png`,
				imagePathList:[]
			}
		},
		mounted() {
			this.handleImageList(this.item.credentialLink)
		},
		methods:{
			handleImageList(listString){
				if(listString){
					if(listString.indexOf('[') != -1){
						const list = JSON.parse(listString)
						list.map(item => {
							if(item.url.indexOf('http') === -1){
								item.url = `${this.$config.endpoint}${item.url}`
							}
							return item
						})
						this.imagePathList = list
					}else{
						let imgUrl = listString
						if(listString.indexOf('http') === -1){
							imgUrl = `${this.$config.endpoint}${item.url}`
						}
						this.imagePathList = [{url: listString}]
					}
					
				}
				console.log('this.imagePathList = ', this.imagePathList)
				this.$forceUpdate()
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: row;
		padding: 10px;
		border: 1rpx solid #E8E8E8;
		
		.avatar{
			padding: 8px;
			
			image{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
		}
		
		.feeback-info{
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.user-info{
				color: #293845;
				padding: 8px;
				.name {
					font-size: 32rpx;
					font-weight: bold;
				}
				.phone {
					font-size: 26rpx;
					margin-left: 8px;
				}
			}
			
			.create-time{
				display: flex;
				align-items: flex-start;
				font-size: 26rpx;
				color: #929191;
				margin-bottom: 10px;
				padding: 0 16rpx;
			}
			
			.feeback-content{
				display: flex;
				flex-wrap: wrap;
				padding: 0px 8px;
			}
			
			.feeback-images{
				display: flex;
				flex-wrap: wrap;
				
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
			}
		}
		
		.item-status{
			font-size: 32rpx;
			padding: 8px;
			
			.proposal{
				color: #D3455B;
			}
			
			.feedback{
				color: #2C88D9;
			}
		}
		
	}
</style>