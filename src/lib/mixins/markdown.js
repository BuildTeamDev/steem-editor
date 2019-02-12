import hljsLangs from '../core/hljs/lang.hljs.js';
import {
  loadScript,
} from '../core/extra-function.js';
const markdown_config = {
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-', // CSS language prefix for fenced blocks. Can be
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '“”‘’',
};
const markdown = require( 'markdown-it' )( markdown_config );

// 表情
const emoji = require( 'markdown-it-emoji' );

// 下标
const sub = require( 'markdown-it-sub' );

// 上标
const sup = require( 'markdown-it-sup' );

// <dl/>
const deflist = require( 'markdown-it-deflist' );

// <abbr/>
const abbr = require( 'markdown-it-abbr' );

// footnote
const footnote = require( 'markdown-it-footnote' );

// insert 带有下划线 样式 ++ ++
const insert = require( 'markdown-it-ins' );

// mark
const mark = require( 'markdown-it-mark' );

// taskLists
const taskLists = require( 'markdown-it-task-lists' );

// container
const container = require( 'markdown-it-container' );

//
const toc = require( 'markdown-it-toc' );

// add target="_blank" to all link
const defaultRender = markdown.renderer.rules.link_open || function ( tokens, idx, options, env, self ) {
  return self.renderToken( tokens, idx, options );
};
markdown.renderer.rules.link_open = function ( tokens, idx, options, env, self ) {

  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex( 'target' );

  if ( aIndex < 0 ) {
    tokens[idx].attrPush( [ 'target', '_blank' ] ); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank'; // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender( tokens, idx, options, env, self );
};
const mihe = require( 'markdown-it-highlightjs-external' );

// math katex
const katex = require( 'markdown-it-katex-external' );
const miip = require( 'markdown-it-images-preview' );
let missLangs = {};
let needLangs = [];
const hljs_opts = {
  hljs: 'auto',
  highlighted: true,
  langCheck( lang ) {
    if ( lang && hljsLangs[lang] && !missLangs[lang] ) {
      missLangs[lang] = 1;
      needLangs.push( hljsLangs[lang] );
    }
  },
};
markdown.use( mihe, hljs_opts )
  .use( emoji )
  .use( sup )
  .use( sub )
  .use( container )
  .use( container, 'hljs-left' ) /* align left */
  .use( container, 'hljs-center' )/* align center */
  .use( container, 'hljs-right' )/* align right */
  .use( deflist )
  .use( abbr )
  .use( footnote )
  .use( insert )
  .use( mark )
  .use( container )
  .use( miip )
  .use( katex )
  .use( taskLists )
  .use( toc );

export default {
  data() {
    return {
      markdownIt: markdown,
    };
  },
  mounted() {
    const $vm = this;
    hljs_opts.highlighted = this.ishljs;
  },
  methods: {
    $render( src, func ) {
      const $vm = this;
      missLangs = {};
      needLangs = [];
      const res = markdown.render( src );
      if ( this.ishljs ) {
        if ( needLangs.length > 0 ) {
          $vm.$_render( src, func, res );
        }
      }
      func( res );
    },
    $_render( src, func, res ) {
      const $vm = this;
      let deal = 0;
      for ( let i = 0; i < needLangs.length; i++ ) {
        const url = $vm.p_external_link.hljs_lang( needLangs[i] );
        loadScript( url, function () {
          deal = deal + 1;
          if ( deal === needLangs.length ) {
            res = markdown.render( src );
            func( res );
          }
        } );
      }
    },
  },
  watch: {
    ishljs( val ) {
      hljs_opts.highlighted = val;
    },
  },
};
