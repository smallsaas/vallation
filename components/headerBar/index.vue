<template>
    <view class="tab_bar_container">
        <view class="head_container"
            :style="{ 
				width: `calc(100vw - ${(systemInfo.windowWidth - menuData.right) * 2}px)`,
                height: `${menuData.height}px`,
				padding: `0 ${systemInfo.windowWidth - menuData.right}px`,
				paddingTop: `${menuData.top}px`,
				paddingBottom: '7px'
            }"
        >
			<view
				class="button_content"
				:style="{ height: `${menuData.height}px`, width: `${menuData.width}px` }"
				v-if="isBack"
			>
				<view class="button_content_item" @click="handleBack">
				    <image :src="staticImgEndpoint + '/2022/svg/left-arrow.svg'" class="back_icon" />
				</view>
			</view>
			<view v-else :style="{ height: `${menuData.height}px`, width: `${menuData.width}px` }"></view>
			<view 
				class="tab_title"
				:style="{
					justifyContent: 'center',
					marginRight: `${menuData.width}px`,
					height: `${menuData.height}px`,
					maxWidth: `${systemInfo.windowWidth - ((systemInfo.windowWidth - menuData.right) * 2) - (menuData.width) * 2}px`
				}"
			>
				<view class="title_text" :style="{maxHeight: `${menuData.height}px`}">{{title}}</view>
			</view>
        </view>
        <view :style="{ height: `${menuData.height + menuData.top + 7}px`, width: '100vw' }"></view>
    </view>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: {
			title: String,
			isBack: {
				type: Boolean,
				default: true
			},
			onBack: {
				type: Function,
				default: () => {}
			}
        },
        data() {
          return {
			  staticImgEndpoint: this.$config.staticImgEndpoint,
              menuData: {},
              systemInfo: uni.getSystemInfoSync()
          }  
        },
        mounted() {
            const data = uni.getMenuButtonBoundingClientRect()
            this.menuData = data || {}
        },
        methods: {
           _get (item, str, defauleValue = '') {
              return _.get(item, str, defauleValue)
           },
           handleBack () {
               const pages = getCurrentPages()
               if (_.size(pages) <= 1) {
                 this.handleHome()
                 return
               }
			   if (this.onBack) {
				   this.onBack()
				   return
			   }
			   uni.navigateBack()
           },
           handleHome () {
            
           }
        }
    }
</script>

<style lang="less" scoped>
	.flex_com {
		display: flex;
		align-items: center;
		justify-content: center;
	}
    .tab_bar_container {
        position: relative;
        .head_container {
			background-color: transparent;
            position: fixed;
            display: flex;
            align-items: center;
			padding-bottom: 6px;
			z-index: 99;
			background-color: #fff;
            .button_content {
				position: relative;
                .flex_com();
				
                .button_content_item {
				  position: relative;
				  z-index: 99;
                  flex: 1;
                  height: 100%;
				  display: flex;
				  align-items: center;
				  justify-content: flex-start;
                  .back_icon {
                    width: 34rpx;
                    height: 34rpx;
					margin-left: 40rpx;
                  }
                }
            }
            .tab_title {
                flex: 1;
               .flex_com();
			   .title_text {
				   color: #000;
				   font-weight: 600;
				   font-size: 32rpx;
				   line-height: 56rpx;
				   letter-spacing: 4rpx;
			   }
            }
        }
    }
</style>
