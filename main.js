'use strict'

// let dateToday = new Date();
// let todayYear = dateToday.getFullYear();
// let todayMonth = dateToday.getMonth() + 1;
// let todayDate =  dateToday.getDate();

const app = new Vue({
  el: '#app',
  data: {
    message: '',
    keyword: '',
    results: [],
    pageSize: 20,
    pageSizes: [20,50,100],
    sortBy: '人気順',
    sortBys: ['新着順', '人気順'],
    reqSortBy: 'popularity',
    ok: false
  },
  watch: {
    keyword: function() {
      this.ok = false
      this.message = "Waiting for you to stop typing ..."
      this.debouncedGetAnswer()
    },
    pageSize: function() {
      this.ok = false
      this.debouncedGetAnswer()
    },
    sortBy: function() {
      this.ok = false
      this.debouncedGetAnswer()
    }
  },
  created: function() {
    this.message = 'キーワードを入力してください'
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  methods: {
    getAnswer() { //短縮記法(P.60)
      if(this.keyword === '') {
        this.results = null
        this.message = 'キーワードを入力してください'
        return
      }

      this.ok = false
      this.message = 'Loading ...'

      if(this.sortBy === '人気順') {
        this.reqSortBy = 'popularity'
      } else if(this.sortBy === '新着順') {
        this.reqSortBy = 'publishedAt'
      }

      // let url = 'https://newsapi.org/v2/everything?' +
      //     'q=' + this.keyword + '&' +
      //     'from=' + todayYear + '-' + todayMonth + '-' + todayDate + '&' +
      //     'sortBy=' + this.reqSortBy + '&' +
      //     'pageSize=' + this.pageSize + '&' +
      //     'apikey=' + '2dac0b01ed64490faa1e0d3c762ed5ae'

      let url = 'https://newsapi.org/v2/everything?' +
          'q=' + this.keyword + '&' +
          'from=2019-10-01' + '&' +
          'sortBy=' + this.reqSortBy + '&' +
          'pageSize=' + this.pageSize + '&' +
          'apikey=' + '2dac0b01ed64490faa1e0d3c762ed5ae'

      axios.get(url)
      .then((response) => {
        this.results = response.data.articles
        console.log(url);
      })
      .finally((response) => {
        this.ok = true
        if(this.results.length === 0) {
          this.message = '検索結果がありません'
        } else {
          this.message = ''
        }
      })
    }
  }

})

//スムーススクロール
let scroll = new SmoothScroll('a[href*="#"]', {
  speed: 5000
});
