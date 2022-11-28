<template>
	<view class="base">
		<uni-table border="true" emptyText="暂无数据">

			<!-- 表头 -->
			<uni-tr>
				<uni-th v-for="(item,index) of tableHead" :key="index" align="center">
					{{item}}
				</uni-th>
			</uni-tr>

			<!-- 表行 -->
			<uni-tr v-for="(item,index) of tableRow" :key="index">
				<uni-td v-for="(subitem,subindex) of item" :key="subindex" align="center">
					{{subitem}}
				</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tableHead: [], //表头
				tableRow: [], //表行
			}
		},
		props: {
			tableData: Array
		},
		mounted() {
			this.dataBackage()
		},
		methods: {
			// 数据封装处理
			dataBackage() {
				const that = this
				const data = this.tableData
				console.log('data', data)
				// 取出表头和表行，通过','分解字符串为数组
				for (let i = 0; i < data.length; i++) {
					if (data[i].optionName === 'tableHeader') {
						that.tableHead = data[i].propDefaultValue.split(',')
					} else if (data[i].optionName === 'tableData') {
						let rowData = data[i].propDefaultValue.split(',')
						that.tableRow.push(rowData)
					}
				}
			}
		}
	}
</script>

<style>
	.base {
		display: flex;
		margin: 10px 0px;
	}
</style>
