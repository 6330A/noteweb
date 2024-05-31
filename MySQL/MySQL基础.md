# MySQL基础

---

[视频地址](https://www.bilibili.com/video/BV17G41177d1?p=13&spm_id_from=pageDriver&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

MySQL：关系型数据库管理系统

Navicat

~~~sql
-- 查询数据库、创建数据库、切换数据库、删除数据库
SHOW DATABASES;
CREATE DATABASE student;
USE student;
DROP DATABASE student;
~~~

SQL语言分为五个部分

- 数据查询语言DQL          SELECT FROM WHERE
- 数据操作语言DML         INSERT UPDATA DELETE
- 数据定义语言DDL          CREATE ALTER DROP
- 数据控制语言DCL          GRANT REVOKE
- 事务控制语言TCL           START TRANSACTION COMMIT

#### DDL创建表，添加、修改表字段等

```sql
-- 创建student表
CREATE TABLE student(
	sno INT,
    name VARCHAR(55),
    sex CHAR(2),
    age INT,
    dtdata DATE,
    classname VARCHAR(55),
    email VARCHAR(55)
)

-- 查询表结构
DESC student;

-- 查询建立表的完整的SQL语句
SHOW CREATE TABLE student;
```

```sql
-- 最后添加一个字段
ALTER TABLE student ADD score1 double(4,1);

-- 最前添加一个字段
ALTER TABLE student ADD score2 double(4,1) FIRST;

-- 指定列后面添加一个字段
ALTER TABLE student ADD score3 double(4,1) AFTER age;

-- 修改列的信息（类型）
ALTER TABLE student MODIFY score INT;

-- 修改列的信息（名字和类型）
ALTER TABLE student CHANGE score sco DOUBLE(4,3);

-- 删除列
ALTER TABLE student DROP sco;

-- 修改表名
ALTER TABLE student RENAME TO stu;

-- 删除表
DROP TABLE student;
```



#### DML数据操作

```sql
-- 创建student表
CREATE TABLE student(
	sno INT,
    name VARCHAR(55),
    sex CHAR(2),
    age INT,
    score DOUBLE(4,1),
    dtdata DATE,
    classname VARCHAR(55),
    email VARCHAR(55)
)

-- 新增记录，values后面按照表结构顺序填写，不区分单双引号
INSERT INTO student VALUES(1, 'ZS', '男', '18', '99', '20224-3-11', 'SQL', '123@QQ');

-- 日期NOW()、CURRENT_DATE()、SYSDATE()没有太大区别
INSERT INTO student VALUES(1, 'ZS', '男', '18', '99', NOW(), 'SQL', '123@QQ');

-- 指定列添加数据
INSERT INTO student(name) VALUES('LS');

INSERT INTO student(sno, name) VALUES(2, 'LS');

-- 修改数据操作
UPDATA student SET age = 18;
UPDATA student SET age = 18 WHERE sno = 1;
UPDATA student SET age = 18, dtdate = '2000-9-9' WHERE sno = 1 AND sex = '男';

-- 删除表的记录
DELETE FROM student WHERE age = 0;

-- 删除表中所有的数据
DELETE FROM student;

-- 通过直接删除表，然后新建一个同样表结构的空表，速度更快
TRUNCATE FROM student;
```

#### 列级别约束

```sql
-- 创建表增加列级别约束
CREATE TABLE student(
    -- 主键自增
	sno INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL,
    sex CHAR(2) DEFAULT '男' CHECK (sex = '男' or sex = '女'),
    age INT CHECK(age >= 0 and age <= 100),
    score DOUBLE(4,1) NOT NULL,
    dtdata DATE NOT NULL,
    classname VARCHAR(55) NOT NULL,
    email VARCHAR(55) UNIQUE
)
```

#### 表级别约束

```sql
CREATE TABLE student(
	sno INT AUTO_INCREMENT,
    name VARCHAR(55) NOT NULL,
    sex CHAR(2) DEFAULT '男',
    age INT,
    score DOUBLE(4,1) NOT NULL,
    dtdata DATE NOT NULL,
    classname VARCHAR(55) NOT NULL,
    email VARCHAR(55),
    
    -- 中间的名字自己命名
    CONSTRAINT pk_stu_sno PRIMARY KEY(sno),
    CONSTRAINT ck_stu_sex check(sex = '男' or sex = '女'),
    CONSTRAINT uk_stu_email PRIMARY unique(email),    
)

-- 或者手动添加约束
ALTER TABLE student ADD CONSTRAINT pk_stu_sno PRIMARY KEY(sno);
ALTER TABLE student MODIFY sno INT AUTO_INCREMENT;
```

#### 外键约束

```sql
CREATE TABLE class(
	classno INT PRIMARY KEY AUTO_INCREMENT,
    classname VARCHAR(55)
)

CREATE TABLE student(
	sno INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(55),
    sex CHAR(2),
    classno INT
    
    -- 两个表建立外键关系，class父表、student子表
    CONSTRAINT fk_stu_classno FOREIGN KEY (classno) REFERENCES class(classno)
);

-- 或者手动在外面添加外键
ALTER TABLE student ADD CONSTRAINT fk_stu_classno FOREIGN KEY (classno) REFERENCES class(classno);
```

对于设计了外键的两个表，删除时候可能出现不同的情况级联，具体看外键的设计



#### 快速创建表 数据+结构，表中设置的主键并不会过来

```sql
CREATE TABLE student0
AS
SELECT * FROM student;

-- 只要表结构不要数据，其中*也可以改为自己想要的字段
CREATE TABLE student0
AS
SELECT * FROM student WHERE 1 = 2;
```

#### DQL

```sql
-- 查询指定列
SELECT empno, ename FROM emp;

-- 使用算术运算进行查询 + - * / %，起别名加上AS
SELECT empno, ename, sal, sal*12 AS '年薪' FROM emp;

-- 
SELECT empno, ename, sal;

-- 查询工作岗位，去重关键字DISTINCT：不同的，明显的
SELECT DISTINCT job FROM emp;

-- 关键字DISTINCT加在最前面，对整体去重
SELECT DISTINCT deptno, job FROM emp;

-- 排序，默认升序ASC，降序关键字DESC
SELECT * FROM emp ORDER BY sal, hiredate DESC;

--  WHERE > < = IS OR || NOT IN AND && BETWEEN ... AND ...
SELECT * FROM emp WHERE sal < 1000;
SELECT * FROM emp WHERE sal >= 1000;

-- 其中<>和!=一个意思
SELECT * FROM emp WHERE sal <> 1000;

-- 查询加班费为0员工信息，IS NULL，不能使用=
SELECT * FROM emp WHERE comm IS NULL;

-- AND优先级高于OR
SELECT * FROM emp WHERE ename = 'SMITH' OR ename = 'ALLEN' AND sal > 7000;

```

#### 模糊查询LIKE关键字

```sql
-- 名字含有王
SELECT * FROM emp WHERE ename like '%s王%s';

-- 名字第二个字符含有王
SELECT * FROM emp WHERE ename like '_王%s';
```

#### DQL函数使用，单行函数、多行函数

```sql
-- 单行函数很多；执行SQL语句时，分别产生一条记录
SELECT ename, LOWER(ename), UPPER(name) FROM emp;

-- 其中流程函数较为重要
SELECT ename, sal, IF(sal >= 3000, '高收入', '低收入') AS '薪资等级' FROM emp;

-- 在计算月薪过程中，可能有些员工没有加班费NULL，而不是0，不能直接相加，使用流程函数
SELECT ename, sal + IFNULL(comm, 0) AS '月薪' FROM emp;

-- 分ABCD等级，这个很重要
SELECT ename, sal,
	CASE 
		WHEN sal >= 3000 THEN 'A'
	 	WHEN sal >= 2000 THEN 'B'
	 	WHEN sal >= 1000 THEN 'C'
		ELSE 'D'
	END AS '薪资等级'
FROM emp;
```

```sql
-- 多行函数,就五个，MAX()、MIN()、SUM()、AVG()、COUNT()
-- 多行函数在进行操作时，会自动忽视NULL字段
SELECT MAX(sal), MIN(sal), SUM(sal), AVG(sal), COUNT(sal) FROM emp;

SELECT COUNT(1) FROM emp;
SELECT COUNT(*) FROM emp;

-- 统计岗位个数
SELECT COUNT(DISTINCT job) FROM emp;
```

#### DQL分组GROUP BY和HAVING，其中HAVING取代原来的WHERE

```sql
-- 统计各个部门的平均工资（只显示平均工资2000以上）
SELECT deptno, COUNT(deptno) FROM emp GROUP BY deptno;

SELECT deptno, AVG(sal) FROM emp GROUP BY deptno HAVING AVG(sal) >= 2000 ORDER BY AVG(sal);
```

#### SELECT语句执行顺序

FROM        WHERE        GROUP  BY         SELECT        HAVING        ORDER  BY

#### 多表查询：JOIN ON

```sql
-- 交叉连接CROSS JOIN 笛卡尔积
SELECT * FROM emp CROSS JOIN dept;

-- 自然连接NATURAL JOIN，是字段名进行匹配，与外键无关
-- 优点：查询出的内容就是我们想要的结果
-- 缺点：在确定哪一个列是共同字段的时候查找的效率比较低，因为需要一个一个比较
SELECT * FROM emp NATURAL JOIN dept;

-- USING连接JOIN USING
-- 优点：不需要挨个列进行查找，可以指定对应列
-- 缺点：要求两个表字段名相同，否则失效
SELECT * FROM emp JOIN dept USING(deptno);

-- ON连接
SELECT * FROM emp JOIN dept ON emp.deptno = dept.deptno;
-- 别名
SELECT * FROM emp e JOIN dept d ON e.deptno = d.deptno;
```

#### 左外连接、右外连接、UNION进行全连接

```sql
-- LEFT JOIN 左外连接
-- 左表内容全部显示，若匹配不到右表内容使用NULL代替
SELECT * FROM emp e LEFT JOIN dept d ON e.deptno = d.deptno;

-- RIGHT JOIN 左外连接
-- 右表内容全部显示，若匹配不到左表内容使用NULL代替
SELECT * FROM emp e RIGHT JOIN dept d ON e.deptno = d.deptno;

-- UNION连接左外和右外实现全连接
SELECT * FROM emp e LEFT JOIN dept d ON e.deptno = d.deptno;
UNION
SELECT * FROM emp e RIGHT JOIN dept d ON e.deptno = d.deptno;

-- 以上的UNION若替换为UNION ALL，则不会去除重复部分，仅仅在数据上累加
```

```sql
-- 三表联合查询emp,dept,salagrad，员工表，部门表，薪资等级表
SELECT * FROM emp e JOIN dept d ON e.deptno = d.deptno
					JOIN salagrad s ON e.sal BETWEEN s.lowsal AND s.highsal;
```

#### 自连接查询

```sql
-- 自连接查询
-- 自己表中字段关联自己表中字段，好处是可以减少表的建立
-- 如员工表中，含上级领导一列，领导也是员工
SELECT * FROM emp e1
		 JOIN emp e2 ON e1.MGR = e2.empno;
```

#### 子查询（不相关子查询、相关子查询）

```sql
-- 常用不相关子查询，而相关子查询用的少
-- 特点：一条SQL语句含有多个SELECT，先执行子查询，再执行外查询；子查询可以独立运行
SELECT sal FROM emp WHERE ename = 'CLARK';
SELECT * FROM emp WHERE sal > (SELECT sal FROM emp WHERE ename = 'CLARK');


-- 以上是单行子查询，多行的如下,ANY可以替换为ALL,IN
SELECT * FROM emp WHERE sal < ANY(SELECT sal FROM emp WHERE job = 'CLERK')
```

> P37作业分析处理，三个题目，看视频，这里不写了

```sql
-- 相关子查询，查询速度慢，不常用，而且难以想到
-- 查询部门最高工资员工信息
SELECT * FROM emp e1 WHERE sal in(SELECT MAX(sal) FROM emp e2 WHERE e1.deptno = e2.deptno)
```

