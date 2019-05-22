const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

// axios.get('http://medias.wuerkang.com/bg.jpeg', {responseType: 'arraybuffer'}).then(({data}) => {
//   fs.writeFile('./imgs/124.jpeg', data, function(){})
// }).catch(err => {
//   console.log(err)
// })

let page = 1
const headers = {
  responseType: 'json',
  headers: {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Length': 38,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': '_ga=GA1.2.557605663.1548655926; user_trace_token=20190128141216-a905a02c-22c3-11e9-b103-525400f775ce; LGUID=20190128141216-a905a4fd-22c3-11e9-b103-525400f775ce; JSESSIONID=ABAAABAAAIAACBIA2A40900D816866DE4F600A8DA386FAB; _gid=GA1.2.893799259.1558427453; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1558170631,1558427453,1558432087,1558507412; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216a069ad38c414-051505fdb4699d-12316d51-1296000-16a069ad38d9ca%22%2C%22%24device_id%22%3A%2216a069ad38c414-051505fdb4699d-12316d51-1296000-16a069ad38d9ca%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=659; index_location_city=%E5%8C%97%E4%BA%AC; X_MIDDLE_TOKEN=772dd8a52aa3eed28f77f40f8fc1cdd5; LGSID=20190522175446-a190d19c-7c77-11e9-a116-5254005c3644; LG_HAS_LOGIN=1; TG-TRACK-CODE=index_search; LG_LOGIN_USER_ID=e20e187bcb752d4f00ac91c3888cbde5cebde95952a1aa22; _putrc=57EE49FBAD5447EF; login=true; unick=%E6%AD%A6%E4%BA%8C%E5%BA%B7; gate_login_token=60205e941b1d7554715d9337d0a775cc1babd1ed352cbf0c; _gat=1; SEARCH_ID=4ecb29583cd44b2aa6a64cf7bc6f064c; X_HTTP_TOKEN=e43c0c166da56cb86881258551a424cd6ebc777b2b; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1558521887; LGRID=20190522184446-9df266d9-7c7e-11e9-a116-5254005c3644',
    'Host': 'www.lagou.com',
    'Origin': 'https://www.lagou.com',
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
  }, headers).then(({data}) => {
    console.log(data)
    if (data.content) {
      const results = data.content.positionResult.results
      console.log('11', results)
      let query = ''
      for (let i in results) {
        query += results[i] + ','
      }
      console.log(query)
      axios.get(`https://www.lagou.com/c/approve.json?companyIds=` + query, {}, headers).then(({data}) => {
        console.log('第二个请求', data)
        page++
        if (page > 10) {
          return
        }
        // request()
      })
    }
  }).catch(err => {
    console.log(err)
  })
}
request()

// axios.get('https://www.lagou.com/c/approve.json?companyIds=1608%2C85735%2C49187%2C177556%2C58537%2C410879%2C21236%2C379617%2C147%2C257321%2C22666%2C146407%2C212869%2C108216%2C260173',{}, {
//   responseType: 'json',
//   headers: {
//     'Accept': 'application/json, text/javascript, */*; q=0.01',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
//     'Cache-Control': 'no-cache',
//     'Connection': 'keep-alive',
//     'Content-Length': 38,
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     'Cookie': '_ga=GA1.2.557605663.1548655926; user_trace_token=20190128141216-a905a02c-22c3-11e9-b103-525400f775ce; LGUID=20190128141216-a905a4fd-22c3-11e9-b103-525400f775ce; LG_LOGIN_USER_ID=1d28b9d8ab2aa292ead383e3ddfad29fa95ff698e72c8a99; JSESSIONID=ABAAABAAAIAACBIA2A40900D816866DE4F600A8DA386FAB; _gid=GA1.2.893799259.1558427453; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1558170631,1558427453,1558432087,1558507412; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2216a069ad38c414-051505fdb4699d-12316d51-1296000-16a069ad38d9ca%22%2C%22%24device_id%22%3A%2216a069ad38c414-051505fdb4699d-12316d51-1296000-16a069ad38d9ca%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; _putrc=57EE49FBAD5447EF; login=true; unick=%E6%AD%A6%E4%BA%8C%E5%BA%B7; showExpriedIndex=1; showExpriedCompanyHome=1; showExpriedMyPublish=1; hasDeliver=659; gate_login_token=60205e941b1d7554715d9337d0a775cc1babd1ed352cbf0c; index_location_city=%E5%8C%97%E4%BA%AC; X_MIDDLE_TOKEN=772dd8a52aa3eed28f77f40f8fc1cdd5; TG-TRACK-CODE=search_code; _gat=1; LGSID=20190522175446-a190d19c-7c77-11e9-a116-5254005c3644; PRE_UTM=; PRE_HOST=; PRE_SITE=https%3A%2F%2Fwww.lagou.com%2Futrack%2FtrackMid.html%3Ff%3Dhttps%253A%252F%252Fwww.lagou.com%252Fjobs%252Flist_%2525E5%252589%25258D%2525E7%2525AB%2525AF%253FlabelWords%253D%2526fromSearch%253Dtrue%2526suginput%253D; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fjobs%2Flist_%25E5%2589%258D%25E7%25AB%25AF%3FlabelWords%3D%26fromSearch%3Dtrue%26suginput%3D; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1558518929; SEARCH_ID=932bd9b9b55845c8976cee09d5404393; X_HTTP_TOKEN=e43c0c166da56cb89298158551a424cd6ebc777b2b; LGRID=20190522175529-bb20faa6-7c77-11e9-a116-5254005c3644',
//     'Host': 'www.lagou.com',
//     'Origin': 'https://www.lagou.com',
//     'Pragma': 'no-cache',
//     'Referer': 'https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF?labelWords=&fromSearch=true&suginput=',
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
//     'X-Anit-Forge-Code': 0,
//     'X-Anit-Forge-Token': 'None',
//     'X-Requested-With': 'XMLHttpRequest',
//     'proxy': {
//       host: '112.85.169.225',
//       port: 18118
//     }
//   }
// }).then(({data}) => {
//   console.log(data)
//   request()
// })
