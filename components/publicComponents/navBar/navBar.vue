<!-- 由于web-view中不支持嵌套多層web-view 所以這邊使用slot方式來決定不同頁面的渲染 -->
<template>
	<view class="navBar">
		<view class="top-title"></view>
		<view class="navBar-content" :style="[contentStyle]">
			<slot name="content-container">
				
			</slot>
		</view>
		<view class="navBar-container">
			<view v-for="(nav,n) in navs" v-if="Array.isArray(navs)&&navs.length>0" class="navBar-nav" @click="handleClick(n)">
				<view :class="'navBar-party'+isClick(n)">
					<image :src="nav.image" class="navBar-party-image">
					</image>
					<view class="navBar-party-title">
						{{nav.title}}
					</view>
                    <view class="red_dot" v-if="nav.showDot"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"navBar",
		props:{
			navs:{
				type:Array,
				default:[]
			},
			defaultClick:{
				type:String,
				default:0
			}
		},
		data(){
			return {
				url:"",
				clicked:0,
				contentStyle:{}
			}
		},
        watch:{
            defaultClick: {
              handler(val, oldVal) {
                if (val !== oldVal) {
                  this.clicked = this.defaultClick
                }
              }
            }
        },
		created() {
			this.clicked = this.defaultClick
			// console.log("加載",this.defaultClick)
				this.contentStyle = {
					"height": "calc(100vh - 250rpx)",
                    paddingBottom: '150rpx'
				}
		},
		methods:{
			// 點擊時事件
			handleClick(click){
				this.clicked = click
				this.$emit("change",click)
			},
			isClick(click){
				if(this.clicked == click){
					return " navBar-clicked"
				}else{
					return ""
				}
			}
		}
	}
</script>

<style lang="less">
	.navBar{
		z-index: -10 !important;
	}
	.navBar-content{
		width: 100%;
		// height: 100%;
		overflow: scroll;
		position: relative;
		
	}
	.navBar-container{
		width: 100%;
		height: 140rpx;
		z-index: 500;
		position: fixed;
		bottom: 0;
		display: flex;
		background-color: #050E17;
	}
	.navBar-nav{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.navBar-party{
		min-width: 100rpx;
		height: 100rpx;
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
        position: relative;
        .red_dot {
            width: 16rpx;
            height: 16rpx;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            top: 16rpx;
            right: 8rpx;
        }
	}
	.navBar-party-image{
		width: 50rpx;
		height: 50rpx;
	}
	.navBar-party-title{
		font-size: 20rpx;
	}
	.navBar-clicked{
		background-color: #333644;
	}
	.top-title{
		width: 100%;
		height: 100rpx;
		text-align: center;
		font-weight: bolder;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
