<template>
	<view class="base">

		<view class="tip-title">
			<text>ToggleItem组件</text>
		</view>
		<view class="componentContainer-list">
			<view v-for="(item,index) of toggleItemParam">
				<ToggleItem :item="item"></ToggleItem>
			</view>
		</view>

		<view class="tip-title">
			<text>BoxItem组件</text>
		</view>
		<view class="componentContainer-grid">
			<view v-for="(item,index) of boxItemParam">
				<BoxItem :item="item"></BoxItem>
			</view>
		</view>

		<view class="tip-title">
			<text>CardItem组件</text>
		</view>
		<view class="componentContainer-grid" style="grid-template-columns: repeat(2, 1fr);">
			<view v-for="(item,index) of cardItemParam">
				<CardItem :item="item" :container="cardContainer"></CardItem>
			</view>
		</view>

		<view class="tip-title">
			<text>MagicItem组件</text>
		</view>
		<view class="componentContainer-grid">
			<view v-for="(item,index) of magicItemParam">
				<MagicItem :item="item" :container="magicContainer"></MagicItem>
			</view>
		</view>

		<view class="tip-title">
			<text>RowItem</text>
		</view>
		<view class="componentContainer-list">
			<view v-for="(item,index) of rowItemParam">
				<RowItem :item="item"></RowItem>
			</view>
		</view>

		<view class="tip-title">
			<text>SubtitleCardItem组件</text>
		</view>
		<view class="componentContainer-grid" style="background-color: rgba(255, 255, 255, 0.1);grid-template-columns: repeat(2,1fr);">
			<view v-for="(item,index) of subtitleCardItemParam">
				<SubtitleCardItem :item="item"></SubtitleCardItem>
			</view>
		</view>

	</view>
</template>

<script>
	import ToggleItem from '../wxcomponents/auto-wx-card/ToggleItem.vue'
	import BoxItem from '../wxcomponents/auto-wx-card/BoxItem.vue'
	import CardItem from '../wxcomponents/auto-wx-card/CardItem.vue'
	import MagicItem from '../wxcomponents/auto-wx-card/MagicItem.vue'
	import RowItem from '../wxcomponents/auto-wx-card/RowItem.vue'
	import SubtitleCardItem from '../wxcomponents/auto-wx-card/SubtitleCardItem.vue'

	export default {
		components: {
			ToggleItem,
			BoxItem,
			CardItem,
			MagicItem,
			RowItem,
			SubtitleCardItem
		},
		data() {
			return {
				// ToggleItem
				toggleItemParam: [
					{
						title: '标题',
						navon: '',
						navoff: ''
					},
					{
						title: '标题',
						navon: '',
						navoff: ''
					},
					{
						title: '标题',
						navon: '',
						navoff: ''
					},
					
				],

				// BoxItem
				boxItemParam: [
					{
						"container": {
							"background": "#f2f4f8"
						},
						"number": "212",
						"format": "",
						"title": "标题"
					},
					{
						"container": {
							"background": "#f2f4f8"
						},
						"number": "212",
						"format": "",
						"title": "标题"
					},
					{
						"container": {
							"background": "#f2f4f8"
						},
						"number": "212",
						"format": "",
						"title": "标题"
					}
				],

				// CardItem
				cardItemParam: [{
						"container": {
							"borderRadius": "16rpx"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"title": "标题"
					},
					{
						"container": {
							"borderRadius": "16rpx"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"title": "标题"
					},
					{
						"container": {
							"borderRadius": "16rpx"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"title": "标题"
					},
					{
						"container": {
							"borderRadius": "16rpx"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"title": "标题"
					}
				],
				cardContainer: {
					"background": "#a69ef0"
				},

				// MagicItem
				magicItemParam: [{
						"container": {
							"color": "#1c0795"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"size": {
							"width": "70rpx",
							"height": "70rpx"
						},
						"title": "标题"
					},
					{
						"container": {
							"color": "#1c0795"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"size": {
							"width": "70rpx",
							"height": "70rpx"
						},
						"title": "标题"
					},
					{
						"container": {
							"color": "#1c0795"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"size": {
							"width": "70rpx",
							"height": "70rpx"
						},
						"title": "标题"
					},
				],
				magicContainer: {
					"background": "#a69ef0"
				},

				// RowItem
				rowItemParam: [{
						"container": {
							"background": "white"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"color": "#4e7d96",
						"title": "标题"
					},
					{
						"container": {
							"background": "white"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"color": "#4e7d96",
						"title": "标题"
					},
					{
						"container": {
							"background": "white"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"color": "#4e7d96",
						"title": "标题"
					},
					{
						"container": {
							"background": "white"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"color": "#4e7d96",
						"title": "标题",
						"groupFirst": true
					},
					{
						"container": {
							"background": "white"
						},
						"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
						"nav": "",
						"color": "#4e7d96",
						"title": "标题",
					}
				],

				// SubtitleCardItem
				subtitleCardItemParam: [
					{
					"container": {},
					"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
					"nav": "",
					"subtitle": "子标题",
					"title": "标题"
					}, 
					{
					"container": {},
					"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
					"nav": "",
					"subtitle": "子标题",
					"title": "标题"
					}, 
					{
					"container": {},
					"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
					"nav": "",
					"subtitle": "子标题",
					"title": "标题"
					}, 
					{
					"container": {},
					"img": "http://static.smallsaas.cn/house/2022/svg/senior/Community.svg",
					"nav": "",
					"subtitle": "子标题",
					"title": "标题"
					}, 
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base {
		display: flex;
		flex-direction: column;
		padding: 6px;

		.tip-title {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 6px;
		}

		.componentContainer-list {
			display: flex;
			flex-direction: column;
			margin-bottom: 30px;
			// background-color: rgba(255, 255, 255, 0.1);
			background-color: #707070;
			padding: 10px 10px;
			border-radius: 10px;
			box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
		}

		.componentContainer-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			margin-bottom: 30px;
			background-color: #707070;
			padding: 10px 10px;
			border-radius: 10px;
			box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.1);
		}
	}
</style>
