window.onload = function () {
  var articles = new Vue({
    el: '#articles-section',
    data: {
      search_term: "",
      articles: [],
    },
    mounted: function() {
      var that;
      that = this;
      $.ajax({
        url: '/articles.json',
        success: function(res) {
          that.articles = res.articles;
        }
      });
    },
    methods: {
      fetchArticles: function () {
        var that;
        that = this;

        $.ajax({
          url: '/articles.json',
          data: { q: search_term },
          success: function(res) {
            that.articles = res.articles;
          }
        });
      }
    }
  });
}
