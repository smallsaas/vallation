<template>
	<view class="chief-container">
		<view class="chief-title" v-if="config.title">
			<text>{{ config.title }}</text>
		</view>
		<view class="sub-container">
			<view class="chief-subtitle" v-if="config.subtitle" style="margin-right: 8px;">
				<text>{{ config.subtitle }}</text>
			</view>
			<view class="tags-content" v-if="config.tags.length > 0">
				<view class="global-tag-semicircle tag-item" v-for="(item, index) in config.tags" :key="index">
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'pageTitleModule',
		props: {
			config: {
				type: Object,
				default: function() {
					return {
						title: '',
						subtitle: '',
						tags: []
					}
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.sub-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tags-content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		.tag-item {
			margin-left: 17rpx;
		}
	}
</style>
