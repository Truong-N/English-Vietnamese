import os

path2 = "English-Vietnamese/canada/canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/common_files"
path3 = "English-Vietnamese/canada/canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/"

dir_list2 = os.listdir(path2)
# for name in dir_list2:
#     print(name)
with open(path3 + "notice.html", encoding="utf-8") as fr:
    lines = fr.readlines()
print(dir_list2[0])
for line in lines:
    for item in dir_list2:
        if item in line:
            line = line.replace(f"notice_files/{item}", f"common_files/{item}")
            print(line)
with open(path3 + "notice.html", "w", encoding="utf-8") as fw:
    fw.writelines(lines)
