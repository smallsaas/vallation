<template>
	<view class="container">
		<view class="avatar">
			<image v-if="!item.avatar" :src="defaultAvatar"/>
			<image v-if="item.avatar" :src="handleImg(item.avatar)"/>
		</view>
		<view class="middle">
			<view class="up">
				<view class="name">
					<text>{{item.name || ''}}</text>
					<text>({{item.agentCount}})</text>
				</view>
				<view class="level">
					<view v-if="item.level === 'GENERAL_AGENT'" style="background-color: #ee6666;" class="tag">总代理</view>
					<view v-if="item.level === 'SECONDARY_AGENT'" style="background-color: #73c0de;" class="tag">二级代理</view>
					<view v-if="item.level === 'TERTIARY_AGENT'" style="background-color: #91cc75;" class="tag">三级代理</view>
				</view>
			</view>
			<view class="down">
				<view class="note">
					<text>{{item.note || ''}}</text>
				</view>
			</view>
		</view>
		<view class="more">
			<image class="icon" :src="arrowRight"/>
		</view>
	</view>
</template>

<script>
	// import { handleImgUrl } from '@/utils/tools.js'
	export default {
		data() {
			return {
				arrowRight: `${this.$config.staticImgEndpoint}/2022/svg/arrow-right.svg`,
				defaultAvatar: `${this.$config.staticImgEndpoint}/2022/svg/default-avatar-blue.svg`,
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		methods: {
			//处理图片路径
			handleImg(value) {
				return handleImgUrl(value)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 10rpx 15rpx 10rpx 15rpx;
		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.middle {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			.up {
				display: flex;
				margin-bottom: 8rpx;
				.name {
					
				}
				.tag {
					color: white;
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 30rpx;
					padding: 7rpx 20rpx 7rpx 20rpx;
					margin-left: 20rpx;					
				}
			}
			.down {
				.note {
					font-size: 30rpx;
					color: #788896;
				}
			}
		}
		
		.more {
			margin-left: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			.icon {
				width: 42rpx;
				height: 42rpx;
				margin-right: 50rpx;
			}
		}
	}
</style>
