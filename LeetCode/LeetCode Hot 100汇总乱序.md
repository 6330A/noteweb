# LeetCode Hot 100

---

#### [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)

```java
// 哨兵节点，然后三个指针 pre node1 node2
class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode pre = dummy, node1, node2;

        while (pre.next != null && pre.next.next != null) {
            node1 = pre.next;
            node2 = node1.next;

            node1.next = node2.next;
            node2.next = node1;
            pre.next = node2;
            pre = pre.next.next;
        }
        return dummy.next;
    }
}
```

#### [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)

```java
// 0开始一直遍历异或
class Solution {
    public int singleNumber(int[] nums) {
        int ans = 0;
        for (int num : nums) {
            ans ^= num;
        }
        return ans;
    }
}
```

#### [39. 组合总和](https://leetcode.cn/problems/combination-sum/)

```java
// 看题目条件都是比较小的正数，超出范围即可return
// 本题允许重复，下一层的start从i开始
class Solution {
    private List<List<Integer>> ans = new ArrayList<>();

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        traceBack(candidates, target, 0, 0, new ArrayList<Integer>());
        return ans;
    }

    public void traceBack(int[] candidates, int target, int start, int curSum, List<Integer> path) {
        if (curSum == target) {
            ans.add(new ArrayList<Integer>(path));
            return;
        } else if (curSum > target) {
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            // curSum += candidates[i]; 这里可以简化，往下传递的加上即可
            path.add(candidates[i]);
            traceBack(candidates, target, i, curSum + candidates[i], path);
            // curSum -= candidates[i];
            path.remove(path.size() - 1);
        }
    }
}
```

#### [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)

```java
// 哈希，前缀和，深度优先，最后返回父节点回溯
// 注意超出范围，和的部分需要Long，数字后面加L
class Solution {
    private int ans;
    private Map<Long, Integer> map = new HashMap<>();

    public int pathSum(TreeNode root, int targetSum) {
        map.put(0L, 1);
        dfs(root, targetSum, 0L);
        return ans;
    }

    public void dfs(TreeNode root, int targetSum, long curSum) {
        if (root == null) {
            return;
        }
        curSum += root.val;
        ans += map.getOrDefault(curSum - targetSum, 0);
        map.put(curSum, map.getOrDefault(curSum, 0) + 1);

        dfs(root.left, targetSum, curSum);
        dfs(root.right, targetSum, curSum);

        // 返回父节点需要回溯
        if (map.put(curSum, map.get(curSum) - 1) == 1) {
            map.remove(curSum);
        }
    }
}
```

#### [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

```java
// 上下左右四个边界，每条边遍历完查看退出while循环
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int up = 0;
        int down = matrix.length - 1;
        int left = 0;
        int right = matrix[0].length - 1;
        List<Integer> ans = new ArrayList<>();

        while (true) {
            for (int i = left; i <= right; i++) {
                ans.add(matrix[up][i]);
            }
            if (++up > down) {
                break;
            }

            for (int i = up; i <= down; i++) {
                ans.add(matrix[i][right]);
            }
            if (--right < left) {
                break;
            }

            for (int i = right; i >= left; i--) {
                ans.add(matrix[down][i]);
            }
            if (--down < up) {
                break;
            }

            for (int i = down; i >= up; i--) {
                ans.add(matrix[i][left]);
            }
            if (++left > right) {
                break;
            }
        }

        return ans;
    }
}
```

#### [230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)

```java
// 二叉搜索树中序遍历到第k个节点即可，这里用递归全部遍历了，最佳解还是用栈循环迭代
class Solution {
    private int cnt;
    private int ans;

    public int kthSmallest(TreeNode root, int k) {
        inOrder(root, k);
        return ans;
    }

    public void inOrder(TreeNode root, int k) {
        if (root == null) {
            return;
        }
        inOrder(root.left, k);
        if (++cnt == k) {
            ans = root.val;
        }
        inOrder(root.right, k);
    }
}
```

#### [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else if (stack.isEmpty()) {
                return false;
            } else if (ch == ')' && stack.pop() != '(') {
                return false;
            } else if (ch == '}' && stack.pop() != '{') {
                return false;
            } else if (ch == ']' && stack.pop() != '[') {
                return false;
            }
        }
        return stack.isEmpty();
    }
}
```

#### [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)

```java
class Solution {
    public int minPathSum(int[][] grid) {
        for (int j = 1; j < grid[0].length; j++) {
            grid[0][j] += grid[0][j - 1];
        }
        for (int i = 1; i < grid.length; i++) {
            grid[i][0] += grid[i - 1][0];
        }
        for (int i = 1; i < grid.length; i++) {
            for (int j = 1; j < grid[0].length; j++) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[grid.length - 1][grid[0].length - 1];
    }
}
```

#### [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)

```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}
```

#### [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)

```java
class Solution {
    public boolean isPalindrome(ListNode head) {
        // 方法一：数组存储后判断
        // 方法二：快慢指针，慢指针走到中间一段并且翻转前半段链表
        // ----><----变为<----<----奇数需要处理slow，newhead和slow分别指向两段起点
        ListNode slow = head, fast = head, temp = null, newhead = null;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            temp = slow.next;
            slow.next = newhead;
            newhead = slow;
            slow = temp;
        }
        // 1 2 3 3 2 1 slow和fast刚好循环3次
        // 1 2 3 2 1 slow和fast循环2次
        if (fast != null) {
            slow = slow.next;
        }
        while (slow != null) {
            if (newhead.val != slow.val) {
                return false;
            }
            slow = slow.next;
            newhead = newhead.next;
        }
        return true;
    }
}

```

#### [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) {
                return true;
            }
        }
        return false;
    }
}
```

#### [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

```java
// 前缀和注意map默认添加一个(0, 1)
class Solution {
    public int subarraySum(int[] nums, int k) {
        int ans = 0, curSum = 0;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);

        for (int num : nums) {
            curSum += num;
            ans += map.getOrDefault(curSum - k, 0);
            map.put(curSum, map.getOrDefault(curSum, 0) + 1);
        }
        return ans;
    }
}
```

#### [155. 最小栈](https://leetcode.cn/problems/min-stack/)

```java
class MinStack {
    private Deque<Integer> stk1 = new ArrayDeque<>();
    private Deque<Integer> stk2 = new ArrayDeque<>();

    public MinStack() {

    }

    public void push(int val) {
        stk1.push(val);
        if (stk2.isEmpty() || val < stk2.peek()) {
            stk2.push(val);
        } else {
            stk2.push(stk2.peek());
        }
    }

    public void pop() {
        stk1.pop();
        stk2.pop();
    }

    public int top() {
        return stk1.peek();
    }

    public int getMin() {
        return stk2.peek();
    }
}
```

#### [118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle/)

```java
// 方法一：类似二维数组，每次new一行
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ans = new ArrayList<>(numRows);
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>(i + 1);
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    row.add(ans.get(i - 1).get(j - 1) + ans.get(i - 1).get(j));
                }
            }
            ans.add(row);
        }

        return ans;
    }
}
// 方法二：后面元素由前一个元素公式递推，row[i][j] = a[i][j-1] * (i - j + 1) / j，注意int范围
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ans = new ArrayList<>(numRows);
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>(i + 1);
            row.add(1);
            for (int j = 1; j <= i; j++) {
                row.add((int) ((long) row.get(j - 1) * (i - j + 1) / j));
            }
            ans.add(row);
        }

        return ans;
    }
}
```

#### [73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)

```java
// 直接官解方法一吧，使用boolean数组，一行一列作为hash表，速度更快，两次遍历
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean[] row = new boolean[m];
        boolean[] col = new boolean[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    row[i] = col[j] = true;
                }
            }
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (row[i] || col[j]) {
                    matrix[i][j] = 0;
                }
            }
        }
    }
}
```

#### [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

```java
// 使用虚拟头节点进行头插入，官解不需要头节点也可以
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode dummy = new ListNode();

        ListNode cur = head, temp;
        while (cur != null) {
            temp = cur.next;
            cur.next = dummy.next;
            dummy.next = cur;
            cur = temp;
        }
        return dummy.next;
    }
}
```

#### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}
```

#### [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

```java
// HashMap和PriorityQueue，默认小顶堆即可，构造优先队列传入比较器
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        int[] ans = new int[k];
        Map<Integer, Integer> map = new HashMap<>();
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> map.get(a) - map.get(b));
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }
        // entrySet()
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            int num = entry.getKey(), cnt = entry.getValue();
            if (pq.size() < k) {
                pq.offer(num);
            } else if (cnt > map.get(pq.peek())) {
                pq.poll();
                pq.offer(num);
            }
        }
        for (int i = 0; i < k; i++) {
            ans[i] = pq.poll();
        }
        return ans;
    }
}

// 遍历HashMap可以使用forEach的lambda表达式
// map.forEach((key, value) -> {
//     if (pq.size() < k) {
//         pq.offer(key);
//     } else if (value > map.get(pq.peek())) {
//         pq.poll();
//         pq.offer(key);
//     }
// });
```

#### [215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

```java
// 方法一：优先队列，初始大小确定，参入参数k
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(k);
        for (int num : nums) {
            if (pq.size() < k) {
                pq.offer(num);
            } else if (num > pq.peek()) {
                pq.poll();
                pq.offer(num);
            }
        }
        return pq.peek();
    }
}

// 方法二，数组建堆，build一次就可以，不需要排序
class Solution {
    public int findKthLargest(int[] nums, int k) {
        int[] heap = new int[k];
        for (int i = 0; i < k; i++) {
            heap[i] = nums[i];
        }
        buildheap(heap, k);
        for (int i = k; i < nums.length; i++) {
            if (nums[i] > heap[0]) {
                heap[0] = nums[i];
                heapify(heap, 0, k);
            }
        }
        return heap[0];
    }

    public void heapify(int[] nums, int i, int n) {
        int smallest = i;
        int leftchild = 2 * i + 1;
        int rightchild = 2 * i + 2;

        if (leftchild < n && nums[leftchild] < nums[smallest]) {
            smallest = leftchild;
        }
        if (rightchild < n && nums[rightchild] < nums[smallest]) {
            smallest = rightchild;
        }
        if (smallest != i) {
            int temp = nums[i];
            nums[i] = nums[smallest];
            nums[smallest] = temp;
            heapify(nums, smallest, n);
        }
    }

    public void buildheap(int[] nums, int n) {
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(nums, i, n);
        }
    }
}
```

#### [543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)

```java
// 先按照计算树的高度思路写，左右子树的高度用l, r表示，遍历每个节点的时候更新ans即可
class Solution {
    private int ans;

    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return ans;
    }

    public int height(TreeNode root) {
        if (root == null) return 0;
        int l = height(root.left);
        int r = height(root.right);
        ans = Math.max(ans, l + r);
        return 1 + Math.max(l, r);
    }
}
```

#### [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)

```java
// 二分即可，考虑最后边界情况l, r重叠也是返回l即可
class Solution {
    public int searchInsert(int[] nums, int target) {
        int l = 0, r = nums.length - 1, mid;
        while (l <= r) {
            mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l;
    }
}
```

#### [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)

```java
class Solution {
    public int climbStairs(int n) {
        // 1 1 2 3
        int f1 = 1, f2 = 1, f3 = 2;
        while (n-- != 0) {
            f1 = f2;
            f2 = f3;
            f3 = f1 + f2;
        }
        return f1;
    }
}
```

#### [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

```java
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        // 下面可以三目运算符
        if (list1 != null) {
            tail.next = list1;
        } else {
            tail.next = list2;
        }
        return dummy.next;
    }
}
```

#### [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

```java
// 直接交换节点左右孩子，和官解不同
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}
```

#### [78. 子集](https://leetcode.cn/problems/subsets/)

```java
// 子集遍历了所有的路径，感觉这题还是很重要的
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
class Solution {
    private List<List<Integer>> ans = new ArrayList<>();

    public List<List<Integer>> subsets(int[] nums) {
        traceBack(nums, 0, new ArrayList<Integer>());
        return ans;
    }

    public void traceBack(int[] nums, int start, List<Integer> path) {
        ans.add(new ArrayList(path));
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            traceBack(nums, i + 1, path);
            path.remove(path.size() - 1);
        }
    }
}
```

#### [48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        int cnt = n / 2;
        for (int i = 0; i < cnt; i++) {
            for (int j = i; j < n - i - 1; j++) {
                // 将 i,j这一行的元素旋转
                int temp = matrix[i][j];
                matrix[i][j] = matrix[n - 1 - j][i];
                matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
                matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
                matrix[j][n - 1 - i] = temp;
            }
        }
    }
}
```

#### [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)

```java
// 方法一：借助队列进行迭代，每层最后一个即为ans
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) return ans;
        // 栈用Deque, 队列用Queue, 都new ArrayDeque
        Queue<TreeNode> que = new ArrayDeque<>();
        que.offer(root);
        while (!que.isEmpty()) {
            int size = que.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = que.poll();
                if (node.left != null) que.offer(node.left);
                if (node.right != null) que.offer(node.right);
                if (i == size - 1) ans.add(node.val);
            }
        }
        return ans;
    }
}

// 方法二：灵神的递归，根右左的先序遍历，根据往下的深度以及ans的当前size进行填充
class Solution {
    List<Integer> ans = new ArrayList<>();

    public List<Integer> rightSideView(TreeNode root) {
        dfs(root, 0);
        return ans;
    }

    public void dfs(TreeNode root, int depth) {
        if (root == null) return;
        if (depth == ans.size()) {
            ans.add(root.val);
        }
        dfs(root.right, depth + 1);
        dfs(root.left, depth + 1);
    }
}
```

#### [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)

```java
// 记住翻转数组的方法，---->-->翻转<--<----，然后分别翻转两段-->---->；一定记得k要取余
// 环状替换的方法需要计算最大公约数
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length);
        reverse(nums, 0, k);
        reverse(nums, k, nums.length);
    }

    public void reverse(int[] nums, int start, int end) {
        int temp;
        for (int i = start, j = end - 1; i < j; i++, j--) {
            temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
    }
}
```

#### [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

```java
// 头节点，pre指向当前节点cur前一个，cur先走n步4，然后一起走
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode pre = dummy, cur = head;
        while (n-- != 0) {
            cur = cur.next;
        }
        while (cur != null) {
            cur = cur.next;
            pre = pre.next;
        }
        pre.next = pre.next.next;
        return dummy.next;
    }
    
// 递归不写了，挺巧妙
```

#### [62. 不同路径](https://leetcode.cn/problems/unique-paths/)

```java
// 方法一：二维数组动态规划，可以数学方法优化
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] matrix = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == 0) {
                    matrix[i][j] = 1;
                } else {
                    matrix[i][j] = matrix[i - 1][j] + matrix[i][j - 1];
                }
            }
        }
        return matrix[m - 1][n - 1];
    }
}

// 方法二：官解优化
class Solution {
    public int uniquePaths(int m, int n) {
        long ans = 1;
        for (int x = n, y = 1; y < m; ++x, ++y) {
            ans = ans * x / y;
        }
        return (int) ans;
    }
}
```

#### [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

```java
// 借助队列，BFS
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if (root == null) return ans;

        Queue<TreeNode> que = new ArrayDeque<>();
        que.offer(root);
        while (!que.isEmpty()) {
            int size = que.size();
            List<Integer> layer = new ArrayList<>(size);
            for (int i = 0; i < size; i++) {
                TreeNode node = que.poll();
                layer.add(node.val);
                if (node.left != null) que.offer(node.left);
                if (node.right != null) que.offer(node.right);
            }
            ans.add(layer);
        }
        return ans;
    }
}
```

#### [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

```java
// 滑动窗口，l和r开始都从左开始，r往右遍历，如果窗口存在当前字符，l缩小窗口
// map记录了每个字符的下标，两个关键步骤分别是:更新l的值以及.put进行覆盖
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int ans = 0;
        HashMap<Character, Integer> map = new HashMap<>();

        for (int l = 0, r = 0; r < s.length(); r++) {
            char cur = s.charAt(r);
            if (map.containsKey(cur)) {
                // 这里需要取较大值，示例abba，不在窗口中的cur不算数
                l = Math.max(l, map.get(cur) + 1);
            }
            map.put(cur, r);
            ans = Math.max(ans, r - l + 1);
        }
        return ans;
    }
}
```

#### [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode A = headA;
        ListNode B = headB;
        while (A != B) {
            A = A == null ? headB : A.next;
            B = B == null ? headA : B.next;
        }
        return A;
    }
}
```

#### [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)

```java
class Solution {
    public int rob(int[] nums) {
        //      1 2 3 1
        //  偷  1 2 4 3
        //不偷  0 1 2 4
        int steal = 0, notsteal = 0, temp;
        for(int num : nums){
            temp = steal;
            steal = notsteal + num;                 // 选择偷，之前不偷的最大值加上这次偷
            notsteal = Math.max(temp, notsteal);    // 选择不偷，之前偷与不偷的最大值
        }
        return Math.max(steal, notsteal);
    }
}
```

#### [46. 全排列](https://leetcode.cn/problems/permutations/)

```java
// 全排列的长度固定，需要flag标记
class Solution {
    private List<List<Integer>> ans = new ArrayList<>();

    public List<List<Integer>> permute(int[] nums) {
        boolean[] flag = new boolean[nums.length];
        traceBack(nums, 0, flag, new ArrayList<>(nums.length));

        return ans;
    }

    public void traceBack(int[] nums, int depth, boolean[] flag, List<Integer> temp) {
        if (depth == nums.length) {
            ans.add(new ArrayList<>(temp));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (flag[i]) continue;
            flag[i] = true;
            temp.add(nums[i]);
            traceBack(nums, depth + 1, flag, temp);
            flag[i] = false;
            temp.remove(temp.size() - 1);
        }
    }
}
```

#### [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int n = matrix[0].length;
        int i = 0, j = matrix.length * n - 1, mid;
        while (i <= j) {
            mid = (i + j) / 2;
            if (matrix[mid / n][mid % n] < target) {
                i = mid + 1;
            } else if (matrix[mid / n][mid % n] > target) {
                j = mid - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

#### [79. 单词搜索](https://leetcode.cn/problems/word-search/)

```java
// 回溯即可，需要深度，最好有返回值剪枝终止
// 考虑仅包含英文字母，为了省去flag的空间，直接在原数组中用空格标记，word字符串还原
class Solution {
    public boolean exist(char[][] board, String word) {
        for (int x = 0; x < board.length; x++) {
            for (int y = 0; y < board[0].length; y++) {
                if (dfs(board, word, x, y, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean dfs(char[][] board, String word, int x, int y, int depth) {
        if (depth == word.length()) {
            return true;
        }
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
            return false;
        }
        // 题目给定条件是大小写英文字符，经过的点设为空格合理
        if (board[x][y] != word.charAt(depth)) {
            return false;
        }
        // 匹配才能进入下层递归，还原可以用word对应位置字符
        board[x][y] = ' ';
        boolean res = dfs(board, word, x - 1, y, depth + 1) ||
                dfs(board, word, x + 1, y, depth + 1) ||
                dfs(board, word, x, y - 1, depth + 1) ||
                dfs(board, word, x, y + 1, depth + 1);
        board[x][y] = word.charAt(depth);
        return res;
    }
}
```

#### [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

```java
// 双端队列，单调递减，offerLast、peekLast、peekFirst、pollLast、pollFirst
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int[] ans = new int[nums.length - k + 1];
        // 双端队列记录元素下标，确保队列内元素在窗口范围k内
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < nums.length; i++) {
            // 确保双端队列的单调递减，新元素将之前比他小的元素排除
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            // 如果窗口左端越过第一个元素，队首出队，>=也行
            if (i - deque.peekFirst() == k) {
                deque.pollFirst();
            }
            // 在i满足条件后才添加入答案
            if (i >= k - 1) {
                ans[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return ans;
    }
}
```

#### [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)

```java
// 使用字符数组即可，简单的回溯，当前层l + r直接覆盖下标元素即可
class Solution {
    List<String> ans = new ArrayList<>();

    public List<String> generateParenthesis(int n) {
        dfs(n, 0, 0, new char[n * 2]);
        return ans;
    }

    public void dfs(int n, int l, int r, char[] temp) {
        if (l < r || l > n) {
            return;
        }
        if (l + r == n * 2) {
            ans.add(new String(temp));
            return;
        }
        temp[l + r] = '(';
        dfs(n, l + 1, r, temp);
        temp[l + r] = ')';
        dfs(n, l, r + 1, temp);
    }
}
```

#### [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

```java
// 可以从第一个开始，foreach语句
// 更新ans，更新min
class Solution {
    public int maxProfit(int[] prices) {
        int ans = 0;
        int min = prices[0];
        for(int cur : prices){
            ans = Math.max(ans, cur - min);
            min = Math.min(min, cur);
        }
        return ans;
    }
}
```

#### [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

```java
// 从后往前，单调栈
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] ans = new int[temperatures.length];
        // 单调栈记录下标即可，可以获取温度和计算结果
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = temperatures.length - 1; i >= 0; i--) {
            while (!stack.isEmpty() && temperatures[i] >= temperatures[stack.peek()]) {
                stack.pop();
            }
            ans[i] = stack.isEmpty() ? 0 : stack.peek() - i;
            // 由于数组默认赋值为0，所以下面这句也行
            // if(!stack.isEmpty()) ans[i] = stack.peek() - i;
            stack.push(i);
        }
        return ans;
    }
}
```

#### [238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

```java
// 左边前缀积，右边前缀积
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] ans = new int[nums.length];
        ans[0] = 1;

        int curVal = nums[0];
        for (int i = 1; i < nums.length; i++) {
            ans[i] = curVal;       // 第一遍，这里curVal已经计算好的当前结果
            curVal *= nums[i];
        }
        curVal = nums[nums.length - 1];
        for (int i = nums.length - 2; i >= 0; i--) {
            ans[i] *= curVal;     // 这里需要乘上右边的前缀积
            curVal *= nums[i];
        }

        return ans;
    }
}
```

#### [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)

```java
//所有的子串可以通过二维数组(i,j)表示
class Solution {
    public String longestPalindrome(String s) {
        int start = 0, end = 0;
        boolean[][] dp = new boolean[s.length()][s.length()];
        for (int i = 0; i < s.length(); i++) {
            dp[i][i] = true;
        }
        for (int j = 1; j < s.length(); j++) {
            for (int i = 0; i < j; i++) {
                if (s.charAt(i) == s.charAt(j)) {
                    if (j - i < 3 || dp[i + 1][j - 1]) {
                        dp[i][j] = true;
                        if (j - i > end - start) {
                            start = i;
                            end = j;
                        }
                    }
                }
            }
        }
        return s.substring(start, end + 1);
    }
}
```

####   [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

```java
// 初始可以将ans设置为第一个元素，空数组不算
// 动态规划，前缀和如果没有变为负，就继续使用，否则更新为0，确保子数组以非负数开始计数
class Solution {
    public int maxSubArray(int[] nums) {
        int ans = nums[0];
        int cursum = 0;
        for (int num : nums) {
            cursum += num;
            ans = Math.max(ans, cursum);
            cursum = Math.max(0, cursum);
        }
        return ans;
    }
}

//官解也不错：
class Solution {
    public int maxSubArray(int[] nums) {
        int pre = 0, maxAns = nums[0];
        for (int x : nums) {
            pre = Math.max(pre + x, x);
            maxAns = Math.max(maxAns, pre);
        }
        return maxAns;
    }
}
```

#### [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)

```java
// 进位carrybit，优先看灵神的吧
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        int carrybit = 0;
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (l1 != null && l2 != null) {
            int sum = l1.val + l2.val + carrybit;
            carrybit = sum / 10;
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
            l1 = l1.next;
            l2 = l2.next;
        }
        tail.next = l1 != null ? l1 : l2;
        while (tail.next != null && carrybit != 0) {
            int sum = tail.next.val + carrybit;
            carrybit = sum / 10;
            tail.next.val = (sum % 10);
            tail = tail.next;
        }
        if (carrybit != 0) {
            tail.next = new ListNode(1);
        }

        return dummy.next;
    }
}


// 灵神代码更优雅
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(); // 哨兵节点
        ListNode cur = dummy;
        int carry = 0; // 进位
        while (l1 != null || l2 != null || carry != 0) { // 有一个不是空节点，或者还有进位，就继续迭代
            if (l1 != null) carry += l1.val; // 节点值和进位加在一起
            if (l2 != null) carry += l2.val; // 节点值和进位加在一起
            cur = cur.next = new ListNode(carry % 10); // 每个节点保存一个数位
            carry /= 10; // 新的进位
            if (l1 != null) l1 = l1.next; // 下一个节点
            if (l2 != null) l2 = l2.next; // 下一个节点
        }
        return dummy.next; // 哨兵节点的下一个节点就是头节点
    }
}
```

#### [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

```java
// 直接官解，不太好想出来，根据中间值与nums[0]确定mid处于第一段还是第二段，只与nums[0]比较
// 如果在第一段，表示第一段升序，第一段从[0-mid)判断target是否在其中，缩小范围
// 如果在第二段，表示第二段升序，第二段从[mid,n)判断target是否在其中，缩小范围
class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1, mid;
        while (l <= r) {
            mid = (l + r) / 2;
            if (target == nums[mid]) {
                return mid;
            }
            if (nums[0] <= nums[mid]) {
                if (nums[0] <= target && target < nums[mid]) {
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[nums.length - 1]) {
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        return -1;
    }
}
```

#### [169. 多数元素](https://leetcode.cn/problems/majority-element/)

```java
// 还是先根据count进行判断是否更新候选者，然后判断候选者和当前num
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int vote = 0;
        for (int num : nums) {
            if (vote == 0) {
                candidate = num;
            }
            vote += candidate == num ? 1 : -1;
        }

        return candidate;
    }
}
```

#### [394. 字符串解码](https://leetcode.cn/problems/decode-string/)

```java
// 有些麻烦，栈要入队出队，数字和字符分开存放
class Solution {
    public String decodeString(String s) {
        Deque<Integer> stkNumber = new ArrayDeque<>();
        Deque<Character> stkChar = new ArrayDeque<>();

        int num = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                num = num * 10 + ch - '0';
            } else if (ch == ']') {
                // 出栈
                StringBuilder ss = new StringBuilder();
                while (stkChar.peek() != '[') {
                    ss.append(stkChar.pop());
                }
                stkChar.pop();
                int number = stkNumber.pop();
                for (int i = 0; i < number; i++) {
                    for (int j = ss.length() - 1; j >= 0; j--) {
                        stkChar.push(ss.charAt(j));
                    }
                }
            } else {
                if (ch == '[') {
                    stkNumber.push(num);
                    num = 0;
                }
                stkChar.push(ch);
            }
        }
        char[] ans = new char[stkChar.size()];
        for (int i = ans.length - 1; i >= 0; i--) {
            ans[i] = stkChar.pop();
        }

        return new String(ans);
    }
}
```

#### [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

```java
// 作者：灵茶山艾府
// 本质还是中序遍历，如果判断左边，再判断根，最后判断右边
class Solution {
    private long pre = Long.MIN_VALUE;

    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }
        if (!isValidBST(root.left) || pre >= root.val) {
            return false;
        }
        pre = root.val;
        return isValidBST(root.right);
    }
}
```

#### [49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

```java
// 哈希，以字符串排序后的新字符串作为key，往map中添加该字符串
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            char[] s = str.toCharArray();
            Arrays.sort(s);
            String key = new String(s);
            List<String> strList = map.getOrDefault(key, new ArrayList<String>());
            strList.add(str);
            map.put(key, strList);
        }
        return new ArrayList<>(map.values());
    }
}
```

#### [34. 在排序数组中查找元素的第一个和最后一位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)

```java
// 题解来自宫水三叶
// 压缩边界到某一边而不是在相等时返回
// 因此对于开区间那边，由于取不到mid,赋值为mid，还在范围内不会丢失，被开区间括号保护着
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] ans = new int[] { -1, -1 };
        if (nums.length == 0) {
            return ans;
        }
        ans[0] = findLeftIdx(nums, target);
        ans[1] = findRightIdx(nums, target);
        return ans;
    }

    public int findLeftIdx(int[] nums, int target) {
        int l = 0, r = nums.length - 1, mid;
        while (l < r) {
            mid = l + r >> 1; // mid靠近左边
            if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return nums[l] == target ? l : -1;
    }

    public int findRightIdx(int[] nums, int target) {
        int l = 0, r = nums.length - 1, mid;
        while (l < r) {
            mid = l + r + 1 >> 1; // 通过加1使得mid靠近右边
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid;
            }
        }
        return nums[l] == target ? l : -1;
    }
}
```

#### [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)

```java
// 注意题目条件是，每个子串都是回文子串，将判断是否是回文抽离出来
class Solution {
    private List<List<String>> ans = new ArrayList<>();

    public List<List<String>> partition(String s) {
        dfs(s, 0, new ArrayList<String>());
        return ans;
    }

    public void dfs(String s, int start, List<String> path) {
        if (start == s.length()) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int end = start; end < s.length(); end++) {
            // s[start, end]不是回文, continue
            if (!isABA(s, start, end)) {
                continue;
            }
            path.add(s.substring(start, end + 1));
            dfs(s, end + 1, path);
            path.remove(path.size() - 1);
        }
    }

    public boolean isABA(String s, int start, int end) {
        while (start < end) {
            if (s.charAt(start++) != s.charAt(end--)) {
                return false;
            }
        }
        return true;
    }
}
```

#### [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)

```java
class Solution {
    private List<String> ans = new ArrayList<>();
    private String[] button = new String[] { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };

    public List<String> letterCombinations(String digits) {
        if (digits.length() != 0) {
            dfs(digits, 0, new char[digits.length()]);
        }
        return ans;
    }

    public void dfs(String digits, int depth, char[] letter) {
        if (depth == digits.length()) {
            ans.add(new String(letter));
            return;
        }
        int num = digits.charAt(depth) - '0';
        String curstr = button[num];
        for (int i = 0; i < curstr.length(); i++) {
            letter[depth] = curstr.charAt(i);
            dfs(digits, depth + 1, letter);
        }
    }
}
```

#### [438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

```java
// 滑动窗口大小固定，移除左端添加右端
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        // 滑动窗口大小固定为p.length()，移除最左端，再添加最右端
        List<Integer> ans = new ArrayList<>();
        int len1 = s.length(), len2 = p.length();
        if (len1 < len2) {
            return ans;
        }
        // 两个数组记录前n个元素的字母出现次数
        int[] cnt1 = new int[26];
        int[] cnt2 = new int[26];
        for (int i = 0; i < len2; i++) {
            cnt1[s.charAt(i) - 'a']++;
            cnt2[p.charAt(i) - 'a']++;
        }
        if (Arrays.equals(cnt1, cnt2)) {
            ans.add(0);
        }
        // 移除最左端的i，末尾添加i+n
        for (int i = 0; i < len1 - len2; i++) {
            cnt1[s.charAt(i) - 'a']--;
            cnt1[s.charAt(i + len2) - 'a']++;
            if (Arrays.equals(cnt1, cnt2)) {
                ans.add(i + 1);
            }
        }
        return ans;
    }
}
```

#### [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```java
// inorder的划分比较好确定，而前序分别可以获取头尾，剩下两个计算即可
class Solution {
    private Map<Integer, Integer> mp = new HashMap<>();

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for (int i = 0; i < inorder.length; i++) {
            mp.put(inorder[i], i);
        }
        return build(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
    }

    public TreeNode build(int[] preorder, int[] inorder, int m, int n, int x, int y) {
        if (m > n)
            return null;
        TreeNode root = new TreeNode(preorder[m]);
        int idx = mp.get(preorder[m]);
        root.left = build(preorder, inorder, m + 1, m - x + idx, x, idx - 1);
        root.right = build(preorder, inorder, n + idx + 1 - y, n, idx + 1, y);
        return root;
    }
}
```

#### [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)

```java
// 展开为链表就想象成一行，更新next即可

// 方法一：定义一个链表的虚拟头节点，先序遍历
// 需要临时变量temp记录当前节点的右孩子，使得先序遍历正常进行，否则右孩子丢失
public class Solution {
    private TreeNode dummy = new TreeNode();

    public void flatten(TreeNode root) {
        if (root == null) {
            return;
        }
        TreeNode temp = root.right;

        dummy.right = root;// 此处修改了上一层的节点右指针，会导致原有的右孩子找不到，因此temp先记录，按照先序正常遍历
        dummy = root;
        flatten(root.left);
        flatten(temp);
        root.left = null;
    }
}

// 方法二： 右，左，根，因此建立的链表是从末尾向前
// 作者：一半王二，一半三毛
public class Solution {
    TreeNode tail = null;
    public void flatten(TreeNode root){
        if(root == null) return;
        flatten(root.right);
        flatten(root.left);
        root.left = null;
        root.right = tail;
        tail = root;
    }
}
```

#### [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)

```java
// 二分查找其中的最小值，如果mid的值比右边界的大，说明mid在第一段
// 如果小于有边界，由于右边开区间，可以令r = mid进行保护，最后还是移动l
class Solution {
    public int findMin(int[] nums) {
        int l = 0, r = nums.length - 1, mid;
        if (nums[0] < nums[r]) {
            return nums[0];
        }
        while (l < r) {
            mid = l + r >> 1;
            if (nums[mid] > nums[r]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return nums[l];
    }
}
```

#### [15. 三数之和](https://leetcode.cn/problems/3sum/)

```java
// 题目要求去重，因此排序比较好
// 参考灵神
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < n - 2; i++) {
            if (nums[i] + nums[i + 1] + nums[i + 2] > 0) {
                break; // 最小和大于0，这里是break结束循环
            }
            if (nums[i] + nums[n - 1] + nums[n - 2] < 0) {
                continue; // 最大和小于0，这里是当前i不满足条件，循环继续
            }
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue; // 去重
            }
            int j = i + 1, k = n - 1;
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                if (sum < 0) {
                    j++;
                } else if (sum > 0) {
                    k--;
                } else {
                    ans.add(List.of(nums[i], nums[j], nums[k]));
                    for (j++; j < k && nums[j] == nums[j - 1]; j++) {
                    }
                    for (k--; j < k && nums[k] == nums[k + 1]; k--) {
                    }
                }
            }
        }

        return ans;
    }
}
```

#### [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)

```java
// 官解：深度优先，如果是陆地ans++，然后将周围陆地全变为'0'
class Solution {
    public int numIslands(char[][] grid) {
        int ans = 0, m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    ans++;
                    dfs(grid, i, j);      //深度优先搜索进行消除这片岛屿
                }
            }
        }
        return ans;
    }

    public void dfs(char[][] grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == '0') {
            return;
        }
        grid[i][j] = '0';
        dfs(grid, i - 1, j);
        dfs(grid, i + 1, j);
        dfs(grid, i, j - 1);
        dfs(grid, i, j + 1);
    }
}

// 官解还有广度优先，思路其实差不多，借助队列进行消除
```

#### [994. 腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/)

```java
// 借助队列使用广度优先，第一次记录下腐烂的橘子位子，每次出队que.size()个橘子，下次就不再使用，后面的时间不再起作用
// 如果影响了周围的橘子腐烂，则入队，作为下次的腐烂源头
class Solution {
    private int fresh; // 代表橘子总数
    private static final int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };

    public int orangesRotting(int[][] grid) {
        int ans = 0, m = grid.length, n = grid[0].length;

        Queue<int[]> que = new ArrayDeque<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    fresh++;
                } else if (grid[i][j] == 2) {
                    que.offer(new int[] { i, j });
                }
            }
        }
        // 已经全部腐烂完，对应[[0]]、[[2]]结果为0min情况
        if (fresh == 0) {
            return 0;
        }
        while (!que.isEmpty()) {
            ans++;
            int size = que.size();
            for (int i = 0; i < size; i++) {
                int[] index = que.poll();
                for (int[] d : DIRECTIONS) {
                    int r = index[0] + d[0];
                    int c = index[1] + d[1];
                    if (0 <= r && r < m && 0 <= c && c < n && grid[r][c] == 1) {
                        fresh--;
                        grid[r][c] = 2;
                        que.offer(new int[] { r, c });
                    }
                }
            }
        }
        return fresh == 0 ? ans - 1 : -1;
    }
}
```

#### [51. N 皇后](https://leetcode.cn/problems/n-queens/)

```java
class Solution {
    List<List<String>> ans;
    int[][] matrix;
    
    public void killPath(int x, int y, int add, int n){
        matrix[x][y] -= add;
        for(int i = 0; i < n; i++){
            matrix[i][y] += add;
            matrix[x][i] += add;
        }
        for(int i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--){
            matrix[i][j] += add;
        }
        for(int i = x + 1, j = y + 1; i < n && j < n; i++, j++){
            matrix[i][j] += add;
        }
        for(int i = x - 1, j = y + 1; i >= 0 && j < n; i--, j++){
            matrix[i][j] += add;
        }
        for(int i = x + 1, j = y - 1; i < n && j >= 0; i++, j--){
            matrix[i][j] += add;
        }
    }

    public void traceBack(int depth, int n){
        if(depth == n){
            //记录结果
            List<String> res = new ArrayList<>(n);
            for(int i = 0; i < n; i++){
                char[] s = new char[n];
                for(int j = 0; j < n; j++){
                    s[j] = matrix[i][j] == 1 ? 'Q' : '.';
                }
                res.add(new String(s));
            }
            ans.add(res);
            return;
        }
        for(int i = 0; i < n; i++){
            if(matrix[depth][i] > 0) continue;
            //四个方向进行标记
            killPath(depth, i, 1, n);
            traceBack(depth+1, n);
            //四个方向标记解除
            killPath(depth, i, -1, n);
        }
    }
    
    public List<List<String>> solveNQueens(int n) {
        ans = new ArrayList();
        matrix = new int[n][n];

        traceBack(0, n);
        return ans;
    }
}
```

#### [56. 合并区间](https://leetcode.cn/problems/merge-intervals/)

```java
public class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]); // 左端点排序
        List<int[]> ans = new ArrayList<>();
        for (int[] cur : intervals) {
            int n = ans.size();
            if (n > 0 && cur[0] <= ans.get(n - 1)[1]) {
                ans.get(n - 1)[1] = Math.max(ans.get(n - 1)[1], cur[1]);  // <= 即可合并
            } else {
                ans.add(cur);                         // 无法合并
            }
        }
        return ans.toArray(new int[ans.size()][]); // list转为数组
    }
}

```

#### [75. 颜色分类](https://leetcode.cn/problems/sort-colors/) 

[参考来源](https://www.bilibili.com/video/BV1JF411x7jZ/?spm_id_from=333.788&vd_source=b9f16feb6ff7836e90c4ba95657422ea)

```java
// i, j, k分别指向0, 1, 2下一个填充位置
// 0则i,j都右移
// 1则j右移继续遍历
// 2则j继续原地再次查看
class Solution {
    public void sortColors(int[] nums) {
        int i = 0, j = 0, k = nums.length - 1;
        while (j <= k) {
            if (nums[j] == 0) swap(nums, i++, j++);
            else if (nums[j] == 2) swap(nums, j, k--);
            else j++;
        }
    }

    public void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

#### [148. 排序链表](https://leetcode.cn/problems/sort-list/)

```java
class Solution {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode slow = head, fast = head.next; // fast先走一步方便利用slow断开原有链表，后面fast就没用了
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode temp = slow.next;
        slow.next = null;
        ListNode left = sortList(head);
        ListNode right = sortList(temp);
        // 上面已经拆分为两端并递归，开始合并，这里就是两个普通的链表进行合并操作，借助头节点
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        while (left != null && right != null) {
            if (left.val < right.val) {
                tail.next = left;
                left = left.next;
            } else {
                tail.next = right;
                right = right.next;
            }
            tail = tail.next;
        }
        tail.next = left != null ? left : right;
        return dummy.next;
    }
}
```

#### [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

```java
// 看灵神，分情况
// 如果p或者q就是根直接返回根
// 否则去左子树找，然后去右子树找，这里是找到其一就有返回值，因此如果左右各在一边结果非空，返回根节点
// 只有一个有返回值
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) {    // 在左右子数中都有返回结果，说明p, q各在一边
            return root;
        }
        return left != null ? left : right;
    }
}
```

#### [322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

```java
// 改自灵神的，根据硬币更新结果，放在外层
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // 取值范围[0,amount]
        dp[0] = 0;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        return dp[amount] != amount + 1 ? dp[amount] : -1; // 如果没有变过，说明无法兑换，-1
    }
}
```

#### [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)

```java
// 下标唯一，因此下标是每个节点地址
// 存放的值是val也是下一个元素地址，因此是地址重复
// 当slow和fast指针指向同一处时，说明两个节点的val也就是下一个地址相同
// 本题必定存在环，外面死循环即可
class Solution {
    public int findDuplicate(int[] nums) {
        int slow = 0, fast = 0;  // 地址都从0开始
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) {
                slow = 0;
                while (slow != fast) {
                    slow = nums[slow];
                    fast = nums[fast];
                }
                return slow;
            }
        }
    }
}
```

