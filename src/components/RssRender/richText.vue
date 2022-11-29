<template>
	<view class="rich-text">
		<view class="rich-text-box">
			<textarea class="in-detail" :value="richTextValue" placeholder="请输入" :maxlength="total" @input="handleText"/>
		</view>
		<!-- 字数显示框 -->
		<view class="monitoring">
			<text>{{textLength}}/{{total}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			value: String,
			componentId: String,
			componentItemId: String,
			maxlength: String
		},
		computed:{
			init(){
				this.total = this.maxlength
				this.richTextValue = this.value || ''
			}
		},
		data(){
			return {
				richTextValue:'',
				total: '200',
				textLength: '0'
			}
		},
		methods:{
			handleText(e){
				this.richTextValue = e.detail.value
				this.textLength = e.detail.value.length
				const data = { componentId: this.componentId, id: this.componentItemId, propDefaultValue: e.detail.value}
				this.$emit('saveRichTextInputValue', data)
			},
		}
	}
</script>

<style lang="scss">
	.rich-text{
		display: flex;
		flex-direction: column;
		position: relative;
		
		.rich-text-box {
			background-color: #fff;
			padding: 20rpx;
			border: 2rpx solid #e6e6e6;
		}
		
		.in-detail{
			width: 100%;
			padding-bottom: 20px;
		}
		
		//字数监听
		.monitoring {
			// padding-right: 10rpx;
			background-color: #fff;
			display: flex;
			justify-content: flex-end;
			color: #e6e6e6;
			// border-left: 2rpx solid #e6e6e6;
			// border-right: 2rpx solid #e6e6e6;
			// border-bottom: 2rpx solid #e6e6e6;
			position: absolute;
			bottom: 8px;
			right: 15px;
		}
		
	}
</style>