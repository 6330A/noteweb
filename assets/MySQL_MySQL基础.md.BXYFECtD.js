import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.Dp2ecPID.js";const m=JSON.parse('{"title":"MySQL基础","description":"","frontmatter":{},"headers":[],"relativePath":"MySQL/MySQL基础.md","filePath":"MySQL/MySQL基础.md"}'),e={name:"MySQL/MySQL基础.md"},l=p(`<h1 id="mysql基础" tabindex="-1">MySQL基础 <a class="header-anchor" href="#mysql基础" aria-label="Permalink to &quot;MySQL基础&quot;">​</a></h1><p><a href="https://www.bilibili.com/video/BV17G41177d1?p=13&amp;spm_id_from=pageDriver&amp;vd_source=b9f16feb6ff7836e90c4ba95657422ea" target="_blank" rel="noreferrer">视频地址</a></p><p>MySQL：关系型数据库管理系统</p><p>Navicat</p><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 查询数据库、创建数据库、切换数据库、删除数据库</span></span>
<span class="line"><span>SHOW DATABASES;</span></span>
<span class="line"><span>CREATE DATABASE student;</span></span>
<span class="line"><span>USE student;</span></span>
<span class="line"><span>DROP DATABASE student;</span></span></code></pre></div><p>SQL语言分为五个部分</p><ul><li>数据查询语言DQL SELECT FROM WHERE</li><li>数据操作语言DML INSERT UPDATA DELETE</li><li>数据定义语言DDL CREATE ALTER DROP</li><li>数据控制语言DCL GRANT REVOKE</li><li>事务控制语言TCL START TRANSACTION COMMIT</li></ul><h4 id="ddl创建表-添加、修改表字段等" tabindex="-1">DDL创建表，添加、修改表字段等 <a class="header-anchor" href="#ddl创建表-添加、修改表字段等" aria-label="Permalink to &quot;DDL创建表，添加、修改表字段等&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 创建student表</span></span>
<span class="line"><span>CREATE TABLE student(</span></span>
<span class="line"><span>	sno INT,</span></span>
<span class="line"><span>    name VARCHAR(55),</span></span>
<span class="line"><span>    sex CHAR(2),</span></span>
<span class="line"><span>    age INT,</span></span>
<span class="line"><span>    dtdata DATE,</span></span>
<span class="line"><span>    classname VARCHAR(55),</span></span>
<span class="line"><span>    email VARCHAR(55)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 查询表结构</span></span>
<span class="line"><span>DESC student;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 查询建立表的完整的SQL语句</span></span>
<span class="line"><span>SHOW CREATE TABLE student;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 最后添加一个字段</span></span>
<span class="line"><span>ALTER TABLE student ADD score1 double(4,1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 最前添加一个字段</span></span>
<span class="line"><span>ALTER TABLE student ADD score2 double(4,1) FIRST;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 指定列后面添加一个字段</span></span>
<span class="line"><span>ALTER TABLE student ADD score3 double(4,1) AFTER age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 修改列的信息（类型）</span></span>
<span class="line"><span>ALTER TABLE student MODIFY score INT;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 修改列的信息（名字和类型）</span></span>
<span class="line"><span>ALTER TABLE student CHANGE score sco DOUBLE(4,3);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 删除列</span></span>
<span class="line"><span>ALTER TABLE student DROP sco;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 修改表名</span></span>
<span class="line"><span>ALTER TABLE student RENAME TO stu;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 删除表</span></span>
<span class="line"><span>DROP TABLE student;</span></span></code></pre></div><h4 id="dml数据操作" tabindex="-1">DML数据操作 <a class="header-anchor" href="#dml数据操作" aria-label="Permalink to &quot;DML数据操作&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 创建student表</span></span>
<span class="line"><span>CREATE TABLE student(</span></span>
<span class="line"><span>	sno INT,</span></span>
<span class="line"><span>    name VARCHAR(55),</span></span>
<span class="line"><span>    sex CHAR(2),</span></span>
<span class="line"><span>    age INT,</span></span>
<span class="line"><span>    score DOUBLE(4,1),</span></span>
<span class="line"><span>    dtdata DATE,</span></span>
<span class="line"><span>    classname VARCHAR(55),</span></span>
<span class="line"><span>    email VARCHAR(55)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 新增记录，values后面按照表结构顺序填写，不区分单双引号</span></span>
<span class="line"><span>INSERT INTO student VALUES(1, &#39;ZS&#39;, &#39;男&#39;, &#39;18&#39;, &#39;99&#39;, &#39;20224-3-11&#39;, &#39;SQL&#39;, &#39;123@QQ&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 日期NOW()、CURRENT_DATE()、SYSDATE()没有太大区别</span></span>
<span class="line"><span>INSERT INTO student VALUES(1, &#39;ZS&#39;, &#39;男&#39;, &#39;18&#39;, &#39;99&#39;, NOW(), &#39;SQL&#39;, &#39;123@QQ&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 指定列添加数据</span></span>
<span class="line"><span>INSERT INTO student(name) VALUES(&#39;LS&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>INSERT INTO student(sno, name) VALUES(2, &#39;LS&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 修改数据操作</span></span>
<span class="line"><span>UPDATA student SET age = 18;</span></span>
<span class="line"><span>UPDATA student SET age = 18 WHERE sno = 1;</span></span>
<span class="line"><span>UPDATA student SET age = 18, dtdate = &#39;2000-9-9&#39; WHERE sno = 1 AND sex = &#39;男&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 删除表的记录</span></span>
<span class="line"><span>DELETE FROM student WHERE age = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 删除表中所有的数据</span></span>
<span class="line"><span>DELETE FROM student;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 通过直接删除表，然后新建一个同样表结构的空表，速度更快</span></span>
<span class="line"><span>TRUNCATE FROM student;</span></span></code></pre></div><h4 id="列级别约束" tabindex="-1">列级别约束 <a class="header-anchor" href="#列级别约束" aria-label="Permalink to &quot;列级别约束&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 创建表增加列级别约束</span></span>
<span class="line"><span>CREATE TABLE student(</span></span>
<span class="line"><span>    -- 主键自增</span></span>
<span class="line"><span>	sno INT PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span>    name VARCHAR(55) NOT NULL,</span></span>
<span class="line"><span>    sex CHAR(2) DEFAULT &#39;男&#39; CHECK (sex = &#39;男&#39; or sex = &#39;女&#39;),</span></span>
<span class="line"><span>    age INT CHECK(age &gt;= 0 and age &lt;= 100),</span></span>
<span class="line"><span>    score DOUBLE(4,1) NOT NULL,</span></span>
<span class="line"><span>    dtdata DATE NOT NULL,</span></span>
<span class="line"><span>    classname VARCHAR(55) NOT NULL,</span></span>
<span class="line"><span>    email VARCHAR(55) UNIQUE</span></span>
<span class="line"><span>)</span></span></code></pre></div><h4 id="表级别约束" tabindex="-1">表级别约束 <a class="header-anchor" href="#表级别约束" aria-label="Permalink to &quot;表级别约束&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE student(</span></span>
<span class="line"><span>	sno INT AUTO_INCREMENT,</span></span>
<span class="line"><span>    name VARCHAR(55) NOT NULL,</span></span>
<span class="line"><span>    sex CHAR(2) DEFAULT &#39;男&#39;,</span></span>
<span class="line"><span>    age INT,</span></span>
<span class="line"><span>    score DOUBLE(4,1) NOT NULL,</span></span>
<span class="line"><span>    dtdata DATE NOT NULL,</span></span>
<span class="line"><span>    classname VARCHAR(55) NOT NULL,</span></span>
<span class="line"><span>    email VARCHAR(55),</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    -- 中间的名字自己命名</span></span>
<span class="line"><span>    CONSTRAINT pk_stu_sno PRIMARY KEY(sno),</span></span>
<span class="line"><span>    CONSTRAINT ck_stu_sex check(sex = &#39;男&#39; or sex = &#39;女&#39;),</span></span>
<span class="line"><span>    CONSTRAINT uk_stu_email PRIMARY unique(email),    </span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 或者手动添加约束</span></span>
<span class="line"><span>ALTER TABLE student ADD CONSTRAINT pk_stu_sno PRIMARY KEY(sno);</span></span>
<span class="line"><span>ALTER TABLE student MODIFY sno INT AUTO_INCREMENT;</span></span></code></pre></div><h4 id="外键约束" tabindex="-1">外键约束 <a class="header-anchor" href="#外键约束" aria-label="Permalink to &quot;外键约束&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE class(</span></span>
<span class="line"><span>	classno INT PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span>    classname VARCHAR(55)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CREATE TABLE student(</span></span>
<span class="line"><span>	sno INT PRIMARY KEY AUTO_INCREMENT,</span></span>
<span class="line"><span>    name VARCHAR(55),</span></span>
<span class="line"><span>    sex CHAR(2),</span></span>
<span class="line"><span>    classno INT</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    -- 两个表建立外键关系，class父表、student子表</span></span>
<span class="line"><span>    CONSTRAINT fk_stu_classno FOREIGN KEY (classno) REFERENCES class(classno)</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 或者手动在外面添加外键</span></span>
<span class="line"><span>ALTER TABLE student ADD CONSTRAINT fk_stu_classno FOREIGN KEY (classno) REFERENCES class(classno);</span></span></code></pre></div><p>对于设计了外键的两个表，删除时候可能出现不同的情况级联，具体看外键的设计</p><h4 id="快速创建表-数据-结构-表中设置的主键并不会过来" tabindex="-1">快速创建表 数据+结构，表中设置的主键并不会过来 <a class="header-anchor" href="#快速创建表-数据-结构-表中设置的主键并不会过来" aria-label="Permalink to &quot;快速创建表 数据+结构，表中设置的主键并不会过来&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CREATE TABLE student0</span></span>
<span class="line"><span>AS</span></span>
<span class="line"><span>SELECT * FROM student;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 只要表结构不要数据，其中*也可以改为自己想要的字段</span></span>
<span class="line"><span>CREATE TABLE student0</span></span>
<span class="line"><span>AS</span></span>
<span class="line"><span>SELECT * FROM student WHERE 1 = 2;</span></span></code></pre></div><h4 id="dql" tabindex="-1">DQL <a class="header-anchor" href="#dql" aria-label="Permalink to &quot;DQL&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 查询指定列</span></span>
<span class="line"><span>SELECT empno, ename FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 使用算术运算进行查询 + - * / %，起别名加上AS</span></span>
<span class="line"><span>SELECT empno, ename, sal, sal*12 AS &#39;年薪&#39; FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- </span></span>
<span class="line"><span>SELECT empno, ename, sal;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 查询工作岗位，去重关键字DISTINCT：不同的，明显的</span></span>
<span class="line"><span>SELECT DISTINCT job FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 关键字DISTINCT加在最前面，对整体去重</span></span>
<span class="line"><span>SELECT DISTINCT deptno, job FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 排序，默认升序ASC，降序关键字DESC</span></span>
<span class="line"><span>SELECT * FROM emp ORDER BY sal, hiredate DESC;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--  WHERE &gt; &lt; = IS OR || NOT IN AND &amp;&amp; BETWEEN ... AND ...</span></span>
<span class="line"><span>SELECT * FROM emp WHERE sal &lt; 1000;</span></span>
<span class="line"><span>SELECT * FROM emp WHERE sal &gt;= 1000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 其中&lt;&gt;和!=一个意思</span></span>
<span class="line"><span>SELECT * FROM emp WHERE sal &lt;&gt; 1000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 查询加班费为0员工信息，IS NULL，不能使用=</span></span>
<span class="line"><span>SELECT * FROM emp WHERE comm IS NULL;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- AND优先级高于OR</span></span>
<span class="line"><span>SELECT * FROM emp WHERE ename = &#39;SMITH&#39; OR ename = &#39;ALLEN&#39; AND sal &gt; 7000;</span></span></code></pre></div><h4 id="模糊查询like关键字" tabindex="-1">模糊查询LIKE关键字 <a class="header-anchor" href="#模糊查询like关键字" aria-label="Permalink to &quot;模糊查询LIKE关键字&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 名字含有王</span></span>
<span class="line"><span>SELECT * FROM emp WHERE ename like &#39;%s王%s&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 名字第二个字符含有王</span></span>
<span class="line"><span>SELECT * FROM emp WHERE ename like &#39;_王%s&#39;;</span></span></code></pre></div><h4 id="dql函数使用-单行函数、多行函数" tabindex="-1">DQL函数使用，单行函数、多行函数 <a class="header-anchor" href="#dql函数使用-单行函数、多行函数" aria-label="Permalink to &quot;DQL函数使用，单行函数、多行函数&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 单行函数很多；执行SQL语句时，分别产生一条记录</span></span>
<span class="line"><span>SELECT ename, LOWER(ename), UPPER(name) FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 其中流程函数较为重要</span></span>
<span class="line"><span>SELECT ename, sal, IF(sal &gt;= 3000, &#39;高收入&#39;, &#39;低收入&#39;) AS &#39;薪资等级&#39; FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 在计算月薪过程中，可能有些员工没有加班费NULL，而不是0，不能直接相加，使用流程函数</span></span>
<span class="line"><span>SELECT ename, sal + IFNULL(comm, 0) AS &#39;月薪&#39; FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 分ABCD等级，这个很重要</span></span>
<span class="line"><span>SELECT ename, sal,</span></span>
<span class="line"><span>	CASE </span></span>
<span class="line"><span>		WHEN sal &gt;= 3000 THEN &#39;A&#39;</span></span>
<span class="line"><span>	 	WHEN sal &gt;= 2000 THEN &#39;B&#39;</span></span>
<span class="line"><span>	 	WHEN sal &gt;= 1000 THEN &#39;C&#39;</span></span>
<span class="line"><span>		ELSE &#39;D&#39;</span></span>
<span class="line"><span>	END AS &#39;薪资等级&#39;</span></span>
<span class="line"><span>FROM emp;</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 多行函数,就五个，MAX()、MIN()、SUM()、AVG()、COUNT()</span></span>
<span class="line"><span>-- 多行函数在进行操作时，会自动忽视NULL字段</span></span>
<span class="line"><span>SELECT MAX(sal), MIN(sal), SUM(sal), AVG(sal), COUNT(sal) FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELECT COUNT(1) FROM emp;</span></span>
<span class="line"><span>SELECT COUNT(*) FROM emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 统计岗位个数</span></span>
<span class="line"><span>SELECT COUNT(DISTINCT job) FROM emp;</span></span></code></pre></div><h4 id="dql分组group-by和having-其中having取代原来的where" tabindex="-1">DQL分组GROUP BY和HAVING，其中HAVING取代原来的WHERE <a class="header-anchor" href="#dql分组group-by和having-其中having取代原来的where" aria-label="Permalink to &quot;DQL分组GROUP BY和HAVING，其中HAVING取代原来的WHERE&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 统计各个部门的平均工资（只显示平均工资2000以上）</span></span>
<span class="line"><span>SELECT deptno, COUNT(deptno) FROM emp GROUP BY deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SELECT deptno, AVG(sal) FROM emp GROUP BY deptno HAVING AVG(sal) &gt;= 2000 ORDER BY AVG(sal);</span></span></code></pre></div><h4 id="select语句执行顺序" tabindex="-1">SELECT语句执行顺序 <a class="header-anchor" href="#select语句执行顺序" aria-label="Permalink to &quot;SELECT语句执行顺序&quot;">​</a></h4><p>FROM WHERE GROUP BY SELECT HAVING ORDER BY</p><h4 id="多表查询-join-on" tabindex="-1">多表查询：JOIN ON <a class="header-anchor" href="#多表查询-join-on" aria-label="Permalink to &quot;多表查询：JOIN ON&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 交叉连接CROSS JOIN 笛卡尔积</span></span>
<span class="line"><span>SELECT * FROM emp CROSS JOIN dept;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 自然连接NATURAL JOIN，是字段名进行匹配，与外键无关</span></span>
<span class="line"><span>-- 优点：查询出的内容就是我们想要的结果</span></span>
<span class="line"><span>-- 缺点：在确定哪一个列是共同字段的时候查找的效率比较低，因为需要一个一个比较</span></span>
<span class="line"><span>SELECT * FROM emp NATURAL JOIN dept;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- USING连接JOIN USING</span></span>
<span class="line"><span>-- 优点：不需要挨个列进行查找，可以指定对应列</span></span>
<span class="line"><span>-- 缺点：要求两个表字段名相同，否则失效</span></span>
<span class="line"><span>SELECT * FROM emp JOIN dept USING(deptno);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- ON连接</span></span>
<span class="line"><span>SELECT * FROM emp JOIN dept ON emp.deptno = dept.deptno;</span></span>
<span class="line"><span>-- 别名</span></span>
<span class="line"><span>SELECT * FROM emp e JOIN dept d ON e.deptno = d.deptno;</span></span></code></pre></div><h4 id="左外连接、右外连接、union进行全连接" tabindex="-1">左外连接、右外连接、UNION进行全连接 <a class="header-anchor" href="#左外连接、右外连接、union进行全连接" aria-label="Permalink to &quot;左外连接、右外连接、UNION进行全连接&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- LEFT JOIN 左外连接</span></span>
<span class="line"><span>-- 左表内容全部显示，若匹配不到右表内容使用NULL代替</span></span>
<span class="line"><span>SELECT * FROM emp e LEFT JOIN dept d ON e.deptno = d.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- RIGHT JOIN 左外连接</span></span>
<span class="line"><span>-- 右表内容全部显示，若匹配不到左表内容使用NULL代替</span></span>
<span class="line"><span>SELECT * FROM emp e RIGHT JOIN dept d ON e.deptno = d.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- UNION连接左外和右外实现全连接</span></span>
<span class="line"><span>SELECT * FROM emp e LEFT JOIN dept d ON e.deptno = d.deptno;</span></span>
<span class="line"><span>UNION</span></span>
<span class="line"><span>SELECT * FROM emp e RIGHT JOIN dept d ON e.deptno = d.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 以上的UNION若替换为UNION ALL，则不会去除重复部分，仅仅在数据上累加</span></span></code></pre></div><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 三表联合查询emp,dept,salagrad，员工表，部门表，薪资等级表</span></span>
<span class="line"><span>SELECT * FROM emp e JOIN dept d ON e.deptno = d.deptno</span></span>
<span class="line"><span>					JOIN salagrad s ON e.sal BETWEEN s.lowsal AND s.highsal;</span></span></code></pre></div><h4 id="自连接查询" tabindex="-1">自连接查询 <a class="header-anchor" href="#自连接查询" aria-label="Permalink to &quot;自连接查询&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 自连接查询</span></span>
<span class="line"><span>-- 自己表中字段关联自己表中字段，好处是可以减少表的建立</span></span>
<span class="line"><span>-- 如员工表中，含上级领导一列，领导也是员工</span></span>
<span class="line"><span>SELECT * FROM emp e1</span></span>
<span class="line"><span>		 JOIN emp e2 ON e1.MGR = e2.empno;</span></span></code></pre></div><h4 id="子查询-不相关子查询、相关子查询" tabindex="-1">子查询（不相关子查询、相关子查询） <a class="header-anchor" href="#子查询-不相关子查询、相关子查询" aria-label="Permalink to &quot;子查询（不相关子查询、相关子查询）&quot;">​</a></h4><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 常用不相关子查询，而相关子查询用的少</span></span>
<span class="line"><span>-- 特点：一条SQL语句含有多个SELECT，先执行子查询，再执行外查询；子查询可以独立运行</span></span>
<span class="line"><span>SELECT sal FROM emp WHERE ename = &#39;CLARK&#39;;</span></span>
<span class="line"><span>SELECT * FROM emp WHERE sal &gt; (SELECT sal FROM emp WHERE ename = &#39;CLARK&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>-- 以上是单行子查询，多行的如下,ANY可以替换为ALL,IN</span></span>
<span class="line"><span>SELECT * FROM emp WHERE sal &lt; ANY(SELECT sal FROM emp WHERE job = &#39;CLERK&#39;)</span></span></code></pre></div><blockquote><p>P37作业分析处理，三个题目，看视频，这里不写了</p></blockquote><div class="language-mysql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-- 相关子查询，查询速度慢，不常用，而且难以想到</span></span>
<span class="line"><span>-- 查询部门最高工资员工信息</span></span>
<span class="line"><span>SELECT * FROM emp e1 WHERE sal in(SELECT MAX(sal) FROM emp e2 WHERE e1.deptno = e2.deptno)</span></span></code></pre></div>`,43),i=[l];function t(c,d,o,E,h,T){return a(),n("div",null,i)}const u=s(e,[["render",t]]);export{m as __pageData,u as default};
