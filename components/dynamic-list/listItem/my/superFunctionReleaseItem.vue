<template>
	<view :class="[`base_switch_container ${param.inputBlock ? 'van_field_input_block' : ''}`]">
	    <van-field
	      readonly
	      name="switch"
	      :label="item.name"
	      :readonly="param.readonly"
	      :disabled="param.disabled"
	      :style="param.style"
	      label-class="van_field_label"
	      :error="param.error"
	      :error-message="param['error-message'] || ''"
	    >
	    <template slot="input" style="transform: translateY(6rpx); width: 100%; display: flex;justify-content: flex-end;">
			<van-switch
				size="20"
				:checked="checked"
				@change="handleChange"
			/>
	    </template>
	    </van-field>
	</view>
</template>

<script>
	export default{
		name: 'superFunctionReleaseItem',
		props:{
			item: Object,
			param: {
			    type: Object,
			    default: function() {
			        return { 
			            inputBlock: true,
			            required: false,
			            readonly: false,
			            error: false,
			            "error-message": "",
			            style: ""
			        }
			    }
			}
		},
		data(){
			return{
			    checked: false,
			}
		},
		mounted() {
			this.checked = this.item.enabled == 1 || false
		},
		methods:{
			handleChange (e) {
				this.putFunctionRelease(e.detail)
			},
			
			putFunctionRelease(checked){
				const query = {
					...this.item,
					enabled: checked ? 1 : 0
				}
				this.$api.putSuperFunctionRelease(query).then(resp => {
					if(resp.code === 200){
						this.checked = checked
						// 判断是发布还是下架
						if(query.enabled == 1) {
						uni.showToast({
							title:query.name + ' - 发布成功',
							icon:"none"
						})
						}else{
							uni.showToast({
								title:query.name + ' - 下架成功',
								icon:"none"
							})
						}
					}else{
						uni.showToast({
							title:'操作失败',
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scess" scoped>
</style>