# Java常用集合和数据结构

---

#### 列表Lists(ArrayList、LinkedList)

ArrayList 继承了 AbstractList ，并实现了 List 接口。线程不安全

```java
import java.util.ArrayList;
import java.util.LinkedList; 
import java.util.Collections;  // 引入 Collections 类，排序


// 里面放包装类
// ArrayList，3种构造
ArrayList<Integer> L1 = new ArrayList<>();
ArrayList<Integer> L2 = new ArrayList<>(100);
ArrayList<?> L3 = new ArrayList<>(其他?集合);

public boolean add(E e)                   //末尾添加
public void add(int index, E element)     //指定位置添加
public E set(int index, E element)        //设置指定位置为element,返回原来的元素
public E remove(int index)                //指定位置删除，返回被删除的元素
public boolean remove(Object o)           //删除一次对象
public E get(int index) 

public int size()
public boolean isEmpty()
public void clear()


// 排序
Collections.sort(list);
Collections.sort(list, Collections.reverseOrder());
```

LinkedList继承了AbstractSequentialList（继承了AbstractList），并实现了List接口。线程不安全

```java
// LinkedList 2种构造方式
LinkedList<Integer> L4 = new LinkedList<>();
LinkedList<?> L5 = new LinkedList<>(其他?集合);

public boolean add(E e)
public void add(int index, E element)
public E set(int index, E element)
public E remove(int index)
public boolean remove(Object o)
public E get(int index)
    
public int size()
public boolean isEmpty()
public void clear()

/* 以上方法和ArrayList一致，但是LinkedList实现了Deque接口；
Deque双端队列继承Queue，常见实现类包括ArrayDeque和LinkedList，前者基于数组实现，后者基于链表实现*/

    
// 排序
Collections.sort(list);
Collections.sort(list, Collections.reverseOrder());
```

#### 集合Sets（仅介绍HashSet，还有TreeSet）

HashSet 基于 HashMap 来实现的，是一个不允许有重复元素的集合。
HashSet 允许有 null 值。
HashSet 是无序的，即不会记录插入的顺序。
HashSet 线程不安全的， 如果多个线程尝试同时修改 HashSet，则最终结果是不确定的。 必须在多线程访问时显式同步对 HashSet 的并发访问。
HashSet 实现了 Set 接口。

```java
import java.util.HashSet;


// HashSet多种构造方法
public HashSet(int initialCapacity)
HashSet<String> S1 = new HashSet<>();
HashSet<String> S2 = new HashSet<>(100);
HashSet<?> S3 = new HashSet<>(其他?集合);

// 多态，下面方法可以直接调用
Set<String> s4 = new HashSet<>();

public boolean add(E e)
public boolean remove(Object o)
public boolean contains(Object o)
public void clear()
public int size()
public boolean isEmpty()
```

#### 映射Maps（仅介绍HashMap，还有TreeMap）

HashMap 是一个散列表，它存储的内容是键值对(key-value)映射。
HashMap 实现了 Map 接口，根据键的 HashCode 值存储数据，具有很快的访问速度，最多允许一条记录的键为 null，不支持线程同步。
HashMap 是无序的，即不会记录插入的顺序。
HashMap 继承于AbstractMap，实现了 Map、Cloneable、java.io.Serializable 接口。

```java
import java.util.HashMap;


// HashMap构造方法
Map<String, String> map1 = new HashMap<>();
Map<String, String> map2 = new HashMap<>(10);
Map<K, V> mp2 = new HashMap<>(其他Map集合);

// 添加{key, value}，如果之前存在key则覆盖并返回原来的value，否则返回null
public V put(K key, V value)  
public V get(Object key)
public V remove(Object key)
public boolean remove(Object key, Object value)
public void clear()
public int size()
public boolean isEmpty()
public boolean containsKey(Object key)
public boolean containsValue(Object value)

// 添加元素时候需要先判断是否在map当中，因此先获取value的容器
public V getOrDefault(Object key, V defaultValue)
map.getOrDefault(key, "不存在就把我返回")

//实现自增，有则自增，无则为1
Map<String, Integer> map = new HashMap<>();
int val = map.getOrDefault("hello", 0);
map.put("hello", val + 1);

//迭代    
for (String key : map.keySet())
for(Integer value: map.values())
```

#### 栈（推荐ArrayDeque、LinkedList）

Java 中的栈数据结构，推荐使用 `java.util.Deque` 接口的实现类，其中最常用的实现类是 `java.util.ArrayDeque`。`ArrayDeque` 是一个基于数组实现的双端队列，可以在队列的两端高效地进行元素的插入和删除操作，非常适合用作栈的实现。

```java
import java.util.ArrayDeque;
import java.util.Deque;


Deque<Integer> stack = new ArrayDeque<>();
//Deque<Integer> stack = new LinkedList<>(); 下列操作一样

public void push(E e)             // 入栈
public E pop()                    // 出栈
public E peek()                   // 查看栈顶
public boolean isEmpty()          // 判断栈空
public int size()                 // 栈内元素个数

public void clear()
public boolean contains(Object o)
    
// 遍历，会按照出栈顺序遍历，栈没变
for(Integer i : stack) {
    System.out.println(i);
}
// 遍历完后，栈空
while(!stack.isEmpty()) {
    System.out.println(stack.pop());
}
```

>  Stack不推荐使用了，Stack是Vector的子类，Vector是基于数组实现的动态数组，操作都是同步的，线程安全，但是由于同步的额外开销，Stack的性能较低，引入较早，在集合框架之前就出现了，涉及存在一些问题，使用方式与上面一样

#### 队列（推荐ArrayDeque、LinkedList）

`ArrayDeque`和`LinkedList`都实现了`Queue`接口

```java
//add()和remove()方法在失败的时候会抛出异常(不推荐)
Queue<Integer> queue = new ArrayDeque<>();

public boolean offer(E e)         // 入队
public E poll()                   // 出队
public E peek()                   // 查看队首
public boolean isEmpty()          // 判断队空
public int size()                 // 队内元素个数

public void clear()
public boolean contains(Object o)

// 遍历同栈

/*
offer，add 区别：
一些队列有大小限制，因此如果想在一个满的队列中加入一个新项，多出的项就会被拒绝。
这时新的 offer 方法就可以起作用了。它不是对调用 add() 方法抛出一个 unchecked 异常，而只是得到由 offer() 返回的 false。
poll，remove 区别：
remove() 和 poll() 方法都是删除队首元素。
remove() 的行为与 Collection 接口的版本相似；
poll() 方法在用空集合调用时不是抛出异常，只是返回 null。更适合容易出现异常条件的情况。
peek，element区别：
element() 和 peek() 用于在查询队列首元素。与 remove() 方法类似，队列为空时， element() 抛出一个异常，而 peek() 返回 null。
*/
```

#### 优先队列（PriorityQueue、PriorityBlockingQueue）

`PriorityQueue` 线程不安全

`PriorityBlockingQueue`线程安全

**默认小顶堆，入堆出堆，查看堆顶与队列完全相同**

```java
import java.util.PriorityQueue;
import java.util.concurrent.PriorityBlockingQueue;


// 构造方法
PriorityQueue<Integer> q1 = new PriorityQueue<>();
PriorityQueue<Integer> q2 = new PriorityQueue<>(100);
PriorityQueue<?> q3 = new PriorityQueue<>(其他?集合);

public boolean offer(E e)         // 入堆
public E poll()                   // 出堆
public E peek()                   // 查看堆顶
public boolean isEmpty()          // 判断堆空
public int size()                 // 堆内元素个数

public void clear()
public boolean contains(Object o)
```

**比较器**

```java
// 大顶堆，需要定义比较器：实现Comparator接口，然后重写compare方法
class IntCmp implements Comparator<Integer>{
    @Override
    public int compare(Integer o1, Integer o2) {
        return o2-o1;
    }
}
public class TestPriorityQueue {
    public static void main(String[] args) {
        PriorityQueue<Integer> p = new PriorityQueue<>(new IntCmp());
        p.offer(4);
        p.offer(3);
        p.offer(2);
        p.offer(1);
        p.offer(5);
        while (!p.isEmpty()) {
            System.out.println(p.poll());          // 5 4 3 2 1
        }
    }
}
```

#### 链表

```java
// 自定义一个单向链表节点
public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
```

#### 树

```java
// 自定义二叉树节点
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

