# Linux 命令

---

[菜鸟教程](https://www.runoob.com/linux/linux-command-manual.html)

| 命令                                                        | 英文                    | 作用                                               |
| ----------------------------------------------------------- | ----------------------- | -------------------------------------------------- |
| [ls](https://www.runoob.com/linux/linux-comm-ls.html)       | list directory contents | 列出目前工作目录所含的文件及子目录                 |
| [pwd](https://www.runoob.com/linux/linux-comm-pwd.html)     | print work directory    | 显示工作目录                                       |
| [cd](https://www.runoob.com/linux/linux-comm-cd.html)       | change directory        | 切换目录                                           |
| [mkdir](https://www.runoob.com/linux/linux-comm-mkdir.html) | make directory          | 创建目录                                           |
| [touch](https://www.runoob.com/linux/linux-comm-touch.html) |                         | 修改文件或者目录的时间属性，若文件不存在，新建文件 |
| [cat](https://www.runoob.com/linux/linux-comm-cat.html)     | concatenate             | 用于连接文件并打印到标准输出设备上                 |
| [rm](https://www.runoob.com/linux/linux-comm-rm.html)       | remove                  | 删除一个文件或者目录                               |
| [mv](https://www.runoob.com/linux/linux-comm-mv.html)       | move file               | 为文件或目录改名、或将文件或目录移入其它位置       |
| [du](https://www.runoob.com/linux/linux-comm-du.html)       | disk usage              | 显示目录或文件的大小                               |
| [cp](https://www.runoob.com/linux/linux-comm-cp.html)       | copy file               | 复制文件或目录                                     |
| [zip](https://www.runoob.com/linux/linux-comm-zip.html)     |                         | 压缩文件                                           |
| [unzip](https://www.runoob.com/linux/linux-comm-unzip.html) |                         | 解压缩zip文件                                      |
| [sudo](https://www.runoob.com/linux/linux-comm-sudo.html)   | superuser do            | 使用root权限                                       |
| [find](https://www.runoob.com/linux/linux-comm-find.html)   |                         | 在指定目录下查找文件和目录                         |
| clear                                                       |                         | 清除屏幕                                           |

[vi/vim](https://www.runoob.com/linux/linux-vim.html)的使用

- 命令模式  Command Mode
- 输入模式  Insert Mode
- 命令行模式  Command-Line Mode

| 命令         | 作用                                     |
| ------------ | ---------------------------------------- |
| vim file.txt | 打开/新建文件进入                        |
| i            | 切换输入模式                             |
| esc          | 一般模式                                 |
| :            | 切换到底线命令模式，以在最底一行输入命令 |
| :wq          | 保存文件并退出                           |

#### 提升权限

```sh
sudo su
```

#### 切换目录

```sh
cd ..             # 切换上级 
cd ../..          # 切换上上级
cd 绝对路径
cd 相对路径
```

#### 创建目录

```sh
mkdir folder                         # 创建目录
mkdir -p folder1/folder2/folder3     # 创建多级目录
```

#### 打印文件

```sh
cat > file.txt    # 创建a.txt文件，之后可以写入，ctrl + d进行保存
cat file.txt      # 将指定文件的内容输出到终端
```

#### 删除文件或目录

```sh
rm file.txt       # 删除文件
rm -r folder      # 递归删除目录及文件，r表示recursive
rm -r *           # 删除当前目录下的所有文件及目录
```

#### 文件或目录改名/移动

```sh
mv a.txt b.txt            # 文件重命名
mv a.txt folder           # 文件移动到folder目录中
mv a b                    # 如果b目录存在，则将a目录移动到b目录，否则是a目录改名为b目录
mv -r folder1/* folder2   # 移动目录中所有文件到指定目录
```

#### 复制文件或目录

```sh
cp a.txt b.txt            # 复制文件
cp a.txt folder           # 复制文件到指定目录
cp -r folder1 folder2     # 复制目录，在目录folder2中有目录folder1
cp -r folder1/* folder2   # 复制目录中所有的文件到指定目录
```

#### 压缩和解压

```sh
zip newname.zip abc.txt          # 压缩文件
zip -r newname.zip afolder       # 压缩目录
unzip dataset.zip                # 解压文件到当前目录
unzip dataset.zip -d folder      # 解压文件到指定目录
```

#### 查找文件和目录
