# import OS module
import os

print(os.listdir())
# Get the list of all files and directories
path1 = "English-Vietnamese/canada/canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/oath-citizenship_files"
dir_list1 = os.listdir(path1)
print("Files and directories in '", path1, "' :")
# prints all files
# print(dir_list1)

path2 = "English-Vietnamese/canada/canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online/common_files"
dir_list2 = os.listdir(path2)
print("Files and directories in '", path2, "' :")
# prints all files
# print(len(dir_list2))
for name2 in dir_list2:
    if name2 in dir_list1:
        os.remove(path1 + "/" + name2)