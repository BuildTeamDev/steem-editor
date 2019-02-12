## Markdown-It

### Get the markdown-it object of steemEditor

#### method 1:  Global Registration
```javascript
  import steemEditor from 'steem-editor'
  Vue.use(steemEditor)
  ...
  steemEditor.markdownIt
```

#### method 2: Local Registration
```javascript
  import {steemEditor} from 'steem-editor'
  steemEditor.getMarkdownIt()
  or
  steemEditor.mixins[0].data().s_markdown
```

#### method 3: Use steemEditor ref
```javascript
   <steemEditor ref=md></steemEditor>
   ...
   this.refs.md.markdownIt
```

### Use markdown-it object

> eg: set the line break style

```
    // get markdownIt as above
    markdownIt.set({ breaks: false });
```

> [markdown-it API](https://github.com/markdown-it/markdown-it)
