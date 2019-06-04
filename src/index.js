/**
 * Created by zhy on 2017/4/1.
 */

import LeftToolbar from "./components/md-toolbar-left.vue";
import RightToolbar from "./components/md-toolbar-right.vue";
import { parseHtml } from "./lib/mixins/parser.js";
import steemEditor from "./steem-editor.vue";

/**
 * steemEditor
 * @author hinesboy
 */
function renderMarkdown(value) {
  if ( !value ) {
    return "";
  }
  return parseHtml(value);
  return steemEditor.mixins[ 0 ].data()
    .markdownIt
    .render(value);
}

const VuesteemEditor = {
  steemEditor,
  LeftToolbar,
  RightToolbar,
  install(Vue) {
    Vue.component("steem-editor", steemEditor);
    Vue.filter("renderMD", renderMarkdown);
    Vue.prototype.$renderMD = renderMarkdown;
  },
};

export default VuesteemEditor;
