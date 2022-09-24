import _ from 'lodash'
// import {cache} from '@/utils/tools.js'

// const globalConfigStorage = cache.get('globalConfigStorage')

// const iconList = cache.get("iconList")

// 是否是开发环境
// 开发环境中的api需要在manifest.json中的源码视图>h5>devServer>proxy中添加路径即可
const isDev = true
// #ifdef MP-WEIXIN
export const globalConfig = isDev?{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://house.cloud.smallsaas.cn/form",
	dataHost: "https://house.cloud.smallsaas.cn/data",
	endpoint: "https://house.cloud.smallsaas.cn",
	staticImgEndpoint: "http://static.smallsaas.cn/house",
	tokenStorageKey:"token",
	// 大匠小程序ID
	appId: 1 
	// icon:iconList,
}:{
	formHost: "",
	dataHost: "",
	endpoint: "",
	tokenStorageKey:"token",
	// icon:iconList,
}
// #endif
// #ifdef H5
export const globalConfig = isDev?{
	cachePolicy: 1, //頁面緩存的時間 默認緩存一天 以天爲單位 爲0不緩存
	clearPageCache: true,//重啓時是否清除頁面緩存
	formHost: "https://app1.console.smallsaas.cn:8001/form",
	dataHost: "https://app1.console.smallsaas.cn:8001/data",
	endpoint: "https://app1.console.smallsaas.cn:8001",
	tokenStorageKey:"token"
}:{
	formHost: "",
	dataHost: "",
	endpoint: "",
	tokenStorageKey:"token"
},
// #endif