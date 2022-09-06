<template>
	<view>
		<input-search-filter
			v-if="getTypeName() === 'inputSearchFilter'"
			:config="{
				...config
			}"
			@search="search"
		/>
	</view>
</template>

<script>
	import _ from 'lodash'
	import inputSearchFilter from './inputSearchFilter.vue'
	export default {
		name: 'customInputSearch',
		components:{
			inputSearchFilter
		},
		props:{
			config:{
				type: Object,
				default: function(){
					return {}
				}
			},
		},
		data(){
			return {
				
			}
		},
		methods:{
			getTypeName(){
				return _.get(this.config.multiFilterModule, 'name', '')
			},
			search(data){
				this.$emit('search', data)
			}
		}
	}
</script>

<style>
</style>