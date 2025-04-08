import os

path2 = "English-Vietnamese/canada/canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/common_files"
path3 = "English-Vietnamese/canada/canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/"
fname = "oath-citizenship"
dir_list2 = os.listdir(path2)
for name in dir_list2:
    print(name)
with open(path3 + fname + ".html", encoding="utf-8") as fr:
    lines = fr.readlines()
# lines2 = []
c0 = 0
for item in dir_list2:
    c = 1
    c0 += 1
    print(item)
    lines2 = []
    for line in lines:
        # print(len(dir_list2), len(lines), c0, c)
        c+=1
        if item in line:
            # fw.write(line.replace( f"oath-citizenship_files/{item}", f"common_files/{item}"))
            print(line)
            line1 = line.replace( f"{fname}_files/{item}", f"common_files/{item}")
            lines2.append(line1)
        else:
            lines2.append(line)
    lines = lines2
with open(path3 + fname + ".html", "w", encoding="utf-8") as fw:
    for line in lines:
        fw.write(line)
