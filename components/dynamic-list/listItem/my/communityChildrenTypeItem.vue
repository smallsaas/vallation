<template>
	<view class="content" :style="[changeBg()]">
		<view class="content-txt" >
			{{item.name}}
		</view>
	</view>
</template>
<script>
	export default {
		name: 'communityChildrenTypeItem',
		data(){
			return {
				bgList:{
					0: {'backgroundColor': '#ff7675', 'color': '#ffffff'},
					1: {'backgroundColor': '#fab1a0', 'color': '#ffffff'},
					2: {'backgroundColor': '#fdcb6e', 'color': '#ffffff'},
					3: {'backgroundColor': '#00b894', 'color': '#ffffff'},
					4: {'backgroundColor': '#0984e3', 'color': '#ffffff'},
					5: {'backgroundColor': '#00cec9', 'color': '#ffffff'},
					6: {'backgroundColor': '#6c5ce7', 'color': '#ffffff'},
					7: {'backgroundColor': '#fd79a8', 'color': '#ffffff'},
					8: {'backgroundColor': '#00b894', 'color': '#ffffff'},
					9: {'backgroundColor': '#0984e3', 'color': '#ffffff'},
				}
			}
		},
		props: {
			index: Number,
			item: Object,
		},
		computed: {

		},
		methods: {
			changeBg(){
				if(this.index > this.bgList.length){
					return this.bgList[this.index%this.bgList.length]
				}else{
					return this.bgList[this.index]
				}
			}
		},
		mounted(){
			// console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less" scoped>
	.content {
		height: 60rpx;
		min-width: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #bfbfbf; 
		// border: 4rpx solid #cdcdcd;
		border-radius: 30rpx;
		margin: 28rpx;
		background-color: #ffffff;
		
		.content-txt {
			font-weight: bold;
			font-size: 28rpx;
		}
	}
</style>
