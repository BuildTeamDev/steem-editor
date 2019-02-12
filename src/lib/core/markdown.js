/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T00:31:20+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: markdown.js
 * @Last modified by:   chc
 * @Last modified time: 2017-11-26T16:40:54+08:00
 * @License: MIT
 * @Copyright: 2017
 */

import hljsLangs from './hljs/lang.hljs.js';

/**
 * Created by zhy on 2017/3/30.
 */
// default mode
const markdown_config = {
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  linkify: false, // 自动识别url
  typographer: true,
  quotes: '“”‘’',
  highlight( str, lang ) {
    if ( lang && hljsLangs[lang] ) {
      return '<pre><div class="hljs"><code class="' + lang + '">' + markdown.utils.escapeHtml( str ) + '</code></div></pre>';
    }
    return '<pre><code class="' + lang + '">' + markdown.utils.escapeHtml( str ) + '</code></pre>';
  },
};
var markdown = require( 'markdown-it' )( markdown_config );

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

//
const container = require( 'markdown-it-container' );

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

// math katex
const katex = require( 'markdown-it-katex-external' );
const miip = require( 'markdown-it-images-preview' );
markdown.use( emoji )
  .use( taskLists )
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
  .use( katex );
export default markdown;
