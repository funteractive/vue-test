(function($) {
  console.time('ajax');
  console.time('vue');
  var App = function() {
    this.vue();
  };

  App.prototype.vue = function() {
    var self = this;
    var json_ids = ['a', 'b', 'c'];
    $.each(json_ids, function(index, id) {
      $.ajax({
        url: './json/' + id + '.json',
        method: 'GET',
        dataType: 'json'
      }).done(function(data) {
        var i = index + 1;
        console.timeEnd('ajax');
        new Vue({
          el: '#js-item-' + i,
          data: {
            item: data
          },
          ready: function() {
            resultSetHeight.init();
            console.timeEnd('vue');
          }
        });
      });
    });
  };

  new App();

  var resultSetHeight = {
    init: function() {
      var $setHeights = $('.js-result-set-height');

      $setHeights.each(function() {
        var maxHeights = [];
        var $resultSets = $(this).find('.js-result-set');
        $resultSets.each(function() {
          $(this).find('div').each(function(index) {
            if(!maxHeights[index] || maxHeights[index] < $(this).height()) {
              maxHeights[index] = $(this).height()
            }
          });
        });
        $.each(maxHeights, function(index) {
          $resultSets.each(function() {
            $(this).find('div').each(function(index) {
              $(this).css('height', maxHeights[index] + 'px');
            });
          });
        });
      });
    }
  };

})(jQuery);
