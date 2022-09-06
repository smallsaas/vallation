<template>
    <view :class="[`base_switch_container ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
          readonly
          name="switch"
          :label="param.label"
          :required="param.required"
          :readonly="param.readonly"
          :disabled="param.disabled"
          :style="param.style"
          label-class="van_field_label"
          :error="param.error"
          :error-message="param['error-message'] || ''"
        >
        <template slot="input" style="transform: translateY(6rpx);">
            <van-switch
                size="20"
				:disabled="param.disabled || param.readonly"
				:checked="param.value"
			    :active-value="param.activeValue"
			    :inactive-value="param.inactiveValue"
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
                        inputBlock: true,
                        checked: false,
                        required: false,
                        readonly: false,
                        error: false,
                        "error-message": "",
                        style: ""
                    }
                }
            }
        },
		mounted() {
		},
        methods: {
            handleChange (e) {
                this.$emit("change", e.detail)
            }
        }
    }
</script>

<style lang="less" >
    @import "./common.less";
    .base_switch_container {
        
    }
</style>
