var $ = require('jquery')

module.exports = function createSnippets () {
  var toolkit_snippets = {
    toolkit: null,
    snippetArr: [],
    debugSnippets: [
      {
        name: 'Inject Opentag Debug',
        code: require('../common/snippets/opentag')
      },
      {
        name: 'Show Exit Feedback',
        code: require('../common/snippets/exit_feedback')
      },
      {
        name: 'Validate UV',
        code: require('../common/snippets/validate_uv')
      },
      {
        name: 'View Data Layers',
        code: require('../common/snippets/data_layers')
      },
      // {
      //   name: 'ContentEditable',
      //   code: require('../common/snippets/content_editable')
      // },
      {
        name: 'Test Generator',
        code: require('../common/snippets/test_generator')
      }
    ],

    init: function (t) {
      if (!t) return
      var _self = this
      this.toolkit = t
      this.getSnippets(function (snippets) {
        _self.buildHTML(snippets)
      })
    },

    getSnippets: function (cb) {
      this.snippetArr = this.debugSnippets // TODO pull from repo
      cb(this.snippetArr)
    },

    buildHTML: function (snippetArr) {
      var _self = this
      var $html = $([
        "<div id='DeliverSnippets'>",
        "<div id='DeliverSnippetsWrapper'></div>",
        '</div>'
      ].join(''))

      var $htmlWrap = $html.find('#DeliverSnippetsWrapper')
      if (snippetArr && snippetArr.length) {
        $.each(snippetArr, function (index) {
          $htmlWrap.append(["<div class='snippetCont' data-snippet-index='" + index + "'>",
            '<span>' + this.name + '</span>',
            '</div>'].join(''))
        })
        $htmlWrap.find('.snippetCont').each(function () {
          var index = $(this).attr('data-snippet-index')
          $(this).click(function (e) {
            _self.snippetArr[index].code()
          })
        })
      }

      var $metaCont = this.toolkit.$el.find('#DeliverToolbarMeta')
      $metaCont.append($html)
      return this.toolkit.$el.find('#DeliverToolbarMeta')
    }
  }

  return toolkit_snippets
}
