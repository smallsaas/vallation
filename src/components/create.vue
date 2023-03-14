<template>
	
	<view class="global-container" style="padding-bottom: 125rpx;">
		
		<view class="item-container" v-for="(item, index) in rssList" :key="index">
			<view class="delete-item-icon" v-if="index >= 1" @click="delItem(index)">
				<image :src="deleteIcon" />
			</view>
			<view class="chief-container">
				<!-- <view class="chief-title">问题描述</view> -->
				<view class="input-box">
					<textarea class="in-detail" :value="item.title" placeholder="请输入" maxlength="-1" @input="(e)=>textareaInput(e, index)"/>
				</view>
				<!-- 字数显示框 -->
				<!-- <view class="monitoring">
					<text>{{textLength}}/200</text>
				</view> -->
				
				<view class="funtion-group" v-if="tagList.length > 0">
					<view class="group-list">
						<view class="group-item" v-for="(groupItem, groupIndex) in tagList" :key="groupIndex" @click="setDefaultValue(groupItem.defaultValue, index)" v-if="groupIndex < 3">
							<image :src="groupItem.icon" v-if="groupItem.icon"/>
							<view class="group-item-txt" v-if="!groupItem.icon && groupItem.name">{{groupItem.name}}</view>
						</view>
						<view class="group-item" @click="showTagMorePopup(index)">
							<view class="group-item-txt" >···</view>
						</view>
					</view>
					
					<view class="font-style-list">
						<view class="font-list-item" v-for="(styleItem, styleIndex) in fontStyleList" :key="styleIndex" @click="setDefaultValue(styleItem.defaultValue, index)" v-if="styleIndex < 2">
							{{styleItem.name}}
						</view>
						<view class="group-item" @click="showFontMorePopup(index)">
							<view class="group-item-txt" >···</view>
						</view>
					</view>
					
				</view>
				
				<!-- <view class="listCard" v-if="item.title">
					<view class="item">
						<text class="item-name">字体大小</text>
						<view class="item-content">
							<uni-easyinput type="number" v-model="item.fontSize" placeholder="请输入字体大小"></uni-easyinput>
						</view>
					</view>
					<view class="item">
						<text class="item-name">行高</text>
						<view class="item-content">
							<uni-easyinput type="number" v-model="item.lineHeight" placeholder="请输入行高"></uni-easyinput>
						</view>
					</view>
					<view class="item">
						<text class="item-name">加粗</text>
						<view class="item-content">
							<switch :checked="item.fontWeight" @change="(e)=>changeFontWeight(e, index)" color="#097BD0" style="transform:scale(0.7)"/>
						</view>
					</view>
				</view> -->
				
				<view class="image-uploading">
					<!-- 图片缩略图 -->
					<view class="thumbnail-box" v-for="(picItem,picIndex) of item.pictures" :key="picIndex" v-if="picItem.url">
						<image class="thumbnail" :src="echoImage(picItem)" @click="previewImage(picItem)" mode="aspectFit"></image>
						<image class="delete-icon" :src="deleteIcon" @click="deleteImage(picIndex, index)"></image>
					</view>
					<view class="add-image-box" @click="upoadingImage(picIndex, index)" v-if="item.pictures.length !== 9">
						<image :src="addIcon" class="add-image" />
					</view>
				</view>
			</view>
			
			
			
			
		</view>
		
		<view class="global-button-add" style="border: 2px dashed #A4B2BE" @click="addItem">
			+
		</view>
		
		<view class="sub-btn">
			<view class="global-button" @click="submitBtn">
				保存
			</view>
		</view>
		
		<!-- 展示更多tag选项 -->
		<uni-popup ref="groupTagsPopup">
			<view style="background-color: #ffffff; padding: 8px; border-radius: 8px;">
				<view class="funtion-group" style="margin-bottom: 8px;" v-if="tagList.length > 0">
					<view class="group-list">
						<view class="group-item" v-for="(groupItem, groupIndex) in tagList" :key="groupIndex" @click="setDefaultValue(groupItem.defaultValue, currentItemIndex)">
							<image :src="groupItem.icon" v-if="groupItem.icon"/>
						</view>
					</view>
				</view>
				<view class="global-button-cancel" style="border: 0; height: 60rpx;" @click="closeTagMorePopup">
					关闭
				</view>
			</view>
			
		</uni-popup>
		
		<!-- 展示更多字体样式选项 -->
		<uni-popup ref="fontStylePopup">
			<view style="background-color: #ffffff; padding: 8px; border-radius: 8px;">
				<view class="funtion-group" style="margin-bottom: 8px;" v-if="tagList.length > 0">
					<view class="group-list">
						<view class="group-item" v-for="(styleItem, styleIndex) in fontStyleList" :key="styleIndex" @click="setDefaultValue(styleItem.defaultValue, currentItemIndex)">
							<view class="group-item-txt" >{{styleItem.name}}</view>
						</view>
					</view>
				</view>
				<view class="global-button-cancel" style="border: 0; height: 60rpx;" @click="closeFontMorePopup">
					关闭
				</view>
			</view>
			
		</uni-popup>
		
	</view>
</template>

<script>
	import _ from 'lodash'
	export default {
		name:"",
		components:{
		},
		onLoad(e){
			let param = e.query?JSON.parse(decodeURIComponent(e.query)):e
			uni.setNavigationBarTitle({
				title: param.id ? '编辑':'新增'
			});
			if(param.id){
				this.rssItemId = param.id
				this.getDetail()
			}
			if(process.env.NODE_ENV === 'development'){
				this.tagList = [
					{
						id:1,
						name: '链接',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/link-icon.svg?color=272832`,
						defaultValue: '\n[] 链接 https://'
					},
					{
						id:2,
						name: '标签',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/tag-icon.svg?color=272832`,
						defaultValue: '\n;;; 标签1,标签2'
					},
					{
						id:3,
						name: '图片',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/add-img-icom.svg?color=272832`,
						defaultValue: '\n[+] '
					},
					{
						id:4,
						name: '文本',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/text-icon.svg?color=272832`,
						defaultValue: '\n</> '
					},
					{
						id:5,
						name: '表格',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/table-icon.svg?color=272832`,
						defaultValue: '\n|--| 标题\n长,宽,高\n1200mm,900mm,700mm'
					},
					{
						id:6,
						name: '=-',
						icon: '',
						defaultValue: '\n=- '
					},
					{
						id:7,
						name: '-=',
						icon: '',
						defaultValue: '\n-= '
					},
					{
						id:8,
						name: '|--',
						icon: '',
						defaultValue: '\n|-- '
					},
				]
				
				this.fontStyleList=[
					{ name: 'H1', defaultValue: '\n<H1> 标题' },
					{ name: 'H2', defaultValue: '\n<H2> 标题' },
					{ name: 'H3', defaultValue: '\n<H3> 标题' },
					{ name: 'H4', defaultValue: '\n<H4> 标题' },
					{ name: 'H5', defaultValue: '\n<H5> 标题' },
				]
			}
		},
		data(){
			return {
				addIcon:`${this.$config.staticImgEndpoint}/2022/svg/plus.svg`, //增加图片按钮图标
				deleteIcon: `${this.$config.staticImgEndpoint}/2022/svg/x-circle-fill.svg`, //删除图片按钮图标
				tagList:[
					{
						id:1,
						name: '链接',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/link-icon.svg?color=272832`,
						defaultValue: '\n[] 链接 https://'
					},
					{
						id:2,
						name: '标签',
						icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/tag-icon.svg?color=272832`,
						defaultValue: '\n;;; 标签1,标签2'
					},
					// {
					// 	id:3,
					// 	name: '图片',
					// 	icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/add-img-icom.svg?color=272832`,
					// 	defaultValue: '\n[+] '
					// },
					// {
					// 	id:4,
					// 	name: '文本',
					// 	icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/text-icon.svg?color=272832`,
					// 	defaultValue: '\n</> '
					// },
					// {
					// 	id:5,
					// 	name: '表格',
					// 	icon: `${this.$config.staticImgEndpoint}/2022/svg/rss/table-icon.svg?color=272832`,
					// 	defaultValue: '\n|--| 标题\n长,宽,高\n1200mm,900mm,700mm'
					// },
					// {
					// 	id:6,
					// 	name: '=-',
					// 	icon: '',
					// 	defaultValue: '\n=- '
					// },
					// {
					// 	id:7,
					// 	name: '-=',
					// 	icon: '',
					// 	defaultValue: '\n-= '
					// },
					// {
					// 	id:8,
					// 	name: '|--',
					// 	icon: '',
					// 	defaultValue: '\n|-- '
					// },
				],
				fontStyleList:[
					{ name: 'H1', defaultValue: '\n<H1> 标题' },
					{ name: 'H2', defaultValue: '\n<H2> 标题' },
					{ name: 'H3', defaultValue: '\n<H3> 标题' },
					{ name: 'H4', defaultValue: '\n<H4> 标题' },
					{ name: 'H5', defaultValue: '\n<H5> 标题' },
				],
				rssList:[
					{
						title:'',//内容
						fontWeight: false,
						fontSize: 14, //字体大小
						lineHeight: 20, //行高
						pictures:[]
					}
				],
				rssItemId:'',
				rssDetail:{},
				currentItemIndex: ''
			}
		},
		methods:{
			//获取详情
			getDetail(){
				const api = `/api/u/rss/master/${this.rssItemId}`
				this.$api.getRssDetail(api).then(res => {
					if(res.code === 200){
						this.rssDetail = res.data
						this.rssList = res.data.rssItemList.map(item => {
							if(item.pictures){
								item.pictures = JSON.parse(item.pictures)
							}
							return item
						})
						
						// console.log('this.rssList = ', this.rssList)
					}else{
						uni.showToast({
							title: res.message,
							icon:'none'
						})
					}
				})
			},
			//录入默认值
			setDefaultValue(defaultValue, itemIndex){
				this.rssList.map((item,index)=>{
					if(index === itemIndex){
						if(!item.title){
							item.title = defaultValue.replace('\n','')
						}else{
							item.title += defaultValue
						}
					}
				})
			},
			//提交数据
			submitBtn(){
				const dataList = _.cloneDeep(this.rssList)
				let errCount = 0
				
				//文字，图片非空判断
				for(var i=0; i < dataList.length; i++){
					if(!dataList[i].title && (!dataList[i].pictures || dataList[i].pictures.length <= 0)){
						uni.showToast({
							title: '请输入内容或上传图片',
							icon:'none'
						})
						errCount++
						break
					}
					// if(!dataList[i].pictures || dataList[i].pictures.length <= 0){
					// 	uni.showToast({
					// 		title: '请上传图片',
					// 		icon:'none'
					// 	})
					// 	errCount++
					// 	break
					// }
				}
				
				if(errCount > 0){
					return
				}
				
				dataList.map((item, index) =>  {
					
					item.fontSize = item.fontSize ? Number(item.fontSize) : 15
					item.lineHeight = item.lineHeight ? Number(item.lineHeight) : 20
					if(item.pictures && item.pictures.indexOf('[') === -1){
						item.pictures = JSON.stringify(item.pictures)
					}
					return item
				})
				// console.log('dataList == ', dataList)
				// return
				if(this.rssItemId){
					this.updateBtn(this.rssItemId, dataList)
				}else{
					this.addBtn(dataList)
				}
			},
			updateBtn(id, query){
				// this.rssDetail.rssItemList = query.map(item => {
				// 	item.rssComponentList = []
				// 	return item
				// })
				this.rssDetail.rssItemList = query
				// this.rssDetail.rssItemList = []
				this.$api.putRssData(id, this.rssDetail).then(res => {
					if(res.code === 200){
						uni.showToast({
							title: '保存成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					}else{
						uni.showToast({
							title: res.message,
							icon:'none'
						})
					}
				})
			},
			addBtn(query){
				
				this.$api.postRssData(query).then(res => {
					if(res.code === 200){
						uni.showToast({
							title: '保存成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						}, 1000)
					}else{
						uni.showToast({
							title: res.message,
							icon:'none'
						})
					}
				})
				
			},
			echoImage(item) {
				let echoImageUrl = this.$config.endpoint + item.url
				return echoImageUrl
			},
			// 上传图片
			upoadingImage(picIndex, itemIndex){
				let that = this
				uni.chooseImage({
					count:9,
					success: async function(res) {
						// 上传成功后获取图片本地路径列表
						let imagePaths = res.tempFilePaths
						// 遍历获取列表
						for(let i = 0 ; i < imagePaths.length ; i++){
							let imagePath = imagePaths[i]
							let webPath = await that.$upload('/api/u/fs/uploadfile',imagePath)
							that.rssList.map((item,index)=>{
								if(index === itemIndex){
									item.pictures.push({url: webPath})
								}
								return item
							})
							// that.rssList = newList
						}
					},
					fail: async function(res){
						console.log('上传失败或者被取消：',res)
						// uni.showToast({
						// 	title: '上传失败',
						// 	icon:'error'
						// })
					}
				})
				
			},
			// 点击预览
			previewImage(item){
				const previewImageUrl = this.$config.endpoint + item.url
				let imgsArray = [];
				imgsArray[0] = previewImageUrl;
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			// 删除图片
			deleteImage(picIndex, itemIndex){
				// this.imagePathList.splice(index,1)
				// this.$forceUpdate()
				
				this.rssList.map((item,index)=>{
					if(index === itemIndex){
						item.pictures = item.pictures.filter((pitem, pindex) => pindex != picIndex)
					}
					return item
				})
			},
			//新增item
			addItem(){
				const newItem = {
					title:'',//内容
					// fontWeight: false,
					// fontSize: 14, //字体大小
					// lineHeight: 20, //行高
					pictures:[]
				}
				this.rssList.push(newItem)
			},
			//删除item
			delItem(currentIndex){
				this.rssList = this.rssList.filter((item, index) => index != currentIndex)
			},
			changeFontWeight(e, currentIndex){
				this.rssList.map((item,index)=>{
					if(index === currentIndex){
						item.fontWeight = e.detail.value
					}
					return item
				})
			},
			textareaInput(e, currentIndex){
				this.rssList.map((item,index)=>{
					if(index === currentIndex){
						item.title = e.detail.value
					}
					return item
				})
			},
			showTagMorePopup(index){
				this.currentItemIndex = index
				this.$refs.groupTagsPopup.open()
			},
			closeTagMorePopup(){
				this.currentItemIndex = ''
				this.$refs.groupTagsPopup.close()
			},
			showFontMorePopup(index){
				this.currentItemIndex = index
				this.$refs.fontStylePopup.open()
			},
			closeFontMorePopup(){
				this.currentItemIndex = ''
				this.$refs.fontStylePopup.close()
			}
		}
	}
</script>

<style lang="scss">
	.item-container{
		position: relative;
	}
	
	.delete-item-icon{
		position: absolute;
		right: -5px;
		top: -6px;
		padding: 5px;
		
		image {
			width: 25px;
			height: 25px;
		}
	}
	
	//标题容器
	.title-container {
		display: flex;
		align-items: center;
		padding-top: 40rpx;	
		padding-bottom: 10rpx;
		
	}
	
	.funtion-group{
		display: flex;
		flex-direction: row;
		margin: 6px 0;
		padding: 8px 0;
		
		.group-list{
			width: 200px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		
		.group-item{
			padding: 0 5px;
			display: flex;
			align-items: center;
			
			image{
				// background-color: #ccc;
				width: 30px;
				height: 30px;
			}
			
			.group-item-txt{
				display: flex;
				align-items: center;
				font-size: 20px;
				font-weight: bold;
				padding: 3px;
			}
		}
		
		.font-style-list {
			display: flex;
			flex-direction: row;
			flex: 1;
			justify-content: flex-end;
			align-items: flex-start;
			
			.font-list-item {
				display: flex;
				align-items: center;
				font-size: 20px;
				font-weight: bold;
				padding: 5px;
			}
			
			
		}
		
	}
	
	//图片容器
	.image-uploading {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		background-color: #fff;		
		margin-top: 8px;
	}
	
	// ‘增加图片’容器
	.add-image-box {
		margin: 15rpx;
		width: 186rpx;
		height: 186rpx;
		border: 2rpx dashed #e6e6e6;
		display: flex;
		justify-content: center;
		align-items: center;
	
		//‘增加图片’图标
		.add-image {
			width: 50rpx;
			height: 50rpx;
		}
	}
	
	// 缩略图容器
	.thumbnail-box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 190rpx;
		width: 190rpx;
		margin: 15rpx;
		position: relative;
	}
	
	// 删除图标
	.delete-icon {
		height: 50rpx;
		width: 50rpx;
		right: -25rpx;
		top: -25rpx;
		position: absolute;
		background-color: #fff;
		border-radius: 50%;
	}
	
	// 缩略图
	.thumbnail {
		max-height: 190rpx;
		max-width: 190rpx;
	}
	
	//输入框
	.input-box {
		background-color: #fff;
		padding: 20rpx;
		border: 2rpx solid #e6e6e6;
	}
	
	.sub-btn{
		position: fixed;
		left:0;
		right:0;
		bottom: 0;
		padding: 5px 20px 0 20px;
		background-color: #ffffff;
		z-index: 99;
	}
	
	.listCard {
		margin-top: 15rpx;
		margin-bottom: 15rpx;
		display: flex;
		flex-direction: column;
		.item{
			height: 110rpx;
			background-color: #ffffff;
			display: flex;
			flex-direction: row;
			align-items: center;
			.item-name {
				font-size: 26rpx;
				font-weight: 500;
				color: #000000;
				margin-left: 25rpx;
			}
			.item-content {
				margin-left: auto;
				margin-right: 30rpx;
				font-size: 30rpx;
				width: 500rpx;
				.picker {
					padding-left: 30rpx;
				}
			}
			.more-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 110rpx;
				.icon {
					width: 42rpx;
					height: 42rpx;
					opacity: 40%;
				}
			}
		}
	}
	
	.more-tags-content{
		
	}
	
</style>