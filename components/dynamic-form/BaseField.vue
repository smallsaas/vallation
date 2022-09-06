<template>
    <view :class="[`base_field_containe ${param.inputBlock ? 'van_field_input_block' : ''}`]">
        <van-field
           autosize
          :label="param.label"
          :required="param.required"
          :left-icon="param['left-icon']"
          :right-icon="param['right-icon']"
          :show-word-limit="param['show-word-limit']"
          :error="param.error === true"
          :error-message="param['error-message'] || ''"
          :style="param.style"
          label-class="van_field_label"
        >
			<template slot="input" style="width: 100%;">
				<input 
					v-if="param.type !== 'textarea'"
					:type="param.type"
					:placeholder="param.placeholder"
					:placeholder-style="param['placeholder-style'] || 'color: #C8C9CC'"
					:disabled="param.disabled || param.readonly"
					:maxlength="param.maxlength || -1"
					:password="param.password"
					:value="param.value"
					@input="handleInput"
				/>
				<textarea 
					v-else
					auto-height
					:placeholder="param.placeholder"
					:placeholder-style="param['placeholder-style'] || 'color: #C8C9CC'"
					:disabled="param.disabled || param.readonly"
					:maxlength="param.maxlength || -1"
					:value="param.value"
					@input="handleInput"
				/>
			</template>
		</van-field>
    </view>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: {
            param: {
                type: Object,
                default: function() {
                    return { 
                        inputBlock: false,
                        type: 'text',
                        value: '',
                        placeholder: '请填写',
                        required: false,
                        clearable: false,
                        maxlength: -1,
                        "show-word-limit": false,
                        readonly: false,
                        disabled: false,
                        password: false,
                        error: false,
                        "error-message": "",
                        style: ""
                    }
                }
            }
        },
		data() {
			return {
				focus: false
			}
		},
        methods: {
            handleInput (e) {
               this.$emit("input", e.detail.value)
            }
        }
    }
</script>

<style lang="less">
    @import "./common.less";
    .base_field_container {}
</style>
