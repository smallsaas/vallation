<template>
	<view class="base">

		<uni-table border="true">
			<!-- 表格头 -->
			<uni-tr>
				<uni-th align="center">
					<view style="display: flex; flex-wrap: nowrap;justify-content: center;align-items: center;" @click="openEditTabHeadPopup()">
						<!-- <tetx>+</tetx> -->
						<image :src="editIcon" style="width: 18px;height: 18px;"></image>
					</view>
				</uni-th>
				<uni-th align="center" v-for="(item,index) of tableHead" :key="index">{{item}}</uni-th>
			</uni-tr>

			<!-- 表格行 -->
			<uni-tr v-for="(item,index) of tableRow" :key="index">
				<!-- 编辑格 -->
				<uni-td align="center">
					<view style="display: flex; flex-wrap: nowrap;justify-content: center;align-items: center;">
						<image class="editIcon" :src="editIcon" @click="openEditRowPopup(index)"></image>
						<image class="deleteIcon" :src="deleteIcon" @click="deletaTableRow(index)"></image>
					</view>
				</uni-td>
				<!-- 数据显示格 -->
				<uni-td align="center" v-for="(subitem,subindex) of item" :key="subindex">
					<view v-if="subitem == ''">{{subitem}}</view>
					<view class="table-text" v-else>{{subitem}}</view>
				</uni-td>
			</uni-tr>
		</uni-table>

		<!-- 增加行按钮 -->
		<view class="inincrease-row-button" @click="addTableRow()">
			<image class="increaseIcon" :src="increaseIcon"></image>
		</view>


		<!-- 编辑表头标顶部题弹窗 -->
		<uni-popup ref="editTabHeadPopup" type="top" @maskClick="updateTable()">

			<view class="editTabHeadPopup">
				<view class="editTabHeadPopup-item" v-for="(item,index) of tableHead" :key="index">
					<input class="editTabHeadPopup-item-input" v-model="currentTabHead[index]" maxlength="6"/>
					<!-- <view class="editTabHeadPopup-item-delete" @click="deleteTableHead(index)">-</view> -->
					<image style="margin-left: 6px;" class="deleteIcon" :src="deleteIcon" @click="deleteTableHead(index)" /></image>
				</view>

				<!-- 增加表头按钮 -->
				<view class="editTabHeadPopup-addButton" @click="addTableHead()">
					<image :src="increaseIcon" style="width: 20px;height: 20px;"></image>
				</view>
				
				<!-- 保存按钮 -->
				<!-- <view class="updateButton" @click="updateTable()">
					保存
				</view> -->
			</view>

		</uni-popup>

		<!-- 编辑行顶部弹窗 -->
		<uni-popup ref="editRowPopup" type="top" @maskClick="updateRowData()">

			<view class="editRowPopup">
				<view class="editRowPopup-item" v-for="(item,index) of tableHead" :key="index">
					<view class="editRowPopup-item-title">{{item}}</view>
					<input class="editRowPopup-item-input" v-model="currentRow[index]" />
				</view>
				
				<!-- <view class="updateButton" @click="updateRowData()">
					保存
				</view> -->
			</view>

		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			tableData: Array,
			tableId: Number,
			rssId: Number
		},
		data() {
			return {
				// 表格头数据
				tableHead: [],
				// 表格头id
				tableHeadId: '',
				// 表格行数据
				tableRow: [],
				// 行id列表数据,缓存行数据的id，用作更新数据时使用
				rowIdList: [],
				// 当前行数据的下标
				currentRowIndex: '',

				increaseIcon: `${this.$config.staticImgEndpoint}/2022/svg/houseAppIcon/increase.svg?color=707070`, // 增加按钮图标
				increaseIcon_two: `${this.$config.staticImgEndpoint}/2022/svg/houseAppIcon/increase-2.svg?color=707070`, // 增加按钮图标
				editIcon: `${this.$config.staticImgEndpoint}/2022/svg/houseAppIcon/editText.svg?color=707070`, //编辑按钮
				deleteIcon: `${this.$config.staticImgEndpoint}/2022/svg/houseAppIcon/dustbin.svg?color=707070`, //删除按钮
				currentTabHead: [], // 当前表头标题
				currentRow: [], // 当前选择要修改的行
			}
		},
		watch: {
			// 监听“tableData”表数据
			tableData: {
				handler(newVal,oldVal) {
					// 如果变换了则重新封装表数据，更新数据
					this.dataBackage()
				}
			}
		},
		mounted() {
			this.dataBackage()
		},
		methods: {
			// 数据封装处理
			dataBackage() {
				const that = this
				const data = that.tableData
				let idList = []
				let rowList = []
				// 取出表头和表行，通过','分解字符串为数组
				for (let i = 0; i < data.length; i++) {
					if (data[i].optionName === 'tableHeader') {
						that.tableHeadId = data[i].id
						that.tableHead = data[i].propDefaultValue.split(',')
					} else if (data[i].optionName === 'tableData') {
						idList.push(data[i].id)
						let rowData = data[i].propDefaultValue.split(',')
						rowList.push(rowData)
					}
				}
				that.rowIdList = idList
				that.tableRow = rowList
			},
			
			// 全表数据更新
			updateTable() {
				let params = []
				// 取出表头数据
				let HeadParams = {
					componentId: this.tableId,
					id: this.tableHeadId,
					propDefaultValue: this.tableHead.toString(),
					optionName: 'tableHeader'
				}
				params.push(HeadParams)
				// 取出行数据
				for(let i = 0 ; i < this.tableRow.length ; i++) {
					
					if(typeof(this.rowIdList[i]) == 'undefined') continue
					
					let rowParams = {
						componentId: this.tableId,
						id: this.rowIdList[i],
						propDefaultValue: this.tableRow[i].toString(),
						optionName: 'tableData'
					}
					params.push(rowParams)
				}
				
				this.$api.updateTable(this.rssId,params)
			},
			// 行数据更新
			updateRowData() {
				let rowId = this.rowIdList[this.currentRowIndex]
				// id列表中能找到对应的数据，调用修改api
				if(rowId) {
					let params = {
						componentId: this.tableId,
						propDefaultValue: this.tableRow[this.currentRowIndex].toString(),
						optionName: 'tableData'
					}
					this.$api.updateRow(this.rssId,rowId,params).then(res => {
						if(res.code == 200) {
							// 更新数据
							this.$emit('updateRss')
						} else {
							uni.showToast({
								title: '保存失败',
								icon: 'error'
							})
						}
					})
				// id列表中没有找到对应的数据，调用新增api
				} else {
					let params = {
						componentId: this.tableId,
						propDefaultValue: this.tableRow[this.currentRowIndex].toString(),
						optionName: 'tableData'
					}
					this.$api.saveRow(this.rssId,params).then(res => {
						if(res.code == 200) {
							// 更新数据
							this.$emit('updateRss')
						} else {
							uni.showToast({
								title: '保存失败',
								icon: 'error'
							})
						}
					})
				}
			},
			// 增加表头标题
			addTableHead() {
				const that = this
				let tableHead = ''
				that.tableHead.push(tableHead)
				// 增加对应的表行空数据
				for(let i = 0 ; i < this.tableRow.length ; i++){
					this.tableRow[i].push('')
				}
			},
			// 增加行
			addTableRow() {
				const that = this
				let array = []
				for (let i = 1; i <= that.tableHead.length; i++) {
					array.push('')
				}
				that.tableRow.push(array)
			},
			// 删除表头标题
			deleteTableHead(index) {
				this.tableHead.splice(index, 1)
				// 删除表头对应的列数据
				for(let i = 0 ; i < this.tableRow.length ; i++){
					this.tableRow[i].splice(index,1)
				}
			},
			// 删除行
			deletaTableRow(index) {
				// 调用api删除库中数据
				let rowId = this.rowIdList[index]
				// 如果在行id列表中能找到对应的id,则调用api删除
				if(rowId) {
					this.$api.removeRow(this.rssId,rowId).then(res => {
						if(res.code == 200){
							// 删除本地数据
							this.tableRow.splice(index, 1)
							this.rowIdList.splice(index,1)
							// 更新数据
							// this.$emit('updateRss')
						} else {
							uni.showToast({
								title: '删除失败',
								icon: 'error'
							})
						}
					})
					// 没有id则只删除本地就好
				} else {
					this.tableRow.splice(index, 1)
				}
				
			},
			
			// 打开编辑表头标题弹窗
			openEditTabHeadPopup() {
				// 根据下标获取数组中的对应数据对象，取出以作显示用，使用了v-mode绑定修改该值时会同时修改tableHead中的数据
				this.currentTabHead = this.tableHead
				this.$refs.editTabHeadPopup.open()
			},
			// 打开编辑行弹窗
			openEditRowPopup(index) {
				// 根据下标获取数组中的对应数据对象，取出以作显示用，使用了v-mode绑定修改该值时会同时修改tableRow中的数据
				this.currentRow = this.tableRow[index]
				// 取出当前tableRow的下标，用作在rowIdList中寻找对应的id
				this.currentRowIndex = index
				this.$refs.editRowPopup.open()
			},
			
			// 关闭编辑行弹窗
			closeEditRowPopup() {
				this.$refs.editRowPopup.close()
			},
			// 关闭编辑表头标题弹窗
			closeEditTabHeadPopup() {
				this.$refs.editTabHeadPopup.close()
			},
		}
	}
</script>

<style lang="scss">
	// 根容器
	.base {
		display: flex;
		flex-direction: column;
		margin: 12px 0px;
		// padding: 5px;
		// background-color: #fff;
		// border-radius: 10px;
		// box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);


		// 增加行按钮
		.inincrease-row-button {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10px;
			background-color: #e6e6e6;
			margin: 10px 20px 10px 20px;
			padding: 6px;
		}

		// 文本
		.table-text {
			color: #000000;
		}
	}

	// 行编辑顶部弹窗
	.editRowPopup {
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10px 10px 20px 10px;

		// item
		.editRowPopup-item {
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
			margin-bottom: 5px;

			// 标题
			.editRowPopup-item-title {
				width: 100px;
				color: #8a8a8a;
				margin-right: 10px;
				display: flex;
			}

			// 输入框
			.editRowPopup-item-input {
				border: 1px solid #e6e6e6;
				text-align: center;
			}
		}
	}

	// 编辑表头标题弹窗
	.editTabHeadPopup {
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 10px 10px 20px 10px;

		.editTabHeadPopup-item {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 5px;

			// 输入框
			.editTabHeadPopup-item-input {
				border: 1px solid #e6e6e6;
				text-align: center;
			}

			// 删除健
			.editTabHeadPopup-item-delete {
				margin-left: 10px;
			}
		}

		// 增加标题按钮
		.editTabHeadPopup-addButton {
			margin-top: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5px;
			background-color: #e6e6e6;
			// padding: 6px 12px;
			width: 190px;
			box-sizing: border-box;
			height: 40px;
		}
		
	}

	// 确认按钮
	.button-confirm {
		display: flex;
		padding: 0px 20px;
		color: white;
		background-color: #097bd0;
		border-radius: 10px;
		font-size: 20px;
		font-weight: 500;
		margin-top: 20px;
		width: 100px;
		justify-content: center;
	}
	
	// 保存按钮
	.updateButton {
		margin-top: 20px;
		display: flex;
		border-radius: 5px;
		font-size: 18px;
		background-color: #097bd0;
		padding: 6px 12px;
		color: white;
	}
	
	// 增加按钮图标
	.increaseIcon {
		width: 22px;
		height: 22px;
	}

	// 编辑按钮
	.editIcon {
		width: 18px;
		height: 18px;
		margin-right: 24px;
	}

	// 删除按钮
	.deleteIcon {
		width: 18px;
		height: 18px;
	}
</style>
