<template>
	<view class="tabBlock" v-if="list.length > 0" :style="outStyle">
		<scroll-view 
			scroll-x="true" 
			scroll-with-animation 
			:scroll-left="tabsScrollLeft" 
			@scroll="scroll"
			class="my_scroll_view"
		>
			<view class="tab" id="tab_list">
				<view v-for="(item, index) in list"
					  :key="index"
					  :class="['tab__item']"
					  :style="{color: (currIndex === index ? `${itemColor}`: '')}"
					  id="tab_item"
					  @click="select(item, index)"
				>
					<!-- <view class="tab__item-title">
						<slot name="title" :title="handleTitle(item)"></slot>
					</view> -->
					<view 
						v-if="!showTitleSlot" 
						:class="['tab__item-title', {'tab__item--active': currIndex === index}]"
					>
						{{handleTitle(item)}}
					</view>
				</view>
			</view>
			<!-- <view class="tab__line" 
				  :style="{background: lineColor, width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		props: {
			currentIndex: Number,
			list: { // 传值
				type: Array,
				default: ()=> {
					return []
				}
			},
			itemColor: String, // tab主色调
			lineColor: String ,// 下划线主色调
			lineAnimated: { // 是否展示下划线动画
				type: Boolean,
				default: true
			},
			outStyle: String,
			binding:{
				type: Object,
				default:()=>{
					return {
						name:'name',
						value: 'value'
					}
				}
			}
		},
		data() {
			return {
				currIndex: 0,
				lineStyle: {},
				scrollLeft: 0,
				tabsScrollLeft: 0,
				duration: 0.25,
				bindingData:{}
			}
		},
		computed: {
			convertBindingData(){
				Object.keys(this.binding).map(key => {
					this.bindingData[this.binding[key]] = key
				})
			},
			showTitleSlot() {
				return this.$scopedSlots.title
			}
		},
		watch: {
			list: {
			    handler(val, oldVal) {
			      if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
			        setTimeout(() => {
						this.setTabList()
					}, 20)
			      }
			    },
			    deep: true
			}, 
			currentIndex() {
				this.currIndex = this.currentIndex
				this.setTabList()
			}
		},
		mounted() {
			this.currIndex = this.currentIndex
			this.setTabList()
			if(!this.lineAnimated) {
				this.duration = 0
			}
		},
		methods: {
			handleTitle(item){
				return _.get(item, this.bindingData.name, '-')
			},
			select(item, index) {
				const value = _.get(item, this.bindingData.value, '')
				this.$emit('selected', index, value)
			},
			setTabList() {
				// this.$nextTick(()=>{
				// 	if(this.list.length > 0) {
				// 		this.setLine()
				// 		this.scrollIntoview()
				// 	}
				// })
				if(this.list.length > 0) {
					// this.setLine()
					this.scrollIntoview()
				}
			},
			setLine() {
				let lineWidth = 0, lineLeft = 0
				this.getElementData(`#tab_item`, (data)=> {
					let el = data[this.currIndex]
					// lineWidth = el.width / 2
					
					// console.log('KKK', data, this.currIndex)
					if (el === undefined) {
						return
					}
					
					const item = this.list[this.currIndex]
                    
                    if (item[this.bindingData.name || 'title']) {
                        lineWidth = item[this.bindingData.name || 'title'].length * 26
                    }
					
					// lineLeft = el.width * (this.currIndex + 0.5)  // 此种只能针对每个item长度一致的
					lineLeft = el.width / 2 + (-data[0].left) + el.left
					this.lineStyle = {
						width: `${lineWidth}rpx`,
						transform: `translateX(${lineLeft}px) translateX(-70%)`,
						transitionDuration: `${this.duration}s`
					};
				})
			},
			scrollIntoview() {  // item滚动
				let lineLeft = 0;
				this.getElementData('#tab_list', (data)=> {
					let list = data[0]
					this.getElementData(`#tab_item`, (data)=> {
						let el = data[this.currIndex]
						// lineLeft = el.width * (this.currIndex + 0.5) - list.width / 2 - this.scrollLeft
						lineLeft = el.width / 2 + (-list.left) + el.left - list.width / 2 - this.scrollLeft
						this.tabsScrollLeft = this.scrollLeft + lineLeft
						// this.tabsScrollLeft = uni.getSystemInfoSync().windowWidth
						// console.log('this.tabsScrollLeft = ', this.tabsScrollLeft)
					})
				})
			},
			getElementData(el, callback){
				uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
					callback(data[0]);
				});
			},
			scroll(e) {
				this.scrollLeft = e.detail.scrollLeft;
			}
		}
	}
</script>

<style lang="scss">
	
	.tabBlock {
		position: relative;
		background: #fff;
		.my_scroll_view {
			::-webkit-scrollbar {
				/* 隐藏滚动条，但依旧具备可以滚动的功能 */
				display: none;
			}
		}
		.tab {
			position: relative;
			display: flex;
			font-size: 30rpx;
			white-space: nowrap;
			&__item {
				text-align: center;
				line-height: 26px;
				color: #000;
				font-weight: bold;
				&--active {
					border: 2rpx solid transparent;
					background-color: #D3455B;
					// color: rgba(42, 130, 228, 1);
					color: #ffffff;
					font-weight: bold;
					border-radius: 35rpx;
				}
				&-title {
					border: 2rpx solid #CED4D9;
					padding: 0 25rpx;
					margin: 0 10rpx 0 0;
					border-radius: 35rpx;
				}
			}
		}
		.tab__line {
			display: block;
			height:6rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 1;
			border-radius: 3rpx;
			position: relative;
			background-color: rgba(42, 130, 228, 1);
		}
	}
</style>
