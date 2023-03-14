<template>
	<view class="rss-body">
		
		<title-bar v-if="!isComponent" :title="titleBarName" :isBack="true" @onback="navBack"></title-bar>
		<!-- <view class="title">{{rssDetail.title || '-'}}</view> -->
		<!-- <view class="subTitle" v-if="rssDetail.createTime">发表于: {{rssDetail.createTime || '-'}}</view> -->
		<view class="rssList-content" :style="[!isComponent ? {'margin-top': `${statusBarHeight}px`} : {}]" v-if="rssList">
			
			<!-- <view class="rss-item" v-for="(item, index) in rssList" :key="index" :style="[previewStatus ? {'margin-bottom':'65px'}:{}]"> -->
			<view class="rss-item" v-for="(item, index) in rssList" :key="index" >
				
				<view class="rss-item-components" v-for="(compItem, compIndex) in item.rssComponentList" :key="compIndex" 
					v-if="item.rssComponentList.length > 0">
					
					<!-- 文本 -->
					<fontText :key="index"
						:type="compItem.componentType"
						:text="compItem.rssComponentPropList[0].propDefaultValue"
						:styles="_get(compItem, 'css', {})"
						:cssName="compItem.cssName || ''"
					/>
					
					<!-- 段落-竖线 -->
					<paragraph v-if="compItem.componentType === 'paragraph'"
						:text="compItem.rssComponentPropList[0].propDefaultValue"
						:styles="_get(compItem, 'css', {})"
						:cssName="compItem.cssName || ''"
					/>
					
					<!-- 标签 -->
					<tags v-if="compItem.componentType === 'tag'"  :key="index"
						:list="compItem.rssComponentPropList"
						:customClassName="compItem.componentStyle"
					/>
					
					<!-- 链接 -->
					<link v-if="compItem.componentType === 'link'"
						:text="compItem.rssComponentPropList[0].propDefaultValue"
						:url="compItem.rssComponentPropList[1].propDefaultValue"
					/>
					
					<!-- 价格 -->
					<price v-if="compItem.componentType === 'price'" 
						:value="compItem.rssComponentPropList[0].propDefaultValue"
					/>
					
					<!-- 间隔 -->
					<space :value="compItem.rssComponentPropList[0].propDefaultValue" v-if="compItem.componentType === 'space'" />
					
					<!-- 图片 -->
					<images v-if="compItem.componentType === 'showImage'"
						:outClass="compItem.componentStyle"
						:outLimit="compItem.componentLimit"
						:data="compItem.rssComponentPropList"
						:layout="compItem.componentArrangement"
						:columns="compItem.componentArrangementValue"
					/>
					
					<!-- 段落 -->
					<bulles v-if="compItem.componentType === 'bulleList'"
						:icon="compItem.componentStyleValue"
						:iconStyle="compItem.componentStyle"
						:textStyle="compItem.css"
						:list="compItem.rssComponentPropList"
					/>
					
					<!-- 自定义上传图片 -->
					<uploadImage v-if="compItem.componentType === 'uploadImage'"
						:list="compItem.rssComponentPropList"
						bindField="propDefaultValue"
						:itemIndex="compIndex"
						@uploadAction="uploadImg"
						@deleteAction="deleteImg"
					/>
					
					<!-- 超文本 -->
					<richText v-if="compItem.componentType === 'richText'"
						:componentId="compItem.rssComponentPropList[0].componentId"
						:componentItemId="compItem.rssComponentPropList[0].id"
						:value="compItem.rssComponentPropList[0].propDefaultValue"
						:maxlength="compItem.rssComponentPropList[0].propLimit"
						@saveRichTextInputValue="saveRichTextInputValue"
					/>
						
					<!-- 表格 -->
					<Rsstable @updateRss="getDetail(rssId)" :tableData="compItem.rssComponentPropList" :tableId="compItem.id" :rssId="rssId" v-if="compItem.componentType === 'table'"/>
					
					<!-- 代码块 -->
					<!-- <pre v-if="compItem.componentType === 'code'">
						{{compItem.rssComponentPropList[0].propDefaultValue}}
					</pre> -->
				</view>
				
				<!-- 文本 -->
				<view class="title" v-if="(!item.rssComponentList || item.rssComponentList.length === 0) && item.title"  :key="index">
					<p class="textarea-content" :style="[
						{'font-size': `${(item.fontSize||18)*2}rpx`},
						{'font-weight': item.fontWeight ? 'bold': 100},
						{'line-height': `${(item.lineHeight||22)*2}rpx`},
					]">
						{{item.title}}
					</p>
				</view>
				
				<!-- 大图 -->
				<image class="rss-item-image" :src="echoImage(picItem)" mode="widthFix" v-for="(picItem, picIndex) in item.pictures" :key="picIndex"  @click="previewImage(picItem)" v-if="item.pictures"/>
				
			</view>
			
		</view>
		<!-- loading动画 -->
		<view v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import _ from 'lodash'
	import titleBar from '@/components/titleBar/index.vue'
	import tags from './RssRender/tags.vue'
	import fontText from './RssRender/fontText.vue'
	import price from './RssRender/price.vue'
	import space from './RssRender/space.vue'
	import link from './RssRender/link.vue'
	import images from './RssRender/images.vue'
	import richText from './RssRender/richText.vue'
	import bulles from './RssRender/bulles.vue'
	import Rsstable from '../components/tabComponent/tabComponent.vue'
	import paragraph from './RssRender/paragraph.vue'
	import uploadImage from './RssRender/uploadImage.vue'
	export default {
		name: 'rssDetail',
		components:{
			titleBar,
			tags,
			fontText,
			price,
			space,
			link,
			images,
			richText,
			bulles,
			Rsstable,
			paragraph,
			uploadImage
		},
		onLoad(e) {
			if(e){
				let param = e.query?JSON.parse(decodeURIComponent(e.query)):e
				// this.previewStatus= param.preview === 'preview' ? true : false
				if(param.name){
					this.pageTitle = param.name
					this.getDetail('', param.name)
				} else if(param.id){
					this.getDetail(param.id, '')
				}
			}
            // 修改页面标题
			this.setPageTitle()
			
		},
		props:{
			rssId: {
				type: [Number, String],
				default: 0
			},
		},
		computed:{
			init(){
				if(this.rssId){
					this.getDetail(this.rssId, '')
					this.isComponent = true
				}
			}
		},
		data(){
			return {
				statusBarHeight: this.$statusBarHeight,
				rssDetailCacheName:'', //缓存名称
				titleBarName: '详情',
				isComponent: false,
				rssList:'',
				rssDetail:'',
				// previewStatus:false,
                pageTitle: '', //页面标题
				addIcon: `${this.$config.staticImgEndpoint}/2022/svg/plus.svg`, //增加图片按钮图标
				deleteIcon: `${this.$config.staticImgEndpoint}/2022/svg/x-circle-fill.svg`, //删除图片按钮图标
				rssBatchListData:[],//rss子项数据
				isEditrssBatchListData: false,//判断超文本是否修改过
			}
		},
		methods:{
			navBack(){
				if(this.rssBatchListData && this.rssBatchListData.length > 0 && this.isEditrssBatchListData ){
					this.submitRssBatch()
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
			},
            // 设定页面标题
			setPageTitle() {
				uni.setNavigationBarTitle({
					title: this.pageTitle
				})
			},
			
			//转换高度
			convertHeight(data){
				if(data && data.length > 0){
					const heightString = data[0].propDefaultValue
					return `${heightString.substring(1, heightString.length-1)}px`
				}
				return 0
			},
			_get (item, str, defauleValue = '') {
			  return _.get(item, str, defauleValue)
			},
			getDetail(id, name){
				//缓存
				let rssDetailCacheData = this.$cache(`rss_detail_${id || name}`)
				if(rssDetailCacheData && JSON.stringify(rssDetailCacheData) !== '{}'){
					this.rssDetail = rssDetailCacheData
					this.rssList = rssDetailCacheData.rssItemList
					return
				}
				const query = {}
				let api = '/api/u/rss/master'
				if(id){
					api = `${api}/${id}`
				}else if(name){
					query.name = name
				}
				this.$api.getRssDetail(api, query).then(res => {
					if(res.code === 200){
						this.rssDetail = res.data
						this.rssList = this.rssDetail.rssItemList
						const rssDetailCache = _.cloneDeep(this.rssDetail)
						this.$cache(`rss_detail_${id || name}`, rssDetailCache, 3600*2)
					}else{
						uni.showToast({
							title: res.message,
							icon:'none'
						})
					}
				})
			},
			echoImage(value) {
				let echoImageUrl = `${_.has(value, 'url') ? value.url : value}`
				if(echoImageUrl.indexOf('http') != -1){
					return echoImageUrl
				}
				return `${this.$config.endpoint}${echoImageUrl}`
			},
			previewImage(value) {
				let img = `${_.has(value, 'url') ? value.url : value}`
				let imgsArray = []
				if(img.indexOf('http') != -1){
					imgsArray = [`${_.has(value, 'url') ? value.url : value}`]
				}else{
					imgsArray = [`${this.$config.endpoint}${_.has(value, 'url') ? value.url : value}`]
				}
				
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			//保存图片
			uploadImg(imgUrl, rssComponentListItemIndex){
				let newImgList= []
				this.rssList.map((item,index)=>{
					item.rssComponentList.map((compItem, compIndex)=>{
						if(compIndex === rssComponentListItemIndex){
							compItem.rssComponentPropList.push({ componentId:compItem.id, propDefaultValue:imgUrl })
							newImgList = compItem.rssComponentPropList
						}
						return compItem
					})
					return item
					
				})
				this.rssBatchListData = newImgList
				this.submitRssBatch(true)
			},
			//删除图片
			deleteImg(picIndex, itemIndex){
				let imgItemData = []
				this.rssList.map((item,index)=>{
					item.rssComponentList.map((compItem, compIndex)=>{
						if(compIndex === itemIndex){
							const nls = compItem.rssComponentPropList.filter((pitem, pindex) => pindex != picIndex)
							imgItemData = compItem.rssComponentPropList.filter((pitem, pindex) => pindex == picIndex)
							compItem.rssComponentPropList = nls
						}
						return compItem
					})
					return item
				})
				if(imgItemData && imgItemData.length > 0){
					this.deleteRssBatch(imgItemData[0].id)
				}else{
					console.log('no img data == ', imgItemData)
				}
			},
			
			//提交数据
			submitBtn(){
				const rssData = _.clone(this.rssDetail)
				rssData.rssItemList = this.rssList
				
				this.$api.putRssData(rssData.id, rssData).then(res => {
					if(res.code === 200){
						uni.showToast({
							title: '保存成功',
							icon:'none'
						})
					}else{
						uni.showToast({
							title: res.message,
							icon:'none'
						})
					}
				})
			},
			//批量添加/修改子项
			submitRssBatch(notBack){
				const rssData = _.clone(this.rssBatchListData)
				this.$api.updataRssBatch(this.rssDetail.id,rssData).then(res => {
					if(res.code === 200){
						// console.log('成功')
						if(!notBack){
							uni.navigateBack({
								delta: 1
							})
						}
					}else{
						if(notBack){
							return
						}
						uni.showModal({
							title: '数据提交失败, 是否继续退出页面 ?',
							// content: '这是一个模态弹窗',
							success: function (res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									})
									// console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('点击取消');
								}
							}
						});
					}
				})
			},
			//批量添加/修改子项
			deleteRssBatch(itemId){
				this.$api.deleteRssBatch(this.rssDetail.id, itemId).then(res => {
					if(res.code === 200){
						// console.log('成功')
					}else{
						uni.showToast({
							title: '删除失败',
							icon: 'none'
						})
					}
				})
			},
			convertImage(data){
				if(data){
					if(data.indexOf(',') != -1){
						const ls = data.split(',')
						return ls
					}else{
						return [data]
					}
				}
				return []
			},
			
			//跳转至webview浏览网址
			goBrowseWebsite(item){
				const url = item.rssComponentPropList[1].propDefaultValue
				uni.navigateTo({
					url:`/pages/sub/rss/webview?url=${encodeURIComponent(url)}`
				})
			},
			
			//处理超文本输入数据
			saveRichTextInputValue(data){
				const obj = data.detail.__args__[0]
				// console.log('obj == ', data.detail.__args__)
				if(this.rssBatchListData.length > 0){
					let countList = []
					this.rssBatchListData.map(item => {
						countList.push(item.componentId)
						if(item.componentId === obj.componentId){
							item.propDefaultValue = obj.propDefaultValue
						}
					})
					if(!countList.includes(obj.componentId)){
						this.rssBatchListData.push(obj)
					}
				}else{
					this.rssBatchListData.push(obj)
				}
				this.isEditrssBatchListData = true
				this.rssBatchListData = this.rssBatchListData.filter(item => item.propDefaultValue)
			}
		},
		onShareAppMessage() {
			return {
				title: _.get(this.rssList[0], 'title') || '回迁便民  共建家园',
				path: `/pages/sub/rss/detail?id=${this.rssDetail.id}`
			}
		}
	}
</script>

<style lang="scss">
	.rss-body{
		
		font-family: "Microsoft JhengHei";
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		// padding: 0px 10px 15px 10px;
		// height: 100vh;
		
		
		.rssList-content{
			padding: 10rpx 8px;
		}
		
		.rss-item{
			display: flex;
			flex-direction: column;
			
			.rss-item-image{
				width: 100%;
			}
		}
		
		.title{
			color: #000000cc;
		}
		
		.textarea-content{
			width: 100%;
			white-space: pre-line;
		}
		
		
		// .subTitle{
		// 	display: flex;
		// 	flex-direction: column;
		// 	align-items: flex-start;
		// 	justify-content: center;
		// 	font-size: 28rpx;
		// 	color: #929191;
		// 	margin-top: 10px;
		// 	margin-bottom: 5px;
		// 	padding: 0 16rpx;
		// }
		
		.rss-item-components{
			
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
		
		//图片容器
		.image-upload {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			background-color: #fff;		
			margin: 8px 0;
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
		
		.sub-btn{
			position: fixed;
			left:0;
			right:0;
			bottom: 0;
			padding: 5px 20px 0 20px;
			background-color: #ffffff;
			z-index: 99;
		}
		
		.bulleList {
			
			display: flex;
			flex-direction: row;
			// align-items: center;
			
			.bulle-icon{
				// display: flex;
				// align-items: flex-start;
				width: 10px;
				// height: 100%;
				margin-right: 5px;
				margin-left: 10px;
				
				.bulle-icon-c{
					width: 10px;
					height: 10px;
				}
			}
			
			.bulle-txt{
				flex: 1;
			}
		}
		
		
	}
</style>