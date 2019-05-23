const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

// axios.get('http://medias.wuerkang.com/bg.jpeg', {responseType: 'arraybuffer'}).then(({data}) => {
//   fs.writeFile('./imgs/124.jpeg', data, function(){})
// }).catch(err => {
//   console.log(err)
// })

let page = 1
const settings = {
  responseType: 'json',
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    // 'Content-Length': 38,
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': '_ga=GA1.2.557605663.1548655926; user_trace_token=20190128141216-a905a02c-22c3-11e9-b103-525400f775ce; LGUID=20190128141216-a905a4fd-22c3-11e9-b103-525400f775ce; JSESSIONID=ABAAABAAAIAACBIA2A40900D816866DE4F600A8DA386FAB; _gid=GA1.2.893799259.1558427453; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1558170631,1558427453,1558432087,1558507412; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216a069ad38c414-051505fdb4699d-12316d51-1296000-16a069ad38d9ca%22%2C%22%24device_id%22%3A%2216a069ad38c414-051505fdb4699d-12316d51-1296000-16a069ad38d9ca%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=659; index_location_city=%E5%8C%97%E4%BA%AC; X_MIDDLE_TOKEN=772dd8a52aa3eed28f77f40f8fc1cdd5; LG_HAS_LOGIN=1; TG-TRACK-CODE=index_search; LG_LOGIN_USER_ID=e20e187bcb752d4f00ac91c3888cbde5cebde95952a1aa22; _putrc=57EE49FBAD5447EF; login=true; unick=%E6%AD%A6%E4%BA%8C%E5%BA%B7; gate_login_token=60205e941b1d7554715d9337d0a775cc1babd1ed352cbf0c; LGSID=20190523180240-e66eb19e-7d41-11e9-a11a-5254005c3644; PRE_UTM=; PRE_HOST=; PRE_SITE=https%3A%2F%2Fwww.lagou.com%2F; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_web%3FlabelWords%3D%26fromSearch%3Dtrue%26suginput%3D; LGRID=20190523180444-309b1b56-7d42-11e9-a6cf-525400f775ce; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1558605885; X_HTTP_TOKEN=e43c0c166da56cb86885068551a424cd6ebc777b2b; SEARCH_ID=f28dd091a07344ca98413fd3832d2266',
    'Host': 'www.lagou.com',
    // 'Origin': 'https://www.lagou.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'X-Anit-Forge-Code': 0,
    'X-Anit-Forge-Token': 'None',
    'X-Requested-With': 'XMLHttpRequest',
    'proxy': {
      host: '112.85.129.144',
      port: 9999
    }
  }
}

function request () {
  axios.post('https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false', {
    first: false,
    pn: page,
    kd: '前端开发'
  }, settings).then(({data}) => {
    console.log(data)
    if (data.content) {
      const {result} = data.content.positionResult
      let query = ''
      for (let i in result) {
        query += result[i].companyId + ','
      }
      console.log('打印query', query)
      axios.get(`https://www.lagou.com/c/approve.json?companyIds=` + query, {}, settings).then(({data}) => {
        console.log('第二个请求', data)
        page++
        if (page > 10) {
          return
        }
        // request()
      })
    }
    // page++
    // if (page > 20) {
    //   return
    // }
    // setTimeout(() => {
    //   request()
    // }, 1000)
  }).catch(err => {
    console.log(err)
  })
}
request()
