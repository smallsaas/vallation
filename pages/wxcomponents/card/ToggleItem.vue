<template>
	<view class="base">
		<view class="title">
			<text>{{item.title}}</text>
		</view>

		<switch :checked="status" @change="clickEvent">

		</switch>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object // title,navon,navoff
		},
		data() {
			return {
				status: true //状态
			}
		},
		methods: {
			// 请求api
			requestApi(api) {
				uni.request({
					url: api,
					method: 'POST',
					success: (res) => {
						console.log('res.data',res.data)
					}
					
				})
			},
			
			// 点击触发事件
			clickEvent(element) {
				const that = this
				if(element.detail.value) {
					// 开启
					that.requestApi(that.item.navon)
				} else {
					// 关闭
					that.requestApi(that.item.navoff)
				}
			}
		}
	}
</script>

<style lang="scss">
	.base {
		display: flex;
		height: 50px;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 12px;
		padding: 0px 16px 0px 18px;
		align-items: center;
		margin-bottom: 6px;

		.title {
			font-size: 18px;
		}

	}
</style>
