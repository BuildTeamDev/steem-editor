import filter from "lodash/filter";
import Remarkable from "remarkable";
import sanitizeHtml from "sanitize-html";
import htmlReady from "./html-ready";
import sanitizeConfig from "./sanitize-config";

const remarkable = new Remarkable({
  html: true, // remarkable renders first then sanitize runs...
  breaks: true,
  linkify: false, // linkify is done locally
  typographer: false, // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
  quotes: "“”‘’",
});

const imageRegex = /https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,})))/gi;

// https://d.tube/#!/v/bil.prag/r3al6rte
const dtubeImageRegex = /<a href="https:\/\/d.tube.#!\/v\/([^/"]+)\/([^/"]+)"[A-Za-z0-9_"= ]*><img src="[^"]+"[A-Za-z0-9_"= ]*\/><\/a>/g;

const tableRegex = /<table>/g;
const tableEndRegex = /<\/table>/g;

const latexRegex = /\[\+\]((\n|.)*?)\[\+\]/g;

const jsonParse = function (input) {
  try {
    let parsed = JSON.parse(input);
    return typeof parsed === "object" ? parsed : null;
  } catch ( e ) {
    return null;
  }
};

export function parseHtml(body, jsonMetadata, options = {}) {
  if ( !body ) {
    return "";
  }

  let parsedJsonMetadata = jsonMetadata ? jsonParse(jsonMetadata) || {} : {};
  if ( parsedJsonMetadata !== Object(parsedJsonMetadata) ) {
    parsedJsonMetadata = {};
  }

  parsedJsonMetadata.image = parsedJsonMetadata.image || [];

  if ( !Array.isArray(parsedJsonMetadata.image) ) {
    parsedJsonMetadata.image = [ parsedJsonMetadata.image ];
  }

  let parsedBody = body.replace(/<!--([\s\S]+?)(-->|$)/g, "(html comment removed: $1)");

  // parsedBody = parsedBody.replace(/^\s+</gm, '<')

  parsedBody.replace(imageRegex, img => {
    if ( filter(parsedJsonMetadata.image,
      i => (typeof i === "string" || i instanceof String) && i.indexOf(img) !== -1).length === 0 ) {
      parsedJsonMetadata.image.push(img);
    }
  });

  parsedBody = parsedBody.replace(
    latexRegex,
    (match, p1) => `![${p1}](https://latex.codecogs.com/gif.latex?${encodeURI(p1)})`,
  );
  parsedBody = remarkable.render(parsedBody);

  const htmlReadyOptions = { mutate: true, resolveIframe: true };
  parsedBody = htmlReady(parsedBody, htmlReadyOptions).html;

  if ( options.rewriteLinks ) {
    parsedBody = parsedBody.replace(
      /['"]https?:\/\/(?:www)?steemit.com\/([A-Za-z0-9@/\-.]*)['"]/g,
      (match, p1) => `"/${p1}"`,
    );
  }

  parsedBody = sanitizeHtml(parsedBody, sanitizeConfig({}));

  // add custom (stempeak) css class to unstyled table element
  parsedBody = parsedBody.replace(tableRegex, "<div class=\"table-responsive\"><table class=\"table table-striped\">")
    .replace(tableEndRegex, "</table></div>");

  // handle dtube embedded video
  //if (postHelper.methods.isDtubeVideo(parsedJsonMetadata)) {
  if ( false ) {
    parsedBody = parsedBody.replace(dtubeImageRegex, (match, dtubeAuthor, dtbuePermlink) => {
      return "<div class=\"media\"><div class=\"media__video\"><iframe title=\"DTube Video\" width=\"100%\" height=\"420px\" src=\""
             + `https://emb.d.tube/#!/${dtubeAuthor}/${dtbuePermlink}`
             + "\" frameborder=\"0\" allowfullscreen></iframe></div></div>";
    });
  }

  return parsedBody;
}


