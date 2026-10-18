/**
 * Google Docs Rich Content Parser & SEO Intelligence Extractor
 * Automatically identifies headings (H1, H2, H3), paragraphs, lists, links,
 * and text formatting copied directly from Google Docs or Word.
 */

/**
 * Clean Google redirect URLs: https://www.google.com/url?q=TARGET_URL&sa=... -> TARGET_URL
 */
function cleanGoogleLink(rawHref) {
  if (!rawHref) return "";
  try {
    if (rawHref.includes("google.com/url?")) {
      const parsed = new URL(rawHref);
      const target = parsed.searchParams.get("q");
      if (target) return decodeURIComponent(target);
    }
  } catch (_) {}
  return rawHref;
}

/**
 * Checks if an element looks like an intended heading based on font-size or strong styling
 */
function isPseudoHeading(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;

  const tagName = element.tagName.toLowerCase();
  if (/^h[1-6]$/.test(tagName)) return false; // Already a heading

  const style = element.getAttribute("style") || "";
  const text = (element.textContent || "").trim();

  // If text is very long or has ending period, it's a paragraph
  if (text.length > 130 || text.length < 3 || text.endsWith(".") || text.endsWith("!") || text.endsWith("?")) {
    return false;
  }

  // Check font size in inline style
  const fontSizeMatch = style.match(/font-size:\s*(\d+(?:\.\d+)?)(pt|px)/i);
  if (fontSizeMatch) {
    const val = parseFloat(fontSizeMatch[1]);
    const unit = fontSizeMatch[2].toLowerCase();
    if ((unit === "pt" && val >= 18) || (unit === "px" && val >= 24)) {
      return 2; // H2
    }
    if ((unit === "pt" && val >= 14 && val < 18) || (unit === "px" && val >= 18 && val < 24)) {
      return 3; // H3
    }
  }

  // Check if bold and uppercase or title-like
  const isBold =
    /font-weight:\s*(?:700|800|900|bold)/i.test(style) ||
    element.querySelector("b, strong") !== null;

  if (isBold && text.length < 80) {
    const isAllCaps = text === text.toUpperCase() && /[A-Z]/.test(text);
    const startsWithNumbering = /^(?:\d+[\.\)]|[A-Z][\.\)]|Step\s+\d+|Chapter\s+\d+)/i.test(text);
    if (isAllCaps || startsWithNumbering) {
      return 2; // H2
    }
    return 3; // H3
  }

  return false;
}

/**
 * Transform HTML copied from Google Docs into clean, semantic markup
 */
export function parseGoogleDocsHtml(htmlString) {
  if (!htmlString || typeof htmlString !== "string") return "";

  // Parse HTML string in browser DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const body = doc.body;

  // 1. Unwrap Google Docs wrapper `<b id="docs-internal-guid-...">`
  const docsWrappers = body.querySelectorAll('b[id^="docs-internal-guid"]');
  docsWrappers.forEach((wrapper) => {
    while (wrapper.firstChild) {
      wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
    }
    wrapper.remove();
  });

  // 2. Clean redirect links
  const links = body.querySelectorAll("a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    const cleaned = cleanGoogleLink(href);
    if (cleaned) {
      link.setAttribute("href", cleaned);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
    link.removeAttribute("style");
    link.removeAttribute("class");
  });

  // 3. Promote pseudo-headings in `<p>` tags
  const paragraphs = Array.from(body.querySelectorAll("p"));
  paragraphs.forEach((p) => {
    const headingLevel = isPseudoHeading(p);
    if (headingLevel) {
      const heading = doc.createElement(`h${headingLevel}`);
      heading.innerHTML = p.innerHTML;
      p.parentNode.replaceChild(heading, p);
    }
  });

  // 4. Flatten nested `<p>` inside `<li>`
  const listItems = body.querySelectorAll("li");
  listItems.forEach((li) => {
    const innerP = li.querySelector("p");
    if (innerP) {
      li.innerHTML = innerP.innerHTML;
    }
    li.removeAttribute("style");
    li.removeAttribute("class");
  });

  // 5. Clean styles from headings & paragraphs, keeping semantic elements
  const allElements = body.querySelectorAll("*");
  allElements.forEach((el) => {
    const tag = el.tagName.toLowerCase();

    // Preserve semantic attributes for links and images
    if (tag === "a") {
      el.removeAttribute("style");
      el.removeAttribute("class");
    } else if (tag === "img") {
      el.removeAttribute("style");
      el.removeAttribute("class");
      el.classList.add("blog-content-img");
    } else if (["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "li", "blockquote", "code", "pre", "table", "thead", "tbody", "tr", "th", "td"].includes(tag)) {
      el.removeAttribute("style");
      el.removeAttribute("class");
    } else if (tag === "span") {
      // Check if span has bold or italic style that needs preservation
      const style = el.getAttribute("style") || "";
      const isBold = /font-weight:\s*(?:700|800|900|bold)/i.test(style);
      const isItalic = /font-style:\s*italic/i.test(style);
      const isCode = /font-family:\s*(?:monospace|courier|consolas)/i.test(style);

      if (isBold && isItalic) {
        const strong = doc.createElement("strong");
        const em = doc.createElement("em");
        em.innerHTML = el.innerHTML;
        strong.appendChild(em);
        el.parentNode.replaceChild(strong, el);
      } else if (isBold) {
        const strong = doc.createElement("strong");
        strong.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(strong, el);
      } else if (isItalic) {
        const em = doc.createElement("em");
        em.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(em, el);
      } else if (isCode) {
        const code = doc.createElement("code");
        code.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(code, el);
      } else {
        // Plain span with just font-family or color: unwrap it
        while (el.firstChild) {
          el.parentNode.insertBefore(el.firstChild, el);
        }
        el.remove();
      }
    }
  });

  // 6. Remove empty paragraphs and empty headings
  const emptyCheckElements = body.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
  emptyCheckElements.forEach((el) => {
    const text = (el.textContent || "").trim();
    if (!text && !el.querySelector("img, iframe")) {
      el.remove();
    }
  });

  return body.innerHTML.trim();
}

/**
 * Parse plain text (e.g., if copied without rich HTML or from plain markdown/text)
 * Detects headings, bullet lists, numbered lists, and paragraphs.
 */
export function parsePlainTextContent(text) {
  if (!text || typeof text !== "string") return "";

  const lines = text.split(/\r?\n/);
  const output = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      output.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      output.push("</ol>");
      inOl = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      closeLists();
      continue;
    }

    // Markdown Heading 1
    if (line.startsWith("# ")) {
      closeLists();
      output.push(`<h1>${escapeHtml(line.slice(2).trim())}</h1>`);
      continue;
    }

    // Markdown Heading 2
    if (line.startsWith("## ")) {
      closeLists();
      output.push(`<h2>${escapeHtml(line.slice(3).trim())}</h2>`);
      continue;
    }

    // Markdown Heading 3
    if (line.startsWith("### ")) {
      closeLists();
      output.push(`<h3>${escapeHtml(line.slice(4).trim())}</h3>`);
      continue;
    }

    // Bullet List
    const bulletMatch = line.match(/^[\*\-\•\–\—]\s+(.*)$/);
    if (bulletMatch) {
      if (inOl) {
        output.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        output.push("<ul>");
        inUl = true;
      }
      output.push(`<li>${formatInlineText(bulletMatch[1])}</li>`);
      continue;
    }

    // Numbered List
    const numberMatch = line.match(/^\d+[\.\)]\s+(.*)$/);
    if (numberMatch) {
      if (inUl) {
        output.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        output.push("<ol>");
        inOl = true;
      }
      output.push(`<li>${formatInlineText(numberMatch[1])}</li>`);
      continue;
    }

    // Standalone title or heading heuristic (Short, title case or capitalized, no ending period)
    const isHeadingHeuristic =
      line.length < 80 &&
      !line.endsWith(".") &&
      !line.endsWith(",") &&
      (line === line.toUpperCase() || /^(?:Step|Chapter|Module|\d+[\.\)])/i.test(line));

    if (isHeadingHeuristic) {
      closeLists();
      output.push(`<h2>${escapeHtml(line)}</h2>`);
      continue;
    }

    // Regular paragraph
    closeLists();
    output.push(`<p>${formatInlineText(line)}</p>`);
  }

  closeLists();
  return output.join("\n");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatInlineText(text) {
  let escaped = escapeHtml(text);
  // Bold: **text** or __text__
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  escaped = escaped.replace(/__(.*?)__/g, "<strong>$1</strong>");
  // Italic: *text* or _text_
  escaped = escaped.replace(/\*(.*?)\*/g, "<em>$1</em>");
  escaped = escaped.replace(/_(.*?)_/g, "<em>$1</em>");
  // Code: `text`
  escaped = escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
  return escaped;
}

/**
 * Universal paste handler that automatically decides between HTML and Plain Text
 */
export function parseGoogleDocsClipboard(clipboardData) {
  if (!clipboardData) return "";

  const html = clipboardData.getData("text/html");
  if (html && (html.includes("docs-internal-guid") || html.includes("<p") || html.includes("<h1") || html.includes("<h2") || html.includes("<ul"))) {
    return parseGoogleDocsHtml(html);
  }

  const plain = clipboardData.getData("text/plain");
  if (plain) {
    return parsePlainTextContent(plain);
  }

  return "";
}

/**
 * Smart SEO metadata generator from blog content
 */
export function extractSEOFromContent(htmlContent, existingTitle = "") {
  if (!htmlContent) {
    return {
      title: existingTitle,
      seoExcerpt: "",
      metaTitle: existingTitle ? `${existingTitle} | Third Eye` : "",
      keywords: [],
    };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // 1. Identify Title: First H1, or first H2, or existing title
  let detectedTitle = existingTitle;
  if (!detectedTitle) {
    const firstH1 = doc.querySelector("h1");
    if (firstH1) {
      detectedTitle = firstH1.textContent.trim();
    } else {
      const firstH2 = doc.querySelector("h2");
      if (firstH2) detectedTitle = firstH2.textContent.trim();
    }
  }

  // 2. Identify SEO Excerpt: First non-empty paragraph
  let detectedExcerpt = "";
  const paragraphs = doc.querySelectorAll("p");
  for (const p of paragraphs) {
    const text = (p.textContent || "").trim();
    if (text.length > 40) {
      detectedExcerpt = text.slice(0, 160).trim();
      if (text.length > 160) detectedExcerpt += "...";
      break;
    }
  }

  // 3. Generate Meta Title (ideal length: 50-60 characters)
  let metaTitle = detectedTitle ? `${detectedTitle} | Third Eye` : "";
  if (metaTitle.length > 60 && detectedTitle) {
    metaTitle = `${detectedTitle.slice(0, 48)}... | Third Eye`;
  }

  // 4. Extract intelligent keywords from headings and text
  const stopWords = new Set([
    "the", "and", "for", "with", "from", "that", "this", "are", "have", "will", "your",
    "can", "all", "about", "more", "into", "their", "when", "which", "how", "what", "where",
    "who", "our", "you", "they", "them", "then", "there", "some", "such", "than", "been"
  ]);

  const headings = Array.from(doc.querySelectorAll("h1, h2, h3"))
    .map((h) => h.textContent.trim())
    .join(" ");

  const fullText = `${detectedTitle} ${headings} ${detectedExcerpt}`.toLowerCase();
  const words = fullText.match(/[a-z0-9+#.-]{3,}/g) || [];

  const wordFrequency = {};
  for (const word of words) {
    if (!stopWords.has(word) && !/^\d+$/.test(word)) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  }

  const sortedKeywords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

  return {
    title: detectedTitle,
    seoExcerpt: detectedExcerpt,
    metaTitle,
    keywords: sortedKeywords,
  };
}

/**
 * Calculate reading time & word statistics
 */
export function calculateReadingTime(htmlContent = "") {
  const plain = htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = plain ? plain.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    words,
    minutes,
    text: `${minutes} min read`,
  };
}
