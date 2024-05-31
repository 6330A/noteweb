# Java比较器

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
        Comparator comparator = new Comparator<Product>() {
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