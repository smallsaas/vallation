<template>
	
	<view class="form-content">
		<base-input v-if="_get(config, 'type') === 'input'"/>
	</view>
	
</template>

<script>
	import BaseInput from './fromItems/BaseInput.vue'
	export default {
		name: "formItemList",
		components:{
			BaseInput
		},
		props:{
			config:Object
		},
		data(){
			return {
				baseFormData:{}
			}
		},
		computed:{
			init(){
			}
		},
		mounted() {
		},
		methods:{
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			handleInput (e) {
				console.log('input = ', e.detail)
			   // this.$emit("input", e.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-content{
		padding: 0 10px;
	}
</style>