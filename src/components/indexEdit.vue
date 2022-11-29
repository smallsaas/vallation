<template>
	<dynamic-page :API="api" v-if="api" :routeParams="routeParams"></dynamic-page>
</template>

<script>
	export default {
		name: 'rssEdit',
		onLoad(e) {
		},
		data(){
			return {
				cacheApi:`${this.$config.formHost}?id=1028885962`,
				api: `${this.$config.formHost}?id=1028885962`,
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