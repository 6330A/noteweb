# Java字符串

---

```java
// 后面两个等价，第一个是在字符串常量池中（堆内），后面是在堆中
String s1 = "";
String s2 = new String();
String s3 = new String("");
```

#### String与char[]之间的转换

```java
// toCharArray()
String str = "hello";
char[] arr = str.toCharArray();    // {'h', 'e', 'l', 'l', '0'}
String str2 = new String(arr);
String str3 = new String(new char[]{'h', 'e', 'l', 'l', '0'});
String str4 = new String({'h', 'e', 'l', 'l', '0'});
```

#### String与byte[]之间的转换

```java
// getBytes()，默认使用UTF-8字符集，汉字占3个字节，也可以指定编码解码字符集
String str = "abc";
byte[] arr = str.getBytes();      // {97, 98, 99}
String str2 = new String(arr);
```

#### 常用函数

```java
boolean isEmpty()
int length()
String concat(String str)
boolean equals(Object obj)
boolean equalsIgnoreCase(String str)                            //忽略大小写比较
int compareTo(String str)                                       //负数，0，正数
int compareToIgnoreCase(String str)                             //忽略大小写比较
String toLowerCase()
String toUpperCase()
String trim()                                                   //去掉字符串前后空格
public String intern()                                          //在字符串常量池中共享
    
//.charAt(i) 不能直接加减后赋值给char类型变量
char ch = "abcdef".charAt(i) + 1;  //精度丢失，.charAt()返回int类型
// 通常可以使用"abcdefg".charAt(i)获取对应字符
```

#### 排序

```java
String str = "hello";
char[] arr = str.toCharArray();
Arrays.sort(arr);
String newstr = new String(arr);
```

#### 查找

```java
boolean contains(CharSequence s)                                //是否包含子串
int indexOf(String/int str)
int indexOf(String/int str, int idx)
int lastIndexOf(String/int str)                                 //常用于路径中提取文件名，找"."
int lastIndexOf(String/int str, int idx)
String substring(int beginIndex)            
String substring(int beginIndex, int endIndex)                  // [beginIndex, endIndex)
boolean startsWith(String prefix)                               //是否以字符串s开头
boolean startsWith(String prefix, int toffset)
boolean endsWith(String suffix)                                 //是否以字符串s结束
String replace(char oldChar, char newChar)                      //替换字符
String replace(CharSequence target, CharSequence replacement)   //替换字符串
```

---

#### String、StringBuffer和StringBuilder

> 相同点：底层使用char[]（jdk8及之前），底层使用byte[]（jdk9及之后）

`String`：不可变字符序列；

`StringBuffer`：可变字符序列；JDK1.0声明，线程安全，效率低

`StringBuilder`：可变字符序列；JDK5.0声明，线程不安全，效率高

`StringBuffer`和`StringBuilder`共同父类`AbstractStringBuilder`，按`ctrl + h`显示继承关系```

```java
// StringBuilder
public final class StringBuilder
    extends AbstractStringBuilder
    implements java.io.Serializable, Comparable<StringBuilder>, CharSequence{...}

// AbstractStringBuilder
abstract class AbstractStringBuilder implements Appendable, CharSequence{...}

// 看看父类的属性
byte[] value;
int count;

// StringBuilder构造方法，可以一开始确定容量，默认16
public StringBuilder() {
    super(16);
}
public StringBuilder(int capacity) {
    super(capacity);
}

// 示例
StringBuilder ss = new StringBuilder("hello");
ss.append(" world");
System.out.println(ss);
System.out.println(ss.length());
```

一旦count超过value.length时，就需要进行扩容，默认扩容为原有容量的2倍+2并将原有value数组中的元素复制到新的数组中。

**源码启示**：

如果开发中需要频繁针对字符串进行增删改查等操作，建议使用StringBuffer或StringBuilder替换String，提高效率

根据是否涉及到线程安全问题，选择二者中的一个；若确定需要操作的字符个数，建议使用带参数capacity的构造器

```java
// 都是return this，以StingBuffer为例，StringBuilder类似
StringBuffer append(xxx)                                //append()有很多方法，进行追加
StringBuffer delete(int start, int end)                 //删除[start, end)之间字符
StringBuffer deleteCharAt(int index)                    //删除指定位置字符
StringBUffer replace(int start, int end, String str)    //替换[start, end)之间字符为str
void setCharAt(int index, char ch)
char charAt(int index)
StringBuffer insert(int index, xx)                      //在指定位置插入，很多方法
int length()                                            //在接口CharSequence中
StringBuffer reverse() 
boolean isEmpty()                                       //在接口CharSequence中
void SetLength(int newLength)                           //父类AbstractStringBuilder中
```

