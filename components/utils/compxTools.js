
import _ from 'lodash'
import qs from 'qs'

//处理路由参数, 返回拼接的路由和参数
export function formatQueryUrl (navigation, data) {
	if (!navigation && !data) {
		return
	}
	let routeUrl = ''
	let dynamicPageUrl = ''
	const itemNavigation = navigation
	const route = itemNavigation.split('?')[0]
	const query = itemNavigation.split('?')[1] ? qs.parse(itemNavigation.split('?')[1]) : {}
	routeUrl += (`/pages${route.charAt(0) !== '/' ? '/' : ''}` + route)
	let queryString = '?'
	if (Object.keys(query).length > 0) {
	  for (const i in query) {
	    if (query[i] === '') {
		  queryString += `${i}=${data[i]}&`
	    }else if (query[i]){
		  dynamicPageUrl = query[i]
		}
	  }
	}
	
	//处理框架配置页面路径跳转
	if(dynamicPageUrl){
		let nList, nUrlParams='', navString;
		if(navigation.indexOf('&') != -1){
			navString = navigation.split('&')[0]
			nList = navigation.split('&').splice(1, navigation.split('&').length-1)
			nList.map(item => {
				const itemList = item.split('=')
				nUrlParams += `&${itemList[0]}=${data[itemList[1]]}`
			})
			const path = navString + nUrlParams
			return `/pages${path}`
		}else{
			return `/pages${navigation}`
		}
		
	}else{
		queryString = queryString.substring(0, queryString.length-1)
		return `${routeUrl}${queryString}`
	}
}


//匹配api参数
export function formatApiParams (apiUrl, data) {
	if(apiUrl.indexOf('<') != -1){
		let regex = /\<(.*?)\>/g; //匹配<*> 大括号里面任意内容的正则
		let arr = apiUrl.match(regex); //字符串匹配出来的数组
		let formatString = apiUrl
		arr.map(item => {
			const str = item.substring(1, item.length - 1)
			formatString = formatString.replace(`${item}`, data[str])
		})
		return formatString
	}else{
		return apiUrl
	}
	
}

//obj 转 路由参数
export function objToApiParams (data) {
	let params = ''
	for(var key in data){
		params += `${key}=${data[key]}&`
	}
	params = params.substring(0, params.length-1)
	return params
}