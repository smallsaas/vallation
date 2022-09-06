<template>
		<uni-forms-item label="姓名" required v-if="_get(config, 'type') === 'input'">
			<uni-easyinput v-model="value" placeholder="请输入" @input="handleInput" />
		</uni-forms-item>
</template>

<script>
    import _ from 'lodash'
    export default {
        props: {
			value: [String, Number]
        },
		data() {
			return {
			}
		},
        methods: {
            handleInput (e) {
            	console.log('input = ', e.detail)
               // this.$emit("input", e.detail.value)
            }
        }
    }
</script>

<style lang="less">
</style>
