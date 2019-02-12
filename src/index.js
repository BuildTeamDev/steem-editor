/**
 * Created by zhy on 2017/4/1.
 */


/**
 * steemEditor
 * @author hinesboy
 */
const steemEditor = require( './steem-editor.vue' );
const VuesteemEditor = {
  markdownIt: steemEditor.mixins[0].data().markdownIt,
  steemEditor,
  LeftToolbar: require( './components/md-toolbar-left' ),
  RightToolbar: require( './components/md-toolbar-right' ),
  install( Vue ) {
    Vue.component( 'steem-editor', steemEditor );
  },
};

module.exports = VuesteemEditor;
