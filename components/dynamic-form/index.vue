<!-- 由于uniapp小程序对jsx很不友好，所以config.fields的children只支持到第一层 -->
<template>
	<view class="base_vants_container" :style="[_get(config, 'outStyle', {})]">
        <van-skeleton row="20" :loading="skeletonLoading">
            <block v-for="(item, index) in fields" :key="index">
                <base-vants 
                    v-if="_get(item, '__config__.layout') === 'colFormItem'"
                    :fields="[{...item}]"
                    :form="form"
            		:Details="Details"
                    @change="handleChange"
                    @clear="handleClear"
                />
                <view v-if="_get(item, '__config__.layout') === 'rowFormItem'"
            		style="padding: 10px;border-radius: 5px;"
            		>
            			<card :title="_get(item, '__config__.componentName')" 
            				:Style="{
            					title:{
            						'font':'30px',
            						'textAlign':'center',
            						'padding':'10px 0',
            					}
            				}"
            			:jump="_get(item,'__config__.jump',false)"
            			:url="config.NextNavigation||config.submittedNavigation"
            			>
            			<!-- 以上card为标题容器 -->
            				<!-- <view class="line"></view> -->
            				<!-- <view>{{_get(item, '__config__.componentName')}}</view> -->
                    <block v-for="(k, i) in _get(item, '__config__.children', [])" :key="i">
                        <base-vants
                            v-if="_get(k, '__config__.layout') === 'colFormItem'"
                            :fields="[{...k}]"
                            :form="form"
            								:Details="Details"
                            @change="handleChange"
                            @clear="handleClear"
                        />
                        <view v-else>
                            <view class="form_row_title">
            		{{_get(k, '__config__.componentName')}}
					</view>
						<base-vants
							:fields="_get(k, '__config__.children', [])"
							:form="form"
							:Details="Details"
							@change="handleChange"
							@clear="handleClear"
						/>
                        </view>
                    </block>
            			</card>
                </view>
            </block>
            
            <van-button 
              v-if="!Details&&(_get(config, 'formBtns', true) && fields.length > 0)"
               type="info" 
              custom-style="width: 90%;margin: 40rpx auto 20rpx auto;display: flex;justify-content: center;align-items: center;"
              @click='handleSubmit'
              >{{_get(config, 'btnText', '提交')}}</van-button>
        </van-skeleton>
	</view>
    
</template>

<script>
	import _ from 'lodash'
    import BaseVants from './BaseVants.vue'
    import { globalConfig } from '@/config.js'
	import { formatApiParams } from '../utils/compxTools.js'

    const SUNMIT_API =  globalConfig.formHost + '/custom'
    // const LOAD_API = globalConfig.formHost + '/userinfos'  // 默认获取数据
    const DEFAULT_CONFIG = globalConfig.formHost + '/form'
    
	export default {
        components: { 
          BaseVants 
        },
		props: {
			config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
			srvFormData: {
			  type: Object,
			  default() {
			    return {}
			  }
			},
            // 默认的提交数据
            formInfo: {
              type: Object,
              default() {
                return {}
              }
            },
            ifManualSubmit: Boolean, // 用于自定义提交
			Details:{
				type:Boolean,
				default:false
			},
			routeParams:{
			  type: Object,
			  default () {
			    return {}
			  }
			},
		},
		data() {
			return {
                formConfig: {}, // 表单配置
				fields: [],
				form: {},
				skeletonLoading: true,
			}
		},
        watch: {
            config: {
                handler(val, oldVal) {
                  if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                    if (_.get(val, 'fields')) {
                        this.handleInitFormData()
                    }
                  }
                },
                deep: true
             }, 
             srvFormData: {
                 handler(val, oldVal) {
                   if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
                      if (_.get(val, 'fields')) {
                           this.handleInitFormData()
                      }
                   }
                 },
                 deep: true
              },  
        },
		mounted() {
            console.log("srv",this.srvFormData)
            // 有具体配置信息时
            if (Object.keys(this.config).length > 0) {
                this.formConfig = _.cloneDeep(this.config)
            }
            if (_.has(this.formConfig, 'fields')) {
                this.handleInitFormData()
            } else {
               // 从默认配置中获取表单
               this.fetchDefaultFormConfig()
            }
			// 外部传入的数据源
			if (Object.keys(this.srvFormData).length > 0) {
                this.form = { ...this.srvFormData }
				this.$forceUpdate()
				return
			}
			if(_.get(this.formConfig, 'loadApi')){
				// console.log('yyyyyy,',_.get(this.formConfig, 'loadApi'))
				this.fetchFormData()
				// this.formatApiParams(_.get(this.formConfig, 'loadApi', ''))
			}
		},
		methods: {
            _get (item, str, defauleValue = '') {
              return _.get(item, str, defauleValue)
            },
            // 获取表单数据
            fetchFormData () {
				let that = this
                uni.request({
                    url: this.formatAPI(_.get(that.formConfig, 'loadApi', '')) ,
                    method: 'GET',
					header:{
						Authorization:`Bearer ${that.$cache(globalConfig.tokenStorageKey)}`
					},
                    complete: (res) => {
                       if (_.get(res, 'data.code') === 200) {
                           let resData = _.cloneDeep(_.get(res, 'data.data', {}))
                           if (_.isFunction(_.get(that.$parent, 'formatLoadData'))) {
                               resData = that.$parent.formatLoadData(resData)
                           }
                           that.form = { ...that.form, ...resData }
                       }
                    }
                })
            },
			
			//匹配API参数
			formatAPI(apiUrl){
				const newApiUrl = formatApiParams(apiUrl, this.routeParams)
				return `${this.$config.endpoint}${newApiUrl}`
			},
            
            // 从默认接口中获取表单配置
            fetchDefaultFormConfig () {
                uni.request({
                    url: DEFAULT_CONFIG + _.get(this.formConfig, 'url', ''),
                    method: 'GET',
                    data:  _.has(this.formConfig, 'id') ? { id: this.formConfig.id } : {},
                    complete: (res) => {
                        if (_.get(res, 'data.code') === 200) {
                            this.formConfig = {
                                ..._.get(res, 'data.data', {}),
                                ...this.formConfig
                            }
                            if (_.has(this.formConfig, 'fields')) {
                                this.handleInitFormData()
                            }
                        }
                    }
                })
            },
            
            // 从props中或者表单配置
            handleInitFormData () {
				const renderChild = (data = []) => {
					data.map(x => {
						const value = this.form[x.__vModel__] || _.get(this.srvFormData, x.__vModel__) || _.get(x, '__config__.defaultValue')
                        if (_.has(x, '__vModel__')) {
                            this.form[x.__vModel__] = value
                        }
						if (_.get(x, '__config__.children', []).length > 0) {
						    x.__config__.children = [...renderChild(x.__config__.children)]
						}
						return x
					})
					return data
				}
            	this.fields = [...renderChild(_.cloneDeep(_.get(this.formConfig, 'fields', [])))]
				this.skeletonLoading = false
            },
            // 改变值时
            handleChange (e, item) {
              this.form[item.__vModel__] = e
              const checkRequired = (data = []) => {
                  data.map(x => {
                      if (x['__vModel__'] === item['__vModel__']) {
						  const formType = _.get(x, '__config__.tag') 
                          x.error = _.get(x, '__config__.required') ? !e : false
                          if (['el-upload', 'el-checkbox-group'].includes(formType)) {
                             x.error = _.get(x, '__config__.required') ? (!e || e.length === 0) : false
                          }
                      }
                      if (_.get(x, '__config__.children', []).length > 0) {
                          x.__config__.children = [...checkRequired(x.__config__.children)]
                      }
                      return x
                  })
                  return data
              }
              this.fields = [...checkRequired(this.fields)]
            },
            // 清空时
            handleClear (e, item) {
                this.form[item.__vModel__] = ''
                const checkRequired = (data = []) => {
                    data.map(x => {
                        if (x['__vModel__'] === item['__vModel__'] && ['', undefined].includes(this.form[x.__vModel__])) {
                            x.error = _.get(x, '__config__.required') ? !e : false
                        }
                        if (_.get(x, '__config__.children', []).length > 0) {
                            x.__config__.children = [...checkRequired(x.__config__.children)]
                        }
                        return x
                    })
                    return data
                }
                this.fields = [...checkRequired(this.fields)]
            },
            // 设置错误信息
            handleRecursive (data = []) {
                data.map(x => {
                    if (_.get(x, '__config__.required') === true) {
						const formType = _.get(x, '__config__.tag')
                        if (['', undefined, null].includes(this.form[x.__vModel__])) {
                            x.error = true
                        }
                        if (formType === 'el-checkbox-group' && _.get(this.form, x.__vModel__, []).length === 0) {
                           x.error = true 
                        }
						if (formType === 'el-switch' && ['', undefined, null, false].includes(this.form[x.__vModel__])) {
							x.error = true
						}
                        if (formType === 'el-slider' && ['', undefined, null, false, 0].includes(this.form[x.__vModel__])) {
                            x.error = true
                        }
                    }
                    if (_.get(x, '__config__.children', []).length > 0) {
                        x.__config__.children = [...this.handleRecursive(x.__config__.children)]
                    }
                    return x
                })
                return data
            },
            
            // 提交
            handleSubmit () {
                const list = this.fields
                this.fields = [...this.handleRecursive(list)]
				let isPass = true
				const checkField = (data = []) => {
					data.map(x => {
						if (x.error) {
							isPass = false
						}
						if (_.get(x, '__config__.children', []).length > 0) {
						   checkField(x.__config__.children) 
						}
					})
				}
                checkField(this.fields)
				
                if (!isPass) {
                    return
                }
                let submitData = {
                    ...this.formInfo,
                    ..._.get(this.srvFormData, 'id') ? { id: this.srvFormData.id } : {},
                    ...this.form,
					...this.routeParams
                }
                if (_.isFunction(_.get(this.$parent, 'formatSubmitData'))) {
                    submitData = this.$parent.formatSubmitData(submitData)
                }
                if (this.ifManualSubmit) {
                    this.$emit('submit', submitData)
                } else {
                    this.handleSubmitRequest(submitData)
                }
            },
            
            // 组件内默认提交
            handleSubmitRequest (data) {
                const url = this.formatAPI(_.get(this.formConfig, 'saveApi')) || SUNMIT_API
                uni.showLoading({ title: '', mask: true })
                uni.request({
                    url: url,
                    method: _.get(this.formConfig, 'saveMethod') || 'POST',
                    data: data,
					header: {  // 请求header
						Authorization: `Bearer ${uni.getStorageSync(`${globalConfig.tokenStorageKey}`) || ''}`,
					},
                    complete: (res) => {
                        uni.hideLoading()
                        if (_.get(res, 'data.code') === 200) {
                            uni.showToast({
                                title:'操作成功'
                            })
                            setTimeout(() => {
                                uni.navigateBack()
                            }, 500)
                        }else{
							uni.showToast({
							    title: res.data.message,
								icon:'none'
							})
						}
                    }
                })
            }
		}
	}
</script>

<style lang="less">
    .base_vants_container {
        .form_row_title {
            color: rgba(80, 80, 80, 1);
            font-size: 30rpx;
            line-height: 150%;
            text-align: left;
            font-weight: bold;
            padding: 10rpx 14rpx;
			display: flex;
			align-items: center;
			& .line {
				width: 6rpx;
				height: 30rpx;
				background-color: rgba(153, 153, 153, 1);
				margin-right: 10rpx;
			}
        }
        .submit_but {
        	width: 80%;
        }
    }
</style>
