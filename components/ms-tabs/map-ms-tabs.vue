<template>
	<view class="tabBlock" v-if="list.length > 0">
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
					  :class="['tab__item', {'tab__item--active': currentIndex === index}]"
					  :style="{color: (currentIndex === index ? `${itemColor}`: '')}"
					  id="tab_item"
					  @click="select(item, index)"
				>
					<view class="tab__item-title">
						<slot name="title" :title="item.title"></slot>
					</view>
					<view v-if="!showTitleSlot" class="tab__item-title">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="tab__line" 
				  :style="{background: lineColor, width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			value: [Number, String],
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
			}
		},
		data() {
			return {
				currentIndex: 0,
				lineStyle: {},
				scrollLeft: 0,
				tabsScrollLeft: 0,
				duration: 0.25
			}
		},
		computed: {
			showTitleSlot() {
				return this.$scopedSlots.title
			}
		},
		watch: {
			list() {
				this.setTabList()
			},
			value() {
				this.currentIndex = this.value
				this.setTabList()
			}
		},
		mounted() {
			this.currentIndex = this.value
			this.setTabList()
			if(!this.lineAnimated) {
				this.duration = 0
			}
			// console.log(this.$scopedSlots)
		},
		methods: {
			select(item, index) {
				this.$emit('selected', index)
			},
			setTabList() {
				// this.$nextTick(()=>{
				// 	if(this.list.length > 0) {
				// 		this.setLine()
				// 		this.scrollIntoview()
				// 	}
				// })
				if(this.list.length > 0) {
					this.setLine()
					this.scrollIntoview()
				}
			},
			setLine() {
				let lineWidth = 0, lineLeft = 0
				this.getElementData(`#tab_item`, (data)=> {
					let el = data[this.currentIndex]
					// lineWidth = el.width / 2
					
					const item = this.list[this.currentIndex]
					lineWidth = item.title.length * 26
					
					// lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
					lineLeft = el.width / 2 + (-data[0].left) + el.left
					this.lineStyle = {
						width: `${lineWidth}rpx`,
						transform: `translateX(${lineLeft}px) translateX(-50%)`,
						transitionDuration: `${this.duration}s`
					};
				})
			},
			scrollIntoview() {  // item滚动
				let lineLeft = 0;
				this.getElementData('#tab_list', (data)=> {
					let list = data[0]
					this.getElementData(`#tab_item`, (data)=> {
						let el = data[this.currentIndex]
						// lineLeft = el.width * (this.currentIndex + 0.5) - list.width / 2 - this.scrollLeft
						lineLeft = el.width / 2 + (-list.left) + el.left - list.width / 2 - this.scrollLeft
						this.tabsScrollLeft = this.scrollLeft + lineLeft
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
			font-size: 28rpx;
			// padding-bottom: 8rpx;
			white-space: nowrap;
			&__item {
				flex: 1;
				// width: 30%;
				text-align: center;
				line-height: 80rpx;
				// color: $uni-text-color;
				color: #505050;
				font-weight: bold;
				&--active {
					// color: $uni-color-primary;
					color: rgba(42, 130, 228, 1);
					font-weight: bold;
				}
				&-title {
					margin: 0 30rpx;
				}
			}
		}
		.tab__line {
			display: block;
			height:6rpx;
			position: absolute;
			// bottom: 15rpx;
			bottom: 0;
			left: 0;
			z-index: 1;
			border-radius: 3rpx;
			position: relative;
			// background: $uni-color-primary;
			background-color: rgba(42, 130, 228, 1);
		}
	}
</style>
