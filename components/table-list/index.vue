<template>
		<view>
		<view class="tabTitle">
			{{title}}
		</view>
		<view class="body_table">
			<!-- 表头行 -->
			<view class="outer">
				<view class="rows1">
					<view class="columns1" v-for="(item,i) in headerList" :key="i">
						<text class="text_header">{{item}}</text>
					</view>
				</view>
			</view>
			<!-- 表格数据行-->
			<view class="outer">
				<view class="rows2" v-for="item in list" :key="item.id">
					<view class="columns2" v-if="item.index">
						<text class="text_data">{{item.index}}</text>
					</view>
					<view class="columns2" v-if="item.area">
						<text class="text_data">{{item.area}}</text>
					</view>
					<view class="columns2" v-if="item.houseType">
						<text class="text_data">{{item.houseType}}</text>
					</view>
					<view class="columns2" v-if="item.houseNumber">
						<text class="text_data">{{item.houseNumber}}</text>
					</view>
				</view>
				<view class="rows2" v-for="(val,key,i) in firstTotal" :key="i">
					<view class="title_content">{{key}}</view>
					<view class="total_number">{{val}}</view>
				</view>
			</view>
		</view>
		</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		name:'tableList',
		props:{
		   param: {
			   type: Object,
			   default: function () {
				   return {
				   }
			   }
		   },
		   list: {
			   type: Array,
			   default: function () {
				   return []
			   }
		   },
		   headerList: {
			   type: Array,
			   default: function () {
				   return []
			   }
		   },
		  title:String,
		  outStyle: Object,
		  firstTotal:{
			 type: Object,
			 default: function () {
			   return {
			   }
			 } 
		  }
		},
		data(){
			return {
				statusBarHeight: this.$statusBarHeight,
			}
		},
		mounted() {
		},
		methods: {
			_get (data, field, value) {
				return _.get(data, field, value)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.tabTitle{
		font-size: 40rpx;
		font-weight: bold;
		color:#1c0795;
		padding-bottom: 30rpx;
	}
	.body_table{
		margin-bottom: 35rpx;
		.outer{
			background-color: white;
			.rows1,.rows2{
				display: flex;
			}
		}
		.rows1{
			background-color:  #d1b5ee;
		}
		.rows2:nth-child(even){
			background-color: #f1e1ff;
		}
		.columns1,.columns2{
			height: 70rpx;
			display: flex;
			justify-content: center;
		}
		.columns1{
			flex: 1;
			color:black;
		}
		.columns2{
			flex: 1;
		}
		.text_header, .text_data{
			font-size: 30rpx;
			line-height: 70rpx;
		}
		.text_header {
			font-weight: bold;
		}
		.title_content,.total_number{
			font-size: 30rpx;
			height: 70rpx;
			line-height: 70rpx;
			display: flex;
			justify-content: center;
		}
		.title_content{
			width: 75%;
		}
		.total_number{
			width:25%;
		}
	}
	
</style>