<!-- 由于web-view很不友好 所以使用slot方式實現 -->
<template>
	<view class="bar">
		<view class="pageTabbar_TitleBox">
			<view :class="'pageTabbar_Title'+isClick(t)" @click="handleClick(t)"  v-for="(tab,t) in tabs" :key="t">
				{{tab.title}}
                <view class="red_dot" v-if="tab && tab.showDot"></view>
			</view>
		</view>
		<view class="pageTabbar_Content" :style="[contentStyle]">
            <template v-if="childTabList.length > 0">
                <view class="pageTabbar_child">
                    <view 
                        v-for="(k, i) in childTabList" 
                        :key="i" 
                        :class="[`tab_child_item ${childrenClicked === i  ? 'tab_child_item_select' : ''}`]"
                        @click="handleChildClick(k, i)"
                    >
                    {{k.title}}
                    </view>
                </view>
            </template>
			<slot name="content">
				
			</slot>
		</view>
	</view>
</template>

<script>
    import _ from 'lodash'
	export default {
		name:"pageTabbar",
		props:{
			// tab欄配置
			tabs:{
				type:Array,
				default:[],
			},
            defaultClicked: {
                type: Number,
                default: 0
            }
		},
		data(){
			return {
				clicked: 0,
                childrenClicked: 0,
				contentStyle:{}
			}
		},
        computed:{
            childTabList () {
                return _.get(this.tabs, `[${this.clicked}].children`, [])
            }
        },
        watch: {
          defaultClicked: {
            handler(val, oldVal) {
              if (val !== oldVal) {
                this.clicked = this.defaultClicked
              }
            }
          }
        },
		created() {
			console.log('tabs == ', this.tabs)
            this.clicked = this.defaultClicked
			// #ifdef H5
			this.contentStyle = {
				"height": "calc(100vh - 138rpx);"
			}
			// #endif
			// #ifdef APP-PLUS
			this.contentStyle = {
				"height":"100vh"
			}
			// #endif
			this.$emit("change",this.clicked)
		},
		methods:{
			// tab被點擊時
			handleClick(click){
                if (this.clicked === click) {
                    return
                }
                if (this.clicked !== click) {
                    this.childrenClicked = 0
                }
				this.clicked = click
				this.$emit("change",click)
			},
            // 點擊子tab時
            handleChildClick (k, i) {
                this.childrenClicked = i
                this.$emit("childChange", this.clicked, k)
            },
			isClick(i){
				if(this.clicked === i){
					return " pageTabbar_Click"
				}else{
					return ""
				}
			}
		}
	}
</script>

<style lang="less">
	.bar{
		z-index: -10 !important;
	}
	
	.pageTabbar_TitleBox{
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: row;
		/* margin-top: 50rpx; */
		flex-wrap: wrap;
		/* border: 1px solid red; */
		z-index: 999999;  
		background-color: #fff;
		height: 100rpx;
	}
	
	.pageTabbar_Title{
		flex: 1;
		font-size: 32rpx;
		height: 50rpx;
		text-align: center;
		margin: 15rpx;
		color: #A9ACB0;
        position: relative;
        .red_dot {
            width: 12rpx;
            height: 12rpx;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            top: 12rpx;
            right: -12rpx;
        }
	}
	.pageTabbar_Click{
		font-size: 32rpx;
		font-weight: bold;
		color: #3c3c3c;
		//border-bottom: 5px solid;
		//border-image: -webkit-linear-gradient(left,#772CCA,#0986E5) 5 5;
	}
	.pageTabbar_Content{
		width: 100%;
		overflow: auto;
		/* border: 1px solid red; */
		margin-top: -25rpx;
        .pageTabbar_child {
            margin-top: 30rpx;
            display: flex;
            align-items: center;
            padding: 0 24rpx;
            .tab_child_item {
                border: 1px solid #1C284D;
                border-radius: 4px;
                margin-right: 40rpx;
                padding: 4rpx 10px;
                text-align: center;
                font-size: 28rpx;
            }
            .tab_child_item_select {
                color: #2a82e4;
            }
        }
	}
</style>
