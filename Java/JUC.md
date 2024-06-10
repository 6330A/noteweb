# JUC

---

 [尚硅谷](https://www.bilibili.com/video/BV1ar4y1x727/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

JUC 是Java 并发工具包（Java Util Concurrency），它是 Java 标准库提供的一组用于支持多线程编程的工具和类库。JUC 提供了丰富的并发工具和数据结构，能够帮助我们更方便地编写多线程程序，提高并发性能和可维护性。

管程（Monitor，锁/监视器）：执行线程就要求成功持有管程，然后才能执行方法，最后当方法完成（无论是正常完成还是非正常完成）时释放管程。在方法执行期间，执行线程持有了管程，其他任何线程都无法再获取到同一个管程。

#### 用户线程和守护线程

用户线程（User Thread）:一般情况下不做特别说明配置，默认都是用户线程。系统工作线程，会完成这个程序素养完成的业务操作。

守护线程（Daemon Thread）：一种特殊的线程为其它线程服务的，在后台默默地完成一些系统性的服务比如垃圾回收线程。

`daemon`属性，`true`代表守护线程，`false`代表用户线程

> setDaemon(true)方法必须在start()之前设置，否则报IllegalThreadStateException异常

```java
public class DaemonDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + " is running" + (Thread.currentThread().isDaemon() ? "守护线程" : "用户线程"));
            while (true) {
            }
        }, "t1");
        // 如果设置，会成为守护线程，main作为用户线程结束后，守护结束
        t1.setDaemon(true);
        t1.start();
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(Thread.currentThread().getName() + " ----end 主线程");
    }
}
```

#### CompletableFuture    

`Future`接口（异步任务接口）可以为主线程开一个分支任务，专门为主线程处理耗时和费力的复杂业务。

`Future`接口**常用实现类**`FutureTask`

> 线程创建的几种方式中，实现接口Runnable和Callable的不同之处，后者多了返回值且能够抛出异常

```java
// P10 CompletableFutureDemo.java
public class CompletableFutureDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // FutureTask 实现了RunnableFuture接口，实现了RunnableFuture接口实现了Runnable, Future接口
        // 创建实例作为FutureTask的构造参数，这里lambda实现了Callable接口的匿名实例
        FutureTask<String> futureTask = new FutureTask<>(() -> {
            System.out.println("------come in call()");
            // Callable可以有返回值
            return "hello Callable";
        });

        // 匿名线程
        new Thread(futureTask).start();
        System.out.println(futureTask.get());
    }
}
```

输出：

```sh
------come in call()
hello Callable
```

---

`Future`**编码实战和优缺点分析** 

**先说结论**：`Future`对于结果的获取不是很友好，只能通过阻塞或者轮询的方式得到任务的结果

**优点**：`Future`配合线程池异步多线程任务配合，能显著提高程序的执行效率 **1100ms->800ms**

```java
// P11 FutureThreadPoolDemo.java
public class FutureThreadPoolDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 使用Executors工具类的静态方法创建一个固定大小线程池
        ExecutorService threadPool = Executors.newFixedThreadPool(3);

        //开始计时
        long startTime = System.currentTimeMillis();

        FutureTask<String> futureTask1 = new FutureTask<String>(() -> {
            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "task1 over";
        });
        // 放入线程池中
        threadPool.submit(futureTask1);

        FutureTask<String> futureTask2 = new FutureTask<String>(() -> {
            try {
                TimeUnit.MILLISECONDS.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "task2 over";
        });
        // 放入线程池中
        threadPool.submit(futureTask2);

        // 不获取返回值差不多 300ms，获取返回值 800ms
        System.out.println(futureTask1.get());
        System.out.println(futureTask2.get());

        // main线程中也执行一次
        try {
            TimeUnit.MILLISECONDS.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 结束计时
        long endTime = System.currentTimeMillis();
        System.out.println("-----costTime: " + (endTime - startTime) + "ms");
        System.out.println(Thread.currentThread().getName() + "-----end");

        threadPool.shutdown();
    }
}
```

输出：

```sh
task1 over
task2 over
-----costTime: 804ms
main-----end
```

**缺点**：`get()`容易造成阻塞，一般建议放在程序后面，一旦调用不见不散，非要等到结果才会离开，容易程序堵塞。

给`get()`方法提供参数，设置等待时间，不管程序执行需要多长时间，一旦**过时抛出异常**，可以被其他程序接收即使采取其他措施

`isDone()`轮询的方式会耗费无谓的CPU资源，而且也不见得能及时得到结果（如果想要异步获取结果，通常会以轮询的方式获取结果，尽量不要阻塞）

> get()不推荐使用

```java
// P3 FutureAPIDemo.java
public class FutureAPIDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        FutureTask<String> futureTask = new FutureTask<String>(() -> {
            System.out.println(Thread.currentThread().getName() + " ----come in");
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "task over";
        });
        new Thread(futureTask, "t1").start();

        System.out.println(Thread.currentThread().getName() + "\t ----忙其他任务了");
//        System.out.println(futureTask.get());
//        System.out.println(futureTask.get(3, TimeUnit.SECONDS));    // 提供参数，设置等待时间
        
        // 轮询的处理方式
        while (true) {
            if (futureTask.isDone()) {
                System.out.println(futureTask.get());
                break;
            } else {
                try {
                    TimeUnit.MILLISECONDS.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("正在处理，请等待");
            }
        }
        
    }
}
```

输出：

```sh
main	 ----忙其他任务了
t1 ----come in
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
正在处理，请等待
result: task over
```

---

**CompletableFuture对Future的改进**

想将多个异步任务的计算结果组合起来，后一个异步任务的计算结果需要前一个异步任务的值
将两个或多个异步计算合成一个异步计算，这几个异步计算互相独立，同时后面这个又依赖前一个处理的结果。

在Java8中，`CompletableFuture`提供了非常强大的`Future`的扩展功能，可以帮助我们简化异步编程的复杂性，并且提供了函数式编程的能力，可以通过回调的方式处理计算结果，也提供了转换和组合`CompletableFuture`的方法。
它可能代表一个明确完成的`Future`，也有可能代表一个完成阶段`CompletionStage`，它支持在计算完成以后触发一些函数或执行某些动作。
**四个静态方法**：

```java
// 实现了Future和CompletionStage两个接口
// public class CompletableFuture<T> implements Future<T>, CompletionStage<T>
// CompletableFutureBuildDemo.java

public class CompletableFutureBuildDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {

//         无返回值，参数实现Runnable接口实例
//        CompletableFuture<Void> c1 = CompletableFuture.runAsync(() -> {
//            try {
//                TimeUnit.SECONDS.sleep(1);
//            }catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        });
//        System.out.println(c1.get());   // null

//         无返回值，第一个参数实现Runnable接口实例，第二个参数线程池
//        ExecutorService threadPool = Executors.newFixedThreadPool(3);
//        CompletableFuture<Void> c2 = CompletableFuture.runAsync(() -> {
//            try {
//                TimeUnit.SECONDS.sleep(1);
//            }catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//        }, threadPool);
//        System.out.println(c2.get());   // null
//        threadPool.shutdown();   // 记得关闭线程池

//         有返回值，参数实现Supplier接口实例(实现get()方法有返回值的，lambda表达式隐藏函数名)
//        CompletableFuture<String> c3 = CompletableFuture.supplyAsync(() -> {
//            try {
//                TimeUnit.SECONDS.sleep(1);
//            }catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            return "supplyAsync有返回值";
//        });
//        System.out.println(c3.get());

        // 有返回值，第一个参数实现Supplier接口实例，第二个参数线程池
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture<String> c4 = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "supplyAsync有返回值";
        }, threadPool);
        System.out.println(c4.get());
        threadPool.shutdown();   // 记得关闭线程池
    }
}
```

**等待结果返回**

```java
// P18 CompletableFutureUseDemo.java
public class CompletableFutureUseDemo {
    public static void main(String[] args) {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);

        try {
            CompletableFuture.supplyAsync(() -> {
                System.out.println(Thread.currentThread().getName() + "---come in");
                int result = ThreadLocalRandom.current().nextInt(10);
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("1s 之后得到结果result: " + result);
//                if(result > 2){
//                    int i = result / 0;
//                }
                return result;
            }, threadPool).whenComplete((v, e) -> {
                if (e == null) {
                    System.out.println("----计算完成，更新系统UpdateValue:" + v);
                }
            }).exceptionally(e -> {
                e.printStackTrace();
                System.out.println("异常情况" + e.getCause() + "\t" + e.getMessage());
                return null;
            });
            System.out.println(Thread.currentThread().getName() + "-");
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            threadPool.shutdown();
        }
    }
}
```

**CompletableFuture    P23-P28的一些方法的调用**

| 方法             |                     |
| ---------------- | ------------------- |
| .join   .get     | 获取返回值          |
| .thenRun()       | 无参无返回          |
| .thenRunAsync()  | 异步                |
| .thenApply()     | 有参有返回 （处理） |
| .thenAccept()    | 有参无返回 （消费） |
| .whenComplete()  |                     |
| .applyToEither() | 任务选择            |
| .thenCombine()   | 任务结果合并        |

#### 锁

- 乐观锁（Optimistic Locking）

  乐观锁的基本思想是认为对数据的并发冲突很少发生，因此在数据操作时不加锁，而是在更新数据时检查是否发生了冲突。如果发生冲突，则回滚操作并重试。乐观锁通常通过版本号或时间戳来实现。

  1. **无锁机制**：读取数据时不加锁，提高了系统的吞吐量和性能
  2. **冲突检测**：更新数据时通过检查版本号或时间戳来判断数据是否被其他事务修改
  3. **适用于读多写少的场景**：在并发冲突较少的环境中性能较好

- 悲观锁（Pessimistic Locking）

  悲观锁的基本思想是认为对数据的并发冲突经常发生，因此在读取和操作数据时加锁，以确保数据的独占访问。悲观锁通常通过数据库的锁机制实现，如行锁或表锁。

  1. **加锁机制**：读取或操作数据时加锁，确保数据不会被其他事务修改。
  2. **避免冲突**：通过加锁防止并发冲突，确保数据一致性。
  3. **适用于写多的场景**：在并发冲突较多的环境中性能较好，但可能降低系统的吞吐量。

`Synchronized`的重入的实现机理

每个锁对象拥有一个锁计数器和一个指向持有该锁的线程的指针。

当执行monitorenter时，如果目标锁对象的计数器为0，那么说明它没有被其他线程所持有，Java虚拟机会将该锁对象的持有线程设置为当前线程，且计数器加1.

当目标锁对象的计数器不为0的情况下，如果锁对象的持有线程是当前线程，那么Java虚拟机可以将其计数器加1，否则需要等待，直到持有线程释放该锁。

当执行monitorexit时，Java虚拟机则需将锁对象的计数器减1。计数器为0代表锁已被释放。

---

#### Java中断机制

什么是中断机制？

一个线程不应该由其他线程来强制中断或停止，而是应该**由线程自己自行停止**。

> Thread.stop, Thread.suspend, Thread.resume 都已经被废弃

Java提供了一种用于停止线程的协商机制--中断，也即中断标识协商机制。

中断只是一种协作协商机制，Java没有给中断增加任何语法，中断的过程完全需要程序员自己实现。

| 返回值           | 方法              | 介绍                                              |
| ---------------- | ----------------- | ------------------------------------------------- |
| `void`           | `interrupt()`     | 中断此线程，仅仅是设置线程中断状态为`true`,       |
| `static boolean` | `interrupted()`   | 判断线程是否被中断，清除当前中断状态，设为`false` |
| `boolean`        | `isInterrupted()` | 判断当前线程是否被中断（通过检测中断标志位）      |

**线程中断方式**

方式一：通过`volatile`实现线程中断

```java
public class InterruptDemo {
    static volatile boolean flag = false;

    public static void main(String[] args) {
        // 线程t1
        new Thread(() -> {
            while (true) {
                if (flag) {
                    System.out.println(Thread.currentThread().getName() + "--- is stoped");
                    break;
                }
                System.out.println("t1 --------- hello volatile");
            }
        }, "t1").start();

        // 线程t2
        new Thread(() -> {
            flag = true;
        }, "t2").start();
    }
}
```

方式二：通过`AtomicBoolean`实现线程中断

```java
public class InterruptDemo {
    // AtomicBoolean 类中属性 private volatile int value;通过get和set修改该属性
    static AtomicBoolean atomicBoolean = new AtomicBoolean(false);

    public static void main(String[] args) {
        // 线程t1
        new Thread(() -> {
            while (true) {
                if (atomicBoolean.get()) {
                    System.out.println(Thread.currentThread().getName() + "--- is stoped");
                    break;
                }
                System.out.println("t1 --------- hello AtomicBoolean");
            }
        }, "t1").start();

        // 线程t2
        new Thread(() -> {
            atomicBoolean.set(true);
        }, "t2").start();
    }
}
```

方式三：通过Thread类自带的中断api实例方法实现

在需要中断的线程中不断**监听**中断状态，一旦发生中断，就执行相应的中断处理业务逻辑stop线程

```java
// Thread.currentThread().isInterrupted()查看当前线程标志位,false未中断，true中断
// 线程对象.interrupt()设置标志位

public class InterruptDemo {
    public static void main(String[] args) {
        // 线程t1，实例化对象
        Thread t1 = new Thread(() -> {
            while (true) {
                // 线程自带api查看中断状态，返回值boolean
                if (Thread.currentThread().isInterrupted()) {
                    System.out.println(Thread.currentThread().getName() + "标志位被设置为true");
                    break;
                }
                System.out.println("t1 --------- hello interrupt api");
            }
        }, "t1");
        t1.start();

        // 线程t2向线程t1发出协商，将t1的中断标志位设为true，无返回值
        new Thread(() -> {
            t1.interrupt();
        }, "t2").start();
    }
}
```

**当前线程的中断标识为true，线程是否立刻停止？**

答案：否

​	对于一个线程，调用`interrupt()`时

1. 如果线程处于正常活动状态，那么仅将线程的**中断标志位**设置为`true`，该线程将继续运行，不受影响。因此`interrutp()`并不能真正中断线程，需要被调用的线程自行配合。
2. 如果线程处于被阻塞状态（例如处于`sleep, wait, join`等状态），在别的线程中调用当前线程对象的`interrupt()`方法，那么线程将立即退出被阻塞状态，并抛出`InterruptedException`异常，**中断标志位被清除**，回到`false`，因此需要在异常捕获里`Thread.currentThread().interrupt()`再次设置中断标识位。

> If this thread is blocked in an invocation of the wait(), wait(long), or wait(long, int) methods of the Object class, or of the join(), join(long), join(long, int), sleep(long), or sleep(long, int) methods of this class, then its interrupt status will be cleared and it will receive an InterruptedException.  (Thread源码，搜索interrupt查看)

```java
// InterruptDemo2.java
public class InterruptDemo2 {
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 300; i++) {
                System.out.println("----" + i);
            }
            System.out.println("t1线程调用interrupt()后的中断标识位02：" + Thread.currentThread().isInterrupted());//true
        }, "t1");

        t1.start();
        System.out.println("t1线程默认中断标识位：" + t1.isInterrupted());
        try {
            TimeUnit.MILLISECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        t1.interrupt();
        System.out.println("t1线程调用interrupt()后的中断标识位01：" + t1.isInterrupted());//true
        try {
            TimeUnit.MILLISECONDS.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("t1线程调用interrupt()后的中断标识位03：" + t1.isInterrupted());//jdk 14开始，true，和讲解jdk8不同
    }
}

```

**静态方法**`Thread.interrupted()`，上面都是对象方法

```java
public class InterruptDemo4 {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName() + "\t" + Thread.interrupted());
        System.out.println(Thread.currentThread().getName() + "\t" + Thread.interrupted());

        System.out.println("-------");
        Thread.currentThread().interrupt();
        System.out.println("-------");

        System.out.println(Thread.currentThread().getName() + "\t" + Thread.interrupted());
        System.out.println(Thread.currentThread().getName() + "\t" + Thread.interrupted());
    }
}
```

输出：

```sh
main	false
main	false
-------
-------
main	true
main	false
```

解释：调用线程的静态方法`Thread.interrupted()`返回当前线程的中断标识，

看下面源码，`false`情况下直接返回线程中断标识位，`true`情况下将清除中断标识并返回`true`

```java
// jdk17 Thread.java

/* Interrupt state of the thread - read/written directly by JVM */
    private volatile boolean interrupted;

    public static boolean interrupted() {
            Thread t = currentThread();
            boolean interrupted = t.interrupted;               //临时变量记录了一下此刻标识位
            // We may have been interrupted the moment after we read the field,
            // so only clear the field if we saw that it was set and will return
            // true; otherwise we could lose an interrupt.
            if (interrupted) {
                t.interrupted = false;
                clearInterruptEvent();
            }
            return interrupted;
        }
```

#### 阻塞和唤醒线程

3种让线程等待和唤醒的方法

| 类            | 等待      | 唤醒       |
| ------------- | --------- | ---------- |
| `Object`      | `wait()`  | `notify()` |
| `Condition`   | `await()` | `signal()` |
| `LockSupport` | `park()`  | `unpark()` |

`LockSupport`**静态方法的使用，不需要额外加锁，自带**

`LockSupport`是用来创建锁和其他同步类的基本线程阻塞原语，其方法都是静态方法，可以让线程在任意位置阻塞，也有对应的唤醒方法，归根结底调用的`Unsafe`中的`native`代码

每个使用该类的线程都有一个许可`permit`关联，且`permit`最多只有一个，也就是说重复调用`unpark()`方法也不会积累凭证，而一个`park()`会消耗一个消费凭证

```java
// LockSupportDemo.java
public class LockSupportDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "\t----come in");
            // 调用静态方法，使用凭证
            LockSupport.park();
            System.out.println(Thread.currentThread().getName() + "\t----wake up");
        }, "t1");
        t1.start();
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "\t----t2中唤醒线程t1");
            // 调用静态方法，获取至多一个凭证
            LockSupport.unpark(t1);
        }, "t2").start();
    }
}
```

输出：

```sh
t1	----come in
t2	----t2中唤醒线程t1
t1	----wake up
```

**面试题**

为什么可以突破`wait/notify`的原有调用顺序？

因为`unpark()`方法获得了一个凭证，之后`park()`方法通过消费该凭证使得线程被唤醒



为什么唤醒两次后阻塞两次，但最终结果还会阻塞线程？

因为重复调用`unpark()`方法至多只能获取到一个凭证，而调用两次`park()`需要两个凭证才能彻底唤醒线程

---

#### JMM (Java Memory Model)

一种抽象概念，并不真实存在，仅仅描述一组约定或规范，通过这组规范定义了程序中（尤其是多线程）各个变量的读写访问方式并决定一个线程对共享变量的写入何时以及如何变成对另一个线程可见。关键技术点都是围绕多线程的**原子性**、**可见性**和**有序性**展开的。

**原子性**：在多线程环境中，确保操作在执行过程中不会被其他线程中断或干扰；

**可见性**：一个线程对变量的修改对其他线程可见；

**有序性**：在多线程环境中，程序代码的执行顺序符合预期，尤其是在不同线程之间，操作执行的顺序能被正确观察和理解。

作用：通过JMM来实现线程和主内存之间的抽象关系；屏蔽各个硬件平台和操作系统的内存访问差异以实现让Java程序在各种平台下都能达到一致的内存访问效果。

CPU的运行并不是直接操作内存而是先把内存里面的数据读到缓存。而内存的读和写操作的时候就会造成不一致的问题。

小总结：

- 我们定义的所有共享变量都储存在物理主内存中
- 每个线程都有自己独立的工作内存，里面保存该线程使用到的变量的副本(主内存中该变量的一份拷贝)
- 线程对共享变量所有的操作都必须先在线程自己的工作内存中进行后写回主内存，不能直接从主内存中读写(不能越级)
- 不同线程之间也无法直接访问其他线程的工作内存中的变量，线程间变量值的传递需要通过主内存来进行(同级不能相互访问)

---

#### volatile

**两大特性**：可见性，有序性

> 没有原子性，使用复合运算赋值（i++）会导致数据不一致，因为有些操作可能在重新从主内存读取时被覆盖

```java
volatile int value = 10;
```

写一个`volatile`变量时，JMM会把该线程对应的本地内存中的共享变量值**立刻刷新回主内存**中

读一个`volatile`变量时，JMM会把该线程毒药的本地内存设置为无效，重新回答主内存中读取最新值

**重点：四大内存屏障**

`loadload`读读、`loadstore`读写、`storeload`写读、`storestore`写写

用于阻止屏障两边的指令重排序

`volatile`**读**操作后面两道屏障`loadload`和`loadstore` （通俗解释：我读完以后后面才能读，我读完之后后面才能写）

`volatile`**写**操作前面一道屏障`storestore`，后面一道屏障`storeload` （通俗解释：前面指令要写完才轮到我写，我先写完后面指令才能读）

**使用场景**

1. 单一赋值
2. 状态标志，判断业务是否结束，boolean
3. 开销较低的读，写锁策略

```java
// 共享资源类
// 当读远多于写，结合使用内部锁和volatile变量来减少同步的开销
class Counter{
    private volatile int value;

    public int getValue(){
        return value;        // 利用volatile保证读取操作的可见性
    }

    public synchronized void increment(){
        this.value++;        // 利用syncronized保证复合操作的原子性
    }
}
```

4. DCL双端锁的发布（**单例模式，懒汉式**）

```java
public class SafeDoubleCheckSingleton {
    // 通过volatile声明，实现线程安全的延迟初始化
    private volatile static SafeDoubleCheckSingleton instance;
    // 私有化构造方法
    private SafeDoubleCheckSingleton() {}
    // 双重锁设计
    public static SafeDoubleCheckSingleton getInstance() {
        if(instance == null) {
            // 1.多线程并发创建对象时，会通过加锁保证只有一个线程能创建对象
            synchronized (SafeDoubleCheckSingleton.class) {
                if(instance == null) {
                    // 隐患：多线程环境下，由于重排序，该对象可能还未完成初始化赋值就被其他线程读取
                    // 解决隐患原理：利用volatile，禁止“初始化对象”(2)和“设置singleton指向内存空间"(3)的重排序
                    instance = new SafeDoubleCheckSingleton();
                }
            }
        }
        // 2.创建对象完毕，执行getInstance()将不需要获取锁，直接返回创建的对象
        return instance;
    }
}
```

#### CAS (compare and swap)

三个操作数：

1. 内存位置（V）需要进行比较和交换的变量的内存地址
2. 预期值（E）期望变量的当前值 
3. 新值（N）如果变量的当前值与预期值相等，则将其更新为新值

**工作原理**

1. 读取内存位置（V）的当前值
2. 将这个值与预期值（E）进行比较
   - 如果相等，处理器会自动将该位置的值更新为新值（N）
   - 如果不相等，不做任何操作，多个线程同时执行CAS操作只有一个会成功
3. 返回布尔值，表示操作是否成功

```java
// CASDemo.java
public class CASDemo {
    public static void main(String[] args) {
        AtomicInteger atomicInteger = new AtomicInteger(5);
        System.out.println(atomicInteger.compareAndSet(5, 2024) + " " + atomicInteger.get());
        System.out.println(atomicInteger.compareAndSet(5, 2025) + " " + atomicInteger.get());
    }
```

输出：

```sh
true 2024
false 2024
```

CAS是JDK提供的非阻塞原子性操作，它通过硬件保证了比较-更新的原子性。
它是非阻塞的且自身具有原子性，效率更高且通过硬件保证，更可靠。

CAS是一条CPU的原子指令(`cmpxchg`指令），不会造成所谓的数据不一致问题，`UnSafe`提供的CAS方法（如`compareAndSwapXXX`）底层实现即为CPU指令`cmpxchg`。

执行`cmpxchg`指令的时候，会判断当前系统是否为多核系统，如果是就给总线加锁，只有一个线程会对总线加锁成功，加锁成功之后会执行cas操作，也就是说**CAS的原子性实际上是CPU实现独占的**，比起用`synchronized`重量级锁，这里的排他时间要短很多，所以在多线程情况下性能会比较好。

**AtomicReferenceDemo**

```java
// 自定义类的原子引用
class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

public class AtomicReferenceDemo {
    public static void main(String[] args) {
        AtomicReference<User> atomicReference = new AtomicReference<>();
        User user1 = new User("Jack", 18);
        User user2 = new User("Mary", 22);
        atomicReference.set(user1);
        System.out.println(atomicReference.compareAndSet(user1, user2) + "\t" + atomicReference.get().toString());
        System.out.println(atomicReference.compareAndSet(user1, user2) + "\t" + atomicReference.get().toString());
    }
}
```

输出：

```sh
true	User{name='Mary', age=22}
false	User{name='Mary', age=22}
```

解决`ABA`问题，使用带戳记流水的原子类`AtomicStampedReference`，这个的方法挺少的，提供版本号

```java
// AtomicStampedReference.java
public boolean compareAndSet(V   expectedReference,
                                 V   newReference,
                                 int expectedStamp,
                                 int newStamp) {
```

**总结一下CAS**：

**优点**：

​		**无锁并发**：CAS操作避免了传统锁机制，减少了锁竞争，提高了并发性能。

​		**高效**：在多数情况下，CAS操作比锁机制更高效，尤其是在竞争不激烈的情况下。

**缺点**：

​		**ABA问题**：CAS操作的一个典型问题是ABA问题，即一个变量值从A变为B，再变回A。这种情况下，CAS操作无法检测到值的中间变化。可以通过版本号或其他机制来解决此问题。

​	**忙等**：在高竞争情况下，CAS操作可能导致忙等（不断重试），消耗CPU资源。

---

#### 原子类

`synchronized`和原子类`AtomicLong`、`LongAdder`和`LongAccumulator`效率比较

```java
// AccumulatorCompareDemo.java P89
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.LongAccumulator;
import java.util.concurrent.atomic.LongAdder;

// 共享资源类，四种实现线程安全的方式，推荐使用最后两个类
class ClickNumber {
    int number = 0;

    // synchronized 锁整个对象
    public synchronized void clickBySynchronized() {
        number++;
    }

    // AtomicLong原子类
    AtomicLong atomicLong = new AtomicLong(0);

    public void clickByAtomic() {
        atomicLong.getAndIncrement();
    }

    // LongAdder原子类
    LongAdder longAdder = new LongAdder();

    public void clickByLongAdder() {
        longAdder.increment();
    }

    // LongAccumulator原子类
    LongAccumulator longAccumulator = new LongAccumulator((a, b) -> a + b, 0);

    public void clickByLongAccumulator() {
        longAccumulator.accumulate(1);
    }
}


public class AccumulatorCompareDemo {
    public static final int million = 1000000;
    public static final int threadN = 50;

    public static void main(String[] args) throws InterruptedException {
        ClickNumber clickNumber = new ClickNumber();
        // CountDownLathc替换sleep，调用countDown()方法和await()方法获取确保线程执行完成
        CountDownLatch countDownLatch = new CountDownLatch(threadN);

        long start = System.currentTimeMillis();
        for (int i = 0; i < threadN; i++) {
            new Thread(() -> {
                try {
                    for (int j = 0; j < million; j++) {
                        clickNumber.clickBySynchronized();      // 1040ms
//                        clickNumber.clickByAtomic();            // 569ms
//                        clickNumber.clickByLongAdder();         // 80ms
//                        clickNumber.clickByLongAccumulator();   // 106ms
                    }
                } finally {
                    countDownLatch.countDown();
                }
            }).start();
        }
        countDownLatch.await();
        long end = System.currentTimeMillis();
        System.out.println("costTime: " + (end - start) + "ms");
        // 下面结果都正确，50000000
//        System.out.println(clickNumber.number);
//        System.out.println(clickNumber.atomicLong.get());
//        System.out.println(clickNumber.longAdder.sum());
//        System.out.println(clickNumber.longAccumulator.get());
    }
}
```

`LongAdder`在无竞争的情况下，和`AtomicLong`一样，对同一个`base`进行操作，当出现竞争关系时则采用化整为零分散热点的做法，用空间换时间，用一个数组`cells`，将`value`拆分进这个数组。多个线程需要同时对`value`进行操作时，可以对线程`id`进行`hash`计算然后根据`hash`值映射到数组`cells`下标，对值进行自增。所有线程操作完成后，将数组`cells`的值与`base`相加作为最终结果。
$$
sum = base + \sum_{i = 0}^{n-1}{cells[i]}
$$

```java
// 查看源码LongAdder.java
public long sum() {
    Cell[] cs = cells;
    long sum = base;
    if (cs != null) {
        for (Cell c : cs)
            if (c != null)
                sum += c.value;
    }
    return sum;
}


public void add(long x) {
        Cell[] cs; long b, v; int m; Cell c;
        if ((cs = cells) != null || !casBase(b = base, b + x)) {
            int index = getProbe();
            boolean uncontended = true;
            if (cs == null || (m = cs.length - 1) < 0 ||
                (c = cs[index & m]) == null ||
                !(uncontended = c.cas(v = c.value, v + x)))
                longAccumulate(x, null, uncontended, index);
        }
    }
```

源码分析：

1. 如果`cells`为空，执行`casBase()`获取返回结果，`CAS`更新`base`字段成功则退出
2. 如果`cells`为空，`CAS`更新`base`字段失败（因多线程竞争）则进入`if`语句。`uncontended`为`true`，调用`longAccumulate`
3. 如果`cells`非空，但当前线程映射的槽为空，`uncontended`为`true`，调用`longAccumulate`
4. 如果`cells`非空，但当前线程映射的槽非空，`CAS`更新`Cell`的值，成功则防护，否则`uncontended`设为`false`，调用`longAccumulate`

`AtomicLong`：线程安全，可以允许一些性能损耗，要求高精度时可使用，保证精度，性能代价（高竞争的多线程环境中，可能会遇到性能瓶颈，`CAS`操作不断地失败和重试，内存消耗可能会更高）；多个线程针对单个热点值`value`进行原子操作。

`LongAdder`：高并发情况下有较好的性能，对值的精确度要求不高时可以使用，保证性能，精度代价；每个线程拥有一个自己的槽，线程只对自己槽中的值进行`CAS`操作。

---

#### ThreadLocal

`ThreadLocal`提供线程局部变量。这些变量与正常的变量不同，因为每一个线程在访问`ThreadLocal`实例的时候（通过其`get`或`set`方法）都有自己的、独立初始化的变量副本。`ThreadLocal`实例通常是类中的私有静态字段，使用它的目的是希望将状态（例如，用户`ID`或事务`ID`）与线程关联起来。

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class MyData {
    // 建议加static，不需要作为成员变量，
    // 不要使用new，使用withInitial方法初始化，并且一定不过指定初始值，这里参数是一个实例实现了接口Supplier
    static ThreadLocal<Integer> threadLocalField = ThreadLocal.withInitial(() -> 0);

    public void add() {
        threadLocalField.set(threadLocalField.get() + 1);
    }
}

// Aalibaba规范：必须回收自定义的ThreadLocal变量，尤其在线程池场景下，线程经常被复用
// 如果不清理自定义的ThreadLocal变量，可能会影响后续业务逻辑和造成内存泄露等问题，尽量在代理中使用try-finally回收
public class ThreadLocalDemo {
    public static void main(String[] args) {
        MyData myData = new MyData();
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        try {
            for (int i = 0; i < 10; i++) {
                threadPool.submit(() -> {
                    try {
                        Integer before = myData.threadLocalField.get();
                        myData.add();
                        Integer after = myData.threadLocalField.get();
                        System.out.println(Thread.currentThread().getName() + "\t: " + before + " " + after);
                    } finally {
                        myData.threadLocalField.remove();
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            threadPool.shutdown();
        }
    }
}
```

ThreadLocal和ThreadLocalMap的数据结构和关系？

ThreadLocal的key是弱引用，为什么？

ThreadLocal内存泄露问题？

ThreadLocal中最后为什么要加remove方法？

**三者区别和介绍：**

- `Thread`

  用于表示一个线程的类，可以通过继承或者提供给它一个实现`Runnabel`接口的实例创建线程。其内部有一个成员变量`ThreadLocal.ThreadLocalMap threadLocals = null;`

- `ThreadLocal`提供线程局部变量，通过`ThreadLocal`实例可以获取每个线程独立的数据。

- `ThreadLocalMap`是`ThreadLocal`的静态内部类，实际上是一个定制化的哈希表，线程通过`ThreadLocal`实例调用`get()`和`set()`方法时，首先获取该线程的成员变量`ThreadLocalMap`，将实例本身作为`key`，线程数据作为`value`进行查找或者设置。

##### ThreadLocal的内存泄漏问题

虽然`ThreadLocal`可以有效地实现线程隔离，但是它也存在一定的内存泄漏风险。这主要是因为`ThreadLocalMap`中的键是弱引用类型的`ThreadLocal`对象。当`ThreadLocal`对象不再被强引用时，它会被垃圾回收器回收，但是对应的键值对仍然保留在`ThreadLocalMap`中。如果线程长时间运行且没有调用`remove()`方法清理资源，那么这些无用的键值对会占用内存空间，从而导致内存泄漏。

为了避免这个问题，我们可以采取以下措施：

1. 在使用完`ThreadLocal`后，及时调用`remove()`方法清理资源。
2. 使用静态内部类来持有`ThreadLocal`对象，以确保它不会被提前回收。
3. 尽量避免在长时间运行的线程中使用`ThreadLocal`。
4. 使用Java 8引入的`InheritableThreadLocal`来替代`ThreadLocal`，它可以在子线程中自动继承父线程的线程局部变量值，从而避免在创建新线程时重复设置值的问题。但是同样需要注意及时清理资源以避免内存泄漏。

#### 对象内存布局

在`HotSpot`虚拟机里，对象在堆内存中的存储布局可以划分为三个部分：对象头`Header`、实例数据`Instance Data`、对齐填充`Padding`

```xml
----对象头
	----对象标记（Mark Word）
	----类元信息（类型指针） 
	----数组长度（数组类型才有）
----实例数据
----对齐填充
```

- **对象头**：16个字节（对象标记和类型指针各自8字节）类型指针指向该对象**元数据**的首地址
  - 对象标记：默认存储对象的`HashCode`（`31bits`）、分代年龄（`4bits`）和锁标志位（`2bits`）等，根据对象状态复用这段固定存储空间

- **实例数据**：类的属性数据信息，包括父类属性

- **对齐填充**：虚拟机要求对象起始地址必须是8字节的整数倍。

#### Synchronized与锁升级

**无锁**

初始状态，一个对象被实例化后，如果还没有被任何线程竞争锁，那么它就为无锁状态。下面是一个对象的`Mark Word`

| 锁状态 |  25位  |          31位          |  1位   |   4bit   | 1bit偏向锁位 | 2bit锁标志位 |
| :----: | :----: | :--------------------: | :----: | :------: | :----------: | :----------: |
|  无锁  | unused | hashCode（如果有调用） | unused | 分代年龄 |      0       |      01      |

**偏向锁**

| 锁状态 | 54位                    | 2位   | 1位    | 4bit     | 1bit偏向锁位 | 2bit锁标志 |
| ------ | ----------------------- | ----- | ------ | -------- | ------------ | ---------- |
| 偏向锁 | 当前线程指针JavaThread* | Epoch | unused | 分代年龄 | 1            | 01         |

在实际应用运行过程中发现，“锁总是同一个线程持有，很少发生竞争”，也就是说**锁总是被第一个占用它的线程拥有，这个线程就是锁的偏向线程**。一个`synchronized`方法被一个线程抢到了锁时，这个方法所在的对象就会在其所在`Mark Word`中将偏向锁修改状态位，同时占用前54位用来存储线程指针作为标识。当该线程再次访问同一个`synchronized`方法时，检查对象头是否存放指向自身的`ID`，无需进入`Monitor`去竞争对象。

- 检查相等，就不需要再次尝试获取锁，直到产生竞争才释放锁。如果自始至终使用锁的线程只有一个，偏向锁几乎没有额外开销，性能极高。
- 检查不等，线程之间产生竞争，尝试CAS来替换对象头的`Mark Word`中的线程`ID`。
- 竞争成功，锁不会升级，仍然为偏向锁。
- 竞争失败，锁升级为轻量级锁，才能保证线程间公平竞争锁。

注意：偏向锁只有遇到其他线程尝试竞争偏向锁时，持有偏向锁的线程才会释放锁，线程是不会主动释放锁的。

**偏向锁的撤销（竞争失败）** [P130](https://www.bilibili.com/video/BV1ar4y1x727?p=130&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

偏向锁使用一种等到竞争出现才释放锁的机制，只有当其他线程竞争锁时，持有偏向锁的线程才会被撤销。

- 第一个线程正在执行`synchronized`方法，还未执行完，偏向锁被撤销，升级为轻量级锁继续被当前线程持有，其他线程继续保持自旋等待获取轻量级锁
- 第一个线程执行完成`synchronized`方法，对象头设置为无锁状态并撤销偏向锁，重新偏向。

> java15逐渐放弃了偏向锁

**轻量级锁**

| 锁状态                 | 62位                          | 2bit标志位 |
| ---------------------- | ----------------------------- | ---------- |
| 轻量级锁，自旋锁、无锁 | 指向线程栈中Lock Record的指针 | 00         |

主要作用：有线程来参与锁的竞争，但是获取锁的冲突时间极短。本质就是自旋锁CAS

加锁和释放太复杂了，看不明白

**自旋达到一定次数和程度进行升级：**

- java6之前，默认启用，默认情况下是自旋达到10次或者自旋线程数超过CPU核数一半
- java6之后，自适应自旋锁：自旋成功，下次自旋最大次数增加（JVM认为还会成功）;自旋失败，减少自旋次数甚至不自旋，避免CPU空转

偏向锁核轻量级锁的区别：

- 竞争失败：偏向锁升级为轻量级锁，线程自旋继续抢占锁；
- 释放锁：偏向锁不会释放锁，直到发生竞争；轻量级锁每次退出同步块都释放锁；

**重量级锁**

| 锁状态   | 62位                         | 2bit锁标志位 |
| -------- | ---------------------------- | ------------ |
| 重量级锁 | 指向互斥量（重量级锁）的指针 | 10           |

Java中`synchronized`的重量级锁，是基于进入和退出`Monitor`对象实现的。在编译时会将同步块的开始位置插入`monitor enter`指令，在结束位置插入`monitor exit`指令。

当线程执行到`monitor enter`指令时，会尝试获取对象所对应的`Monitor`所有权，如果获取到了，即获取到了锁。会在`Monitor`的`owner`中存放当前线程的`id`，这样它将处于锁定状态，除非退出同步块，否则其他线程无法获取到这个`Monitor`。

？？锁升级为轻量级锁或重量级锁后，`Mark Word`中保存的分别是**线程栈帧里的锁记录指针**和**重量级锁指针**，已经没有位置再保存`hashCode、GC`年龄，那么这些信息移动到哪里了？？

- 无锁状态下，`Mark Word`中可以存储对象的`identity hash code`，当对象的`hashCode()`方法第一次被调用时，JVM会生成对应的`identity hash code`值并将该值存储到`Mark Word`中了。
- 偏向锁，在线程获取偏向锁时，会用`Thread ID`和`epoch`值覆盖`identity hash code`所在位置。如果一个对象的`hashCode()`方法已经被调用过一次之后，这个对象不能被设置为偏向锁。----->解释一下，覆盖了的话再次调用`hashCode()`时是被覆盖的那个值了，前后两次不一样。
- 升级为轻量级锁，JVM会在当前线程的栈帧中创建一个锁记录`Lock Record`空间，用于存储锁对象的`Mark Word`拷贝，该拷贝中可以包含`identity hash code`，所以轻量级锁可以和`identity hash code`共存，还保存了`GC`年龄，释放锁后将这些信息写回对象头。

|    锁    |                             优点                             |                      缺点                      |                          适用场景                          |
| :------: | :----------------------------------------------------------: | :--------------------------------------------: | :--------------------------------------------------------: |
|  偏向锁  | 加锁和解锁不需要额外的消耗，和执行非同步方法相比仅存在纳秒级的差距 | 如果线程间存在锁竞争，会带来额外的锁撤销的消耗 |              适用于只有一个线程访问同步块场景              |
| 轻量级锁 |           竞争的线程不会阻塞，提高了程序的响应速度           |   始终得不到锁竞争的线程，会使用自旋消耗CPU    | 适用于竞争不激烈的情况，追求响应时间，同步块执行速度非常快 |
| 重量级锁 |                线程竞争不适用自旋，不消耗CPU                 |             线程阻塞，响应时间缓慢             |               追求吞吐量，同步块执行速度较长               |

**JIT （Just in Time Compile）**即时编译器，两个比较easy的问题。

锁消除：JVM 通过逃逸分析进行优化的一种技术，旨在去掉不必要的同步锁操作，从而提升程序的性能。举个例子：试图锁同一个对象但是传递的同步监视器每次都是新new出来的一个对象，那么锁都是不同的，因此会发生锁消除。

锁粗化： JVM 在进行即时编译（JIT）优化时，通过扩大锁的范围来减少锁的获取和释放次数，从而提升程序性能的一种技术。通过合理应用锁粗化，可以减少锁的开销，提高程序的执行效率。

---

#### AbstractQueuedSynchronizer之AQS（抽象队列同步器）

是用来实现锁或者其它同步器组件的公共基础部分的抽象实现，
是重量级基础框架及整个JUC体系的基石，主要用于解决锁分配给"谁"的问题

整体就是一个抽象的FIFO队列来完成资源获取线程的排队工作，并通过一个int类变量表示持有锁的状态

如果共享资源被占用，就需要一定的阻塞等待唤醒机制来保证锁分配。这个机制主要用的是CLH队列的变体实现的，将暂时获取不到锁的线程加入到队列中，这个队列就是AQS同步队列的抽象表现。它将要请求共享资源的线程及自身的等待状态封装成队列的结点对象(Node)，通过CAS、自旋以及`LockSupport.park()`的方式，维护state变量的状态，使并发达到同步的效果。

公平锁：先来先到，线程在获取锁时，如果这个锁的等待队列中已经有线程在等待，那么当前线程就会进入等待队列中;

非公平锁：不管是否有等待队列，如果可以获取锁，则立刻占有锁对象。也就是说队列的第一个排队线程苏醒后，不一定就是排头的这个线程获得锁，它还是需要参加竞争锁（存在线程竞争的情况下)，后来的线程可能不讲武德插队夺锁了。

本节以`ReentrantLock`类为例讲解：看`UML`图以及源码进行理解，[AQS源码总结](https://www.bilibili.com/video/BV1ar4y1x727?p=153&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

[其他讲解](https://segmentfault.com/a/1190000044279394)

#### ReentrantReadWriteLock（读写锁）

**一体两面，读写互斥，读读共享，读没有完成时候其他线程写锁无法获得**

它只允许读读共存，而读写和写写依然是互斥的，大多实际场景是“读/读”线程间并不存在互斥关系，只有“读/写”线程或“写/写”线程间的操作需要互斥。因此引入`ReentrantReadWriteLock`。

一个`ReentrantReadWriteLock`同时只能存在一个写锁但是可以存在多个读锁，但不能同时存在写锁和读锁。也即一个资源可以被多个读操作访问或者一个写操作访问，但两者不能同时进行。

只有在读多写少情境下，读写锁才能具有较高的性能体现。

**锁降级**

同一个线程持有了写锁，在没有释放写锁的情况下，继续获得读锁。写锁降级为读锁；

如果释放了写锁，那么完全转换为读锁。

> 读没有完成的时候，无法获得写锁，不能升级

**锁饥饿**

- **写锁饥饿**：如果读操作频繁并且持续占用读锁，写操作可能长期无法获得写锁，从而导致写锁饥饿。因为读锁是共享的，多个读线程可以同时持有读锁，但写锁是独占的，需要等待所有的读锁释放才能获得。
- **读锁饥饿**：在某些实现中，如果写操作频繁并且持续占用写锁，读操作可能长期无法获得读锁，从而导致读锁饥饿。尽管这在实际中较少见，但可能会发生在高写操作场景下。

#### StampedLock锁  

[其他讲解](https://cloud.tencent.com/developer/article/2400384)

