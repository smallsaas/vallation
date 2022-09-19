<template>
	<view>router页面</view>
</template>

<script>
	export default{
		name:"routerItem",
		props: {
			obj:{
				type:Object,
				require:false
			}
		},
		created(){
			console.log(this.obj);
		}
	}
</script>

<style>
</style>