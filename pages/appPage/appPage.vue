<template>
	<dynamic-page :API="api"></dynamic-page>
</template>

<script>
	export default {
		data() {
			console.log('this.$config.formHost',this.$config.formHost)
			return {
				api: `${this.$config.formHost}?id=77777775`,
			}
				
		},
	}
	
</script>

<style>
</style>