<template>
	
	<view :style="[ containerHeight>0 ? {'height': `${containerHeight}px`}:{}]" 
		:class="[`${outClass || ''}`]">
		<image class="item-image" :src="echoImage(picItem.propDefaultValue)" mode="widthFix"
			v-for="(picItem, picIndex) in imgList" :key="picIndex"  
			@click="previewImage(imgList, picIndex)" v-if="!layoutType"/>
			
		<!-- type1 -->
		<view class="flex_row" v-if="layoutType === '=-'">
			<view class="flex_col" style="flex: 1;">
				<view style="text-align: left;">
					<image class="small_img" :style="[{'height': `${bigImgHeight/2}px`}]" :src="echoImage(imgList[0].propDefaultValue)" mode="center" @click="previewImage(imgList, 0)" />
				</view>
				<view>
					<image class="small_img" :style="[{'height': `${bigImgHeight/2}px`}]" :src="echoImage(imgList[1].propDefaultValue)" mode="center" @click="previewImage(imgList, 1)"/>
				</view>
			</view>
			<view style="flex: 1;">
				<image id="type_one_right" class="big_img"  :style="[{'height': `${bigImgHeight}px`}]":src="echoImage(imgList[2].propDefaultValue)" mode="center" 
					@click="previewImage(imgList, 2)" @load="(e)=>imageLoad(e, 2)"/>
			</view>
		</view>
		
		<!-- type2 -->
		<view class="flex_row" v-if="layoutType === '-='">
			<view style="flex: 1;">
				<image id="type_two_left" class="big_img" :style="[{'height': `${bigImgHeight}px`}]" :src="echoImage(imgList[0].propDefaultValue)" mode="center" 
					@click="previewImage(imgList, 0)"  @load="(e)=>imageLoad(e, 0)"/>
			</view>
			<view class="flex_col" style="flex: 1;">
				<view>
					<image class="small_img" :style="[{'height': `${bigImgHeight/2}px`}]" :src="echoImage(imgList[1].propDefaultValue)" mode="center" 
						@click="previewImage(imgList, 1)"/>
				</view>
				<view>
					<image class="small_img" :style="[{'height': `${bigImgHeight/2}px`}]" :src="echoImage(imgList[2].propDefaultValue)" mode="center" 
						@click="previewImage(imgList, 2)"/>
				</view>
			</view>
		</view>
		
		<!-- type3 -->
		<view class="flex_row" v-if="layoutType === '---'">
			<view :style="[{'flex': colItem, 'margin-right': `${colIndex === cols.length-1 ? '' : '3px'}`}]" v-for="(colItem, colIndex) in cols">
				<image class="item-image" :style="[{'height': `${flexRowHeight}px`}]" :src="echoImage(imgList[colIndex].propDefaultValue)" v-if="imgList[colIndex]"  mode="center" @click="previewImage(imgList, colIndex)"/>
			</view>
		</view>
		
		<!-- typ4 -->
		<view class="flex_col" v-if="layoutType === '|||'">
			<image class="item-image" :src="echoImage(picItem.propDefaultValue)" mode="widthFix"
				v-for="(picItem, picIndex) in imgList" :key="picIndex"  
				@click="previewImage(imgList, picIndex)" />
		</view>
		
		<!-- typ5 -->
		<view class="grid_content" :style="{'grid-template-columns': `repeat(${cols}, 1fr)`}" v-if="layoutType === '#'">
			<image 
				v-for="(picItem, picIndex) in imgList" :key="picIndex"
				:id="'grid_'+picIndex" class="item-image" :src="echoImage(picItem.propDefaultValue)" mode="center"
				:style="{height: picItem.containerHeight + 'px'}"  @load="(e)=>imageItemLoad(e, picIndex)" 
				@click="previewImage(imgList, picIndex)" />
			
		</view>
		
	</view>
	
	
</template>

<script>
	export default {
		props:{
			outClass: String,
			outLimit: String,
			data: Array,
			layout: String,
			columns: String
		},
		computed:{
			init(){
				//图片赋值
				if(Array.isArray(this.data)){
					this.imgList = this.data
				}
				//图片布局类型
				this.layoutType = this.layout || ''
				if(this.columns && this.layout === '---'){
					this.cols = this.columns ? this.columns.split(',') : []
					let heightScale = 0
					this.cols.map(item =>{
						heightScale += Number(item)
					})
					const currentScreenWidth = uni.getSystemInfoSync().screenWidth - 16
					const scale = this.handleLimit(this.outLimit)
					this.flexRowHeight = (currentScreenWidth / heightScale)*scale
				}
				if(this.columns && this.layout === '#'){
					this.cols = Number(this.columns)
				}
				
			}
		},
		data(){
			return {
				imgList:[],
				layoutType: '',
				cols: [],
				flexRowHeight: 0,
				containerHeight:0,
				bigImgHeight: 0
			}
		},
		methods:{
			//判断行高还是比例数值
			handleLimit(data){
				if(data){
					if(data.indexOf('[') != -1){
						return parseFloat(data.substr(1, data.length-2))
					}else{
						this.containerHeight = parseFloat(data)
					}
				}
				return 1
			},
			//html渲染图片
			echoImage(value) {
				let echoImageUrl = value.indexOf('url') != -1 ? JSON.parse(value).url : value
				if(echoImageUrl.indexOf('http') != -1){
					return echoImageUrl
				}
				return `${this.$config.endpoint}${echoImageUrl}`
			},
			// convertImage(data){
			// 	if(data){
			// 		if(data.indexOf(',') != -1){
			// 			const ls = data.split(',')
			// 			return ls
			// 		}else{
			// 			return [data]
			// 		}
			// 	}
			// 	return []
			// },
			previewImage(data, index) {
				const imgArray = data.map(item => {
					item = this.echoImage(item.propDefaultValue)
					return item
				})
				uni.previewImage({
					current: index,
					urls: imgArray
				});
			},
			imageLoad (e, index) {
				var _this = this;
				/* 图片容器的id */
				var id = e.currentTarget.id;
				
				/* 查询图片容器的宽度 */
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + id).boundingClientRect(data => {
					/* 计算图片容器的宽度 */
					// item.containerHeight = data.width * e.detail.height / e.detail.width;
					this.bigImgHeight = data.width
					console.log('this.bigImgHeight == ', this.bigImgHeight)
					/* 强制刷新。如不强制刷新，则图片容器高度不会改变 */
					_this.$forceUpdate();
				}).exec();
			},
			imageItemLoad (e, index) {
				var _this = this;
				/* 图片容器的id */
				var id = e.currentTarget.id;
				/* 图片容器对应数组数据的索引 */
				// var index = id.substr(5);
				/* 图片容器对应的数据 */
				var item = _this.imgList[index];
				
				/* 查询图片容器的宽度 */
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + id).boundingClientRect(data => {
					/* 计算图片容器的宽度 */
					// item.containerHeight = data.width * e.detail.height / e.detail.width;
					item.containerHeight = data.width
					/* 强制刷新。如不强制刷新，则图片容器高度不会改变 */
					_this.$forceUpdate();
				}).exec();
			}
		}
	}
</script>

<style lang="scss">
	.item-image{
		width: 100%;
		display: block;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.flex_col{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
	
	.grid_content{
		display: grid;
		grid-gap: 4px 4px;
	}
	
	.big_img{
		width: 100%;
		display: block;
		// height: 100%;
		// background-color: #ffffff;
	}
	
	.small_img{
		width: 100%;
		display: block;
		// flex: 1;
		// width: 100%;
		// height: 100%;
		// background-color: #ffffff;
	}
</style>