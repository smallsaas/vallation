<template>
	<view class="base">
		<view class="title">
			<text>{{title}}</text>
		</view>

		<switch :checked="status" @change="clickEvent">

		</switch>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			navon: String,
			navoff: String
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
				console.log('element',element.detail)
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
		padding: 0px 18px;
		align-items: center;

		.title {
			font-size: 18px;
		}

	}
</style>
