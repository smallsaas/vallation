<template>
	<view class="price">
		<view class="price-number">{{number || 0}}</view>
		<view class="price-unit" v-if="unit">{{unit || '-'}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			value: String
		},
		computed:{
			init(){
				if(this.value){
					if(this.value.indexOf('//') != -1){
						this.number = this.getPriceValue(this.value, 0)
						this.unit = this.getPriceValue(this.value, 1)
					}else{
						this.number = this.value
					}
				}
			}
		},
		data(){
			return {
				number:'',
				unit:''
			}
		},
		methods:{
			//价格转换
			getPriceValue(data, index){
				const list = data.split('//')
				return list[index]
			},
		}
	}
</script>

<style lang="scss">
	.price{
		display: flex;
		flex-direction: row;
		align-items: center;
		.price-number{
			font-size: 40rpx;
			color: red;
			margin-right: 4px;
		}
		.price-unit{
			font-size: 30rpx;
			color: black;
		}
	}
</style>