<template>
	<routerItem></routerItem>
</template>

<script>
	import routerItem from "@/components/dynamic-list/listItem/autowx/routerItem.vue"
	export default {

		data() {
			return {
				count: '',
				item:null,
				routerDate:null,

			}
		},

		onLoad(e) {
			console.log('进来了', e)
			if(this.count!=null){
				this.count = e.count
				this.$api.getForm(this.count).then(res=>{
					console.log("routerDate",res);
					if(res.code===200){
						this.item = res.data
						this.analysisDate(this.item)
					}
				})
			}
			
		},
		components:{
			routerItem
		},
		methods:{
			analysisDate:function(item){
				
			}
		}
	}
</script>

<style>
</style>
