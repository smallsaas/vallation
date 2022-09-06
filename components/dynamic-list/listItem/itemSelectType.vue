<template>
	<view class="select_type_container">
		<radio :checked="item.checked || false" @click="handleRadioChange" color="#097bd0" />
		<view class="radioName">{{item.name}}</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		name: 'itemSelectType',
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			itemIndex: {
				type: Number,
				default: -1
			}
		},
		methods: {
			handleRadioChange () {
				const checked = _.get(this.item, 'checked') || false
				this.$emit('onSelectItem', !checked, this.itemIndex)
			}
		}
	}
</script>

<style lang="less" scoped>
	.select_type_container {
		padding: 15rpx;
		background-color: #fff;
		display: flex;
		align-items: center;	
		border-bottom: 1px solid #f2f2f2;
	}
	.radioName{
		padding-left:10rpx;
		font-size: 35rpx;
	}
</style>