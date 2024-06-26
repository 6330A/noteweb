# Java-Stream

---

[视频链接1](https://www.bilibili.com/video/BV1te411w722/?spm_id_from=333.788.recommend_more_video.-1&vd_source=b9f16feb6ff7836e90c4ba95657422ea)   

[视频链接2  AlbertShen](https://www.bilibili.com/video/BV1Vi421C73n/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click)

#### 不可变集合

不可变集合的应用场景

- 如果某个数据不能被修改，把它防御性地拷贝到不可变集合中是个很好的实践。
- 当集合对象被不可信的库调用时，不可变形式是安全的。

不可变集合的特点？

- 定义完成后不可以修改，或者添加、删除

如何创建不可变集合？

- `List`、`Set`、`Map`接口中，都存在静态的`of`方法，创建不可变集合

三种方式的细节

- `List`：直接用
- `Set`：元素不能重复
- `Map`：元素不能重复，键值对数量上限为10，超过可以考虑`ofEntries`或者`copyOf`方法

```java
// List接口静态方法of
List<String> list = List.of("l1", "l1", "l3");

for(String str : list) {
    System.out.println(str);
}
```

```java
// Set接口静态方法of
Set<String> set = Set.of("s1", "s2", "s3");

for(String str : set) {
    System.out.println(str);
}
```

```java
// Map接口静态方法of，上限为10，超过可以考虑ofEntries方法或者copyOf方法
Map<String, String> map = Map.of("k1", "v1", "k2", "v2", "k3", "v3");

for(Map.Entry<String, String> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ":" + entry.getValue());
}
```

```java
// 准备原有的map实例
Map<String, String> map = new HashMap<>();
map.put("k1", "v1");
map.put("k2", "v2");
map.put("k3", "v3");
// 方式一：一步一步来
// Set<Map.Entry<String, String>> entries = map.entrySet();   // 先获取集合
// Map.Entry[] kvArray = entries.toArray(new Map.Entry[entries.size()]); // 集合转为数组
// Map<String, String> temp = Map.ofEntries(kvArray);  // 数组传递给Map.ofEntries()获取不可变副本

// 方式二：一步到位，简化上面代码
// Map<String, String> temp = Map.ofEntries(map.entrySet().toArray(new Map.Entry[0]));

// 方式三：使用 copyOf方法，本质是对上面操作的封装
Map<String, String> temp = Map.copyOf(map);

for (Map.Entry<String, String> entry : temp.entrySet()) {  // 遍历
    System.out.println(entry.getKey() + " " + entry.getValue());
}
```

#### Stream Creation 流的创建

| 创建方法                                                     |
| ------------------------------------------------------------ |
| **集合**的`stream()`方法                                     |
| **数组**借助`Arrays`的`stream()`静态方法                     |
| `Stream`类的`of()`方法                                       |
| `Stream`类的`builder()`方法创建实例，然后实例调用`build()`方法创建流，一旦创建再不能往流中添加元素 |
| **文件**创建流                                               |
| 基础类型流创建                                               |
| `Stream`类的`generate()`方法和`iterate()`方法创建无限流      |
| **并行流**：①**已有的顺序流**：调用`parallel()`方法创建并行流，②**集合**：调用`parallelStream()`方法 |

```java
// 集合
Stream<String> stream1 = List.of("a", "b", "c").stream();

// 数组
Stream<String> stream2 = Arrays.stream(new String[]{"a", "b", "c"});

// Stream.of()
Stream<String> stream3 = Stream.of("a", "b", "c");

// Stream.builder() 和返回对象的build()
Stream.Builder<String> builder = Stream.builder();
builder.add("a");
builder.add("b");
Stream<String> stream4 = builder.build();

// 文件
Path path = Paths.get("file.txt");
Stream<String> stream5 = Files.lines(path);

// 基础类型流
IntStream stream6 = IntStream.of(1, 2, 3);
IntStream stream7 = IntStream.range(1, 4); //[1, 4)
IntStream stream8 = IntStream.rangeClosed(1, 4); //[1, 4]
// 基本类型流转换为对象流，基本类型流调用boxed方法
Stream<Integer> stream9 = stream8.boxed(); //[1,4]

// 无限流
Stream<String> stream10 = Stream.generate(() -> "Albert").limit(5); // 限制一下无限流的长度
Stream<Double> stream11 = Stream.generate(Math::random).limit(5);  // 创建5个随机数
Stream<Integer> stream12 = Stream.iterate(0, n -> n + 2).limit(10); // 10个元素的数列，0，2，4....18
Stream<Integer> stream13 = Stream.iterate(0, n -> n <= 10, n -> n + 2); // 三个参数（起始，终止条件，下一个元素生成方式）

// 并行流，已创建的流用parallel()，集合用parallelStream()
Stream<Integer> stream14 = stream13.parallel();
Stream<String> stream15 = List.of("a", "b", "c").parallelStream();
```

---

- `Collection`中的默认方法`stream()`

```java
List<String> list = List.of("a", "b", "c");
Stream<String> stream = list.stream();

/* 使用流遍历,forEach()方法传递参数为接口Consumer实例，可以简化为Lambda表达式
stream.forEach(new Consumer<String>() {
    @Override
    public void accept(String s) {
        System.out.println(s);
    }
});
*/
stream.forEach(s -> System.out.println(s));
```

`map`这类双列集合无法直接使用`steam()`方法获取流，可以使用其`entrySet()`、`keySet()`或者`values()`创建流

```java
// 创建双列集合
Map<String, String> map = new HashMap<>();
map.put("k1", "v1");
map.put("k2", "v2");
// 创建流
map.keySet().stream().forEach(key -> System.out.println(key));
map.entrySet().stream().forEach(entry -> System.out.println(entry));
```

- 使用数组创建流，`Arrays`工具类的静态方法`stream()`

``` java
// 基本类型和引用类型数组
int[] arr1 = new int[]{1, 2, 3};
String[] arr2 = new String[]{"a", "b", "c"};

// 创建流
Arrays.stream(arr1).forEach(i -> System.out.println(i));    // 这里创建的流类型是IntStream
Arrays.stream(arr2).forEach(s -> System.out.println(s));
```

- 使用`Steam`类的`of()`方法创建流

```java
// Stream接口中的静态方法of的形参是一个可变参数，可以传递零散数据，也可以是数组
// 如果参数是数组，只能传递引用类型的数组，#####对于基本数据类型数组，得到的是整体
Stream<String> stream = Stream.of("a", "b", "c");
stream.forEach(s -> System.out.println(s));

// 零散数据
Stream.of("a", 123, 's').forEach(s -> System.out.println(s));

// 传递数组
Stream.of(new String[]{"hello", "world"}).forEach(System.out::println);
```

#### Intermidiate Operations 流的中间操作

| 名称                                                         | 说明                                       |
| :----------------------------------------------------------- | ------------------------------------------ |
| `Stream<T> filter(Predicate<? super T> predicate);`          | 过滤                                       |
| `Stream<T> limit(long maxSize);`                             | 获取前几个元素                             |
| `Stream<T> skip(long n);`                                    | 跳过前几个元素                             |
| `Stream<T> distinct();`                                      | 元素去重，依赖（`hashCode`和`equals`方法） |
| `public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)` | 合并`a`和`b`两个流为一个流                 |
| `<R> Stream<R> map(Function<? super T, ? extends R> mapper);` | 转换流中的数据类型                         |

**filter**

```java
List<String> list = List.of("张无忌", "周芷若", "赵敏", "张强", "张强", "张三丰", "张良", "王二", "谢逊");

// 方法一：匿名内部类，实现Predicate接口test方法
list.stream().filter(new Predicate<String>() {
    @Override
    public boolean test(String s) {
        return s.startsWith("张");
    }
}).forEach(System.out::println);

// 方法二：Lambda表达式
list.stream()
    .filter(s -> s.startsWith("张"))
    .forEach(System.out::println);
```

**limit**

```java
list.stream()
    .filter(s -> s.startsWith("张"))
    .limit(3)
    .forEach(System.out::println);
```

**skip**

```java
list.stream()
    .filter(s -> s.startsWith("张"))
    .skip(3)
    .forEach(System.out::println);
```

**distinct**

```java
list.stream()
    .filter(s -> s.startsWith("张"))
    .distinct()
    .forEach(System.out::println);
```

**concat**

```java
List<String> list1 = List.of("a", "b", "c");
List<String> list2 = List.of("x", "y", "z");
Stream.concat(list1.stream(), list2.stream())
    .forEach(System.out::println);
```

**map**

```java
List<String> list = List.of("tom-21", "jerry-18", "marry-16");

// 方法一：匿名内部类，实现Function接口apply方法，泛型类型<原元素类型，需要映射为的类型>
list.stream().map(new Function<String, Integer>() {
    @Override
    public Integer apply(String s) {
        return Integer.parseInt(s.split("-")[1]);  // 字符串根据‘-’拆分为数组，取第二个转为Integer
    }
}).forEach(System.out::println);

// 方法二：Lambda表达式
list.stream()
    .map(s -> Integer.parseInt(s.split("-")[1]))
    .forEach(System.out::println);
```

**flatMap**

```java
// 嵌套的集合
List<List<String>> list = List.of(
    List.of("tom-21", "jerry-18", "marry-16"),
    List.of("张三-28", "李四-30"),
    List.of("王五-10", "赵六-60"));
// 使用flatMap转换为单层流
list.stream()
    .flatMap(Collection::stream)
    .map(s -> Integer.parseInt(s.split("-")[1]))
    .forEach(System.out::println);
```

**sort**

```java
List<String> list = List.of("strawberry", "peach", "apple", "pear", "watermelon", "banana");
// 自然排序，顺序和逆序
list.stream()
    .sorted()
    .forEach(System.out::println);

list.stream()
    .sorted(Comparator.reverseOrder())
    .forEach(System.out::println);

//定制排序：比如按照字符串长度
list.stream()
    .sorted(Comparator.comparingInt(String::length))
    .forEach(System.out::println);
```

#### Terminal Operations 终端操作

终端操作一旦执行，流就不能再被使用

- **Search and Match 查找与匹配，短路操作**

```java
// Stream.java

boolean anyMatch(Predicate<? super T> predicate);
boolean noneMatch(Predicate<? super T> predicate);
boolean allMatch(Predicate<? super T> predicate);
Optional<T> findFirst();
Optional<T> findAny();


// 例子
List<String> list = List.of("strawberry", "peach", "apple", "pear", "watermelon", "banana");
boolean res1 = list.stream().anyMatch(s -> s.startsWith("a")); // true
boolean res2 = list.stream().allMatch(s -> s.startsWith("a")); // false
boolean res3 = list.stream().noneMatch(s -> s.startsWith("a")); // false

Optional<String> opt = list.stream().filter(s -> s.startsWith("p")).findFirst();
opt.ifPresent(System.out::println);  // 获取的结果可能不存在，使用Optional，这里输出 peach
```

- **Aggregation 聚合**

```java
// Stream.java

long count();
Optional<T> max(Comparator<? super T> comparator);
Optional<T> min(Comparator<? super T> comparator);

// 例子
List<String> list = List.of("strawberry", "peach", "apple", "pear", "watermelon", "banana");
long count = list.stream().count(); // 6
Optional<String> opt = list.stream()
    .max(Comparator.comparingInt(String::length));
opt.ifPresent(System.out::println); // strawberry

// IntStream.java等基本类型的流才有sum()和average()
long count();
OptionalInt max();
OptionalInt min();
int sum();
OptionalDouble average();

// 例子
OptionalInt max = IntStream.of(1, 2, 3, 4).max();
max.ifPresent(System.out::println);  // 4
OptionalDouble average = IntStream.of(5, 6, 7, 8).average();
average.ifPresent(System.out::println); // 6.5
int sum = IntStream.of(1, 2, 3, 4).sum(); //10
```

- **Reduction 规约（本质上聚合是规约的一种特殊形式，适用于快捷简单的统计任务）**

```java
int sum = IntStream.of(1, 2, 3, 4, 5).reduce(100, (x, y) -> x + y); // 115
String ans = Stream.of("a", "b", "c", "d").reduce("开始拼接：", (a, b) -> a + b + ",");  // a,b,c,d,e,f,
```

- **Collection 收集，这部分比较复杂，暂时写这么多**

```java
// collect()方法
List<String> list = List.of("strawberry", "peach", "apple", "pear", "watermelon", "banana");

List<String> ans = list.stream()
    .filter(s -> s.length() < 6)
    .collect(Collectors.toList());  // [peach, apple, pear]

Map<String, Integer> map = list.stream()
    .filter(s -> s.length() < 6)
    .collect(Collectors.toMap(
        Function.identity(),    // s -> s          ，键：流元素本身
        String::length          // s -> s.length() ，值：流元素长度
    )); // {apple=5, pear=4, peach=5}

// toArray()方法
String[] ans = list.stream().filter(s -> s.length() > 6).toArray(new IntFunction<String[]>() {
    @Override
    public String[] apply(int value) {
        return new String[value];
    }
});
//String[] ans = list.stream().filter(s -> s.length() > 6).toArray(value -> new String[value]);
System.out.println(Arrays.toString(ans)); // Arrays.toString()打印数组
```

- **Iteratation 迭代**

```java
List<String> list = List.of("strawberry", "peach", "apple", "pear", "watermelon", "banana");

// 方法一：匿名内部类，实现Consumer接口accept方法
list.stream().filter(s -> s.length() > 6).forEach(new Consumer<String>() {
    @Override
    public void accept(String s) {
        System.out.println(s);
    }
});

// 方法二：Lambda表达式
list.stream().filter(s -> s.length() > 6).forEach(item -> System.out.println(item));

// 方法三：方法引用，相当于上面的lambda 表达式
list.stream().filter(s -> s.length() > 6).forEach(System.out::println);
```



