<template>
	<view :style="[{'width': '100%', 'height': heightValue}]">
	</view>
</template>

<script>
	export default {
		props:{
			value: String
		},
		computed:{
			init(){
				this.heightValue =this.convertHeight(this.value)
			}
		},
		data(){
			return {
				heightValue:''
			}
		},
		methods:{
			//转换高度
			convertHeight(value){
				if(value){
					if(value.indexOf('[') != -1){
						return `${value.substring(1, value.length-1)}px`
					}
					return `${value}px`
				}
				return 0
			},
		}
	}
</script>

<style lang="scss">
</style>