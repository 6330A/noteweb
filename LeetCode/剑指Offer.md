# 剑指Offer

---

#### [JZ22 链表中倒数最后k个结点](https://www.nowcoder.com/practice/886370fe658f41b498d40fb34ae76ff9?tpId=13&tqId=1377477&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    private int idx;
    public ListNode FindKthToTail (ListNode pHead, int k) {
        if (pHead == null) {
            return null;
        }
        // 这里的newHead继承前一个递归的返回值，上面的几层结果是一样的
        ListNode newHead = FindKthToTail(pHead.next, k);
        if (++idx == k) {
            return pHead;
        }
        return newHead;
    }
}
```

#### [JZ76 删除链表中重复的结点](https://www.nowcoder.com/practice/fc533c45b73a41b0b44ccba763f866ef?tpId=13&tqId=23450&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public ListNode deleteDuplication(ListNode pHead) {
        int flag = 0;
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (pHead != null) {
            ListNode cur = pHead;
            pHead = pHead.next;
            // 当当前节点后面没有或者与后面不等时，考虑是否加入
            // flag判断是否时第一次遇见
            if (pHead == null || cur.val != pHead.val) {
                if (flag == 0) {
                    tail = tail.next = cur;
                }
                flag = 0;
            } else {
                flag = 1;
            }
        }
        tail.next = null;

        return dummy.next;
    }
}
```

#### [JZ54 二叉搜索树的第k个节点](https://www.nowcoder.com/practice/57aa0bab91884a10b5136ca2c087f8ff?tpId=13&tqId=2305268&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    private int ans = -1;
    private int cnt = 0;
    public int KthNode (TreeNode root, int k) {
        // 中序遍历，根据ans的值判断是否早停
        if (root != null) {
            KthNode(root.left, k);
            if (++cnt == k) {
                ans = root.val;
            }
            if (ans == -1) {
                KthNode(root.right, k);
            }
        }
        return ans;
    }
}
```

#### [JZ33 二叉搜索树的后序遍历序列](https://www.nowcoder.com/practice/a861533d45854474ac791d90e447bafd?tpId=13&tqId=23289&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
// 解法一：递归划分一个子树再验证另一棵子树
public class Solution {
    public boolean VerifySquenceOfBST(int [] sequence) {
        if (sequence.length == 0) {
            return false;
        }
        return verify(sequence, 0, sequence.length - 1);
    }
    public boolean verify(int[] sequence, int l, int r) {
        // 少于两个节点返回true
        if (r - l < 2) {
            return true;
        }
        // 根节点划分区间，先划出左子树，再验证右子树
        int idx = l;
        while (idx < r && sequence[idx] < sequence[r]) {
            idx++;
        }
        for (int i = idx + 1; i < r; i++) {
            if (sequence[i] < sequence[r]) {
                return false;
            }
        }

        // 验证左子树和右子树，根节点[r]不再需要
        return verify(sequence, l, idx - 1) && verify(sequence, idx, r - 1);
    }
}
```

#### [JZ36 二叉搜索树与双向链表](https://www.nowcoder.com/practice/947f6eb80d944a84850b0538bf0ec3a5?tpId=13&tqId=23253&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    private TreeNode head;
    private TreeNode pre;
    public TreeNode Convert(TreeNode root) {
        // 中序遍历建立左孩子的过程中，树结构改变了，比如10的左孩子指向了8
        if (root == null) {
            return null;
        }
        Convert(root.left);
        if (pre == null) {
            // pre为空，遇到双向链表第一个节点，只是记录即可
            head = root;
        } else {
            // 前置节点和当前节点之间建立双向连接
            pre.right = root;
            root.left = pre;
        }
        pre = root;
        Convert(root.right);

        return head;
    }
}
```

#### [JZ8 二叉树的下一个结点](https://www.nowcoder.com/practice/9023a0c988684a53960365b889ceaf5e?tpId=13&tqId=23451&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

 ```java
public class Solution {
    public TreeLinkNode GetNext(TreeLinkNode pNode) {
        // 找到pNode的下一个节点，不确定pNode在树中的位置
        // 情况一：有右子树，右子树按照中序第一个元素就是ans
        // 情况二：无右子树，往左上角爬到父节点，然后父节点的下一个节点就是ans
        TreeLinkNode cur = pNode;
        if (cur.right != null) {
            cur = cur.right;
            while (cur.left != null) {
                cur = cur.left;
            }
        } else {
            while (cur.next != null && cur.next.right == cur) {
                cur = cur.next;
            }
            cur = cur.next;
        }

        return cur;
    }
}
 ```

#### [JZ26 树的子结构](https://www.nowcoder.com/practice/6e196c44c7004d15b1610b9afca8bd88?tpId=13&tqId=23293&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    // 解法一：递归，（当前根节点开始比较 || 左节点开始比较 || 右节点开始比较）
    // 看题目条件空树不是任意树的子结构
    public boolean HasSubtree(TreeNode root1, TreeNode root2) {
        if (root1 == null || root2 == null) {
            return false;
        }

        return verifyRoot(root1, root2) || HasSubtree(root1.left, root2) || HasSubtree(root1.right, root2);
    }

    public boolean verifyRoot(TreeNode root1, TreeNode root2) {
        // root2为空直接true
        // root1空，root2不空false
        // 都不空，比较val
        if (root2 == null) {
            return true;
        } else if (root1 == null) {
            return false;
        } else if (root1.val != root2.val) {
            return false;
        }

        return verifyRoot(root1.left, root2.left) && verifyRoot(root1.right, root2.right);
    }
}
```

#### [JZ31 栈的压入、弹出序列](https://www.nowcoder.com/practice/d77d11405cc7470d82554cb392585106?tpId=13&tqId=23290&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public boolean IsPopOrder (int[] pushV, int[] popV) {
        // 需要一个栈和一个指针，前者模拟入栈，后者在每次入栈后循环出栈
        Deque<Integer> stk = new ArrayDeque<>();
        int i = 0;
        for (int x : pushV) {
            stk.push(x);
            while (!stk.isEmpty() && stk.peek() == popV[i]) {
                stk.pop();
                i++;
            }
        }

        return stk.isEmpty();
    }
}
```

#### [JZ73 翻转单词序列](https://www.nowcoder.com/practice/3194a4f4cf814f63919d0790578d51f3?tpId=13&tqId=23287&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public String ReverseSentence(String str) {
        StringBuilder stringBuilder = new StringBuilder();
        // 从后往前使用stringBuilder接收字符串
        for (int i = str.length() - 1, j = 0; i >= 0; i--) {
            char ch = str.charAt(i);
            if (ch != ' ' && (i + 1 == str.length() || str.charAt(i + 1) == ' ')) {
                j = i;
            }
            if (ch != ' ' && (i == 0 || str.charAt(i - 1) == ' ')) {
                stringBuilder.append(str.substring(i, j + 1) + " ");
            }
        }
        // 如果添加过单词，删除末尾的空格
        if (stringBuilder.length() != 0) {
            stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        }

        return stringBuilder.toString();
    }
}
```

#### [JZ11 旋转数组的最小数字](https://www.nowcoder.com/practice/9f3231a991af4f55b95579b44b7a01ba?tpId=13&tqId=23269&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
// 有重复和LeetCode不一样
public class Solution {
    public int minNumberInRotateArray (int[] nums) {
        int l = 0, r = nums.length - 1, mid;
        if (nums[0] < nums[r]) return nums[0];
        while (l < r) {
            mid = l + r >> 1;
            if (nums[mid] > nums[r]) {
                l = mid + 1;
            } else if (nums[mid] < nums[r]) {
                r = mid;
            } else {
                // 牛客这题存在重复值，对于相等情况一个一个试
                r--;
            }
        }
        return nums[l];
    }
}
```

#### [JZ38 字符串的排列](https://www.nowcoder.com/practice/fe6b651b66ae47d7acce78ffdd9a96c7?tpId=13&tqId=23291&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    private ArrayList<String> ans = new ArrayList<>();
    public ArrayList<String> Permutation (String str) {
        char[] arr = str.toCharArray();
        Arrays.sort(arr);
        // 回溯全排列，flag，同层去重(排序)，长度固定，depth
        // 去重是核心，如果当前深度发现前面存在没有使用过的相同字符，表示这个字符在当前深度重复了
        dfs(arr, new char[str.length()], new boolean[str.length()], 0);
        return ans;
    }

    public void dfs(char[] arr, char[] res, boolean[] flag, int depth) {
        if (depth == arr.length) {
            ans.add(new String(res));
            return ;
        }
        for (int i = 0; i < arr.length; i++) {
            // 这里最后应该是!flag，但是第一次提交不取反也是对的，不知道是不是用例问题
            if (flag[i] || (i > 0 && arr[i] == arr[i - 1] && !flag[i - 1])) continue;
            flag[i] = true;
            res[depth] = arr[i];
            dfs(arr, res, flag, depth + 1);
            flag[i] = false;
        }
    }
}
```

#### [JZ71 跳台阶扩展问题](https://www.nowcoder.com/practice/22243d016f6b47f2a6928b4313c85387?tpId=13&tqId=23262&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public int jumpFloorII (int number) {
        // f(n) = f(n - 1) + ... + f(1) + f(0)
        // f(0) = 1
        // f(1) = f(0) = 1
        // f(2) = f(1) + f(0) = 1 + 1
        // f(3) = f(2) + f(1) + f(0) = 2 + 1 + 1

        return 1 << number - 1;
    }
}
```

#### [JZ48 最长不含重复字符的子字符串](https://www.nowcoder.com/practice/48d2ff79b8564c40a50fa79f9d5fa9c7?tpId=13&tqId=2276769&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
// 与LeetCode相同题目，这里解法稍作改动
public class Solution {
    public int lengthOfLongestSubstring (String s) {
        // 数组代替哈希表,窗口内字符不重复即可
        int ans = 0;
        boolean[] ch = new boolean[128];
        for (int i = 0, j = 0; j < s.length(); j++) {
            // 如果当前字符已经被使用过，则一直收缩左边界
            while (ch[s.charAt(j)]) {
                ch[s.charAt(i++)] = false;
            }

            ch[s.charAt(j)] = true;
            ans = Math.max(ans, j - i + 1);
        }
        return ans;
    }
}
```

#### [JZ12 矩阵中的路径](https://www.nowcoder.com/practice/2a49359695a544b8939c77358d29b7e6?tpId=13&tqId=1517966&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
class Solution {
  public:
    bool dfs(vector<vector<char> >& matrix, string& word, int x, int y, int depth) {
        if (x < 0 || x >= matrix.size() || y < 0 || y >= matrix[0].size() 
                  || depth > word.size() || matrix[x][y] != word[depth - 1]) {
            return false;
        }
        if (depth == word.size()) {
            return true;
        }
        char temp = matrix[x][y];
        matrix[x][y] = '#';

        bool res = dfs(matrix, word, x - 1, y, depth + 1) ||
                   dfs(matrix, word, x + 1, y, depth + 1) ||
                   dfs(matrix, word, x, y - 1, depth + 1) ||
                   dfs(matrix, word, x, y + 1, depth + 1);

        matrix[x][y] = temp;

        return res;
    }

    bool hasPath(vector<vector<char> >& matrix, string word) {
        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (matrix[i][j] == word[0]) {
                    if (dfs(matrix, word, i, j, 1)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
};
```

#### [JZ41 数据流中的中位数](https://www.nowcoder.com/practice/9be0172896bd43948f8a32fb954e1be1?tpId=13&tqId=23457&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    private PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b)->b - a);
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    public void Insert(Integer num) {
        maxHeap.offer(num);                  // 先如左边大顶堆
        minHeap.offer(maxHeap.poll());       // 大顶堆的最大值换到右边小顶堆
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());   // 如果大顶堆个数小于小顶堆，再移一个回来
        }
    }
    public Double GetMedian() {
        Double ans = 0.0;
        if (maxHeap.size() > minHeap.size()) {
            ans = (double)maxHeap.peek();
        } else {
            ans = (double)(maxHeap.peek() + minHeap.peek()) / 2;
        }

        return ans;
    }
}
```

#### [JZ65 不用加减乘除做加法](https://www.nowcoder.com/practice/59ac416b4b944300b617d4f7f111b215?tpId=13&tqId=23249&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public int Add(int num1, int num2) {
        while (num2 != 0) {
            int temp = num1;
            num1 = temp ^ num2;
            num2 = temp & num2;
            num2 <<= 1;
        }
        return num1;
    }
}
```

#### [JZ 15二进制中1的个数](https://www.nowcoder.com/practice/8ee967e43c2c4ec193b040ea7fbb10b8?tpId=13&tqId=23273&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
// 剑指offer中有消去最后一个0的方法
public class Solution {
    public int NumberOf1(int n) {
        int cnt = 0;
        while (n != 0) {
            n &= n - 1;
            cnt++;
        }
        return cnt;
    }
}
```

#### [JZ61 扑克牌顺子](https://www.nowcoder.com/practice/762836f4d43d43ca9deb273b3de8e1f4?tpId=13&tqId=23252&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
// 可以用哈希查看是否重复，这里用bitmap位运算代替哈希
public class Solution {
    public boolean IsContinuous(int[] numbers) {
        int min = 14;
        int max = -1;
        int bitmap = 0;
        for (int num : numbers) {
            if (num == 0) continue;     // 等于0的跳过
            min = Math.min(min, num);   // 更新最大最小
            max = Math.max(max, num);
            if (max - min > 4 || (bitmap & (1 << num)) != 0) {
                return false;
            }
            bitmap ^= (1 << num);
        }
        return true;
    }
}
```

#### [JZ50 第一个只出现一次的字符](https://www.nowcoder.com/practice/1c82e8cf713b4bbeb2a5b31cf5b0417c?tpId=13&tqId=23258&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public int FirstNotRepeatingChar (String str) {
        // 方法一：二次遍历，第一次记录哈希表，第二次查哈希表
        // 方法二：队列+哈希思想，数组代替哈希表，指针ans代替队列头部
        int ans = 0;
        int[] map = new int[128];
        for (int i = 0; i < str.length(); i++) {
            map[str.charAt(i)]++;
            // 每次遍历一个新的字符会更新哈希表，所以可以持续弹出队首
            while (ans < str.length() && map[str.charAt(ans)] > 1) {
                ans++;
            }
        }

        // 如果所有元素出队，证明没有满足条件的字符 -1
        return ans == str.length() ? -1 : ans;
    }
}
```

#### [JZ56 数组中只出现一次的两个数字](https://www.nowcoder.com/practice/389fc1c3d3be4479a154f63f495abff8?tpId=13&tqId=1375231&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
public class Solution {
    public int[] FindNumsAppearOnce (int[] nums) {
        // 关键是将nums划分为两组，每组只包含一个结果
        // 找到x, y任意一个不同的二进制位即可
        // 第一遍求 x^y, 找到最低位为1的mask
        // 用mask划分nums

        int x = 0, y = 0;
        int mask = 1, temp = 0;
        for (int num : nums) {
            temp ^= num;
        }
        while ((temp & mask) == 0) {
            mask <<= 1;
        }
        for (int num : nums) {
            if ((num & mask) == 0) {
                x ^= num;
            } else {
                y ^= num;
            }
        }
        if (x < y) {
            return new int[] {x, y};
        } else {
            return new int[] {y, x};
        }
    }
}
```

#### [JZ14 剪绳子](https://www.nowcoder.com/practice/57d85990ba5b440ab888fc72b0751bf8?tpId=13&tqId=587690&ru=/exam/oj/ta&qru=/ta/coding-interviews/question-ranking&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D13%26type%3D13)

```java
// 解法一：动态规划
public class Solution {
    public int cutRope (int n) {
        int ans, res1, res2;
        int[] dp = new int[n + 1];
        dp[2] = 1;
        // 考虑 n -> [2, 60],只需要下标2赋值即可，下面循环从3开始，因此赋值和循环都不会越界
        // 内层不优化是一个for循环，遍历前面所有结果dp[i] = Math.max(dp[i], j * Math.max(dp[i - j], i - j))
        // 优化后，只剪2或者3，每种情况又分两种情况，max(只剪2段，乘上已知最大)
        for (int i = 3; i <= n; i++) {
            res1 = 2 * Math.max(dp[i - 2], i - 2);
            res2 = 3 * Math.max(dp[i - 3], i - 3);
            dp[i] = Math.max(res1, res2);
        }
        return dp[n];
    }
}


// 解法二：数学公式，n为2，3对应1，2；其他情况尽可能划分出3，余数为1的话拿出一个3凑成4
public class Solution {
    public int cutRope (int n) {
        // 条件2 <= n <= 60;
        if (n < 4) {
            return n - 1;
        }
        int ans;
        int exponent = n / 3;
        int remainder = n % 3;
        if (remainder == 0) {
            ans = (int) Math.pow(3, exponent);             // 注意公式返回double需要类型转换
        } else if (remainder == 1) {
            ans = (int) Math.pow(3, exponent - 1) * 4;
        } else {
            ans = (int) Math.pow(3, exponent) * 2;
        }

        return ans;
    }
}
```

