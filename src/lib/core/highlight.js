/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-06-16T21:01:47+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: highlight.js
 * @Last modified by:   chc
 * @Last modified time: 2017-11-24T19:55:22+08:00
 * @License: MIT
 * @Copyright: 2017
 */

// import hljs from 'highlight.js-async-webpack'
import {
  loadScript,
} from './extra-function.js';
function highLightCode( str, callback, hljsLangFuc, hljsFuc ) {
  const hljs = window.hljs;
  if ( !hljs ) {
    if ( typeof hljsFuc !== 'function' ) {
      console.warn( 'external_link.hljs_js is not a function, hljs can not load by steem-editor, if you want to disabled this log, set external_link.hljs_js to function' );
      callback( str );
      return;
    }
    const url = hljsFuc();
    console.warn( 'hljs parsing file is missing. steem-editor will autoload', url );
    loadScript( url, function () {
      _highLightCode( str, callback, hljsLangFuc );
    } );
  } else if ( typeof hljsLangFuc === 'function' ) {
    _highLightCode( str, callback, hljsLangFuc );
  } else {
    console.warn( 'external_link.hljs_lang is not a function, hljs will not to work' );
    callback( str );
  }
}
function _highLightCode( str, callback, hljsLangFuc ) {
  const dom = document.createElement( 'div' );
  const hljs = window.hljs;
  dom.innerHTML = str;
  const pre_code = dom.querySelectorAll( 'pre > div.hljs > code' );
  if ( pre_code && hljs && ( typeof hljsLangFuc === 'function' ) ) {
    const flag = 0;
    let i = 0;
    let deal = 0;
    const not_include_lang = {}; // these lang parse file need to be include.
    let url = '';
    for ( i = 0; i < pre_code.length; i++ ) {
      var lang = pre_code[i].className.toLowerCase();
      if ( lang.length > 0 ) {

        // if this lang parse file missing
        url = hljsLangFuc( lang );
        if ( !hljs.getLanguage( lang ) && !not_include_lang.hasOwnProperty( lang ) && url.length > 0 ) {
          not_include_lang[lang] = url;
        }
      }
    }

    // we need to include these lang parse file manually
    const need_langs = [];
    for ( const key in not_include_lang ) {
      if ( not_include_lang.hasOwnProperty( key ) ) {
        need_langs.push( key );
      }
    }
    for ( i = 0; i < need_langs.length; i++ ) {
      url = not_include_lang[need_langs[i]];
      loadScript( url, function () {
        deal = deal + 1;
        if ( deal === need_langs.length ) {
          for ( let i = 0; i < pre_code.length; i++ ) {
            const lang = pre_code[i].className;

            // if lang is valid.
            if ( lang.length > 0 && hljs.getLanguage( lang ) ) {
              hljs.highlightBlock( pre_code[i] );
            }
          }
          callback( dom.innerHTML );
        }
      } );
    }
    if ( need_langs.length === 0 ) {
      for ( i = 0; i < pre_code.length; i++ ) {
        lang = pre_code[i].className;

        // if lang is valid.
        if ( lang.length > 0 && hljs.getLanguage( lang ) ) {
          hljs.highlightBlock( pre_code[i] );
        }
      }
      callback( dom.innerHTML );
    }
  } else {
    callback( dom.innerHTML );
  }
}
export default highLightCode;
