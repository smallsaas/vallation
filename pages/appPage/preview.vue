<template>
	<dynamic-page :API="api" v-if="api"></dynamic-page>
</template>

<script>
	export default {
		name: 'preview',
		data(){
			return {
				api: 'https://static.smallsaas.cn/dev/auto/preview/current/form',
			}
		},

	}
</script>

<style>
</style>