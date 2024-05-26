1.1 快捷键 选中后ctrl + y删除

ctrl + alt + enter 向上添加一行

alt + insert

alt + shift + ↑ 或者 ↓，将当前行上下移动

ctrl + d 复制当前行

---

做题中，java不确定输入个数情况

```java
Scanner scan = new Scanner(System.in);
while(scan.hasNext()){
    int n = scan.nextInt();
    System.out.println(n);
}
```

---

字母数字下划线$

age、$salary、_value、__1_value

**byte** short

**BigDecimal** 

**boolean**  只能取true false两种 占用4个字节

char 占用2个字节

**variable x = (expression) ? value : value**

**for(int x = 10; x < 20; x = x+1)**

**for(int x : numbers )**

switch(expression){
	case value : break; 
	case value : break;

​	default :
}

修饰符：private public protected

线程相关：volatile synchronized transient 



#### **Java Number & Math 类**

所有的包装类**（Integer、Long、Byte、Double、Float、Short）**都是抽象类 **Number** 的子类

Integer n = 3;

Math.sin(Math.PI/2)

Math.cos(0)

Math.tan(Math.PI/3)

Math.toDegrees(Math.PI/2)

**Math.round(num))**

**Math.floor(num)**

Math.max(num)

Math.min(num)

**Integer.MAX_VALUE**

**Byte.MIN_VALUE**

String name = "James";

boolean result = name instanceof String;



- 日期

```
import java.util.Date;
Date date = new Date();
System.out.println(date.toString());
```



#### String

```java
//String 创建的字符串存储在公共池中，而 new 创建的字符串对象在堆上：
//GPT：当你使用双引号创建一个字符串时，Java会首先检查字符串常量池中是否已经存在相同内容的字符串，如果存在则返回已存在的引用，如果不存在则创建一个新的字符串对象并放入字符串常量池中，然后返回该对象的引用。需要注意的是，通过new String("example")方式创建的字符串对象不会被放入字符串常量池中，而是在堆内存中创建一个新的字符串对象。

String s1 = "Runoob";              // String 直接创建
String s2 = "Runoob";              // String 直接创建
String s3 = s1;                    // 相同引用
String s4 = new String("Runoob");   // String 对象创建
String s5 = new String("Runoob");   // String 对象创建

boolean flag = s.isEmpty()   
int len = site.length();

char[] helloArray = { 'r', 'u', 'n', 'o', 'o', 'b'};
String helloString = new String(helloArray);
//应用：如果要对字符串str进行排序，是不能直接sort的，要转为字符串数组，对数组排序，再变为String
//LeetCode 49.字母异位词分组
String str = "hello";
char[] arr = str.toCharArray();
Arrays.sort(arr);
String newstr = new String(arr);


String toLowerCase()
    
//.charAt(i) 不能直接加减后赋值给char类型变量
char ch = "abcdef".charAt(i) + 1;  //精度丢失，.charAt()返回int类型
通常可以使用"abcdefg".charAt(i)获取对应字符
    
```



#### 数组Arrays

```java
dataType[] arrayRefVar = {value0, value1, ..., valuek};
int [] numbers = {10, 20, 30, 40, 50};
char[] charArray ={ 'a', 'b', 'c', 'd', 'e' };

dataType[] arrayRefVar = new dataType[arraySize];
int[] result = new int[list.length];

.length

int[][] a = new int[2][3];
String[][] str = new String[3][4];

//对数组进行排序
Array.sort(numbers)
    
//从大到小，使用lambda表达式，这里用包装类
Integer [] numbers = {4, 3, 1, 2, 0};
Array.sort(number, (o1, o2) -> o2 - o1);   //其中->表示return

//对于二维数组逆序排序
Integer [][] numbers = {{1,2,3}, {3,3,2}, {1,0,1}};
Array.sort(numbers, (o1, o2) -> o2[0] - o1[0]);
```

#### 列表Lists

```java
import java.util.ArrayList;
import java.util.LinkedList; 
import java.util.Collections;  // 引入 Collections 类


//里面放包装类
//ArrayList
ArrayList<Integer> L1 = new ArrayList<>();
ArrayList<String> L2 = new ArrayList<>();

.add(99)
.set(2, 1010)   //设置索引为2元素为1010
.remove(3)      //删除索引为3元素
.get(idx)       //获取索引为i的元素
.size()
.clear()
.isEmpty()
    
for-each 来迭代元素
Collections.sort(实例)
------------------------------------------------------------------------------------------------------------------------
//LinkedList
LinkedList<Integer> L3 = new LinkedList<>();
LinkedList<String> L4 = new LinkedList<>();

.add()
.addFirst()
.addLast()
.removeFirst()
.removeLast()
.getFirst()
.getLast()
.get(idx)    //获取索引为i的元素
.size()
.clear()
.isEmpty()

for-each 来迭代元素
Collections.sort(实例)
```

#### 集合Sets（仅介绍HashSet，还有TreeSet）

```java
/*
HashSet 基于 HashMap 来实现的，是一个不允许有重复元素的集合。
HashSet 允许有 null 值。
HashSet 是无序的，即不会记录插入的顺序。
HashSet 不是线程安全的， 如果多个线程尝试同时修改 HashSet，则最终结果是不确定的。 您必须在多线程访问时显式同步对 HashSet 的并发访问。
HashSet 实现了 Set 接口。
*/
//HashSet 中的元素实际上是对象，一些常见的基本类型可以使用它的包装类。

import java.util.HashSet; // 引入 HashSet 类


HashSet<String> sites = new HashSet<String>();

.add()
.contains("Taobao")      // 判断元素是否在集合中，返回true or false
.remove("Taobao")        // 删除元素，删除成功返回 true，否则为 false
.clear()
.size()
.isEmpty()
    
for-each 来迭代元素
```

#### 映射Maps（仅介绍HashMap，还有TreeMap）

```java
/*
HashMap 是一个散列表，它存储的内容是键值对(key-value)映射。
HashMap 实现了 Map 接口，根据键的 HashCode 值存储数据，具有很快的访问速度，最多允许一条记录的键为 null，不支持线程同步。
HashMap 是无序的，即不会记录插入的顺序。
HashMap 继承于AbstractMap，实现了 Map、Cloneable、java.io.Serializable 接口。
*/

import java.util.HashMap; // 引入 HashMap 类


HashMap<Integer, String> Sites = new HashMap<Integer, String>();

.put(1, "Google")
.get(3)                //根据key获取value，若不在里面返回null
.remove(4)             //根据key删除键值对
.clear()
.size()
.isEmpty()
.containsKey(key)      //用于查找是否包含key，return boolean

添加元素时候需要先判断是否在map当中，因此先获取value的容器
map.getOrDefault(key, new String)
    
    
//迭代    
HashMap<Integer, String> Sites = new HashMap<Integer, String>();
for (Integer i : Sites.keySet())
for(String value: Sites.values())

    
//实现自增，有则自增，无则为1
Map<String, Integer> map = new HashMap<String, Integer>();
int val = map.getOrDefault("hello", 0);
map.put("hello", val + 1);
```

#### 栈

```java
 Stack<Integer> stk;
 Stack<Character> stk;
 
 stk.push()         //入栈
 stk.pop()          //出栈
 stk.peek()         //查看栈顶
 stk.isEmpty()      //判断空
```



- 队列 [菜鸟](https://www.runoob.com/java/data-queue.html)

```java
// 队列的创建有所不同 LinkedList  ArrayDeque 
//add()和remove()方法在失败的时候会抛出异常(不推荐)
Queue<String> que = new LinkedList<String>();

.offer("a");     //添加
.poll()          //返回第一个元素并且删除
//.element       //返回第一个元素
.peek()          //返回第一个元素
.isEmpty()
    
.clear()
.contains()

/*
offer，add 区别：
一些队列有大小限制，因此如果想在一个满的队列中加入一个新项，多出的项就会被拒绝。
这时新的 offer 方法就可以起作用了。它不是对调用 add() 方法抛出一个 unchecked 异常，而只是得到由 offer() 返回的 false。
poll，remove 区别：
remove() 和 poll() 方法都是从队列中删除第一个元素。remove() 的行为与 Collection 接口的版本相似， 但是新的 poll() 方法在用空集合调用时不是抛出异常，只是返回 null。因此新的方法更适合容易出现异常条件的情况。
peek，element区别：
element() 和 peek() 用于在队列的头部查询元素。与 remove() 方法类似，在队列为空时， element() 抛出一个异常，而 peek() 返回 null。
*/
```



- 堆



- 树



- 图



---

java[尚硅谷笔记](https://www.bilibili.com/video/BV1PY411e7J6?p=26&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

P26

```java
char ch1 = 'a'        //表示形式1：单引号内一个字符
char ch2 = '\u0036'   //表示形式2：Unicode值表示字符型常量
char ch3 = '\n'       //表示形式3：转义字符
char ch4 = 65         //表示形式4：ASCII码   65->'A'   48->'0'
```



p28类型转换

```java
//特殊情况1：byte short组合的运算最低用int接收，其他情况最低选中较大范围的类型接收
//特殊情况2：char x = 'a';  char y = x + 1;也是错误的，x + 1自动转换为int类型不能被y接收

long x = 123;  //这里分了两步，123是int，自动类型提升，建议用123L
long x = 22_0000_0000 //这个就错了，超出int范围
    
float f1 = 12.3F   //正确
float f2 = 12.3    //错误 double不能隐式转换为float
byte b = 1;
byte c = b + 1;    //错误，b + 1是int
```

P30字符串

``` java
String s1 = 4;                          //错误
String s2 = 3.5f + "";                  //正确
System.out.println(s2);                 //3.5
System.out.println(3 + 4 + "Hello");    //7Hello
System.out.println("Hello" + 3 + 4);    //Hello34
System.out.println('a' + 1 + "Hello");  //98Hello
System.out.println("Hello" + 'a' + 1);  //Helloa1
```

取模

```java
//取模结果正负号只与被模数有关，先按照两个正数计算再添加符号
12 % 5     //2
12 % -5    //2
-12 % 5    //-2
-12 % -5   //-2
```

关于 += ++ 的使用

```java
short a =1;
a = a + 1;    //编译报错，右边是int
a  += 1;      //正常执行

int b = 3;
b = b * 0.1;  //编译报错，右边是double
b *= 0.1;     //正常执行
```

```java
&& 和 &
|| 和 |
//都能作为逻辑运算符，不过后者不会短路
```

P38

```java
//位运算符 7个
<<
>>
>>>
&
|
^
~
```

P40

```java
/**
Java中的变量按照数据类型来分类
	基本数据类型8种
		整型： byte \ short \ int \ long
		浮点型：float \ double
		字符型：char
		布尔型：boolean
	引用数据类型
		类：class
		数组：array
		接口：interface
		
		枚举：enum
		注解：annotation
		记录：record
**/
```



P43 Scanner类

```java
//第一步 导包
import java.util.Scanner; 
//第二步 创建实例
Scanner scan = new Scanner(System.in);
//第三步 调用实例方法 .next() .nextInt() .nextDouble() .nextBoolean() .next().charAt(idx)可以连续，已经获取到对象了
int age = scan.nextInt();
//第四步 关闭资源，这里输入流是键盘，还是要手动关一下，一般其他的会自动垃圾回收
scan.close()
```

P44随机数

```java
//感觉java随机数相关类和方法不多，随机种子不需要设置，系统默认使用当前时间作为随机种子
double ran = Math.random();   //[0, 1)之间的随机数，类型double，源码还是使用的Random类


//使用自己设置的随机种子
long seed = 12345; // 设置种子值为12345
Random random = new Random(seed);
// 生成随机数示例
int randomNumber = random.nextInt(100); // 生成0到99之间的随机整数
```



```java
//获取当前时间System.currentTimeMillis()    //long类型
```

P63

```java
int[] arr = new int[6];
int[] arr = new int[]{1,2,3,4,5,6};
//简写int[] arr = {1,2,3,4,5,6};写在一行会进行类型推断
//[]位置也可在变量名后面

String[] str = new String[]{"hello", "world"};
String[] str = new String[2];

double[] dou;
dou = new double[10];
//.length获取长度，长度不可更改

//局部整型变量不会默认初始化的，需要赋值，但是类中的属性，是有默认初始化的
//int a; 局部变量a不能直接使用
//class中的private int a;  属性，默认赋值0，可以直接使用

//整型数组默认初始化0
//浮点型数组默认初始化0.0
//字符型数组默认初始化 ASCII中的0
//布尔类型数组默认false
//引用类型数组默认null


int[][] = new in[]{{1,2}, {1,2,3,3}, {2,3}};
int[][] = {{1,2}, {4,5,6}, {3,4,5}};
```

P67java二维数组讲的不错

```java
int[][] arr = new int[4][];
//4个引用，每个引用指向一篇连续空间

//杨辉三角，二维数组和C、C++不一样
int[][] arr = new int[10][];
for(int i = 0; i < arr.length; i++){
    arr[i] = new int[i+1];
}
for(int i = 0; i < arr.length; i++){
    for(int j = 0; j < arr[i].length; j++){
        if(j == 0 || i == j){
            arr[i][j] = 1;
        }else {
            arr[i][j] = arr[i-1][j-1] + arr[i-1][j];
        }
        System.out.print(arr[i][j] + " ");
    }
    System.out.println();
}

int[] arr1, arr2, arr3;
arr1 = new int[]{1,2,3};
arr2 = arr1;       //arr1和arr2都在栈空间中，指向堆空间中的同一个数组
//要完全拷贝arr1中数据，需要在堆中new一个数组空间
```

P71Arrays类

```java
int[] arr = new int[4];
//打印数组，Arrays.toString(arr)
System.out.println(Arrays.toString(arr));

//填充数组
Arrays.fill(arr,1);

//排序
Arrays.sort(arr)
    
//二分查找，返回找到的元素下标，找不到返回负数，具体值不固定
Arrays.binarySearch(arr, 2);
```

P81可变类型形参

```java
public void print(int ... nums){
	System.out.println("1111");
    //当作是数组
    for(int i = 0; i < nums.length; i++){
		System.out.println(nums[i]);
    }
}
public void print(int[] nums){
	System.out.println("2222");
}
//编译器认为两个是一样的，以后用第一种，代替第二种
//原因，是因为在调用的时候不必传递一个数组，比如test.print(new int[]{1, 2, 3});可以简化为test.print(1, 2, 3);

//注意，多个类型参数，它必须放在最后一个，且可变个数形参最多一个
public void print(int i, int ... nums){
	---
}
```

P82

```java
//java中的参数传递机制是什么？值传递。（不是引用传递）

//如果形参是基本数据类型的变量，则将实参保存的数据值赋给形参
//如果形参是引用数据类型的变量，则将实参保存的地址值赋给形参
```

P84

```java
//当需要导入两个相同类名的类时，第二个类需要使用全类名
import java.util.Date
Date date1 = null;
java.sql.Date date2 = new java.sql.Date date2;
```

P85

```java
//Java如何实现数据封装
//实现封装就是控制类或成员的可见性范围。
//权限修饰符：public\protected\缺省\private
```

| 修饰符    | 本类内部 | 本包内 | 其他包的子类 | 其他包非子类 |
| --------- | -------- | ------ | ------------ | ------------ |
| private   | ✔        |        |              |              |
| 缺省      | ✔        | ✔      |              |              |
| protected | ✔        | ✔      | ✔            |              |
| public    | ✔        | ✔      | ✔            | ✔            |



---

P90

```java
//this调用构造器
//this(形参列表)格式调用当前类中指定的其他构造器
//要写的话，需要放在首行，最多一个
public class User{
    public class User(){
        ---
	}
    public class User(String name){
        this();                     
        this.name = name;
    }
    public class User(String name, int age){
		this(name);
        this.age = age;
    }
}
```

P93继承的好处

- 继承的出现减少了代码冗余，提高了代码的复用性

- 继承的出现，更有利于功能的扩展

- 继承的出现让类与类之间产生了is-a的关系，为多态的使用提供了前提
  - 继承描述事物之间的所属关系，这种关系是is-a的关系。可见，父类更通用，更一般，子类更具体

> Java中，一个类只能直接继承自一个父类，这是Java设计的一个基本原则，主要是为了避免多重继承可能带来的复杂性和歧义性。然而，Java 允许一个类可以实现多个接口，这样就可以达到一定程度上的多继承效果。
>
> 直接父类、间接父类

子类继承父类所有属性和方法，但是private修饰的不能直接被子类访问



查看所属类父类

```java
A.getClass().getSuperclass();
```

> 跨包继承可以使用protected，但是跨包要使用类，只能使用该类的public
>
> private属性方法只能本类可以使用，protected的属性方法，在当前包下都能够用，不限制是否是子包

P94（这块讲的不错）

- **方法重写（Override）**

  - 父类被重写的方法与子类重写的方法，方法名和形参列表必须相同
  - 子类重写的方法的权限修饰符不小于父类被重写的方法的权限修饰符（当然：父类private方法不能被重写）
  - 返回类型
    - 父类被重写方法返回类型void，则子类重写方法返回类型必须void
    - 父类被重写方法返回类型是基本数据类型，子类重写方法必须与父类一致
    - 父类被重写方法返回类型是引用数据类型（比如类），子类重写的方法返回类型可以一致，也可以是父类被重写方法返回类型的子类（多态）

  - 抛出异常，上面一条类似：异常类型可以和父类一致，也可以是父类抛出异常类型的子类
- **方法重载（Overload）**
  - 两同一不同：**同一个类，同方法名，不同参数列表** (与返回类型无关)
  - 方法重载指的是在同一个类中可以定义多个同名方法，但它们的参数列表必须不同（参数个数、类型或顺序）。通过方法重载，可以使用相同的方法名进行不同的操作，提高代码的灵活性和可读性。
  - 编译器根据调用方法时提供的参数列表，来决定具体调用哪个重载方法。重载方法的返回类型可以相同也可以不同。
- **总结**
  - 方法重写是子类重新定义父类的方法，以改变方法的行为；
  - 方法重载是在同一个类中定义多个同名方法，参数列表不同，以提供更多的方法调用选择。

---

**P99多态：讲的不错** 

**子类对象的多态性：父类的引用指向子类的对象**

编译时，认为方法时左边声明的父类的类型的方法

执行时，实际执行子类重写父类的方法(面试题:**多态**是编译时行为还是**运行时行为**?)

```java
Person p1 = new Man();
```

多态：需要有类的继承和方法的重写

适用于方法但是不适用与属性

- 多态好处
- **极大的减少了代码的冗余，简化开发**

> 使用父类**做方法的形参**，是多态使用最多的场合。即使增加了新的的子类，方法也无需改变，提高了扩展性，符合开闭原则
>
> 【开闭原则】对扩展开放，对修改关闭 
>
> 通俗解释：软件系统中的各种组件，如模块（Modules）、类（Classes）以及功能（Functions）等，应该在不修改现有代码的基础上，引入新功能 

做方法的形参比较合适，但是具体需要子类对象特有的属性和方法的时候，还是new子类并使用子类的引用就好，因为多态不能够{**直接**}调用子类特有的属性和方法，但是可以{**向下转型**}

```java
public static void meeting(Person ... ps){
    for(int i = 0; i < ps.length; i++){
        ps[i].eat();       //多态：父类引用做形参，执行时还是子类重写的方法
        ps[i].toilet();
        
        //写法一
        if(ps[i] instanceof Woman){
            Woman w = (Woman)ps[i];
            w.makeup();   //向下转型后才能调用子类特有方法
        }
        
        //写法二，新型写法，知道要强转，判断时加名
        if(ps[i] instanceof Man m){
            m.smoke();
        }
        
        //如果instanceof判断的类型不在当前父类子类当中,编译无法通过
        //if(ps[i] instanceof String){                   <-String
        //    m.smoke();
        //}
    }
}
```



P102equals

- 任何引用数据类型都能使用equals

- 自定义类在没有重写Object中equals()方法的情况下,调用的就是Object类中声明的equals()方法,会==比较地址
- 对于像String File Date和包装类等,它们都重写了Object类中的equals()方法,用于比较对象实体内容是否相等



**高频面试题**

== 和 equals()区别

- ==

  基本数据类型:判断数值是否相等

  引用数据类型:判断地址是否相等

- equals()方法

  仅限引用数据类型,比如数组\类:①如果没有重写equals(),调用Object类中声明的equals()方法,会==比较地址②如果重写equals(),比较内容

---

P105 static

static 和类绑定好，声明的类变量（静态变量）和类方法（静态方法），能够直接通过类名获取，其他方法可以直接调用，省略了类名.而不是省略了this.，因此如果为了直接在类内部调用，需要static

自己封装了一个myArrays类，参数是int[]，可以排序打印，平均数，最大最小等，并且是静态方法，使用myArrays.方法（int数组）调用

例子2，虽然实例指向的对象为空，但是依旧可以使用该实例访问静态变量和方法

---

P107单例模式（Windows任务管理器，回收站都是典型的单例模式，数据库连接池一般也是）

**后半段对于static void main讲的可以看看**

- 饿汉式

  “立即加载”，随着类的加载，当前的唯一实例就创建了

  优点：写法简单，由于内存中较早加载，使用更方便、更快。线程安全

  缺点：内存中占用时间较长

- 懒汉式

  “延迟加载”，需要使用的时候创建实例

  优点：在需要的时候创建，节省内存空间

  缺点：线程不安全，（可以解决）

```java
//饿汉式
public class Main{
    public static void main(String[] args){
        //调用类的静态方法获取类的静态成员变量
        Apple a1 = Apple.getApple();
        Apple a2 = Apple.getApple();
        System.out.println(a1 == a2);  //true
    }
}

class Apple{
    //构造器
    public Apple(){
    }

    //静态成员变量
    private static Apple apple = new Apple();

    //静态方法返回静态变量
    public static Apple getApple(){
        return apple;
    }
}


//懒汉式，需要的时候创建
class Apple{
    //构造器
    public Apple(){
    }

    //静态成员变量
    private static Apple apple = null;

    //静态方法返回静态变量
    public static Apple getApple(){
        if(apple == null){
            apple = new Apple();
        }
        return apple;
    }
}
```



P110 final

final可以用来修饰类，方法，变量

修饰类，类不能再被继承

修饰方法，方法不能被重写

修饰变量

- 修饰成员变量（类属性），可以显示赋值、代码块赋值、构造器赋值，仅一次
- 修饰局部变量，仅一次，赋值后不能修改，

final + static使得成员变量（类属性）变为全局常量



---

P111**抽象类**和**抽象方法 **     abstract仅能修饰类和方法

abstract理解为标识，这个类无法实例化

如果含有抽象方法（仅声明）,类也必须是抽象类

在继承抽象类时候，子类要么实现抽象类的全部抽象方法，要么自身也是抽象类

抽象类还是有构造器的，因为子类在实例化的时候会直接或间接地调用父类的构造器

```java
//抽象类的应用，模板方法的设计模式
public class Main{
    public static void main(String[] args){
        //多态，父类的引用指向子类的对象
        BankTemplateMethod drawMoney = new DrawMoney();
        BankTemplateMethod saveMoney = new SaveMoney();
        drawMoney.process();
        saveMoney.process();
    }
}

//抽象父类，业务方法没有实现，由子类具体实现
abstract class BankTemplateMethod{
    //构造器
    public BankTemplateMethod(){
    }

    public void takeNumber(){
        System.out.println("Take a number");
    }
    public abstract void transact();

    public void evaluate(){
        System.out.println("Give a score");
    }

    public final void process(){
        takeNumber();
        transact();
        evaluate();
    }
}

class DrawMoney extends BankTemplateMethod{
    @Override
    public void transact() {
        System.out.println("Draw money");
    }
}

class SaveMoney extends BankTemplateMethod{
    @Override
    public void transact() {
        System.out.println("Save Money");
    }
}
```

---

P113  Interface （和类是实现关系，不同于继承，但是有些地方类似，比如方法的实现类似方法的重写）

接口可以多继承， interface CC extends AA, BB{}  这里AA和BB也是接口，（个人感觉就是一种组合接口的形式，方便后面的类来实现这个组合的接口）

```java
//格式： class A extends SuperA implements B, C{}
//A相较于SuperA来讲，叫做子类
//A相较于B,C来讲，叫做实现类

//类可以实现多个接口
//类针对于接口的多实现，一定程度上弥补了类的单继承的局限性
```

和类的级别一样，但是没有构造器

属性全是 public static final的，可以省略

方法全是 public abstract的，可以省略



```java
public class Main{
    public static void main(String[] args){
        System.out.println(Flyable.MIN_SPEED);   //0
        System.out.println(Flyable.MAX_SPEED);   //7900
    }
}

interface Flyable{
    //全局常量
    public static final int MIN_SPEED = 0;
    //可以省略 public static final
    int MAX_SPEED = 7900;
    
    //方法可以省略 public abstract，都是抽象方法，留给类实现
    void fly();
}
```



> 类的多态性：父类的引用指向了子类的对象，编译看左边，执行看右边，父类调用的方法实际是子类中（重写的）方法
>
> 接口的多态性：接口的引用指向了实现类的对象，类似上面

- 多态的展现这里有几个例子可以看一下P113，**创建接口匿名实现类的对象**

 

**面试题**  区分抽象类和接口

都可以声明抽象方法，都无法实例化对象

抽象类含有构造方法，因为子类在继承抽象类实例化的过程会直接或间接调用父类的构造器（一个类只能继承一个父类，类的单继承）

接口没有构造方法，一个类可以实现多个接口（接口的多继承）

类与类之间是继承关系，类与接口之间是实现关系，接口与接口之间是多继承关系



jdk8之前：静态属性、抽象方法

jdk8：增加了静态方法（仅接口调用）、默认方法（default关键字，可以重写）

---

P116匿名内部类，放在方法中的那个，40分钟左右的讲的还可以

抽象类和接口可以在类中定义一个类，或者直接使用匿名内部类

---

P117枚举类，关键字enum，20分钟后 jdk 5.0的方式，40分钟更简洁的写法（开发常用，涉及单例模式）

继承自父类Enum，也可以实现接口，隐藏了每个实例的 public static final + 枚举类名 以及new的构造方法，使用逗号隔开

```java
//Main.java
public class Main{
    public static void main(String[] args){
        //直接通过枚举类名调用实例    toString
        System.out.println(Season.SUMMER);

        //直接通过枚举类名调用实例     getSeasonName
        System.out.println(Season.SUMMER.getSeasonName());

        //引用指向实例，然后调用实例的方法
        Season s1 = Season.SUMMER;
        System.out.println(s1.getSeasonDesc());
    }
}

//Season.java
enum Season{
    //1. 静态实例的构造 private static final
    SPRING("春天", "春暖花开"),
    SUMMER("夏天", "夏日炎炎"),
    AUTUMN("秋天", "秋高气爽"),
    WINTER("冬天", "白雪皑皑");

    //2. 枚举类的成员变量 private final
    private final String SEASON_NAME;
    private final String SEASON_DESC;

    //3.私有化构造器，private可以省略，必定是私有的
    private Season(String seasonName, String seasonDesc){
        SEASON_NAME = seasonName;
        SEASON_DESC = seasonDesc;
    }

    //3. 提供实例变量get方法，注意没有set
    public String getSeasonName(){
        return SEASON_NAME;
    }
    public String getSeasonDesc(){
        return SEASON_DESC;
    }

    //4. 重写toString()
    @Override
    public String toString() {
        return "Season{" +
            "SEASON_NAME='" + SEASON_NAME + '\'' +
            ", SEASON_DESC='" + SEASON_DESC + '\'' +
            '}';
    }
}
```

- 枚举类实现接口，一种是每个实例统一实现接口方式相同，一种是每个实例实现接口方式不同（在enum类开头实例化的时候匿名方式实现接口方法）

```java
//需要实现的接口
interface Info{
	void show();   //public abstract省略了
}
```

方法一：修改两处，然后在Main.java可以调用s1.show();

```java
enum Season implements Info{
    
	//添加一个方法
    @Override
    public void show(){
        System.out.println("一个季节");
    }
```

方法二：修改两处，

```java
enum Season implements Info{

    SUMMER("夏天", "夏日炎炎"){
        @Override
        public void show() {
            System.out.println("这是一个夏季！");
        }
    },
```

两种实现接口的方法可以混着用

**开发中常用方式** 

```java
//Color.java
public enum Color{
    RED, BLUE, BLACK, WHITE, GREEN, ORANGE;
}

//Main.java
public class Main{
    public static void main(String[] args){
        Color c1 = Color.RED;
        System.out.println(c1);    //RED，没有重写，使用的Enum的toString方法打印实例名 RED
    }
}
```

- Annotation和单元测试相关 P118

  单元测试自定义模板在后面几分钟比较有用

---

P120包装类

```java
Integer m = 1;
Integer n = 1;
System.out.println(m == n);   //true
    
Integer x = 128;
Integer y = 128;
System.out.println(x == y);   //false


//享元设计模式，在自动装箱过程中实际调用的.valueOf()方法，有一个数组存放了-128~177,如果在这个区间，引用直接指向这个数组的对应位置，超出这个范围才new一个新的对象。
```

| 包装类    | 缓存对象      |
| --------- | ------------- |
| Byte      | -128-127      |
| Short     | -128-127      |
| Integer   | -128-127      |
| Long      | -128-127      |
| Float     | 没有          |
| Double    | 没有          |
| Character | 0-127         |
| Boolean   | true 和 false |

---

P124

子类抛出的异常需要与父类一致或者是父类抛出异常的子类

子类返回的参数类型需要与父类一致或者是父类返回参数类型的子类

都是为了多态的应用场景

编译时异常，运行时异常（在继承中可以省略不写）

异常处理方式try-catch-finally,finally和catch都依赖于try存在，try中的是局部变量

throws

- **在开发中，如何选择异常处理的两种方式?（重要，经验之谈）**

编译时异常、运行时异常

在程序代码中，若涉及到资源的调用（流、数据库连接、网络连接等），则必须考虑使用try-catch-finally,finally来处理，保证不出现内存泄露

如果父类被重写的方法没有throws异常，则子类重写的方法中如果出现异常，必须当场处理,try-catch-finally

开发中，方法a依次调用了方法b,c,d等方法，方法b, c, d之间是递进关系。此时，如果b, c, d中有异常，通常选择使用throws。而方法a中通常使用try-catch-finally

System.out.println(e.getMessage())

e.printStackTrace()



P128

面试题：throw和throws的区别？

1. throw是在方法内，手动抛出一个异常对象（new 一个对象）；throws是方法声明的时候指定该方法可能抛出的异常类型，然后将产生的异常对象继续向上抛出给其调用者进行处理；
2. throws和（try-catch）同一级别，是对异常对象的处理
