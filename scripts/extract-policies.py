"""Turns saved Shopify policy pages into clean HTML fragments in data/policies.json.

usage: python3 scripts/extract-policies.py <dir-with-saved-html>
"""
import html, json, os, re, sys

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "policies.json")

PAGES = {
    "privacy-policy": ("Privacy policy", "policies_privacy-policy.html"),
    "refund-policy": ("Refund policy", "policies_refund-policy.html"),
    "shipping-policy": ("Shipping policy", "policies_shipping-policy.html"),
    "terms-of-service": ("Terms of service", "policies_terms-of-service.html"),
}

ALLOWED = {"p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "b", "i", "a", "br", "u"}


def clean(fragment: str) -> str:
    fragment = re.sub(r"<script.*?</script>", "", fragment, flags=re.S)
    fragment = re.sub(r"<style.*?</style>", "", fragment, flags=re.S)
    fragment = re.sub(r"<svg.*?</svg>", "", fragment, flags=re.S)
    fragment = re.sub(r"<!--.*?-->", "", fragment, flags=re.S)

    def fix_tag(m):
        closing, name, attrs = m.group(1), m.group(2).lower(), m.group(3)
        if name not in ALLOWED:
            return ""
        if name == "a" and not closing:
            href = re.search(r'href="([^"]*)"', attrs)
            return '<a href="%s">' % html.escape(href.group(1), quote=True) if href else "<a>"
        if name == "br":
            return "<br />"
        return "<%s%s>" % ("/" if closing else "", name)

    fragment = re.sub(r"<(/?)([a-zA-Z0-9]+)([^>]*)>", fix_tag, fragment)
    fragment = re.sub(r"<(p|li|h[234])>\s*</\1>", "", fragment)
    fragment = re.sub(r"\s*\n\s*", "\n", fragment)
    fragment = re.sub(r"[ \t]+", " ", fragment)
    fragment = re.sub(r"\n{2,}", "\n", fragment)
    return fragment.strip()


out = []
existing = {}
if os.path.exists(OUT):
    existing = {p["handle"]: p for p in json.load(open(OUT))}

for handle, (title, filename) in PAGES.items():
    path = os.path.join(SRC, filename)
    if not os.path.exists(path):
        print("missing", filename)
        if handle in existing:
            out.append(existing[handle])
        continue
    s = open(path, encoding="utf-8").read()
    if "Verifying your connection" in s:
        print("bot challenge in", filename)
        if handle in existing:
            out.append(existing[handle])
        continue
    m = re.search(r'<div class="rte[^"]*">(.*?)</div>\s*</div>\s*</div>', s, flags=re.S)
    if not m:
        i = s.find("<main")
        j = s.find("<footer", i)
        body = s[i:j]
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", body, flags=re.S)
        body = body[h1.end():] if h1 else body
    else:
        body = m.group(1)
    frag = clean(body)
    frag = re.sub(r"^.*?<h1>.*?</h1>", "", frag, count=1, flags=re.S) if "<h1>" in frag else frag
    out.append({"handle": handle, "title": title, "html": frag})
    print(handle, len(frag), "chars")

json.dump(out, open(OUT, "w"), indent=1, ensure_ascii=False)
