<template>
	<view>
		<van-field
			:readonly="params.readonly"
			:disabled="params.disabled"
			:label="params.label"
			:error="params.error"
			:error-message="params.error ? param['error-message'] ? param['error-message'] : '' : ''"
			:required="params.required"
		>
		<view slot="input">
			<image :src="params.value" class="Base-Image-thumb" mode="aspectFit" @click="handleClick"></image>
			<view class="Base-Image-mov" v-if="isShowLarge">
				<movable-area scale-area class="Base-Image-mov-area">
					<image :src="iconList.exit" class="Base-Image-exit-icon" mode="aspectFit" @click="handleClick"></image>
					<movable-view
						class="Base-Image-mov-view"
						direction="all"
						@scale="handleScale"
						scale="true"
						scale-min="1"
						scale-max="4"
						:scale-value="scale"
						out-of-bounds="true"
						@dblclick="handledblClick"
					>
						<image :src="params.value" class="Base-Image-large" mode="aspectFit"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
		</van-field>
	</view>
</template>

<script>
	export default {
		name:"BaseImage",
		props:{
			params:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				showLarge:false, //是否展示大图
				scale:1,
				iconList:{}
			}
		},
		async created() {
			let res = await this.$api.getIcon()
			this.iconList = res.data
		},
		computed:{
			isShowLarge(){
				return this.showLarge
			}
		},
		methods:{
			// 点击时显示大图
			handleClick(){
				this.showLarge = !this.showLarge
				this.$forceUpdate()
			},
			// 缩放放大操作时响应的事件
			handleScale(){
				
			},
			// 双击操作
			handledblClick(){
				if(this.scale == 10){
					this.scale = 1
				}else{
					this.scale = 10
				}
			}
		}
	}
</script>

<style lang="less">
	.Base-Image-mov-view{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		text-align: center;
		&>.Base-Image-large{
			width: 100%;
		}
	}
	.Base-Image-exit-icon{
		position: fixed;
		top: 10rpx;
		right: 10rpx;
		width: 50rpx;
		height: 50rpx;
		z-index: 9999999;
		cursor: pointer;
	}
	.Base-Image-mov{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999998;
		background-color: #000000;
		opacity: .9;
		width: 100vw;
		height: 100vh;
	}
	.Base-Image-mov-area{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999998;
	}
	.Base-Image-thumb{
		width: 200rpx;
		height: 200rpx;
		background-color: #333333;
	}
	.Base-Image-large{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
