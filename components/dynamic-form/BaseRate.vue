<template>
	<view :class="[`base_rate_containe ${param.inputBlock ? 'van_field_input_block' : ''}`]">
		<van-field
		  name="rate"
		  :label="param.label"
		  :required="param.required"
		  :readonly="param.readonly"
		  :disabled="param.disabled"
		  :style="param.style"
		  :error="param.error"
		  :error-message="param.error ? param['error-message'] ? param['error-message'] : '' : ''"
		  label-class="van_field_label"
		>
		  <template slot="input">
		    <van-rate
		      :readonly="param.readonly"
		      :disabled="param.disabled"
		      :value="param.value"
			  @change="handleChange"
		    />
		  </template>
		</van-field>
    </view>
</template>

<script>
    export default {
        props: {
            param: {
                type: Object,
                default: function() {
                    return { 
                        inputBlock: false,
                        checked: false,
                        required: false,
                        readonly: false,
                        error: false,
                        "error-message": '',
                        style: ""
                    }
                }
            }
        },
        methods: {
            handleChange (e) {
               this.$emit('change', e.detail)
            }
        }
    }
</script>

<style lang="less">
    @import './common.less';
    .base_rate_containe {

    }
</style>
