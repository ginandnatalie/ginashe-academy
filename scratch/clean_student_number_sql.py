import os
import re

repos = [
    r"C:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy",
    r"C:\Users\ginas\OneDrive\Documents\George Master File\gda-student-portal",
    r"C:\Users\ginas\OneDrive\Documents\George Master File\gda-staff-portal"
]

target_func_old = """CREATE OR REPLACE FUNCTION public.generate_student_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'Ginashe Academy-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(nextval('public.student_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;"""

target_func_old_2 = """CREATE OR REPLACE FUNCTION public.generate_student_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'Ginashe Academy-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(nextval('public.student_number_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;"""

live_func_def = """CREATE OR REPLACE FUNCTION public.generate_student_number()
RETURNS TEXT AS $$
BEGIN
    RETURN nextval('public.student_number_seq')::TEXT;
END;
$$ LANGUAGE plpgsql;"""

count_modified = 0

# Also replace comments in profiles and applications tables
comment_replacements = [
    (r"-- GDA-2026-XXXX format", "-- 202600000 format"),
    (r"-- GDA-YYYY-XXXX format", "-- 202600000 format"),
    (r"-- Assigned on approval: GDA-YYYY-XXXX", "-- Assigned on approval: 202600000 format"),
    (r"GDA-2026-XXXX", "202600000"),
    (r"GDA-YYYY-XXXX", "202600000"),
    (r"Ginashe Academy-2026-XXXX", "202600000"),
    (r"Ginashe Academy-YYYY-XXXX", "202600000"),
    (r"Ginashe Academy-2026-XXXX format", "202600000 format"),
    (r"Ginashe Academy-YYYY-XXXX format", "202600000 format"),
]

for repo in repos:
    print(f"\nScanning repo: {repo}")
    if not os.path.exists(repo):
        continue
    for root, dirs, files in os.walk(repo):
        for file in files:
            if file.endswith('.sql'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    
                    # Replace function defs
                    # We will do a generic regex replace for generate_student_number to catch any prefix variations
                    func_regex = r"CREATE OR REPLACE FUNCTION public\.generate_student_number\(\)\s*RETURNS\s+TEXT\s+AS\s+\$\$\s*BEGIN\s*RETURN\s+[^;]+;\s*END;\s*\$\$\s*LANGUAGE\s+plpgsql;"
                    if re.search(func_regex, new_content, re.IGNORECASE | re.DOTALL):
                        new_content = re.sub(func_regex, live_func_def, new_content, flags=re.IGNORECASE | re.DOTALL)
                    
                    # Also replace key comments
                    for pattern, repl in comment_replacements:
                        new_content = re.sub(pattern, repl, new_content, flags=re.IGNORECASE)
                        
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"  Modified SQL: {os.path.relpath(file_path, repo)}")
                        count_modified += 1
                except Exception as e:
                    print(f"  Error modifying {file_path}: {e}")

print(f"\nDone! Modified {count_modified} SQL files.")
