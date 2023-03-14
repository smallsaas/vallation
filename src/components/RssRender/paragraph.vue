<template>
	<view :class="[`paragraph ${cssName || ''}`]" :style="[styles || {}]" >
		{{text}}
	</view>
</template>

<script>
	export default {
		props:{
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
	.paragraph{
		border-left-style: solid;
		border-left-width: 5px;
		border-left-color: #013CFF;
		// border-left-color: #E4372F;
		color: #013CFF;
		padding-left: 6px;
		font-size: 28px;
	}
</style>