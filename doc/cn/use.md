### Use (如何引入)

#### 方法1
`index.js`:
```javascript
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import steemEditor from 'steem-editor'
    import 'steem-editor/dist/css/index.css'
    // use
    Vue.use(steemEditor)
    new Vue({
        'el': '#main',
        data() {
            return { value: '' }
        }
    })
```
`index.html`
```html
// 下同
<div id="main">
    <steem-editor v-model="value"/>
</div>
```

#### 方法2
`index.js`:
```javascript
    // 全局注册
    // require with Webpack/Node.js
    ...
    var steemEditor = require('steem-editor')
    import 'steem-editor/dist/css/index.css'
    ...
```

#### 方法3
`editor.vue`:
```javascript
    <template>
        <div id="editor">
            <steem-editor style="height: 100%"></steem-editor>
        </div>
    </template>
    <script>
    // Local Registration
    import { steemEditor } from 'steem-editor'
    import 'steem-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            steemEditor
            // or 'steem-editor': steemEditor
        }
    }
    </script>
    <style>
    #editor {
        margin: auto;
        width: 80%;
        height: 580px;
    }
    </style>
```
`index.js`:
```javascript
	// 下同
    import Vue from 'vue';
    var editor = require('./editor.vue');
    new Vue({
        el: '#main',
        render: h => h(editor)
    });
```
`index.html`:
```html
// 下同
<div id="main">
</div>
```

#### 方法4
`editor.vue`:
```javascript
    ...
    <script>
    // Local Registration
    // import steemEditor from 'steem-editor'
    var steemEditor = require('steem-editor')
    import 'steem-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            'steem-editor': steemEditor.steemEditor
        }
    }
    </script>
    <style>
    #editor {
    ...
    </style>
```
