import json
import re

def parse_mapping():
    with open('extracted_mapping.txt', 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    schools = {}
    current_school_abbr = None
    parsing_courses = False
    
    current_course = None
    state = 'SEARCHING' # SEARCHING, COURSE_META, MODULES, OUTCOME, ENTRY

    for i in range(len(lines)):
        line = lines[i]

        # Detect school section start (e.g. #1 \n SDS \n School of Digital Systems)
        match = re.match(r'^#(\d+)$', line)
        if match and i + 1 < len(lines):
            abbr = lines[i+1]
            if len(abbr) == 3 and abbr.isupper():
                current_school_abbr = abbr
                if current_school_abbr not in schools:
                    schools[current_school_abbr] = []
                parsing_courses = False
                continue

        if line == 'Courses in this school':
            parsing_courses = True
            continue

        if parsing_courses and current_school_abbr:
            # Detect course start: The next line after "Courses in this school" or after "Entry requirement" value is a course title.
            # Usually course title is followed by NQF level
            if i + 1 < len(lines) and lines[i+1].startswith('NQF '):
                # Save previous course
                if current_course:
                    schools[current_school_abbr].append(current_course)
                
                current_course = {
                    'title': line,
                    'nqf': lines[i+1],
                    'meta': '',
                    'modules': '',
                    'outcome': '',
                    'entry': ''
                }
                state = 'COURSE_META'
                continue
                
            if current_course:
                if state == 'COURSE_META' and line.startswith('⏱'):
                    current_course['meta'] = line
                    state = 'SEARCHING'
                elif line == 'Modules':
                    state = 'MODULES'
                elif line == 'Graduate outcome':
                    state = 'OUTCOME'
                elif line == 'Entry requirement':
                    state = 'ENTRY'
                else:
                    if state == 'MODULES':
                        current_course['modules'] += line + ' '
                    elif state == 'OUTCOME':
                        current_course['outcome'] += line + ' '
                    elif state == 'ENTRY':
                        current_course['entry'] += line + ' '

    if current_course:
        schools[current_school_abbr].append(current_course)

    with open('courses.json', 'w', encoding='utf-8') as f:
        json.dump(schools, f, indent=2)

if __name__ == '__main__':
    parse_mapping()
