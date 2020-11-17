import config from './config'

export function post (url, data) {
  var urlPath = config.baseUrl + url
  return new Promise((resolve, reject) => {
    this.axios.post(urlPath, data,{
      headers: {
         'content-type': 'application/json',
       }
      })
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      var status = error.response.status
      switch (status) {
        case 404:this.$router.push('not-found')
          break
        default:this.$router.push('not-found')
          break
      }
      reject(error.response.status + error.response.statusText)
    })
  })
}

export function get (url) {
  //var urlPath =  url
   var urlPath = config.baseUrl + url
  return new Promise((resolve, reject) => {
    this.axios.get(urlPath)
      .then(res => {
        resolve(res.data)
      }).catch(error => {
      var status = error.response.status
      switch (status) {
        case 404:this.$router.push('not-found')
          break
        default:this.$router.push('not-found')
          break
      }
      reject(error.response.status + error.response.statusText)
    })
  })
}