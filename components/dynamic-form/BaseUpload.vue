<template>
	<view style="background-color: white;">
		<view :class="[`.base_upload_containe ${param.inputBlock ? 'van_field_input_block' : ''}`]" v-if="!param.readonly">
			<van-field
				name="upload"
				:label="param.label"
				:required="param.required"
				:readonly="param.readonly"
				:disabled="param.disabled"
				:style="param.style"
				:error="param.error"
				:error-message="param.error ? param['error-message'] ? param['error-message'] : '' : ''"
				label-class="van_field_label"
			>
				<template slot="input">
					<van-uploader 
					:file-list="showFileList"
					:max-count="param['maxlength'] || 9007199254740992"
					:deletable="param.deletable === false ? false : true"
					:accept="param.accept || 'image'"
					@after-read="handleAfterRead"
					@delete="handleDelete"
					v-if="param.accept !== 'file'"
					/>
					<van-uploader 
						v-else
						:file-list="showFileList"
						:max-count="param['maxlength'] || 9007199254740992"
						:deletable="param.deletable === false ? false : true"
						:accept="param.accept || 'image'"
						@after-read="handleAfterRead"
					>
						<van-button size="small" icon="upgrade" type="default">上传文件</van-button>
					</van-uploader>
				</template>
			</van-field>
			</view>
			<view v-if="param.readonly" class="Detail-Box" >
				<view class="label"><span style="color: red;" v-if="param.required">*</span>{{param.label}}</view>
				<view class="image-Box" v-if="param.value">
					<img :src="item.url||icon.empty" mode="aspectFit" @click="handleWatch()" :style="{width:width,height:height,position:position,top:0,left:0,bottom:0,right:0,'z-index':zIndex}" class="Detail-image" v-for="(item,i) in JSON.parse(param.value)" :key="i"/>
					<view style="width: auto;height: auto;top: 0;left: 0;right: 0;bottom: 0;position: fixed;z-index: 9999; background-color: #AAAAAA;" v-if="big===true"></view>
				</view>
				<view class="image-Box" v-if="!param.value">
					<img :src="icon.empty" mode="aspectFit" @click="handleWatch()" :style="{width:width,height:height,position:position,top:0,left:0,bottom:0,right:0,'z-index':zIndex}" class="Detail-image" :key="i"/>
					<view style="width: auto;height: auto;top: 0;left: 0;right: 0;bottom: 0;position: fixed;z-index: 9999; background-color: #AAAAAA;" v-if="big===true"></view>
				</view>
			</view>
		</view>
</template>

<script>
    import { globalConfig } from '@/config.js'
	// import cImage from './custom/c-image.vue'
	import _ from 'lodash'
    export default {
        props: {
            param: {
                type: Object,
                default: function() {
                    return { 
                        inputBlock: false,
                        checked: false,
                        required: false,
                        readonly: false,
                        error: false,
                        "error-message": '',
                        style: "",
						"maxlength": "1"
                    }
                }
            }
        },
		components:{
			// cImage
		},
        data() {
          return {
            fileList: [],
			showFileList:[],
			icon:null,
			position:"static",
			width:"80px",
			height:"80px",
			zIndex:"0",
			big:false
          }  
        },
        watch: {
            param: {
                handler(val, oldVal) {
                  if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                    if (_.has(val, 'value')) {
                        this.fileList = [...JSON.parse(_.get(this.param, 'value', ''))]
						this.showFileList = this.formatImgUrl([...JSON.parse(_.get(this.param, 'value', ''))])
                    }
                  }
                },
                deep: true
             },
        },
		mounted() {
			this.icon = globalConfig.icon
            if (_.get(this.param, 'value', []).length > 0) {
                this.fileList = [...JSON.parse(this.param.value)]
				this.showFileList = this.formatImgUrl([...JSON.parse(this.param.value)])
            }
		},
        methods: {
			// 查看
			handleWatch(){
				this.big=!this.big
				let style;
				if(this.big===true){
					this.position="fixed"
					this.width="auto"
					this.height="auto"
					this.zIndex="10000"
				}else{
					this.position="static",
					this.width="80px",
					this.height="80px"
					this.zIndex="1"
				}
			},
			formatImgUrl(data){
				if(!data || data.length == 0){
					return []
				}
				const list = data
				list.map(item =>{
					return item.url = `${this.$config.endpoint}${item.url}`
				})
				return list
			},
            // 删除
            handleDelete (e) {
               const index = e.detail.index
               this.fileList.splice(index, 1)
               this.fileList = [...this.fileList.splice(index, 1)]
               // console.log('change', e, this.fileList)
			   this.showFileList = this.fileList
               this.$emit('change', this.fileList)
            },
            handleAfterRead (event) {
                const { file } = event.detail
				const endpoint = this.$config.endpoint
                uni.uploadFile({
                    url: endpoint + '/api/u/fs/uploadfile',
					header:{
						Authorization:`Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`)}`
					},
                    filePath: file.url,
                    name: 'file',
                    success: (res) => {
                        const list = this.fileList
						let Resdata = JSON.parse(res.data)
						let resUrl = Resdata.data
						// const resUrl = res.data.data.substr(0, 5).includes('http') ? res.data.data :  endpoint + res.data.data
						// console.log("resUrl",resUrl)
						// console.log("list",list)
						// console.log()
                        if (_.has(this.param, 'accept') && this.param.accept === 'file') {
                            const index = resUrl.lastIndexOf('.')
                            const str = resUrl.substr(index + 1)
                            if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'psd', 'svg'].some(x => resUrl.includes(x))) {
                                this.fileList.push({ url: resUrl.url })
                            } else {
                                this.fileList.push({ url: resUrl.url, name: resUrl.name })
                            }
                        } else {
                            this.fileList.push({ url: resUrl.url })
                        }
                        // this.fileList = [...list]
                        this.$emit('change', JSON.stringify(this.fileList))
                    },
					fail(e) {
						// console.log("error",e)
					}
                })
            }
        }
    }
</script>

<style lang="scss">
    @import './common.less';
    .base_upload_containe {

    }
	.Detail-Box{
		padding-top: 10px;
		padding-bottom: 10px;
		display: flex;
		.label{
			width: 100px;
			// text-align: ;
			margin-left: 15px;
			font-size: 14px;
			font-weight: bolder;
		}
	}
	.image-Box{
		// width: 80px;
		// height: 80px;
		background-color: #aaa;
		// padding: 5px;
	}
	.Detail-image{
		width: 80px;
		height: 80px;
		padding-top: 5px;
	}
</style>
