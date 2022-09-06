<template>
	<view class="chief-container">
		<!-- 标题-按钮栏 -->
		<view class="notice-title">
			<text class="chief-title">{{noticeData.title}}</text>
			<view class="notice-button" style="border: 2rpx solid #3170a7; color:#3170a7;" @click="publishOrDeprecate('publish')"
				v-if="noticeData.status !== 'Publish' ">上架</view>
			<view class="notice-button" style="border: 2rpx solid #ee3f4d; color:#ee3f4d" @click="publishOrDeprecate('deprecate')" v-else>下架</view>
		</view>

		<!-- 创建时间 -->
		<view class="notice-createTime-box">
			<image class="notice-createTime-clockIcon" :src="clockIcon"></image>
			<text class="notice-createTime-createTime">{{noticeData.createTime}}</text>
		</view>

		<!-- 生命周期 -->
		<!-- 有销毁时间 periodType=0-->
		<view class="notice-lifeCycle-box" v-if="noticeData.periodType == 0">
			<view class="lifeCycle-time-box">
				<text class="lifeCycle-title">开始时间</text>
				<text>{{cutOutDate('startDate')}}</text>
			</view>
			<view class="lifeCycle-time-box">
				<text class="lifeCycle-title">结束时间</text>
				<text>{{cutOutDate('endDate')}}</text>
			</view>
		</view>
		<!-- 每天重复 -->
		<view class="notice-lifeCycle-box" v-if="noticeData.periodType == 1">
			<view class="lifeCycle-time-box">
				<text class="lifeCycle-title">开始时间</text>
				<text>{{cutOutDate('startTime')}}</text>
				<view class="global-tag-background" style="height: auto;margin-left: 30rpx;">每天重复</view>
			</view>
			<view class="lifeCycle-time-box">
				<text class="lifeCycle-title">结束时间</text>
				<text>{{cutOutDate('endTime')}}</text>
			</view>
		</view>
		<!-- 永不过期 -->
		<view class="notice-lifeCycle-box" v-if="noticeData.periodType == 2">
			<view class="lifeCycle-time-box">
				<text class="lifeCycle-title">结束时间</text>
				<view class="global-tag-semicircle" style="height:auto;color: #20894d;border: 1px solid #20894d;">永不过期</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		name: 'noticeItem',
		props: {
			item: Object
		},
		data() {
			return {
				noticeData: {},
				clockIcon: `${this.$config.staticImgEndpoint}/2022/svg/clockIcon.svg?color=8a8a8a` // 时钟图标
				
			}
		},
		onLoad() {

		},
		onShow() {

		},
		created() {
			
		},
		computed: {
			init(){
				this.noticeData = this.item
			}
		},
		methods: {
			// 截取日期
			cutOutDate(e) {
				if(e == 'startDate') {
					let dateTime = this.noticeData.startTime
					let date = dateTime.substr(0,dateTime.indexOf(' '))
					return date
				} else if(e == 'endDate') {
					let dateTime = this.noticeData.endTime
					let date = dateTime.substr(0,dateTime.indexOf(' '))
					return date
				} else if(e == 'startTime') {
					let dateTime = this.noticeData.startTime
					let time = dateTime.substr(dateTime.indexOf(' '))
					return time
				} else if(e == 'endTime') {
					let dateTime = this.noticeData.endTime
					let time = dateTime.substr(dateTime.indexOf(' '))
					return time
				} else {
					return '-'
				}
			},
			// 上架 or 下架
			publishOrDeprecate(e){
				this.$api.putNotice(this.noticeData.id,e).then(res => {
					if(res.code == 200){
						
						this.$emit('refresh')
						
						if(e == 'publish'){
							uni.showToast({
								title: '上架成功',
								icon: 'success'
							})
						}else if(e == 'deprecate'){
							uni.showToast({
								title: '下架成功',
								icon: 'success'
							})
						}
					}
				})
			}
		}

	}
</script>


<style lang="scss">
	/* 顶部标题栏 */
	.notice-title {
		display: flex;
		justify-content: space-between;

		/* 上架 or 下架按钮 */
		.notice-button {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			border-radius: 20rpx;
			padding: 0rpx 40rpx;
			font-weight: bold;
		}
	}

	// 创建时间容器
	.notice-createTime-box {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		// 时钟图标
		.notice-createTime-clockIcon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}

		// 创建时间
		.notice-createTime-createTime {
			display: flex;
			color: #8a8a8a;
			font-size: 30rpx;
		}

	}

	// 生命周期
	.notice-lifeCycle-box {
		display: flex;
		flex-direction: column;

			// 时间容器
			.lifeCycle-time-box {
				display: flex;
				align-items: center;

				// 时间标题
				.lifeCycle-title {
					display: flex;
					color: #8a8a8a;
					margin-right: 30rpx;
				}

			}
	}
</style>
