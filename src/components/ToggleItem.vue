<template>
	<view class="base">
		<view class="title">
			<text>{{item.title}}</text>
		</view>
		<switch :checked="status" @change="clickEvent" color="#007aff" style="transform:scale(0.9)">
		</switch>
	</view>
</template>

<script>
	import {
		globalConfig
	} from '@/config.js'
	export default {
		props: {
			item: Object, // title,navon,navoff
		},
		data() {
			return {
				queryOffData: {}, //暂存关闭时提交的参数
				queryOnData: {}, //暂存开启时提交的参数
				status: '', //开关的初始状态
				switchStatus: false //开关当前的状态
			}
		},

		mounted() {
			this.statusJudge()
		},

		methods: {
			
			// 状态判断
			statusJudge() {
				if (this.item.status == 1 || this.item.status == true) {
					this.status = true
				} else {
					this.status = false
				}
			},
			// 请求api
			requestApi(api) {
				const queryOff = {
					id: this.item.id
				}
				queryOff[this.item.navoffPropsName] = this.item.navoffPropsValue,
					this.queryOffData = queryOff
				const queryOn = {
					id: this.item.id
				}
				queryOn[this.item.navonPropsName] = this.item.navonPropsValue,
					this.queryOnData = queryOn

				const params = this.switchStatus ? this.queryOffData : this.queryOnData
				console.log('params==', params)

				console.log('我进来访问api了')
				uni.request({
					url: `${globalConfig.endpoint}` + api,
					method: 'PUT',
					data: params,
					header: {
						'content-type': 'application/json;charset=utf-8',
						// 'content-type': 'application/x-www-form-urlencoded',
						Authorization: `Bearer ${this.$cache(globalConfig.tokenStorageKey)}`
					},
					success: (res) => {
						if (res.data.code == 200) {
							// this.status = true
							uni.showToast({
								title: '切换成功',
								icon: "none"
							})
						} else {
							
							
							this.status = false
							console.log('status==', this.status)
							if (res.data.code == 4041) {
								this.status = false
								uni.showToast({
									title: '该功能暂时不能开放',
									icon: "none"
								})
							}
						}
					}
				})
			},
			

			// 点击触发事件
			clickEvent(element) {
				const that = this
				console.log('element.detail.value ==', element)
				if (element.detail.value) {
					this.switchStatus = true
					console.log('开启')
					// 开启
					that.requestApi(that.item.navon)
				} else {
					this.switchStatus = false
					console.log('关闭')
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
		height: 46px;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 6px;
		padding: 0px 10px 0px 18px;
		align-items: center;
		margin: 4px;
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);

		.title {
			font-size: 18px;
		}

	}
</style>
