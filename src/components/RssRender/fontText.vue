<template>
	
	<block>
		<view class="title" v-if="type === 'title'"  :key="index">
			<p :class="[`textarea-content  ${cssName || ''}`]" :style="[styles || {}]">
				{{text}}
			</p>
		</view>
		
		<view class="title" v-if="type === 'css'" >
			<p class="textarea-content" :style="[styles || {}]" >
				{{text}}
			</p>
		</view>
	</block>
	
	
</template>

<script>
	export default {
		props:{
			type: String,
			text: String,
			styles: Object,
			cssName: Object
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.title{
		// height: 50px;
		// line-height: 50rpx;
		// display: flex;
		// flex-direction: column;
		// align-items: flex-start;
		// justify-content: center;
		// font-size: 30rpx;
		color: #000000cc;
		// font-weight: bold;
		// padding-bottom: 16rpx;
	}
	
	.textarea-content{
		width: 100%;
		white-space: pre-line;
	}
</style>