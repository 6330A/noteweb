# Docker

---

[视频地址](https://www.bilibili.com/video/BV1Zn4y1X7AZ?spm_id_from=333.788.videopod.episodes&vd_source=b9f16feb6ff7836e90c4ba95657422ea)				[官网下载安装need vpn](https://www.docker.com)

>  腾讯云租一个服务器

### 镜像操作

```sh
docker search nginx 		# 搜索镜像

docker pull nginx  			# 下载最新nginx镜像
docker images				# 列出所有镜像列表
```

[下载其他版本镜像copy版本号](https://hub.cocker.com/)

```sh
docker pull nginx:1.26.0
docker images

docker rmi nginx:latest		# 删除镜像，或者images查看唯一id后删除
docker rmi ******			# 查看唯一id后删除
```

### 启动容器

```sh
docker run --help
docker run nginx:1.26.0		# 如果没有镜像会自动下载
docker ps					# 查看所有运行中的Docker容器
docker ps -a				# 查看所有容器，包括停止了的
docker ps -aq				# 查看所有容器<仅显示容器id>
docker start 592887			# 启动容器
docker stop 592				# 停止
docker restart 592			# 无论容器是运行还是停止都可以启动
docker stats 				# 查看容器的cpu，内存包括网络io
docker logs 592				# 查看容器日志
docker rm 592				# 删除容器，需要先删除
docker rm -f 592			# 强制删除容器

docker rm -f $(docker ps -aq) 	# 删除所有容器
```

### `docker run`详细解读

   ```sh
   # 先来个无用示范，假设名字容器id是 ebd
   docker run -d --name xxx nginx 	# 指定后台启动，指定容器名字
   docker ps 						# 查看
   
   # 端口映射 p -> port 让浏览器可以访问 
   # 先删除上面的 ebd 容器
   docker rm -f ebd
   
   # 正确方式
   docker run -d --name xxx -p 80:80 nginx   	##################### <主机端口>:<容器端口>
   
   # 进入容器，容器名xxx可以替换为容器id的缩写
   docker exec -it xxx /bin/bash  
   ls
   
   # 退出容器
   docker exit
   ```

### 保存镜像

```sh
# 上一步创建的容器叫做xxx，使用镜像是nginx，现在commit
docker commit -m "update index.html" xxx newnamexxx:v1.0
docker images	# 查看发现多了一个镜像叫做newnamexxx，版本v1.0

docker save -o newnamexxx:v1.0 # 镜像打包为tar
ls

# 加载tar包获取到镜像，之后可以run了
docker load -i newnamexxx.tar
```

### 分享社区

[登录社区](https://hub.docker.com)

```sh
docker login
# 账号：
# 密码：
docker tag		# dockerhub为了区分这些镜像，需要用户名+镜像


docker tag newnamexxx:v1.0 liuzy/newnamexxx:v1.0	# 名字可改
docker images	# 再查看一下，镜像有个相同id名字不同而已
docker push liuzy/newnamexxx:v1.0
```

> 推送完成后可以添加镜像的说明书，Repository overview描述一下，比如启动命令，如何使用

### 存储：目录挂载

运行在自己的机器外面开辟一个目录（初始化为空，导致内部也为空）映射到内部目录，实时更改，确保容器重启后数据丢失

```sh
docker run -d -p 80:80 -v /app/nghtml:/usr/share/nginx/html --name app01 nginx
# 解释 <外部目录路径>:<容器内部目录路径>
cd /app/nghtml
ls
echo 22222 > index.html
ls
# 浏览器重新访问，显示22222

# 删除容器后，重新执行上面的run命令，还是能够访问显示22222
docker rm -f ba6  	# ba6是上面运行的容器id
docker run -d -p 80:80 -v /app/nghtml:/usr/share/nginx/html --name app01 nginx

ps
```

### 存储：卷映射

与目录挂载，初始化时候给个空目录不同，卷映射从容器内部复制文件到卷中

```sh
docker run -d -p 99:80 -v ngconf:/etc/nginx --name app03 nginx
						# ↑ 卷 ngconf 的位置在 /var/lib/docker/volumes中
# 解释 <卷名>:<容器内部目录路径>
# 卷名开头没有斜杠 /

# 查看所有卷
cd ~ 
pwd
docker volume ls

docker volume create haha					# 直接在外部创建卷

docker volume inspect ngconf				# 打印卷信息
docker volume rm $(docker volume ls -q)		# 删除所有卷
```

### 网络：

- **自定义网络**

```sh
ip a
docker run -d -p 88:80 --name app1 nginx
docker run -d -p 99:80 --name app2 nginx
docker inspect app1					# 查看ip地址
docker inspect app2					# 查看ip地址

docker exec -it app1 bash
curl http://172.17.03:80			# 上面<docker分配的唯一ip地址>:<容器端口>
```

> docker为每个容器分配唯一ip，使用容器ip+容器端口可以互相访问
>
> ip由于各种原因可能发送变化

- 创建自定义网络，容器名就是稳定域名

```sh
docker network --help
docker network create mynet
docker network ls

# 先删除之前的示例容器
docker rm -f $(docker ps -aq) 	# 删除所有容器

# 创建容器到自定义网络
docker run -d -p 88:80 --name app1 --newwork mynet nginx
docker run -d -p 99:80 --name app2 --newwork mynet nginx
docker exec -it app1 bash
curl http://app2:80
```

- **Redis主从集群**

> 同一个网络下两个redis容器，实现主从同步，读写分离，主机处理写，从机处理读
>
> 分别目录挂载确保数据不丢失
>
> 
>
> 注意：下面 -v 中的挂载目录需要修改一下读写权限哈（chmod），用于持久化同步容器数据的

[所需的Reids非官方镜像](https://hub.docker.com/r/bitnami/redis)

```sh
# 主机 \ 代表换行输入
docker run -d -p 6379:6379 \
-v /app/rd1:/bitnami/redis/data \
-e REDIS_REPLICATION_MODE=master \
-e REDIS_PASSWORD=123456 \
-- newwork mynet --name redis01 \
bitnami/redis

# 从机，需要配置连接到的主机名和密码等信息
docker run -d -p 6380:6379 \
-v /app/rd2:/bitnami/redis/data \
-e REDIS_REPLICATION_MODE=slave \
-e REDIS_MASTER_HOST=redis01 \
-e REDIS_MASTER_PORT_NUMBER=6379 \
-e REDIS_MASTER_PASSWORD=123456 \
-e REDIS_PASSWORD=123456
--network mynet --name redis02 \
bitnami/redis
```

### MySQL实践示例

[MySQL镜像地址](https://hub.docker.com/_/mysql/tags) 

```sh
# 配置文件和数据存储目录挂载，都是空
docker run -d -p 3306:3306 \
-v /app/myconf:/etc/mysql/conf.d \
-v /app/mydata:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:8.0.37-debian

docker ps 			# 查看启动
```

### Docker Compose 批量管理容器

[首先查看官网](https://docs.docker.com/compose/compose-file/)

`compose.yaml`文件

```yaml
name: myblog
services:
	mysql:
        container_name: mysql
        image: mysql
        ports:
            - "3306:3306"
        environment:
            - MYSQL_ROOT_PASSWORD=123456
            - MYSQL_DATABASE=wordpress
        volumes:
            - mysql-data:/var/lib/mysql
            - /app/myconf:/etc/mysql/conf.d
        restart: always
        network:
            - blog

    wordpress:
        images: wordpress
        ports:
        	- "8080:80"
        environment:
            - WORDPRESS_DB_HOST: mysql
            - WORDPRESS_DB_USER: root
            - WORDPRESS_DB_PASSWORD: 123456
            - WORDPRESS_DB_NAME: wordpress
        volumes:
        	- wordpress:/var/www/html
        restart: always
        network:
            - blog
        depends_on:
        	- mysql
volumes:
	mysql-data:
	wordpress:

networks:
	blog:
```

```sh
vim compose.yaml				# 编辑 esc 退出 wq
ls

docker compose up --help
docker comopse down --help

docker compose -f compose.yaml up -d
docker compose up -d			# 上线：首次启动
docker compose down				# 下线
docker compose -f compose.yaml down --rmi all -v	# 下线容器并删除所有的镜像和卷

docker compose start x1 x2 x3
docker compose stop x1 x3
docker compose scale x2=3
```

> 下线后卷里面的数据不会消失，继续上线会恢复

### Dockerfile 制作镜像

[查看dockerfile相关指令](https://docs.docker.com/reference/dockerfile/)

[不同语言指引示例](https://docs.docker.com/guides/)

```sh
java -jar app.jar --server.port=8888		# 指定运行端口
```

拷贝`app.jar`到服务器根目录

```sh
vim Dockerfile					# 编写一个Dockerfile文件 输入 i 进行编辑 esc wq
ls

cat Dockerfile

docker build -f Dockerfile -t myjavaapp:v1.0 .	# 最后的 . 指定了目录位置，对应Dockerfile文件路径
```

**Dockerfile文件**

```yaml
FROM openjdk:17					# 镜像 java 17

LABEL author=liuzy				# 标签

COPY app.jar /app.jar			# 复制到运行容器的路径，注意前面app.jar位置与下面的 . 有关

EXPOSE 8080						# 容器端口

ENTRYPOINT ["java","-jar","/app.jar"]	# 容器固定启动命令
```

### 镜像分层机制

::: tip
Docker 镜像并非是一个完整的、不可分割的文件，而是由一系列的只读层（layer）堆叠而成。每一层都代表了镜像构建过程中的一个步骤，例如一次文件的添加、修改或删除操作。这些层按照顺序堆叠，形成一个统一的文件系统视图，最终构成了一个完整的镜像。

节省存储空间：不同的镜像可以共享相同的基础层。例如，多个基于 `ubuntu:latest` 的镜像都可以共享 `ubuntu:latest` 这个基础层，而不需要每个镜像都单独存储一份完整的基础镜像文件，大大节省了磁盘空间。

加速镜像构建：当对镜像进行修改或更新时，只需要重新构建发生变化的层，而不需要重新构建整个镜像。例如，如果只是修改了 Dockerfile 中的 `COPY` 指令，那么只需要重新构建该指令对应的层，其他层可以直接复用，从而显著缩短了镜像构建的时间。

加速镜像分发：在分发镜像时，只需要传输发生变化的层，而不需要传输整个镜像。这样可以减少网络传输的数据量，加快镜像的下载速度。
:::

