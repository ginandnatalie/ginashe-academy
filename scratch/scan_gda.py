import os
import re

root_dir = r"c:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy"
output_file = r"c:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy\scratch\gda_scan_results_full.txt"

patterns = [
    (r"\bGinashe Digital Academy\b", "Ginashe Digital Academy"),
    (r"\bGDA\b", "GDA")
]

results = []
exclude_dirs = {'.git', 'node_modules', 'dist', 'Curriculumn', 'scratch'}

for root, dirs, files in os.walk(root_dir):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.html', '.js')):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                for idx, line in enumerate(lines):
                    for pattern, label in patterns:
                        if re.search(pattern, line):
                            results.append({
                                'file': os.path.relpath(file_path, root_dir),
                                'line_num': idx + 1,
                                'pattern': label,
                                'text': line.strip()
                            })
            except Exception as e:
                print(f"Error reading {file_path}: {e}")

with open(output_file, 'w', encoding='utf-8') as out:
    for res in results:
        out.write(f"File: {res['file']}:{res['line_num']} [{res['pattern']}]\n")
        out.write(f"  Code: {res['text']}\n\n")

print(f"Scan complete. Found {len(results)} matches. Results saved to {output_file}")
