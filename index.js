class Node { 
    // Nodes hold data and knows it next left or right child
    constructor(data = null, left = null, right = null) {
        this.data = data; 
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        // Remove duplicates and sort the array numerically
        const unique = [...new Set(array)].sort((a, b) => a - b);
        
        // Build the tree and save the top node as our root
        //top node is always the root
        this.root = this._buildTree(unique);
    }

    
            //a tree must know its root..which is the middle
            //of an arrays lenght divided by 2
            //take this part or half of array and give me its middle index value
            //thats what nuild tree does recursively
    _buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);


        root.left = this._buildTree(array.slice(0, mid));
        root.right = this._buildTree(array.slice(mid + 1));

        return root;
    }


    
    find(value) {
        let cur = this.root; 

        while (cur !== null) {
            if (value === cur.data) {
                return cur; // Return the actual node when found
            }
            if (value < cur.data) {
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return null; // Return null if it doesn't exist
    }

    insert(value) {
        let cur = this.root;

        if (!cur) {
            this.root = new Node(value);
            return;
        }

        while (cur !== null) {
            if (value === cur.data) return; // Ignore duplicates

            if (value < cur.data) {
                if (cur.left === null) {
                    cur.left = new Node(value);
                    return;
                }
                cur = cur.left;
            } else {
                if (cur.right === null) {
                    cur.right = new Node(value);
                    return;
                }
                cur = cur.right;
            }
        }
    }

    _getSuccessor(cur) {
        cur = cur.right;
        while (cur !== null && cur.left !== null) {
            cur = cur.left;
        }
        return cur;
    }

    deleteItem(value) {
        
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(cur, value) {
        if (cur === null) return null;

        if (value < cur.data) {
            cur.left = this._deleteNode(cur.left, value);
        } else if (value > cur.data) {
            // FIXED: Was targeting cur.left instead of cur.right here
            cur.right = this._deleteNode(cur.right, value);
        } else {
            // Found the node to delete!
            
            // Case 1 & 2: 0 or 1 child
            if (cur.left === null) return cur.right;
            if (cur.right === null) return cur.left; // FIXED: Was returning cur.right twice

            // Case 3: Two children
            const successor = this._getSuccessor(cur);
            cur.data = successor.data;
            cur.right = this._deleteNode(cur.right, successor.data);
        }
        return cur;
    }

    _getHeight(node) {
        if (!node) return -1; // Edges count: leaf node height is 0, null is -1

        // FIXED: Added 'this.' to recursive calls inside the method
        return 1 + Math.max(
            this._getHeight(node.left),
            this._getHeight(node.right)
        );
    }

    height(value) {
        // Reuses our find logic to locate the node first
        const cur = this.find(value);
        if (!cur) return -1;
        return this._getHeight(cur);
    }


    
    depth(value) {
        let cur = this.root;
        let depth = 0;

        while (cur && cur.data !== value) {
            cur = value < cur.data ? cur.left : cur.right;
            depth++;
        }
        return cur ? depth : -1;
    }

    _validateCallback(callback) {
        // Odin states a callback is optional; if none provided, we create a default array accumulator
        return callback || null;
    }

    levelOrder(callback) {
        if (!this.root) return [];
        
        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const cur = queue.shift();

            // If a callback exists, pass data to it; otherwise, collect data in our array
            if (callback) callback(cur);
            else result.push(cur.data);

            if (cur.left) queue.push(cur.left);
            if (cur.right) queue.push(cur.right);
        }
        if (!callback) return result;
    }

    inOrder(callback) {
        const result = [];
        const traverse = (node) => {
            if (!node) return;
            traverse(node.left);
            if (callback) callback(node);
            else result.push(node.data);
            traverse(node.right);
        };
        traverse(this.root);
        if (!callback) return result;
    }

    preOrder(callback) {
        const result = [];
        const traverse = (node) => {
            if (!node) return;
            if (callback) callback(node);
            else result.push(node.data);
            traverse(node.left);
            traverse(node.right);
        };
        traverse(this.root);
        if (!callback) return result;
    }

    postOrder(callback) {
        const result = [];
        const traverse = (node) => {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            if (callback) callback(node);
            else result.push(node.data);
        };
        traverse(this.root);
        if (!callback) return result;
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (!node) return true;

            const leftHeight = this._getHeight(node.left);
            const rightHeight = this._getHeight(node.right);

            const currentBalanced = Math.abs(leftHeight - rightHeight) <= 1;

            return currentBalanced && checkBalance(node.left) && checkBalance(node.right);
        };
        return checkBalance(this.root);
    }

    rebalance() {
        // Collect all data in sorted order using inOrder, then build a new balanced tree
        const sortedData = this.inOrder();
        this.root = this._buildTree(sortedData);
    }
}
