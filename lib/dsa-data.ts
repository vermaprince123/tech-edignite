// Tech Edignite - DSA Problems with Java Code Snippets

export type DSACategory =
  | "Arrays"
  | "Linked List"
  | "Trees"
  | "Graphs"
  | "Sorting"
  | "Dynamic Programming"
  | "Strings"
  | "Stack & Queue";

export type DSADifficulty = "Easy" | "Medium" | "Hard";

export interface DSAProblem {
  id: number;
  title: string;
  category: DSACategory;
  difficulty: DSADifficulty;
  description: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  javaCode: string;
  sampleInput: string;
  sampleOutput: string;
  tags: string[];
}

export const dsaCategories: { id: DSACategory; icon: string; color: string }[] = [
  { id: "Arrays",              icon: "🔢", color: "from-blue-500 to-cyan-500" },
  { id: "Linked List",         icon: "🔗", color: "from-purple-500 to-pink-500" },
  { id: "Trees",               icon: "🌳", color: "from-green-500 to-emerald-500" },
  { id: "Graphs",              icon: "🕸️", color: "from-orange-500 to-amber-500" },
  { id: "Sorting",             icon: "📊", color: "from-red-500 to-rose-500" },
  { id: "Dynamic Programming", icon: "🧮", color: "from-violet-500 to-indigo-500" },
  { id: "Strings",             icon: "🔤", color: "from-teal-500 to-cyan-500" },
  { id: "Stack & Queue",       icon: "📦", color: "from-yellow-500 to-orange-500" },
];

export const dsaProblems: DSAProblem[] = [
  // ─── ARRAYS ────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Two Sum",
    category: "Arrays",
    difficulty: "Easy",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    approach:
      "Use a HashMap to store each number's value → index. For every element, check if (target - nums[i]) already exists in the map. If yes, return the pair. This gives O(n) time vs O(n²) brute force.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    sampleInput: "nums = [2, 7, 11, 15], target = 9",
    sampleOutput: "[0, 1]",
    tags: ["HashMap", "Array", "Two Pointer"],
    javaCode: `import java.util.HashMap;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        // Map stores: value → index
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (map.containsKey(complement)) {
                // Found the pair!
                return new int[]{map.get(complement), i};
            }

            map.put(nums[i], i);
        }
        return new int[]{}; // No solution found
    }

    public static void main(String[] args) {
        TwoSum ts = new TwoSum();
        int[] result = ts.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println("[" + result[0] + ", " + result[1] + "]"); // [0, 1]
    }
}`,
  },
  {
    id: 2,
    title: "Maximum Subarray (Kadane's Algorithm)",
    category: "Arrays",
    difficulty: "Medium",
    description:
      "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. This is one of the most classic interview problems.",
    approach:
      "Kadane's Algorithm: maintain `currentSum` and `maxSum`. At each element, decide whether to extend the current subarray or start fresh. If currentSum + nums[i] < nums[i], start a new subarray from nums[i].",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    sampleInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    sampleOutput: "6  (subarray [4,-1,2,1])",
    tags: ["Kadane's Algorithm", "DP", "Array"],
    javaCode: `public class MaxSubarray {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];     // Holds the global maximum
        int currentSum = nums[0]; // Holds current subarray sum

        for (int i = 1; i < nums.length; i++) {
            // Either extend current subarray or start fresh
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }

    public static void main(String[] args) {
        MaxSubarray ms = new MaxSubarray();
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(ms.maxSubArray(nums)); // Output: 6
    }
}`,
  },
  {
    id: 3,
    title: "Rotate Array by K Steps",
    category: "Arrays",
    difficulty: "Medium",
    description:
      "Given an integer array `nums`, rotate it to the right by `k` steps, where `k` is non-negative. Solve it in-place with O(1) extra space.",
    approach:
      "Three-reverse trick: (1) Reverse the entire array, (2) Reverse the first k elements, (3) Reverse the remaining n-k elements. This achieves in-place rotation elegantly.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    sampleInput: "nums = [1,2,3,4,5,6,7], k = 3",
    sampleOutput: "[5,6,7,1,2,3,4]",
    tags: ["Array", "In-Place", "Reverse"],
    javaCode: `public class RotateArray {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n; // Handle k > n

        // Step 1: Reverse entire array
        reverse(nums, 0, n - 1);
        // Step 2: Reverse first k elements
        reverse(nums, 0, k - 1);
        // Step 3: Reverse remaining n-k elements
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int left, int right) {
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        RotateArray ra = new RotateArray();
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        ra.rotate(nums, 3);
        // Output: [5, 6, 7, 1, 2, 3, 4]
        for (int n : nums) System.out.print(n + " ");
    }
}`,
  },

  // ─── LINKED LIST ───────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Reverse a Linked List",
    category: "Linked List",
    difficulty: "Easy",
    description:
      "Given the head of a singly linked list, reverse the list and return the reversed list. This is one of the most fundamental linked list problems asked in every technical interview.",
    approach:
      "Iterative approach: use three pointers — `prev`, `curr`, and `next`. Traverse the list, reversing each arrow (next pointer) as you go. At each step, save the next node, point curr.next to prev, then advance.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    sampleInput: "1 → 2 → 3 → 4 → 5 → null",
    sampleOutput: "5 → 4 → 3 → 2 → 1 → null",
    tags: ["Linked List", "Two Pointer", "Iterative"],
    javaCode: `public class ReverseLinkedList {
    // Definition for singly-linked list
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode next = curr.next; // Save next node
            curr.next = prev;          // Reverse the pointer
            prev = curr;               // Move prev forward
            curr = next;               // Move curr forward
        }

        return prev; // New head of reversed list
    }

    // Recursive approach (bonus!)
    public ListNode reverseListRecursive(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode newHead = reverseListRecursive(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }

    public static void main(String[] args) {
        ReverseLinkedList r = new ReverseLinkedList();
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);

        ListNode reversed = r.reverseList(head);
        while (reversed != null) {
            System.out.print(reversed.val + " "); // 5 4 3 2 1
            reversed = reversed.next;
        }
    }
}`,
  },
  {
    id: 5,
    title: "Detect Cycle in Linked List",
    category: "Linked List",
    difficulty: "Medium",
    description:
      "Given a linked list, determine if it has a cycle in it. A cycle exists if a node's `next` pointer points back to a previous node. Return `true` if there is a cycle, `false` otherwise.",
    approach:
      "Floyd's Cycle Detection Algorithm (Tortoise & Hare): Use two pointers — slow moves 1 step at a time, fast moves 2 steps. If there's a cycle, they'll eventually meet. If fast reaches null, no cycle.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    sampleInput: "1 → 2 → 3 → 4 → 2 (cycle back to node 2)",
    sampleOutput: "true",
    tags: ["Floyd's Algorithm", "Two Pointer", "Cycle Detection"],
    javaCode: `public class DetectCycle {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;

        ListNode slow = head; // Tortoise: moves 1 step
        ListNode fast = head; // Hare: moves 2 steps

        while (fast != null && fast.next != null) {
            slow = slow.next;       // 1 step
            fast = fast.next.next;  // 2 steps

            if (slow == fast) {
                return true; // Cycle detected!
            }
        }

        return false; // No cycle
    }

    // BONUS: Find the start of the cycle
    public ListNode detectCycleStart(ListNode head) {
        ListNode slow = head, fast = head;
        boolean hasCycle = false;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) { hasCycle = true; break; }
        }

        if (!hasCycle) return null;

        // Reset slow to head; both move 1 step
        slow = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow; // Cycle start node
    }
}`,
  },
  {
    id: 6,
    title: "Merge Two Sorted Linked Lists",
    category: "Linked List",
    difficulty: "Easy",
    description:
      "Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.",
    approach:
      "Use a dummy head node to simplify edge cases. Compare the current nodes of both lists, attach the smaller one to the result, and advance that pointer. Append the remaining list at the end.",
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    sampleInput: "l1 = 1→2→4, l2 = 1→3→4",
    sampleOutput: "1→1→2→3→4→4",
    tags: ["Linked List", "Merge", "Two Pointer"],
    javaCode: `public class MergeSortedLists {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // Dummy node to avoid null checks at the beginning
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        // Attach the remaining nodes
        current.next = (l1 != null) ? l1 : l2;

        return dummy.next;
    }

    // Recursive approach
    public ListNode mergeTwoListsRecursive(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;

        if (l1.val <= l2.val) {
            l1.next = mergeTwoListsRecursive(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoListsRecursive(l1, l2.next);
            return l2;
        }
    }
}`,
  },

  // ─── TREES ────────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Binary Tree Level Order Traversal (BFS)",
    category: "Trees",
    difficulty: "Medium",
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    approach:
      "Use a Queue (BFS). Add root to queue. For each level, record how many nodes are currently in the queue (that's the level size). Process exactly that many nodes, adding their children to the queue for the next level.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "[[3],[9,20],[15,7]]",
    tags: ["BFS", "Queue", "Tree Traversal"],
    javaCode: `import java.util.*;

public class LevelOrderTraversal {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // Nodes at current level
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null)  queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            result.add(currentLevel);
        }

        return result;
    }

    public static void main(String[] args) {
        LevelOrderTraversal lot = new LevelOrderTraversal();
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        System.out.println(lot.levelOrder(root));
        // Output: [[3], [9, 20], [15, 7]]
    }
}`,
  },
  {
    id: 8,
    title: "Lowest Common Ancestor of BST",
    category: "Trees",
    difficulty: "Medium",
    description:
      "Given a Binary Search Tree (BST) and two nodes p and q, find their Lowest Common Ancestor (LCA). The LCA is defined as the lowest node in T that has both p and q as descendants.",
    approach:
      "Exploit the BST property: if both p and q are smaller than root, LCA is in the left subtree. If both are greater, LCA is in the right subtree. Otherwise, root is the LCA.",
    timeComplexity: "O(h) — h = height of tree",
    spaceComplexity: "O(1) iterative / O(h) recursive",
    sampleInput: "root = [6,2,8,0,4,7,9], p = 2, q = 8",
    sampleOutput: "6",
    tags: ["BST", "Tree", "LCA"],
    javaCode: `public class LowestCommonAncestor {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    // Iterative approach - O(1) space
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;   // Both nodes in left subtree
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;  // Both nodes in right subtree
            } else {
                return root;        // Split point = LCA
            }
        }
        return null;
    }

    // Recursive approach
    public TreeNode lowestCommonAncestorRecursive(
            TreeNode root, TreeNode p, TreeNode q) {
        if (p.val < root.val && q.val < root.val)
            return lowestCommonAncestorRecursive(root.left, p, q);
        if (p.val > root.val && q.val > root.val)
            return lowestCommonAncestorRecursive(root.right, p, q);
        return root;
    }
}`,
  },
  {
    id: 9,
    title: "Maximum Depth of Binary Tree",
    category: "Trees",
    difficulty: "Easy",
    description:
      "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    approach:
      "Recursive DFS: the depth of a tree is 1 + max(depth(left), depth(right)). Base case: if node is null, return 0. Elegant one-liner with recursion.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) — call stack",
    sampleInput: "root = [3,9,20,null,null,15,7]",
    sampleOutput: "3",
    tags: ["DFS", "Recursion", "Tree"],
    javaCode: `public class MaxDepth {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    // Recursive DFS
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    // Iterative BFS approach
    public int maxDepthBFS(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        int depth = 0;

        while (!queue.isEmpty()) {
            depth++;
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.left != null)  queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return depth;
    }
}`,
  },

  // ─── SORTING ────────────────────────────────────────────────────────────────
  {
    id: 10,
    title: "Merge Sort",
    category: "Sorting",
    difficulty: "Medium",
    description:
      "Implement Merge Sort — a divide and conquer sorting algorithm. Divide the array into halves, recursively sort each half, then merge the two sorted halves. Guaranteed O(n log n) in all cases.",
    approach:
      "Divide: split array into left and right halves. Conquer: recursively sort each half. Merge: combine two sorted arrays into one sorted array by comparing elements one by one.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    sampleInput: "arr = [38, 27, 43, 3, 9, 82, 10]",
    sampleOutput: "[3, 9, 10, 27, 38, 43, 82]",
    tags: ["Divide & Conquer", "Sorting", "Recursion"],
    javaCode: `public class MergeSort {
    public void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return; // Base case: single element

        int mid = left + (right - left) / 2;

        mergeSort(arr, left, mid);       // Sort left half
        mergeSort(arr, mid + 1, right);  // Sort right half
        merge(arr, left, mid, right);    // Merge sorted halves
    }

    private void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        // Temporary arrays
        int[] L = new int[n1];
        int[] R = new int[n2];

        System.arraycopy(arr, left, L, 0, n1);
        System.arraycopy(arr, mid + 1, R, 0, n2);

        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else               arr[k++] = R[j++];
        }

        // Copy remaining elements
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    public static void main(String[] args) {
        MergeSort ms = new MergeSort();
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        ms.mergeSort(arr, 0, arr.length - 1);

        for (int x : arr) System.out.print(x + " ");
        // Output: 3 9 10 27 38 43 82
    }
}`,
  },
  {
    id: 11,
    title: "Quick Sort",
    category: "Sorting",
    difficulty: "Medium",
    description:
      "Implement Quick Sort — pick a pivot, partition the array so elements less than pivot come before it and greater elements after it, then recursively sort the partitions. Average case O(n log n).",
    approach:
      "Lomuto partition scheme: choose last element as pivot. Maintain index i for elements ≤ pivot. Scan with j; if nums[j] ≤ pivot, swap nums[i+1] and nums[j]. Finally place pivot at i+1.",
    timeComplexity: "O(n log n) avg, O(n²) worst",
    spaceComplexity: "O(log n) — call stack",
    sampleInput: "arr = [10, 7, 8, 9, 1, 5]",
    sampleOutput: "[1, 5, 7, 8, 9, 10]",
    tags: ["Divide & Conquer", "Sorting", "Partition"],
    javaCode: `public class QuickSort {
    public void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIdx = partition(arr, low, high);
            quickSort(arr, low, pivotIdx - 1);  // Sort left part
            quickSort(arr, pivotIdx + 1, high); // Sort right part
        }
    }

    // Lomuto partition scheme
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Last element as pivot
        int i = low - 1;       // Index of smaller element

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }

        // Place pivot in correct position
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        QuickSort qs = new QuickSort();
        int[] arr = {10, 7, 8, 9, 1, 5};
        qs.quickSort(arr, 0, arr.length - 1);

        for (int x : arr) System.out.print(x + " ");
        // Output: 1 5 7 8 9 10
    }
}`,
  },

  // ─── DYNAMIC PROGRAMMING ───────────────────────────────────────────────────
  {
    id: 12,
    title: "Fibonacci — Memoization & Tabulation",
    category: "Dynamic Programming",
    difficulty: "Easy",
    description:
      "Compute the nth Fibonacci number using two DP techniques: top-down memoization (recursive + cache) and bottom-up tabulation (iterative). Understand why naive recursion is O(2ⁿ) and how DP brings it to O(n).",
    approach:
      "Memoization: cache overlapping subproblems. Tabulation: fill a dp[] array from base cases up. Space-optimized tabulation uses only two variables.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) memoization / O(1) optimized tabulation",
    sampleInput: "n = 10",
    sampleOutput: "55",
    tags: ["DP", "Memoization", "Tabulation", "Recursion"],
    javaCode: `import java.util.HashMap;

public class Fibonacci {
    // ── Approach 1: Memoization (Top-Down) ──────────────────
    private HashMap<Integer, Long> memo = new HashMap<>();

    public long fibMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);

        long result = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, result);
        return result;
    }

    // ── Approach 2: Tabulation (Bottom-Up) ──────────────────
    public long fibTabulation(int n) {
        if (n <= 1) return n;

        long[] dp = new long[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    // ── Approach 3: Space-Optimized O(1) ────────────────────
    public long fibOptimized(int n) {
        if (n <= 1) return n;

        long prev2 = 0, prev1 = 1;

        for (int i = 2; i <= n; i++) {
            long curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }

    public static void main(String[] args) {
        Fibonacci fib = new Fibonacci();
        System.out.println(fib.fibMemo(10));       // 55
        System.out.println(fib.fibTabulation(10)); // 55
        System.out.println(fib.fibOptimized(10));  // 55
    }
}`,
  },
  {
    id: 13,
    title: "0/1 Knapsack Problem",
    category: "Dynamic Programming",
    difficulty: "Hard",
    description:
      "Given weights and values of n items, select items to maximize total value in a knapsack of capacity W. Each item can only be included once (0/1). Classic DP problem that tests understanding of 2D state space.",
    approach:
      "Build a 2D dp table where dp[i][w] = max value using first i items with capacity w. For each item, decide: skip it (take dp[i-1][w]) or include it (value[i] + dp[i-1][w-weight[i]]).",
    timeComplexity: "O(n × W)",
    spaceComplexity: "O(n × W), optimizable to O(W)",
    sampleInput: "weights=[1,3,4,5], values=[1,4,5,7], W=7",
    sampleOutput: "9  (items with weight 3 and 4)",
    tags: ["DP", "Knapsack", "2D DP"],
    javaCode: `public class Knapsack01 {
    public int knapsack(int[] weights, int[] values, int W) {
        int n = weights.length;
        // dp[i][w] = max value using first i items, capacity w
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 1; i <= n; i++) {
            int wi = weights[i - 1]; // Current item weight
            int vi = values[i - 1];  // Current item value

            for (int w = 0; w <= W; w++) {
                // Option 1: Skip current item
                dp[i][w] = dp[i - 1][w];

                // Option 2: Include current item (if it fits)
                if (wi <= w) {
                    dp[i][w] = Math.max(dp[i][w],
                               vi + dp[i - 1][w - wi]);
                }
            }
        }

        return dp[n][W];
    }

    // Space-Optimized: 1D DP array (iterate w from W down to wi)
    public int knapsackOptimized(int[] weights, int[] values, int W) {
        int[] dp = new int[W + 1];

        for (int i = 0; i < weights.length; i++) {
            // Traverse from W to weight[i] to avoid using item twice
            for (int w = W; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
            }
        }

        return dp[W];
    }

    public static void main(String[] args) {
        Knapsack01 ks = new Knapsack01();
        int[] w = {1, 3, 4, 5};
        int[] v = {1, 4, 5, 7};
        System.out.println(ks.knapsack(w, v, 7));          // 9
        System.out.println(ks.knapsackOptimized(w, v, 7)); // 9
    }
}`,
  },
  {
    id: 14,
    title: "Longest Common Subsequence (LCS)",
    category: "Dynamic Programming",
    difficulty: "Hard",
    description:
      "Given two strings s1 and s2, find the length of their Longest Common Subsequence. A subsequence doesn't need to be contiguous but must maintain relative order. Classic 2D DP problem.",
    approach:
      "If s1[i] == s2[j]: dp[i][j] = 1 + dp[i-1][j-1]. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Fill the table bottom-up.",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n), optimizable to O(min(m,n))",
    sampleInput: 's1 = "ABCBDAB", s2 = "BDCAB"',
    sampleOutput: "4  (LCS = BCAB or BDAB)",
    tags: ["DP", "LCS", "String"],
    javaCode: `public class LongestCommonSubsequence {
    public int lcs(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1]; // Match!
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }

    // Reconstruct the actual LCS string
    public String getLCS(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = (s1.charAt(i-1) == s2.charAt(j-1))
                    ? 1 + dp[i-1][j-1]
                    : Math.max(dp[i-1][j], dp[i][j-1]);

        // Backtrack to find the LCS string
        StringBuilder sb = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                sb.append(s1.charAt(i-1));
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) i--;
            else j--;
        }

        return sb.reverse().toString();
    }

    public static void main(String[] args) {
        LongestCommonSubsequence lcs = new LongestCommonSubsequence();
        System.out.println(lcs.lcs("ABCBDAB", "BDCAB")); // 4
        System.out.println(lcs.getLCS("ABCBDAB", "BDCAB")); // BCAB
    }
}`,
  },

  // ─── STRINGS ─────────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Valid Anagram",
    category: "Strings",
    difficulty: "Easy",
    description:
      "Given two strings s and t, return true if t is an anagram of s. An anagram is a word formed by rearranging the letters of another, using all original letters exactly once.",
    approach:
      "Use a frequency count array of size 26 (for lowercase letters). Increment for s, decrement for t. If all counts are 0 at the end, strings are anagrams.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) — fixed 26-char array",
    sampleInput: 's = "anagram", t = "nagaram"',
    sampleOutput: "true",
    tags: ["String", "HashMap", "Frequency Count"],
    javaCode: `public class ValidAnagram {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] count = new int[26]; // Frequency array for a-z

        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) count[c - 'a']--;

        for (int freq : count) {
            if (freq != 0) return false; // Mismatch found
        }

        return true;
    }

    // Using sorting (less optimal but intuitive)
    public boolean isAnagramSort(String s, String t) {
        if (s.length() != t.length()) return false;
        char[] sc = s.toCharArray();
        char[] tc = t.toCharArray();
        java.util.Arrays.sort(sc);
        java.util.Arrays.sort(tc);
        return java.util.Arrays.equals(sc, tc);
    }

    public static void main(String[] args) {
        ValidAnagram va = new ValidAnagram();
        System.out.println(va.isAnagram("anagram", "nagaram")); // true
        System.out.println(va.isAnagram("rat", "car"));          // false
    }
}`,
  },
  {
    id: 16,
    title: "Longest Substring Without Repeating Characters",
    category: "Strings",
    difficulty: "Medium",
    description:
      "Given a string s, find the length of the longest substring without repeating characters. Uses the sliding window technique — a must-know pattern for string problems.",
    approach:
      "Sliding window with a HashMap. Maintain left and right pointers. Move right, adding characters to map. If a duplicate is found, move left past the last occurrence. Track max window size.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, 128)) — for ASCII",
    sampleInput: 's = "abcabcbb"',
    sampleOutput: "3  (substring \"abc\")",
    tags: ["Sliding Window", "HashMap", "String"],
    javaCode: `import java.util.HashMap;

public class LongestSubstringNoRepeat {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int maxLen = 0;
        int left = 0; // Left boundary of window

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            // If char is already in window, shrink from left
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }

            map.put(c, right); // Update last seen index
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }

    public static void main(String[] args) {
        LongestSubstringNoRepeat ls = new LongestSubstringNoRepeat();
        System.out.println(ls.lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println(ls.lengthOfLongestSubstring("bbbbb"));    // 1
        System.out.println(ls.lengthOfLongestSubstring("pwwkew"));   // 3
    }
}`,
  },

  // ─── GRAPHS ────────────────────────────────────────────────────────────────
  {
    id: 17,
    title: "BFS and DFS Graph Traversal",
    category: "Graphs",
    difficulty: "Medium",
    description:
      "Implement both Breadth-First Search (BFS) and Depth-First Search (DFS) on an undirected graph represented as an adjacency list. These are the foundational algorithms for all graph problems.",
    approach:
      "BFS uses a Queue — visits all neighbors before going deeper (level by level). DFS uses a Stack (or recursion) — goes as deep as possible before backtracking. Both use a `visited` set to avoid cycles.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    sampleInput: "Graph: 0-1, 0-2, 1-3, 2-4. Start node: 0",
    sampleOutput: "BFS: 0 1 2 3 4 | DFS: 0 1 3 2 4",
    tags: ["BFS", "DFS", "Graph", "Traversal"],
    javaCode: `import java.util.*;

public class GraphTraversal {
    private int vertices;
    private List<List<Integer>> adjList;

    public GraphTraversal(int v) {
        this.vertices = v;
        adjList = new ArrayList<>();
        for (int i = 0; i < v; i++) adjList.add(new ArrayList<>());
    }

    public void addEdge(int u, int v) {
        adjList.get(u).add(v);
        adjList.get(v).add(u); // Undirected graph
    }

    // ── BFS: Level-by-level traversal ───────────────────────
    public void bfs(int start) {
        boolean[] visited = new boolean[vertices];
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.offer(start);

        System.out.print("BFS: ");
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");

            for (int neighbor : adjList.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }

    // ── DFS: Recursive deep-first traversal ─────────────────
    public void dfs(int start) {
        boolean[] visited = new boolean[vertices];
        System.out.print("DFS: ");
        dfsHelper(start, visited);
        System.out.println();
    }

    private void dfsHelper(int node, boolean[] visited) {
        visited[node] = true;
        System.out.print(node + " ");

        for (int neighbor : adjList.get(node)) {
            if (!visited[neighbor]) {
                dfsHelper(neighbor, visited);
            }
        }
    }

    public static void main(String[] args) {
        GraphTraversal g = new GraphTraversal(5);
        g.addEdge(0, 1); g.addEdge(0, 2);
        g.addEdge(1, 3); g.addEdge(2, 4);

        g.bfs(0); // BFS: 0 1 2 3 4
        g.dfs(0); // DFS: 0 1 3 2 4
    }
}`,
  },

  // ─── STACK & QUEUE ────────────────────────────────────────────────────────
  {
    id: 18,
    title: "Valid Parentheses",
    category: "Stack & Queue",
    difficulty: "Easy",
    description:
      "Given a string s containing only '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Brackets must close in the correct order. A classic stack application.",
    approach:
      "Use a stack. For every opening bracket, push it. For every closing bracket, check if the stack top has the matching opener. If it doesn't match or stack is empty, return false. At the end, stack should be empty.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    sampleInput: 's = "({[]})"',
    sampleOutput: "true",
    tags: ["Stack", "String", "Bracket Matching"],
    javaCode: `import java.util.Stack;

public class ValidParentheses {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();

        for (char c : s.toCharArray()) {
            // Push opening brackets
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                // Check if stack is empty or top doesn't match
                if (stack.isEmpty()) return false;

                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }

        return stack.isEmpty(); // All brackets matched
    }

    public static void main(String[] args) {
        ValidParentheses vp = new ValidParentheses();
        System.out.println(vp.isValid("({[]})")); // true
        System.out.println(vp.isValid("([)]"));   // false
        System.out.println(vp.isValid("{[]}"));   // true
    }
}`,
  },
];
