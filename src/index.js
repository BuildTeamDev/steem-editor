/**
 * Created by zhy on 2017/4/1.
 */


/**
 * steemEditor
 * @author hinesboy
 */
const steemEditor = require( './steem-editor.vue' );
function renderMarkdown( value ) {
  if ( !value ) {
    return '';
  }
  return steemEditor.mixins[0].data().markdownIt.render( value );
}

const VuesteemEditor = {
  steemEditor,
  LeftToolbar: require( './components/md-toolbar-left' ),
  RightToolbar: require( './components/md-toolbar-right' ),
  install( Vue ) {
    Vue.component( 'steem-editor', steemEditor );
    Vue.filter( 'renderMD', renderMarkdown );
    Vue.prototype.$renderMD = renderMarkdown;
  },
};

module.exports = VuesteemEditor;
