<template>
	<view class="search_box">
		<view class="search_input">
			<input 
				type="input" 
				class="search-input-box" 
				v-model="inputValue" 
				adjust-position="false"
				:placeholder="config.options.placeholder || '请输入...'"
				@focus="onFocus"
				@blur="onBlur"
				@input="handleChangeValue"
			/>
			<view class="search_action">
				<image class="delete_btn" :src="delBtnIconUrl" v-if="showDelBtn"  @click="del" />
				<image class="search_btn" :src="searchBtnIconUrl" @click="search"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'inputSearchFilter',
		props:{
			config:{
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		computed:{
			init(){
				// console.log('this.config == ', this.config)
			}
		},
		data(){
			return {
				inputValue:'',
				searchBtnIconUrl: `${this.$config.staticImgEndpoint}/2022/image/search-icon.png`,
				delBtnIconUrl: `${this.$config.staticImgEndpoint}/2022/image/delete-icon.png`,
				showDelBtn: false
			}
		},
		methods:{
			onFocus(){
				if(this.inputValue){
					this.showDelBtn = true
				}
			},
			onBlur(){
				this.showDelBtn = false
			},
			handleChangeValue(e){
				if(e.detail.value){
					this.showDelBtn = true
				}else{
					this.showDelBtn = false
				}
			},
			search(){
				const data = {}
				data[this.config.field] = this.inputValue
				this.$emit('search', data)
			},
			del(){
				this.inputValue = ''
				this.showDelBtn = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.search_box{
		// position: fixed;
		// left: 0;
	  background-color: white;
	  opacity: 0.8;
	  padding: 0px 10px 0px 10px;
		// z-index: 10000;
		
		.search_input{
			margin: 5px 5px;
			width: auto;
			height: 30px;
			border-radius: 30px;
			border: 2px solid #ccc;
			position: relative;
		}
		
		.search-input-box{
			margin: 0 auto;
			// width: 80%;
			height: 30px;
			font-size: 14px;
			color: #333;
			display: flex;
			margin: 0px 70px 0 20px;
		
		}
		
		.search_action{
			position: absolute;
			top: 0;
			right: 0;
			width: 60px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: 10px;
			
			.delete_btn {
				width: 18px;
				height: 18px;
				margin-right: 15px;
			}
			
			.search_btn {
				width: 25px;
				height: 25px;
			}
		}
	}
	
</style>