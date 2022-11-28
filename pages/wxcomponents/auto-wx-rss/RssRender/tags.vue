<template>
	<view class="tag">
		<view :class="[`space-right-bottom ${newClassName}`]" v-for="(tagItem, tagIndex) in list" :key="tagIndex">
			{{tagItem.propDefaultValue}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: Array,
			customClassName: String
		},
		computed:{
			init(){
				if(this.customClassName){
					this.newClassName = this.customClassName
				}
			}
		},
		data(){
			return {
				newClassName: 'global-tag-background-frenchGrey'
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.tag {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		// padding: 6px 0px;
		
		.tag-item {
			padding: 4px 8px;
			border: 2px solid #CED4D9;
			border-radius: 20px;
			color: #788896;
			margin-right: 6px;
			font-size: 13px;
			font-weight: bold;
		}
		
		.space-right-bottom {
			margin-right: 8px; 
			margin-bottom: 8px;
		}
		
	}
</style>