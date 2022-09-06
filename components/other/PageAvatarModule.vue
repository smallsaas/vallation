<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		name: 'pageAvatarModule',
		props: {
			config: {
				type: Object,
				default: function() {
					return {
						avatar: '',
						title: '',
						subtitle: '',
						tags: []
					}
				}
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">

</style>
