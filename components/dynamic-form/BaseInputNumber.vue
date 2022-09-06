<template>
    <view :class="[`base_input_number_container ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
          name="stepper"
          :label="param.label"
          :required="param.required"
          :readonly="param.readonly"
          :style="param.style"
          :error="param.error"
          :error-message="param.error ? param['error-message'] || '' : ''"
          label-class="van_field_label"
        >
          <van-stepper
            slot="input"
            :readonly="param.readonly"
            :disabled="param.disabled"
            :min="param.min || 0"
            :max="param.max || 9007199254740992"
            :value="param.value || 0"
			input-width="70px"
            @change="(e) => handleChange(e)"
          />
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
                        value: '',
                        required: false,
                        readonly: false,
                        error: false,
                        "error-message": "",
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
    @import "./common.less";
    .base_input_number_container {
      .stepper_input {
          color: red;
          transform: translateX(-110%);
          position: relative;
          display: flex;
      }  
    }
</style>
