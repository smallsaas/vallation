<template>
	<view :style="[outStyle || {}]">
		<swiper
			class="swiper"
			:indicator-dots="indicatorDots"
			:indicator-color="param['indicator-color'] || 'rgba(0, 0, 0, .3)'"
			:indicator-active-color="param['indicator-active-color'] || '#000000'"
			:autoplay="param.autoplay === false ? false : true"
			:interval="param.interval || 5000"
			:duration="param.duration || 500"
			:circular="param.circular === true"
			:vertical="param.vertical === true"
			v-if="Array.isArray(list) && list.length > 0"
			:style="{
				height: `${swiperHeight}px`
			}"
		>
			<swiper-item v-for="(item, index) in list" :key="index">
				<navigator :url="getNavigationUrl(item.itemNavigation)" hover-class="navigator-hover"><image :src="item.img" mode="widthFix" class="swiper_image" /></navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
export default {
	props: {
		param: {
			type: Object,
			default: () => ({
				autoplay: true,
				indicatorDots: true
			})
		},
		list: {
			type: Array,
			default: () => []
		},
		outStyle: Object
	},
	computed: {
		indicatorDots() {
			if (_.get(this.param, 'indicatorDots') === false) {
				return false
			}
			if (_.isArray(this.list) && this.list.length === 1) {
				return false
			}
			return true
		}
	},
	data() {
		return {
			swiperHeight: 210
		}
	},
	mounted() {
		if (Array.isArray(this.list) && this.list.length > 0) {
			this.handleGetSwiperHeight()
		}
	},
	methods: {
		getNavigationUrl(str) {
			let text = ''
			if (str) {
				const route = str.split('?')[0]
				const query = str.split('?')[1] ? qs.parse(str.split('?')[1]) : {}
				text += `/pages${route.charAt(0) !== '/' ? '/' : ''}` + route
				if (Object.keys(query).length > 0) {
					for (const i in query) {
						if (query[i] === '') {
							query[i] = this.item[i] || ''
						}
					}
					text += '?query=' + encodeURIComponent(JSON.stringify(query))
				}
			}
			return text
		},
		handleGetSwiperHeight() {
			uni.getImageInfo({
				src: _.get(this.list, '[0].img'),
				success: res => {
					const screenWidth = uni.getSystemInfoSync().screenWidth - 20
					this.swiperHeight = (res.height * screenWidth) / res.width
				}
			})
		}
	}
}
</script>

<style lang="less">
	.swiper_image {
		height: auto;
		width: 100%;
	}
</style>
