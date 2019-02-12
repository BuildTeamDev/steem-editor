### Use

#### method 1
`index.js`:
```javascript
    // Global Registration
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
// The same below
<div id="main">
    <steem-editor v-model="value"/>
</div>
```

#### method 2
`index.js`:
```javascript
    // Global Registration
    // require with Webpack/Node.js
    ...
    var steemEditor = require('steem-editor')
    import 'steem-editor/dist/css/index.css'

    ...
```

#### method 3
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
	// The same below
    import Vue from 'vue';
    var editor = require('./editor.vue');
    new Vue({
        el: '#main',
        render: h => h(editor)
    });
```
`index.html`:
```html
// The same below
<div id="main">
</div>
```

#### method 4
`editor.vue`:
```javascript
    ...
    <script>
    // Local Registration
    // import steemEditor from 'steem-editor'
    var steemEditor = require('steem-editor')
	// the Object of markdown-it : steemEditor.markdownIt
    import 'steem-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            'steem-editor': steemEditor.steemEditor
        }
    }
    </script>
    <style>
    ...
    </style>
```
