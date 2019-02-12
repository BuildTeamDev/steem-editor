/**
 * Created by zhy on 2017/4/1.
 */


/**
 * steemEditor
 * @author hinesboy
 */
const steemEditor = require( './steem-editor.vue' );
const markdownIt = steemEditor.mixins[0].data().markdownIt;
const VuesteemEditor = {
  markdownIt,
  steemEditor,
  LeftToolbar: require( './components/md-toolbar-left' ),
  RightToolbar: require( './components/md-toolbar-right' ),
  install( Vue ) {
    Vue.component( 'steem-editor', steemEditor );
    Vue.filter( 'render-md', ( value ) => {
      if ( !value ) {
        return '';
      }
      return markdownIt.render( value );
    } );
  },
};

module.exports = VuesteemEditor;
