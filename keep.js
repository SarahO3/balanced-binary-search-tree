class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Pre-processes array (sort & remove duplicates) to build balanced BST
  buildTree(array) {
    const sortedUnique = [...new Set(array)].sort((a, b) => a - b);
    
    const sortedToBST = (arr, start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(arr[mid]);
      node.left = sortedToBST(arr, start, mid - 1);
      node.right = sortedToBST(arr, mid + 1, end);
      return node;
    };

    return sortedToBST(sortedUnique, 0, sortedUnique.length - 1);
  }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value < root.data) root.left = this.insert(value, root.left);
    else if (value > root.data) root.right = this.insert(value, root.right);
    return root;
  }

  // Helper to find height of a node
  height(node = this.root) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  isBalanced(root = this.root) {
    if (!root) return true;
    const heightDiff = Math.abs(this.height(root.left) - this.height(root.right));
    if (heightDiff > 1) return false;
    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    const currentNodes = this.inOrder();
    this.root = this.buildTree(currentNodes);
  }

  // Traversals
  levelOrder(callback) {
    const queue = this.root ? [this.root] : [];
    const result = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback) callback(node);
      else result.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return callback ? undefined : result;
  }

  inOrder(callback, node = this.root, result = []) {
    if (!node) return result;
    this.inOrder(callback, node.left, result);
    if (callback) callback(node);
    else result.push(node.data);
    this.inOrder(callback, node.right, result);
    return result;
  }

  preOrder(callback, node = this.root, result = []) {
    if (!node) return result;
    if (callback) callback(node);
    else result.push(node.data);
    this.preOrder(callback, node.left, result);
    this.preOrder(callback, node.right, result);
    return result;
  }

  postOrder(callback, node = this.root, result = []) {
    if (!node) return result;
    this.postOrder(callback, node.left, result);
    this.postOrder(callback, node.right, result);
    if (callback) callback(node);
    else result.push(node.data);
    return result;
  }
}

// ==========================================
// DRIVER SCRIPT
// ==========================================

// Helper function to generate random array
function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

// Helper function to print all traversals
function printTraversals(tree) {
  console.log(`Level-order: [${tree.levelOrder().join(', ')}]`);
  console.log(`Pre-order:   [${tree.preOrder().join(', ')}]`);
  console.log(`In-order:    [${tree.inOrder().join(', ')}]`);
  console.log(`Post-order:  [${tree.postOrder().join(', ')}]`);
}

// 1. Create a binary search tree from an array of random numbers (< 100)
console.log("--- Step 1: Creating tree with random numbers < 100 ---");
const randomArray = generateRandomArray(15);
console.log("Initial array elements:", randomArray);
const myTree = new Tree(randomArray);

// 2. Confirm that the tree is balanced
console.log("\n--- Step 2: Checking balance state ---");
console.log("Is tree balanced?", myTree.isBalanced());

// 3. Print out all elements in level, pre, post, and in order
console.log("\n--- Step 3: Printing elements in all traversals ---");
printTraversals(myTree);

// 4. Unbalance the tree by adding several numbers > 100
console.log("\n--- Step 4: Adding numbers > 100 to unbalance the tree ---");
const elementsToAdd = [105, 120, 145, 160, 185];
console.log("Adding elements:", elementsToAdd);
elementsToAdd.forEach(num => myTree.insert(num));

// 5. Confirm that the tree is unbalanced
console.log("\n--- Step 5: Checking balance state ---");
console.log("Is tree balanced?", myTree.isBalanced());

// 6. Balance the tree by calling rebalance()
console.log("\n--- Step 6: Calling rebalance() ---");
myTree.rebalance();

// 7. Confirm that the tree is balanced
console.log("\n--- Step 7: Checking balance state ---");
console.log("Is tree balanced?", myTree.isBalanced());

// 8. Print out all elements in level, pre, post, and in order
console.log("\n--- Step 8: Printing elements in all traversals after rebalancing ---");
printTraversals(myTree);




// class Node {
//     constructor(data = null, left = null, right = null) {
//         this.data = data;
//         this.left = left;
//         this.right = right;
//     }
// }

// class Tree {
//     constructor(array) {
//         // Remove duplicates and sort numerically
//         const unique = [...new Set(array)].sort((a, b) => a - b);
//         this.root = this._buuildTree(unique);
//     }

//     _buuildTree(array) {
//         if (array.length === 0) return null;

//         const mid = Math.floor(array.length / 2);
//         const root = new Node(array[mid]);

//         root.left = this._buuildTree(array.slice(0, mid));
//         root.right = this._buuildTree(array.slice(mid + 1));

//         return root;
//     }

//     // Odin Requirement: Must return the node itself, not a boolean!
//     find(value) {
//         let cur = this.root;

//         while (cur !== null) {
//             if (value === cur.data) {
//                 return true
//             }
//             cur = value < cur.data ? cur.left : cur.right;
//         }
//         return false
//     }

//     insert(value) {
//         let cur = this.root; 

//         if (!cur) {
//             this.root = new Node(value);
//             return;
//         }

//         while (cur !== null) {
//             if (value === cur.data) return; // Prevent duplicates

//             if (value < cur.data) {
//                 if (cur.left === null) {
//                     cur.left = new Node(value);
//                     return;
//                 }
//                 cur = cur.left;
//             } else {
//                 if (cur.right === null) { 
//                     cur.right = new Node(value); 
//                     return;
//                 }
//                 cur = cur.right;
//             }
//         }
//     }

//     _getSuccessor(cur) {
//         cur = cur.right;
//         while (cur !== null && cur.left !== null) {
//             cur = cur.left;
//         }
//         return cur;
//     }

//     deleteItem(value) {
//         this.root = this._deleteNode(this.root, value);
//     }

//     _deleteNode(cur, value) {
//         if (cur === null) return null;

//         // STEP 1: Traverse the tree
//         if (value < cur.data) {
//             cur.left = this._deleteNode(cur.left, value);
//         } else if (value > cur.data) {
//             cur.right = this._deleteNode(cur.right, value); 
//         } 
//         // STEP 2: Target found! Handle deletion
//         else {
//             if (cur.left === null) return cur.right;
//             if (cur.right === null) return cur.left;

//             // Two children case
//             const successor = this._getSuccessor(cur);
//             cur.data = successor.data;
//             cur.right = this._deleteNode(cur.right, successor.data);
//         }
//         return cur; //Ensure unchanged nodes are returned up the call stack
//     }

//     _getHeight(node) {
//         if (!node) return -1;

//         return 1 + Math.max(
//             this._getHeight(node.left),
//             this._getHeight(node.right)
//         );
//     }

//     height(value) {
//         const cur = this.find(value); // Works perfectly now because find returns a node
//         if (!cur) return undefined

//         return this._getHeight(cur);
//     }

//     depth(value) {
//         let cur = this.root;
//         let depth = 0;

//         while (cur !== null) {
//             if (value === cur.data) return depth;
//             cur = value < cur.data ? cur.left : cur.right;
//             depth++;
//         }
//         return undefined; 
//     }

//     _validateCallback(callback) {
//         if (!callback) throw new Error("A callback function is required.");
//     }

//     // Fixed: Now accepts the callback parameter
//     levelOrderforEach(callback) {
//         this._validateCallback(callback);
//         if (!this.root) return;

//         const queue = [this.root];

//         while (queue.length > 0) {
//             const cur = queue.shift();
//             callback(cur.data);

//             if (cur.left) queue.push(cur.left);
//             if (cur.right) queue.push(cur.right);
//         }
//     }

//     inOrderForEach(callback) {
//         this._validateCallback(callback);

//         const traverse = (node) => {
//             if (!node) return;
//             traverse(node.left);
//             callback(node.data);
//             traverse(node.right);
//         };

//         traverse(this.root);
//     }

//     preOrderForEach(callback) {
//         this._validateCallback(callback); 

//         const traverse = (node) => {
//             if (!node) return;
//             callback(node.data);
//             traverse(node.left);
//             traverse(node.right);
//         };

//         traverse(this.root);
//     }
// }
