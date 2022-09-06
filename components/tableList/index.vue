<template>
		<view>
			<view :style="[_get(config, 'outStyle', {})]" v-if="_get(config,'border')">
				<view class="tabTitle" v-if="tableTitle">
					{{tableTitle}}
				</view>
				<view :style="{overflow:'scroll',width:'100%'}">
					<view class="body_table" :style="{width:'800px',padding:'25rpx'}"> 
						<!-- 表头行 -->
						<view class="outer">
							<view class="rows">
								<view class="columns1" v-for="(item,i) in config.headerTitle" :key="i"
								:style="{borderRight: right == i ? '' : '1px solid black'}">
									<view class="text_header">{{item}}</view>
								</view>
							</view>
						</view>
						<!-- 表格的数据行-->
						<view class="outer" :style="{borderTop:'none'}">
							<view class="rows" v-for="(item,index) in list" :key="index"
							:style="{borderBottom: length == index ? '' : '1px solid black'}">
								<view 
								class="columns2" 
								v-for ="(item1,index1) in columnName" :key="index" 
								:style="{borderRight: right == index1 ? '' : '1px solid black'}">
									<view class="text_data">
									{{item[item1]}}
								</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view :style="[_get(config, 'outStyle', {})]" v-else>
				<view class="tabTitle" v-if="tableTitle">
					{{tableTitle}}
				</view>
				<view :style="{overflow:'scroll',width:'100%'}">
					<view class="body_table" :style="{width:'150%',padding:'25rpx'}"> 
						<!-- 表头行 -->
						<view class="outer1">
							<view class="rows1">
								<view class="columns11" v-for="(item,i) in config.headerTitle" :key="i">
									<view class="text_header">{{item}}</view>
								</view>
							</view>
						</view>
						<!-- 表格的数据行-->
						<view class="outer1" :style="{borderTop:'none'}">
							<view class="rows2" v-for="(item,index) in list" :key="index">
								<view 
								class="columns22" 
								v-for ="(item1,index1) in columnName" :key="index">
									<view class="text_data">
									{{item[item1]}}
								</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import _ from 'lodash'
	import {globalConfig} from '@/config.js'
	import { formatApiParams } from '@/components/utils/compxTools.js'
	export default {
		name:'tableList',
		props:{
			config:Object
		},
		data(){
			return {
				statusBarHeight: this.$statusBarHeight,
				list:[],
				length:0,
				right:0,
				columnName:[],
				tableTitle:'',
			}
		},
		mounted() {
			console.log('this.config===',this.config)
			this.getTableList()
		},
		methods: {
			_get (data, field, value) {
				return _.get(data, field, value)
			},
			// 格式化loadApi
			formatLoadApi (api) {
			  // console.log('formatLoadApi = ', api)
			  let that = this
			  let apistring
			 
			  if (api.indexOf("{{") !== -1) {
				let string = api.split("{{")[1]
				let string1 = string.split("}}")[0]
				if (string1.indexOf('.') !== -1) {
				  let cache = that.$cache(string1)
				  let itemString = string1.split(".")[1]
				  let value = cache[itemString]
				  apistring = api.replace(`{{${string1}}}`, value)
				} else {
				  let cache = that.$cache(string1)
				  // console.log(cache, "cache", string1)
				  apistring = api.replace("{{" + string1 + "}}", cache)
				}
			  } else {
				  
				apistring = formatApiParams(api, this.listSearch)
			  }
			  
			  return apistring
			},
			//获取表格的列表
			 getTableList(){
				this.listLoading = true
				uni.showLoading({ title:'', mask: true })
				// console.log(this.formatLoadApi(_.get(this.config,'loadApi')),"loadAPi")
				let that = this
				uni.request({
				  url: this.$config.endpoint + this.formatLoadApi(_.get(this.config, 'loadApi')),
				  method: _.get(this.config, 'method', 'GET'),
				  data: {},
				  header: {
				    Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`
				  },
					complete: (res) => {
						uni.hideLoading()
						console.log('res',res)
							if(res.data.code == 200 || res.code == 200){
							console.log('我成功了！')
							const data = _.get(res,'data.data')
							const listField = _.get(this.config,'response.list')
							that.columnName = _.get(this.config,'response.columnName')
							this.tableTitle = _.get(this.config, 'tableTitle', '')
							this.right = this.tableTitle.length
							this.list = _.get(data,listField,[])
							this.length = this.list.length-1
						}
					}
				})
			 }
		}
	}
</script>

<style lang="scss" scoped>
	.tabTitle{
		font-size: 35rpx;
		font-weight: bold;
		padding-top: 25rpx;
		padding-left:25rpx;
	}
	.body_table{
		margin-bottom: 35rpx;
		.outer{
			// background-color: white;
			border:1px solid black;
			.rows{
				display: flex;
			}
		}
		.columns1,.columns2{
			height: 70rpx;
			display: flex;
			justify-content: center;
			width:158px
		}
		.text_header, .text_data{
			font-size: 25rpx;
			line-height: 70rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.rows2{
			display: flex;
			background-color: white;
		}
		.rows1{
			background-color:  #d1b5ee;
			display: flex;
		}
		.rows2:nth-child(even){
			background-color: #f1e1ff;
			display: flex;
		}
		.text_header {
			font-weight: bold;
		}
		.columns11,.columns22{
			height: 70rpx;
			display: flex;
			justify-content: center;
		}
		.columns11{
			width: 25%;
			color:black;
		}
		.columns22{
			width: 25%;
		}
	}
	
</style>