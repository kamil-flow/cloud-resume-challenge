#!/usr/bin/env python3
import json
from markdown import markdown
from pathlib import Path

base = Path(__file__).resolve().parent.parent.parent
data_path = base / "backend" / "data" / "projects.json"
out_path = base / "frontend" / "src" / "data"/ "projectsData.json"

# load JSON from file
with open(data_path, encoding="utf-8") as f:
    projects = json.load(f)            # <= json.load, not json.loads

# render markdown to html
for item in projects:
    if "body" in item and item["body"] is not None:
        item["body_html"] = markdown(item.pop("body"))

# write back to file
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(projects, f, ensure_ascii=False, indent=2)
