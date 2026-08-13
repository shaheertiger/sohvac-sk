import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes Uplift article HTML before it's ever rendered. Content comes
 * from an external service, so it's treated as untrusted input — this
 * runs server-side, before the string reaches dangerouslySetInnerHTML.
 *
 * Two things beyond the usual XSS allowlist:
 * - No <script>, <style>, <iframe>, <object>, <embed>, <form>, and no
 *   event-handler/style attributes or `javascript:`/`data:` URLs — the
 *   sanitize-html defaults already strip these; the allowlist below is
 *   just the small, deliberate set of tags/attrs an article body needs.
 * - Any <h1> in the article body is downgraded to <h2>. The page itself
 *   renders the article's title as the one true <h1> (requirement 4:
 *   "one clear H1") — an editor accidentally adding their own H1 inside
 *   the body shouldn't be able to produce two.
 */
export function sanitizeArticleHtml(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== "string") return "";

  return sanitizeHtml(rawHtml, {
    allowedTags: [
      "h2", "h3", "h4", "h5", "h6",
      "p", "br", "hr",
      "strong", "b", "em", "i", "u", "s", "mark", "sub", "sup",
      "ul", "ol", "li",
      "a", "img", "figure", "figcaption",
      "blockquote", "code", "pre",
      "table", "thead", "tbody", "tr", "th", "td",
      "span", "div",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      h1: "h2",
      // Force safe, non-leaking behavior on any externally-supplied link
      // that opens in a new tab, regardless of what the source HTML set.
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
    // Belt-and-suspenders: even if something above lets a style attribute
    // through via allowedAttributes["*"], strip inline style entirely —
    // article content should carry no inline styling of its own.
    exclusiveFilter: (frame) => frame.tag === "style" || frame.tag === "script",
  });
}
