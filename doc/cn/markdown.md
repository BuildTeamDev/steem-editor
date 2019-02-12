## Markdown-It

### 获取steemEditor中的markdown-it对象

#### 方法1 通过全局引入的steemEditor获取
```javascript
  import steemEditor from 'steem-editor'
  Vue.use(steemEditor)
  ...
  steemEditor.markdownIt
```

#### 方法2 通过局部引入的steemEditor获取
```javascript
  import {steemEditor} from 'steem-editor'
  steemEditor.getMarkdownIt()
  或者
  steemEditor.mixins[0].data().markdownIt
```

#### 方法3 通过steemEditor的实例获取
```javascript
   <steemEditor ref=md></steemEditor>
   ...
   this.refs.md.markdownIt
```

### 使用markdown-it对象

> 设置markdown换行格式必须为行尾添加两空格

```
    // markdownIt通过上述方式获取
    markdownIt.set({ breaks: false });
```

> [更多设置参考markdown-it...](https://github.com/markdown-it/markdown-it)
