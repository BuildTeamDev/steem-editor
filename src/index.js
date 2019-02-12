/**
 * Created by zhy on 2017/4/1.
 */
'use strict';

/**
 * steemEditor
 * @author hinesboy
 */
const steemEditor = require('./steem-editor.vue');
const VuesteemEditor = {
    markdownIt: steemEditor.mixins[0].data().markdownIt,
    steemEditor: steemEditor,
    LeftToolbar: require('./components/md-toolbar-left'),
    RightToolbar: require('./components/md-toolbar-right'),
    install: function(Vue) {
        Vue.component('steem-editor', steemEditor);
    }
};

module.exports = VuesteemEditor;
