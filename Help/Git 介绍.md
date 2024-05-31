# Git 介绍

---

git是一个免费开源的版本控制系统，被设计用于快速高效地管理项目开发源码。通过git可以跟踪代码的状态，也可以在修改代码后对代码状态进行存储，还可以在需要时将已经修改过的代码恢复到之前的存储状态。创建分支`branch`，代码分支相当于一段独立的代码记录，可以在分支上进行修改而不影响其他分支。同时可以对分支进行合并，合并后一个分支的修改便可以在另一分支上生效。

#### 官网下载

[下载链接](https://git-scm.com/download/win) 无脑下一步

安装完成后

`win + r`输入`cmd`打开命令行窗口

```shell
git --version        # 查看git安装版本
```

#### 环境配置

```shell
git config --global user.name "6330A"
git config --global user.email "2213518860@qq.com"

git config --global --list  # 查看配置信息，用户签名和将来登录GitHub的账号没有任何关系
```

#### 新建文件夹

进入文件夹xxxx后右键在终端打开

```shell
git status  # 查看仓库状态
fatal: Not a git repository (or any of the parent directories): .git

git init    # 初始化本地仓库，出现隐藏文件夹.git，在右上角.../选项/查看/显示隐藏的文件...

git status  # 再次查看仓库状态
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

默认情况下，磁盘中的文件并不由git管理，我们必须要对代码目录进行初始化，初始化后git才能正常管理文件。进入目录后，直接在目录中执行`git init`即可完成项目的初始化，初始化后目录中多出一个.git目录，这个目录用于存储代码的版本信息，有了.git就意味着项目开始被git管理了，如果不希望项目被git管理，可以直接删除项目中的.git。

#### 文件状态

git中的文件有两种状态：未跟踪（比如新建了一个文件）和已跟踪（tracked untracked）。未跟踪指文件没有被git所管理，已跟踪指文件已被git管理。已跟踪的文件又有三种状态：已修改、暂存和未修改。

- 已修改：表示磁盘中的文件已被修改，和git仓库中文件不同
- 暂存：文件修改且已保存，但尚未提交到git仓库
- 未修改：表示磁盘中的文件和git仓库中文件相同，没有修改

通过`git status`查看文件状态（红色未跟踪，绿色已跟踪）

```shell
# 文件夹xxxx中新建了一个文件123.txt
git status                         # 首次未被跟踪
git add .\123.txt 
git status                         # add后显示已被跟踪，变为暂存状态
git commit -m "first commit xxx"
```

> 不管是新添加一个文件还是修改了原来的文件，都需要先`git add .`和`git commit -m "comments"`后才能变为未修改的状态

#### 分支branch

git在存储文件时，每一次代码的提交都会创建一个与之对应的节点，git就是通过一个一个的节点来记录代码的状态的。节点会构成一个树状结构，树状结构就意味着这个树会存在分支，默认情况下仓库只有一个分支，命名为master。在使用git时，可以创建多个分支，分支与分支之间相互独立，在一个分支上修改代码不会影响其他的分支。

```shell
git branch          # 查看本地分支，以及当前所在分支
git branch xxx      # 创建名为xxx的分支
git branch -d xxx   #删除名为xxx的分支

git switch xxx      #切换到xxx分支
git switch -c xxx   #创建名为xxx的分支并且直接切换到这个分支中，常用
```

- 合并分支

```shell
git switch master   # 首先切换到主分支
git merge xxx       # 合并分支，如果xxx是直接在master之后的，可以快速合并，修改指向，否则可能需要修改冲突
```

> 在实际工作中，通常先要创建分支，然后在自己的分支上进行修改，不要一上来就改

