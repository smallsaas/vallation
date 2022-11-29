<template>
	<block>
		<view class="content" :style="[{'backgroundColor': '#ff7675', 'color': '#ffffff'}]" v-if="item.status === 1">
			<view class="content-txt" >
				{{item.name || '-'}}
			</view>
		</view>
		<view class="content" :style="[{'backgroundColor': '#C2CFD7', 'color': '#ffffff'}]" v-if="item.status === 0">
			<view class="content-txt" >
				{{item.name || '-'}}
			</view>
		</view>
		<view class="content" :style="[changeBg()]" v-if="!item.status && item.status !== 0">
			<view class="content-txt" >
				{{item.name}}
			</view>
		</view>
	</block>
</template>
<script>
	export default {
		name: 'capsuleItem',
		data(){
			return {
				bgList:{
					0: {'backgroundColor': '#ff7675', 'color': '#ffffff'},
					1: {'backgroundColor': '#fab1a0', 'color': '#ffffff'},
					2: {'backgroundColor': '#fdcb6e', 'color': '#ffffff'},
					3: {'backgroundColor': '#00b894', 'color': '#ffffff'},
					4: {'backgroundColor': '#1c54ee', 'color': '#ffffff'},
					5: {'backgroundColor': '#00cec9', 'color': '#ffffff'},
					6: {'backgroundColor': '#6c5ce7', 'color': '#ffffff'},
					7: {'backgroundColor': '#ff79a8', 'color': '#ffffff'},
					8: {'backgroundColor': '#00b894', 'color': '#ffffff'},
					9: {'backgroundColor': '#0094e3', 'color': '#ffffff'},
					10: {'backgroundColor': '#dd001b', 'color': '#ffffff'},
					11: {'backgroundColor': '#fd6c37', 'color': '#ffffff'},
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
			console.log('this.item = ', this.item)
		}
	}
</script>
<style lang="less" scoped>
	.content {
		height: 60rpx;
		min-width: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #bfbfbf; 
		// border: 4rpx solid #cdcdcd;
		border-radius: 30rpx;
		margin: 20rpx;
		background-color: #ffffff;
		padding: 0rpx 20rpx;
		
		.content-txt {
			font-weight: bold;
			font-size: 28rpx;
		}
	}
</style>
