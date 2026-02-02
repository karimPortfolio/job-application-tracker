import { useMemo } from "react";

interface SafeHtmlRenderOptions {
  allowedTags?: Set<string>;
}

const DEFAULT_ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "i",
  "em",
  "u",
  "p",
  "br",
  "ul",
  "ol",
  "li",
  "span",
  "a",
  "code",
  "pre",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

/**
 * Hook to sanitize and render HTML while preventing XSS attacks.
 * Preserves basic formatting (bold, italic, lists, headers, links) while stripping dangerous content.
 *
 * @param html - The HTML string to sanitize
 * @param options - Optional configuration for allowed tags
 * @returns Sanitized HTML string safe for rendering with dangerouslySetInnerHTML
 */
export function useSafeHtmlRender(html?: string, options?: SafeHtmlRenderOptions) {
  const safeHtml = useMemo(() => {
    const content = html ?? "";
    if (!content) return "";

    const allowedTags = options?.allowedTags ?? DEFAULT_ALLOWED_TAGS;

    const template = document.createElement("template");
    template.innerHTML = content;

    const cleanNode = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();

        // Drop script/style entirely
        if (tag === "script" || tag === "style") {
          el.remove();
          return;
        }

        // If tag not allowed, unwrap its children
        if (!allowedTags.has(tag)) {
          const parent = el.parentNode;
          if (parent) {
            while (el.firstChild) parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
          }
          return;
        }

        // Strip all attributes except safe ones for anchors
        const attrs = Array.from(el.attributes);
        for (const attr of attrs) {
          const name = attr.name.toLowerCase();
          if (
            tag === "a" &&
            (name === "href" || name === "target" || name === "rel")
          ) {
            continue;
          }
          el.removeAttribute(attr.name);
        }

        // Enforce safe rel on anchors
        if (tag === "a") {
          const href = el.getAttribute("href") || "";
          if (href.startsWith("javascript:")) {
            el.removeAttribute("href");
          }
          el.setAttribute("rel", "noopener noreferrer");
          el.setAttribute("target", "_blank");
        }
      }

      // Recurse children (use static array to avoid live collection issues)
      for (const child of Array.from(node.childNodes)) {
        cleanNode(child);
      }
    };

    cleanNode(template.content);
    return template.innerHTML;
  }, [html, options?.allowedTags]);

  return safeHtml;
}
