<template>
    <view :class="[`base_slider_containe ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
          name="slider"
          :label="param.label"
          :required="param.required"
          :readonly="param.readonly"
          :disabled="param.disabled"
          :style="param.style"
          :error="param.error"
          :error-message="param.error ? param['error-message'] ? param['error-message'] : '' : ''"
          label-class="van_field_label"
        >
          <view slot="input" style="width: calc(100% - 50rpx);margin: 0 25rpx;">
            <van-slider
              :disabled="param.disabled"
              use-button-slot
              @change="handleChange"
			  :value="param.value || 0"
            >
                <view class="custom_button" slot="button">
                    {{Number(param.value || 0)}}
                </view>
            </van-slider>
          </view>
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
    .base_slider_containe {
        .custom_button{
            width: 52rpx;
            color: #fff;
            font-size: 20rpx;
            line-height: 36rpx;
            text-align: center;
            background-color: #1989fa;
            border-radius: 200rpx;
        }
    }
</style>
