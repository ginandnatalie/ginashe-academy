import os
import re

repos = [
    r"C:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy",
    r"C:\Users\ginas\OneDrive\Documents\George Master File\gda-student-portal",
    r"C:\Users\ginas\OneDrive\Documents\George Master File\gda-staff-portal"
]

# Replacements to apply
# We will do these in a specific order:
# 1. Specific multi-word patterns first (e.g., Ginashe Digital Academy)
# 2. Specific hyphenated/abbreviated codes next (e.g. GDA-EXEC-2026 -> GA-EXEC-2026)
# 3. Clean up user annoyance regarding student_number formats
# 4. Standalone GDA -> Ginashe Academy (excluding code/technical patterns)

replacements = [
    # 1. Ginashe Digital Academy -> Ginashe Academy
    (r"\bGinashe Digital Academy\b", "Ginashe Academy"),
    (r"\bWhy GDA Academy\b", "Why Ginashe Academy"),
    (r"\bGDA Academy\b", "Ginashe Academy"),

    # 2. Technical codes & keys
    (r"GDA-EXEC-2026", "GA-EXEC-2026"),
    (r"GDA-TRANSFORM-26", "GA-TRANSFORM-26"),
    (r"GDA-HARDEN-TECH", "GA-HARDEN-TECH"),
    (r"GDA-STRAT-ADVISOR", "GA-STRAT-ADVISOR"),
    (r"GDA-BRIDGE-CUSTOM", "GA-BRIDGE-CUSTOM"),
    (r"PENDING-GDA-2026", "PENDING-GA-2026"),
    (r"GDA-AUTH-", "GA-AUTH-"),
    (r"GDA-\${", "GA-${"),
    (r"gda-labs", "ga-labs"),
    (r"\bGDA_Brain\b", "GA_Brain"),
    (r"\bGDA_GLOBAL_NODE\b", "GA_GLOBAL_NODE"),
    (r"e\.g\.\s*GDA-01", "e.g. GA-01"),
    (r"\'GDA\'", "'GA'"),
    (r"\"GDA\"", '"GA"'),
    (r"init:\s*\'GDA\'", "init: 'GA'"),

    # 3. Fix student number comments/annoyances to reflect 202600000 format
    (r"-- GDA-2026-XXXX format", "-- 202600000 format"),
    (r"-- Assigned on approval: GDA-YYYY-XXXX", "-- Assigned on approval: 202600000 format"),
    (r"GDA-2026-XXXX", "202600000"),
    (r"GDA-YYYY-XXXX", "202600000"),
]

# Standalone GDA replacement (whole word, case-sensitive)
# Avoid replacing inside URLs or technical terms if any.
standalone_gda_pattern = re.compile(r"\bGDA\b")

exclude_dirs = {'.git', 'node_modules', 'dist', 'Curriculumn', 'scratch'}

count_files_modified = 0
count_replacements = 0

for repo in repos:
    print(f"\nProcessing repository: {repo}")
    if not os.path.exists(repo):
        print(f"Warning: Repository path does not exist: {repo}")
        continue

    for root, dirs, files in os.walk(repo):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css', '.html', '.js', '.sql', '.toml')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    new_content = content
                    file_modified = False
                    
                    # 1. Apply standard replacements
                    for pattern, repl in replacements:
                        if re.search(pattern, new_content):
                            new_content = re.sub(pattern, repl, new_content)
                            file_modified = True

                    # 2. Apply standalone GDA replacement
                    if standalone_gda_pattern.search(new_content):
                        new_content = standalone_gda_pattern.sub("Ginashe Academy", new_content)
                        file_modified = True

                    # 3. Special database function override matching live DB structure
                    if file == "supabase_schema.sql" or file == "001_powerhouse_schema.sql":
                        func_pattern = r"CREATE OR REPLACE FUNCTION public\.generate_student_number\(\)\s*RETURNS text\s*LANGUAGE plpgsql\s*AS \$function\$.*?END;\s*\$function\$;"
                        live_func_def = """CREATE OR REPLACE FUNCTION public.generate_student_number()
 RETURNS text
 LANGUAGE plpgsql
 AS $function$
 BEGIN
     RETURN nextval('public.student_number_seq')::TEXT;
 END;
 $function$;"""
                        if re.search(func_pattern, new_content, re.DOTALL):
                            new_content = re.sub(func_pattern, live_func_def, new_content, flags=re.DOTALL)
                            file_modified = True

                    if file_modified and new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"  Modified: {os.path.relpath(file_path, repo)}")
                        count_files_modified += 1
                        
                except Exception as e:
                    print(f"  Error reading/writing {file_path}: {e}")

print(f"\nCompleted! Modified {count_files_modified} files across all repositories.")
