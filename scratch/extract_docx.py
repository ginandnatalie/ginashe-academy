import zipfile
import xml.etree.ElementTree as ET
import os

folder = r"c:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy\Ginashe Academy mapping"
output_file = r"c:\Users\ginas\OneDrive\Documents\George Master File\Ginashe-Academy\scratch\extracted_mapping.txt"

with open(output_file, 'w', encoding='utf-8') as f:
    for filename in os.listdir(folder):
        if filename.endswith(".docx"):
            path = os.path.join(folder, filename)
            try:
                with zipfile.ZipFile(path) as docx:
                    xml_content = docx.read('word/document.xml')
                    tree = ET.fromstring(xml_content)
                    
                    namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
                    
                    text = []
                    for paragraph in tree.findall('.//w:p', namespaces):
                        para_text = "".join(node.text for node in paragraph.findall('.//w:t', namespaces) if node.text)
                        if para_text:
                            text.append(para_text)
                    
                    f.write(f"--- {filename} ---\n")
                    f.write("\n".join(text))
                    f.write("\n\n")
            except Exception as e:
                f.write(f"Error reading {filename}: {e}\n\n")

print(f"Extraction complete. Output saved to {output_file}")
