import os

repos = [
    r"C:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy",
    r"C:\Users\ginas\OneDrive\Documents\George Master File\gda-student-portal",
    r"C:\Users\ginas\OneDrive\Documents\George Master File\gda-staff-portal"
]

replacements = [
    ("gda-applications", "ginashe-applications"),
    ("gda-staff", "ginashe-staff"),
    ("gda-archive", "ginashe-archive"),
    ("gda-student-progress", "ginashe-student-progress"),
]

count_modified = 0
exclude_dirs = {'.git', 'node_modules', 'dist', 'Curriculumn', 'scratch'}

for repo in repos:
    print(f"\nScanning repo: {repo}")
    if not os.path.exists(repo):
        continue
    for root, dirs, files in os.walk(repo):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    modified = False
                    for target, repl in replacements:
                        if target in new_content:
                            new_content = new_content.replace(target, repl)
                            modified = True
                            
                    if modified:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"  Modified file: {os.path.relpath(file_path, repo)}")
                        count_modified += 1
                except Exception as e:
                    print(f"  Error modifying {file_path}: {e}")

print(f"\nCompleted! Modified {count_modified} TypeScript files.")
