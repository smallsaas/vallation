<template>
	<view>
		<view class="box-list">
			<view class="box-list-item" v-for="(item,i) in list" :key="i">
				<view class="box-list-body">
					<view class="box-list-children">
						<view class="box-list-number">{{item.number}}</view>
						<view class="box-list-title">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"box-list",
		data() {
			return {
			};
		},
		props:{
			list:{
				number:{
					type:Number
				},
				title:{
					type:String
				},
				default(){
					return []
				}
			}
		},
		methods:{
		}
	}
</script>

<style lang="less">
	.box-list{
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		background-color: #fff;
	}
	.box-list-item{
		// flex: 1;
		width: 100%;
		text-align: center;
	}
	.box-list-body{
		width: 100%;
		// border-left: 2px solid #F3F3F3;
	}
	.box-list-children{
		width: 100%;
		margin: 15px 0;
	}
	.box-list-number{
		color: #2A82E4;
		font-size: 22px;
		font-weight: bold;
	}
	.box-list-title{
		margin-top: 8px;
		font-size: 13px;
	}
</style>
