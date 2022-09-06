<template>
	<view class="tag-row">
		<view class="title">{{title}}</view>
		<view class="tag" v-for="item in tagList">
			{{item.name}}
		</view>
	</view>
</template>

<script>
import { globalConfig } from '@/config.js';
export default {
	name: 'grouped-tags',
	props: [
		'title',
		'tagList'
	],
	data() {
		return {
			
		}
	}
}
</script>

<style lang="scss" scoped>
	.tag-row {
		display: flex;
		flex-direction: row;
		margin-top: 4px;
		margin-bottom: 4px;
		.title {
			font-size: 14px;
			margin-left: 4px;
			margin-right: 8px;
			font: 12px;
			font-weight: 700;
		}
		.tag {
			margin-left: 4px;
			margin-right: 4px;
			padding-top: 2px;
			padding-left: 6px;
			padding-right: 6px;
			padding-bottom: 2px;
			background-color: #788896;
			color: #ffffff;
			font-size: 12px;
			border-radius: 8px;
		}
	}
	
</style>
