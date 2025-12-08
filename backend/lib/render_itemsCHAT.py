
#!/usr/bin/env python3
import json
import markdown
import yaml
import re
from pathlib import Path

def parse_front_matter(content):
    # remove BOM if present
    content = content.lstrip('\ufeff')

    # Fast path: content starts with --- and has at least one more '---'
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            front = parts[1].strip()
            body = parts[2].lstrip('\r\n')
            return front, body

    # Fallback: more flexible regex (anchors multi-line front matter anywhere at top)
    m = re.search(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL | re.MULTILINE)
    if m:
        return m.group(1), m.group(2)

    return None, None

def render_items(folder):
    base = Path(__file__).resolve().parent.parent.parent
    input_dir = base / "backend" / "data" / folder
    out_path = base / "frontend" / "src" / "data" / f"{folder}Data.json"

    if not input_dir.exists():
        raise FileNotFoundError(f"Input directory not found: {input_dir}")

    markdown_files = sorted(input_dir.glob("*.md"))
    items = []

    for md_file in markdown_files:
        content = md_file.read_text(encoding="utf-8")
        front_matter_text, body = parse_front_matter(content)

        if not front_matter_text:
            # helpful debug info — you'll see which files were skipped
            print(f"[skip] no front matter in: {md_file.name}")
            continue

        try:
            metadata = yaml.safe_load(front_matter_text) or {}
        except Exception as e:
            print(f"[skip] yaml parse error in {md_file.name}: {e}")
            continue

        # render markdown body to HTML
        metadata["body_html"] = markdown.markdown(body)
        metadata.setdefault("source", md_file.name)
        items.append(metadata)

    # ensure output directory exists
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with out_path.open("w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

    print(f"[ok] wrote {len(items)} items to {out_path}")


