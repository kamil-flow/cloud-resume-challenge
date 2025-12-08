#!/usr/bin/env python3
import json, sys, markdown, yaml, re
from pathlib import Path


def render_items(folder):
    base = Path(__file__).resolve().parent.parent.parent
    input_dir = base / "backend" / "data" / folder
    out_path = base / "frontend" / "src" / "data"/ f"{folder}Data.json"

    markdown_files = list(input_dir.glob("*.md"))

    # Changes: Instead of importing a json file.
    # I should be collecting all the markdown files in a directory called data/projects and the front matter will create the dicionary structure.
    data_path = base / "backend" / "data" / "projects.json"

    # load JSON from file
    items = []
    for md_file in markdown_files:
        content = md_file.read_text(encoding='utf-8')

        # Extract from matter (between --- ---)
        match = re.search(r"^---\s*\n(.*?)\n---\s*\n(.*)$", content, re.DOTALL)
         
         # re.match(r"---\n(.*?)\n---\n(.*)"
        if not match:
            print(f"Not front matter found in {md_file.name}")
            continue
        
        front_matter, body = match.groups()
        metadata = yaml.safe_load(front_matter)
        metadata["body_html"] = markdown.markdown(body)
        items.append(metadata)
    # render markdown to html



    # write back to file
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print(f"[ok] wrote {len(items)} items to {out_path}")