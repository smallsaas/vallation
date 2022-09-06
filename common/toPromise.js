// 封装Promise
export const toPromise = (fn) => {
	uni.showLoading({
		title:'',
		mask: true
	})
  return (obj = {}) => {
    return new Promise((resolve, reject) => {
		
		setTimeout(() => {
			uni.hideLoading()
			obj.success = (res) => {
			  res = res.data ? res.data : res
			  resolve(res)
			}
			obj.fail = (res) => {
			  reject(res)
			  // // console.log('reject==', res)
			}
			fn(obj)
		}, 600)
     
    })
  }
}

module.export = {
  toPromise
}
