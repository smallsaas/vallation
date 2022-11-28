<template>
	<dynamic-page :API="api" ></dynamic-page>
</template>

<script>
	export default {
		name: 'rss',
		onLoad(e) {
		},
		data(){
			return {
				cacheApi:`${this.$config.formHost}?id=1028885961`,
				api: `${this.$config.formHost}?id=1028885961`,
				routeParams: {},
			}
		},
		onShow() {
			this.api = this.cacheApi
		},
		onHide() {
			this.api = ''
			this.routeParams = {}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>