<!-- 
	title: #000
	subtitle: #8a8a8a
	status: #707070
 -->
<template>
	<view class="base">
		<!-- 左容器 -->
		<view class="left-box">
			<!-- 状态条 -->
			<view class="color-lump" :style="{backgroundColor:item.bar.color}"></view>
			<!-- 标题容器 -->
			<view class="title-box">
				<view class="title">
					<text class="main-title">{{item.title || '-'}}</text>
					<text class="subsidiary">{{item.content || '-'}}</text>
				</view>
				<view class="subtitle">
					<text>{{item.subtitle || '-'}}</text>
				</view>
			</view>
		</view>
		<!-- 右容器 -->
		<view class="right-box" :style="{color:item.bar.color}">
			<!-- 状态 -->
			<text>{{item.status || '-'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		data() {
			return {
				// 左侧颜色状态条颜色
				// 标题
				// 副标题
				// 标题后面的附加信息
				// status
			}
		},
		methods: {
			
		},
		mounted() {
			// console.log('item == ', this.item)
		}
	}
</script>

<style lang="scss">
	.base {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 12px 0px 0px ;
		height: 50px;
		background-color: #fff;
		margin: 6px;
		
		.left-box {
			display: flex;
			align-items: center;
			
			.color-lump {
				height: 30px;
				width: 6px;
				margin-right: 6px;
			}
			
			.title-box {
				display: flex;
				flex-direction: column;
				
				.title {
					display: flex;
					align-items: flex-end;
					
					.main-title {
						font-weight: bold;
						margin-right: 6px;
					}
					
					.subsidiary {
						font-size: 14px;
					}
				}
				
				.subtitle {
					font-size: 12px;
					color: #8a8a8a;
				}
			}
		}
		
		.right-box {
			display: flex;
			align-items: center;
			color: #707070;
		}
	}
</style>