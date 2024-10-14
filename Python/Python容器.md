# Python容器

---

[视频地址](https://www.bilibili.com/video/BV1qW4y1a7fU?p=99&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

- list（列表）
- tuple（元组）
- str（字符串）
- set（集合）
- dict（字典）

## global关键字

```python
'''没有global'''
num = 1
def fun():
    num = 2
    
fun()
print(num)   # 1，函数里面是局部变量

'''global改为全局变量'''
def fun():
    global num
    num = 2
```

## List

-  **定义**

```python
a = []
b = [1, 2, 'a', [1,2,4]]
c = list()						# 使用list()函数
d = list([1, 2, 3])				# 使用list()函数

# 常用列表代替数组
arr1 = [0] * 25
arr2 = [i for i in range(65, 91)]
```

- **函数**

```python
append()			# 列表末尾添加
extend()			# 用另一个可迭代对象扩展列表
insert(1, 'a')		# 指定位置添加元素
remove(2)			# 移除指定位置元素
pop()				# 移除最后一个元素，会返回最后一个元素				
pop(2)				# 移除指定位置元素，会返回最后一个元素

del list[2]			# 使用del删除列表list下标为2元素也可以，没有返回值

clear()				# 清空列表
index(x)			# 查找元素x所在的第一个索引，没有该元素抛出ValueError
count(x)			# 获取元素x出现次数 
sort()				# 原地排序，从小到大
sort(reverse=True)	# 原地排序，从大到小
reverse()			# 列表反转
copy()				# 列表浅拷贝
```

- **切片**

```python
# 列表长度使用len()，适用于所有序列类型
len(my_list)
# 索引获取指定下标元素，如果元素还是列表继续用[]
my_list[0]
# 负索引
my_list[-1]
# 获取一段，使用切片，左闭右开（这里指的是:左边闭右边开）
list1 = my_list[1:4]
# 切片指定步长间隔取值
list2 = my_list[1:8:2]
# 反转、切片、间隔
list3 = my_list[::-1]
```

## tuple

 - **定义**

```python
a = ()
b = ('abc', )					# 单个元素在元组中定义，后面需要逗号，否者是str
c = (1, 2, 'a', [1, 3])
d = tuple()						# 使用tuple()函数
e = tuple((1, 2, 'hello'))		# 使用tuple()函数

f = tuple([1, 2, 'hello'])		# 使用tuple()函数，参数是列表，然后转化为tuple了
```

> 不可修改内容，但是可以修改内部元素是list的元素

- 函数

```python
index(x)			# 查找元素x所在的第一个索引，没有该元素抛出ValueError
count(x)			# 获取元素x出现次数 
```

> 没有copy()，切片和通过索引获取元素一样

## str

字符串不可修改，支持 [] 索引

- 定义

```python
'''单引号，双引号，三引号都可以'''
a = 'Hello, World!'
b = "Hello, World!"
c = '''Hello, World!'''
d = a + b

'''使用前缀r或R来定义原始字符串，可以避免转义字符的影响。在处理正则表达式或路径时非常有用。'''
path = r"C:\Users\Name\Documents"

# 通过下标索引获取对于位置字符
a[0]
a[-1]
```

- 函数

```python
index('abc')			# 获取字串在字符串中位置的第一个下标
replace('abc', 'def')	# 替换字符串中所有的'abc'为'def'，返回新的字符串，原字符串不变
split('\')				# 按照字符串'\'分割为列表

strip()					# 移除首尾空格和换行获取新字符串，原字符串不变
strip('ab')				# 移除首尾在'ab'字符集中的字符
lstrip()				# 可以有参数，移除左边
rstrip()				# 可以有参数，移除右边

count('ab')				# 字符串'ab'在原字符串中出现的次数
```

## set

集合无序，不支持下标索引访问，允许修改

- 定义

```python
a = {1, 2, 3}
b = {3, 4, 5}
c = set()
```

- 函数

```python
add()					# 添加元素
remove()				# 移除元素，如果不存在，抛出KeyError
discard()				# 移除指定元素，不存在不会错误
pop()					# 随机移除并返回集合中一个元素，若空，抛出KyeError
clear()					# 移除所有元素

union(b)				# 并集，可以替换为a | b，原集合不改变
intersection(b)			# 交集，可以替换为a & b，原集合不改变
difference(b)			# 差集，可以替换为a - b

symmetric_difference(b)	# 对称差，可以替换为a ^ b = (a | b) - (a & b)
```

## dict

无序，键必须唯一且不可变（整数、字符串、元组），值可以是任意类型

- 定义

```python
a = {'a': 1, 'b': 2, 'b': '3', 'a': 111}			# 后面的'a'覆盖第一个value
b = dict(name='Alice', age=25, city='New York')		# dict函数
```

- 函数

```python
pop('age')					# 移除键'age'
del b['age']
clear()						# 清空字典
keys()						# 获取所有key，返回类型dict_keys
values()					# 获取所有值，返回类型dict_values
```

```python
# 新增
a['Mike'] = 100

# 更新
a['Mike'] = 150

# 删除，使用函数或者del
a.pop('Mike')

# 清空
a.clear()

# 遍历键
for key in a:
    print(a[key])

# 遍历值
for value in a.values():
    print(value)

# 同时获取key, value
for key, value in a.items():
    print(key, value)
    
# 统计数量
len(a)
```

#### sorted内置排序函数

```python
sorted(容器)
sorted(容器, reverse=True)
```

## 函数

函数可以有多个返回值

参数：位置参数，关键字参数，缺省参数，可变参数`*args、**kwargs`

> 如果有位置参数和关键字参数，位置参数必须在前面，关键字参数可以无序

**可变参数**

`*args`参数作为元组存在

`*kwargs`参数作为字典存在

```python
def fun(*args, **kwargs):
    print(type(args))
    print(type(kwargs))
    print(args)
    print(kwargs)

fun(1, 2, [0,2,15], 'hello', name='abc', age=24)
```

**函数可以作为参数传递**

```python
def fun(comp):
    res = comp(1, 2)
    print(res)


def add(a, b):
    return a + b


def reduce(a, b):
    return a - b


fun(add)   			# 3
fun(reduce)			# -1
```

**lambad匿名函数**

```python
def fun(comp):
    res = comp(1, 2)
    print(res)


fun(lambda x, y: x + y)
```

## 文件

```python
with open('abcde.txt', 'r', encoding='UTF-8') as f:
    # 逐行读取
    for line in f:
        print(line)
        
# f.read(4)			# 读四字节，返回str
# f.read()			# 读取所有，返回str
# f.readline()		# 读取一行，返回str

# f.readlines()		# 读取每一行，返回为列表
```

> 推荐使用with进行上下文管理，不需要手动`f.close`

> r 只读 w 写入 a 追加，其中 w 和 a 在文件不存在时候创建文件

```python
f.write('abc')
f.flush()   		# 强制将缓冲区数据写入文件按中
```

## JSON

JSON（JavaScript Object Notation）是一种**轻量级**的数据交换格式，易于人阅读和编写，同时也易于机器解析和生成。JSON 是一种语言独立的格式，广泛用于**数据传输**，特别是在**客户端和服务器**之间。

Python语言使用JSON有很大优势，因为JSON无非就是**一个单独的字典**或者**一个内部元素都是字典的列表**



支持以下基本数据类型

- 字符串（String），必须双引号
- 数字（Number），整数或浮点数
- 布尔值（Boolean），`true`或`false`
- 数组（Array），有序值，Python中列表，方括号
- 对象（Object），键值对，花括号
- 空值（NULL），`null`

```json
{
    "name": "Alice",
    "age": 30,
    "is_student": false,
    "courses": ["Math", "Science"],
    "address": {
        "street": "123 Main St",
        "city": "New York"
    },
    "phone_numbers": null
}
```

**JSON可以直接和Python的字典和列表进行无缝转换，就是一个字符串**

- 保存为json文件，将字典或者列表先转为字符串，再写入

```python
# Python的列表/字典 -> json文件
import json

d = {"ctrl + c": '复制'}
l = [{"ctrl + c": '复制'}, {"ctrl + v": "粘贴"}]

json_str = json.dumps(l, ensure_ascii=False)
with open("data.json", "w", encoding='UTF-8') as f:
    f.write(json_str)
```

- 加载json文件，转化为字典或者列表

```python
import json

# 方法一：先读取为字符串在json.loads()，参数为字符串
with open("data.json", "r", encoding='UTF-8') as f:
    json_str = f.read()

l = json.loads(json_str)

# 方法二：直接使用json.load()，参数为文件对象
with open("data.json", "r", encoding='UTF-8') as f:
	l = json.loads(f)
```

## 类

**几种常用类内置方法 - 魔术方法**

- `__init__`构造方法
- `__str__`字符串方法
- `__lt__`小于大于符号比较
- `__le__`小于等于、大于等于符号比较
- `__eq__`==符号比较

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, other):
        return self.x * other.x + self.y * other.y

    def __len__(self):
        """只能非负整数，这样可以使用len()函数获取对象长度，也就是调用这个方法"""
        return int((self.x ** 2 + self.y ** 2) ** 0.5)

    def __lt__(self, other):
        return len(self) < len(other)


v1 = Vector(3, 4)
v2 = Vector(5, 12)

v3 = v1 + v2        # 等价于v1.__add__(v2)   (8, 16)
v4 = v1 - v2        # 等价于v1.__sub__(v2)   (-2, -8)
dot = v1 * v2       # 等价于v1.__mul__(v2)   63

res = v1 < v2       # 等价于v1.__lt__(v2)    True
length = len(v1)    # 等价于v1.__len__
v1_str = str(v1)    # 等价于v1.__str__
print(v1)           # print()函数自动调用__str__方法
```

私有属性和方法开头下划线`__`

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.__age = age

    def __setNone(self):
        self.name = ''
        self.__age = 0
```

> 继承，支持多继承，如果成员属性重名，成员方法重名，继承的类中最左边的优先

## 类型注解

Python 3.8 及以下：必须使用 `from typing import List`。
Python 3.9 及以上：可以直接使用 `list[int]`

```python
a: list[int] = [1, 2, 3]
b: list[Union[int, str]] = [1, 2, 'abc']	# 混合类型，替换为Union[]
```



> 一般，无法直接看出变量类型时会添加变量的类型注解
>
> 只是提示性的，不是决定性的，给人看的，提示作用，就算写的类型不对也不影响运行

```python
a: int = random.randint(1, 10)
b: dict = json.loads(data)			# json字符串加载为字典或者列表
c: str = func()						# 想知道函数返回值类型
d: dict[str, int] = {'age': 10}		# json字符串加载为字典或者列表
```

函数（方法）的类型注解 - 形参，返回值注解

```python
def add(x: int, y: int) -> int:
	return x + y
```

## OS (Operation System)

> 下面方法参数都是路径，字符串形式，使用r或者R忽略转义问题

| 方法                   | 作用                             |
| ---------------------- | -------------------------------- |
| `os.listdir()`         | 获取所有文件和目录               |
| `os.path.exists()`     | 判断目录或者文件是否存在         |
| `os.path.join()`       | 路径拼接                         |
| `os.path.isdir()`      | 判断是否是目录                   |
| `os.path.isfile()`     | 判断是否是文件                   |
| `os.path.split()`      | 目录拆分为二元组（父目录，当前） |
| `os.path.abspath()`    | 参数相对路径，返回绝对路径       |
| `os.makedirs('a/b/c')` | 创建单级数或者多级目录           |

```python
# 递归获取所有文件
import os


def getAllFiles(path):
    filelist = []

    if not os.path.exists(path):
        print(f'路径 {path} 不存在！')
    else:
        content = os.listdir(path)						# 获取目录下所谓文件和目录
        for i in content:
            abspath = os.path.join(path, i)				# 拼接为绝对路径
            if os.path.isdir(abspath):					# 若为目录继续递归，其返回结果加入filelist
                filelist += getAllFiles(abspath)
            else:	
                filelist.append(abspath)				# 若为文件，将文件路径加入filelist
    return filelist										# 返回目录中所有文件列表


allfiles = getAllFiles(r'H:\存放结果的地方')
for file in allfiles: 
    print(file)
```

