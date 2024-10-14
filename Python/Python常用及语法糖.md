# Python常用及语法糖

---

| 快捷键           | 说明       |
| ---------------- | ---------- |
| `ctrl + d`       | 复制       |
| `ctrl + alt + l` | 格式化对齐 |
| `shift + f6`     | 重命名     |
| `.pri + enter`   | 快捷print  |

**格式**：

```python
def fun(a, b):
    """
    Description:

    Args:
    Return:
    """
    return a + b


def main():
    # 这里作为入口
    print(fun("hello", " world!"))


if __name__ == "__main__":
    main()
```

**语法糖**

```python
num = 1_000_000

# 乘法
print("-" * 50)
my_list = [0] * 5

# F-String
print(f"{num:#<15}")			# 1000000######## 左对齐
print(f"{num:>>15}")			# >>>>>>>>1000000 右对齐
print(f"{num:-^15}")			# ----1000000---- 居中对齐

# ''.join()字符串添加分隔符，注意里面的元素要是字符串
nums = [12, 345, 6789]
nums = [str(i) for i in nums]	# 先转换

s1 = ''.join(nums)				# 123456789
s2 = '/'.join(nums)				# 12/345/6789

# enumerate()计算count，tqdm()显示进度
for _ in tqdm(range(100)):
    time.sleep(0.1)
    
# divmod()获取整除和余数
m, n = divmod(10, 3)

# zip()
x = [1, 2, 3]
y = ['a', 'b', 'c']
z = [str(i) + j for i, j in zip(x, y)]	# ['1a', '2b', '3c']

# 一行赋值
switch = True
state = 'open' if switch else 'close'

device=torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 字符和ASCII转化
num = ord('a')			# 97
ch = chr(65)			# 'A'
ss = str(65)			# '65'

# 形参前面加上*强制后面使用关键字传参
class Person:
    def __init__(self, name, *hobby, QQ, WeChat):
        self.name = name
        self.hobby = hobby
        self.QQ = QQ
        self.WeChat = WeChat
        
p1 = Person('mike', 'eat', 'drink', QQ=123, WeChat=456)

# 列表转集合，直接set函数或者{i for i in list}
mylist = [1, 2, 3, 2, 2, 2, 4]
set1 = set(mylist)

set2 = {i for i in mylist if i % 2 == 0}  # 如果有筛选条件，集合推导式

# 字典中如果key不存在，使用下标索引会KeyError，改用给get()方法
dic = {"A": 123, "B": 0}
print(dic.get('C'))			# None
print(dic['C'])				# KeyError

# 字典setdefault
my_dict = {}
for key, value in [('a', 1), ('b', 2), ('a', 3)]:
    my_dict.setdefault(key, []).append(value)

print(my_dict)  # 输出 {'a': [1, 3], 'b': [2]}
```

