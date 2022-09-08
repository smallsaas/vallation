<template>
	<view>编辑页面</view>
</template>

<script>
	export default {
		
		data(){
			return {
				count:'',
			
			}
		},
		
		onLoad(e) {
			console.log('进来了', e)
			this.count = e.count
		}
	}
</script>

<style>
</style>
