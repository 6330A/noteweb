# Java其他内容

---

#### 实现对象的排序，可以考虑两种方法，自然排序和定制排序

- 自然排序，类实现`Comparable`接口

```java
// Product类的多个对象放入数组中，使用Arrays.sort()静态方法进行排序
// 若需要改变升降规则，将返回值添加负号即可
/* 运行结果：
Product{name='meizu', price=2999.0}
Product{name='redmi', price=2999.0}
Product{name='xiaomi', price=3999.0}
Product{name='huawei', price=5999.0}
*/
public class OtherTest {
    @Test
    public void test1() {
        Product[] arr = new Product[4];
        arr[0] = new Product("huawei", 5999);
        arr[1] = new Product("redmi", 2999);
        arr[2] = new Product("meizu", 2999);
        arr[3] = new Product("xiaomi", 3999);
        Arrays.sort(arr);
        for (Product p : arr) {
            System.out.println(p.toString());
        }
    }
}

//产品类实现接口 Comparable 并重写 compareTo 方法
class Product implements Comparable<Product> {
    String name;
    double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public int compareTo(Product o) {
        if (o == this) {
            return 0;
        }
        int value = Double.compare(this.price, o.price);
        if (value != 0) {
            return value;
        }
        return this.name.compareTo(o.name);
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
```

- 定制排序

```java
public class OtherTest {
    @Test
    public void test1() {
        Product[] arr = new Product[4];
        arr[0] = new Product("huawei", 5999);
        arr[1] = new Product("redmi", 2999);
        arr[2] = new Product("meizu", 2999);
        arr[3] = new Product("xiaomi", 3999);
        // 定义一个比较器，实现
        Comparator<Product> comparator = new Comparator<Product>() {
            @Override
            public int compare(Product o1, Product o2) {
                if (o1 == o2) {
                    return 0;
                }

                int value = Double.compare(o1.price, o2.price);
                if (value != 0) {
                    return value;
                }
                return o1.name.compareTo(o2.name);
            }
        };

        Arrays.sort(arr, comparator);
        for (Product p : arr) {
            System.out.println(p.toString());
        }
    }
}

class Product {
    String name;
    double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
```

**自然排序：** 

​	单一的，唯一的

​	一劳永逸

​	要比较的类实现接口Comparable，并实现抽象方法compareTo(Object obj)

**定制排序：** 

​	灵活的，多样的

​	临时的

​	需要一个实例，实现Comparator的抽象方法compare(Object o1, Object O2)



#### Lambda表达式

`Lambda`表达式通常与函数式接口一起使用。函数式接口是仅包含一个抽象方法的接口，可以使用`@FunctionalInterface`注解标注。

```java
@FunctionalInterface
public interface MathOperation {
    int operation(int a, int b);
}
```

```java
public class LambdaExample {
    public static void main(String[] args) {
        // 使用 Lambda 表达式实现 MathOperation 接口
        MathOperation addition = (a, b) -> a + b;
        MathOperation subtraction = (a, b) -> a - b;
        MathOperation multiplication = (a, b) -> a * b;
        MathOperation division = (a, b) -> a / b;

        // 调用方法
        System.out.println("10 + 5 = " + operate(10, 5, addition));
        System.out.println("10 - 5 = " + operate(10, 5, subtraction));
        System.out.println("10 * 5 = " + operate(10, 5, multiplication));
        System.out.println("10 / 5 = " + operate(10, 5, division));
    }

    private static int operate(int a, int b, MathOperation mathOperation) {
        return mathOperation.operation(a, b);
    }
}
```

**比较器**中实现一个对象，可以使用`Lambda`表达式，然后将对象作为参数放入集合的构造方法

[力扣347前K个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/?envType=study-plan-v2&envId=top-100-liked) 

```java
Comparator<Product> comparator = (o1, o2) -> o1.price - o2.price);
```

#### switch新特性

JDK12引入增强的`switch`表达式，可以有返回值，使用箭头`->`替换繁琐的`break`语句避免贯穿，仍然可以使用冒号`:`和花括号`{}`，在JDK13中引入`yield`关键字从一个分支中返回值，专门用于`switch`表达式。

```java
int score[] = {44, 61, 89, 90, 100};
String grade[] = new String[score.length];  // 不及格 及格 良好 优秀 优秀

for (int i = 0; i < score.length; i++) {
    grade[i] = switch (score[i] / 10) {
        case 10, 9 -> "优秀";
        case 8 -> "良好";
        case 7, 6 -> "及格";
        default -> "不及格";
    };
}
```