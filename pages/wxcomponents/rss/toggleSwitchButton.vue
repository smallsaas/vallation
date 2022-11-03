<template>
	<view class="SloganBox">
		<view class="item-box">
			<view :class="[ currentIndex === index ? 'on-type-item' : 'off-type-item' ]" v-for="(item, index) in listData" :key="index"
				@click="selected(index,item.value)"
			>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			index:Number,
			data:Array,
			binding:Object
		},
		computed:{
			init(){
				this.currentIndex = this.index >= 0 ? this.index : -1
				this.listData = this.convertBinding(this.data, this.binding)
			}
		},
		data(){
			return {
				listData:[
					{ name:'tab1', value:0 },
					{ name:'tab2', value:1 },
				],
				currentIndex: 0,
			}
		},
		methods:{
			convertBinding(data, binding){
				const nList = []
				data.map((item, index) => {
					const nItem = {}
					for(var key in binding){
						nItem[binding[key]] = item[key]
					}
					nList.push(nItem)
				})
				return nList
			},
			selected(index,value){
				this.currentIndex = index
				this.$emit('selected', index,value)
			}
		}
	}
</script>

<style lang="scss">
	// 吉屋或家具切换
	.SloganBox {
		background-color: #fff;
		padding: 20rpx 100rpx;
		border-radius: 8px;
		margin-bottom: 10px;
		font-weight: bold;
	
		.item-box {
			display: flex;
			background-color: #f2f4f8;
			border-radius: 36px;
			padding: 4px;
			
		}
	
		// 选中后显示图标
		.select-image {
			height: 40rpx;
			width: 40rpx;
			margin-right: 10rpx;
		}
	
		.off-type-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			color: #7e7e7e;
			background-color: #f2f4f8;
			height:76rpx;
			// margin: 4px;
			// border: 1px solid #8a8a8a;
			border-radius: 28px;
		}
	
		// 点击状态
		.on-type-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			background-color: #fff;
			// margin: 4px;
			color: #333;
			// border: 1px solid #0984e3;
			height: 76rpx;
			border-radius: 28px;
		}
	}
</style>