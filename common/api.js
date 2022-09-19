import {
	request,
	upLoad
} from './request'
import {
	globalConfig
} from '@/config.js'

// 獲取全局配置
export const api = {

	// 获取微信用户手机号
	getPhoneNumber(params) {
		const url = `${globalConfig.endpoint}/api/oauth/wxapp/getPhone`
		return request('POST', url, params)
	},
	
	getAllPage(params){
		const url = `${globalConfig.endpoint}/form/allPages`
		return request('GET', url, params)
	},
	
	getForm(id){
		const url = `${globalConfig.endpoint}/form?id=${id}`
		return request('GET', url)
	}
}
