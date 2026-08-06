class Node{
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right
    }
}

class Tree{
    constructor(array){
        
        // a tree has lots of nodes and subtree nodes
        // but first eveything starts from its root node
        // roo node changes reurssively with the build tree function
        // which starts at the middle and keeps giving us what the next root should be

        // a BST must be sorted and without any multiple same values
        // so we call the new set using spread operator to return a new sorted array

        const unique = [...new Set(array)].sort((a, b) => a - b)
        
        // root ...give us the root of this unique sorted array
        // we keep dividing recurssively on any node we land to get the next root 
        this.root = this._buuildTree(unique)
    }


    // build tree
    _buuildTree(array){

        if(array.length === 0) return null


        const mid = Math.floor((array.length) / 2)

        const root = new Node(array[mid])

        root.left = this._buuildTree(array.slice(0, mid))

        root.right = this._buuildTree(array.slice(mid + 1))

        return root
    }


    find(value){
     let   cur = this.root

    //  keep running as long as our current points to an actual node
        while(cur !== null){

            // if found exit and return true
              if(value === cur.data){
                return true
            }

          cur = value < cur.data ?
          cur.left
          :cur.right
 
        }
         return false
    }

insert(value) {
    let cur = this.root;

    // Create a new root if the tree is empty.
    if (!cur) {
        this.root = new Node(value);
        return;
    }

    while (cur !== null) {

        // Value already exists. Don't create duplicates.
        if (value === cur.data) {
            return;
        }

        // If the value belongs on the left side.
        if (value < cur.data) {

            // Empty spot found. Insert here.
            if (cur.left === null) {
                cur.left = new Node(value);
                return;
            }

            // Keep moving down the left subtree.
            cur = cur.left;
        }

        // If the value belongs on the right side.
        else {

            // Empty spot found. Insert here.
            if (cur.right === null) {
                cur.right = new Node(value);
                return;
            }

            // Keep moving down the right subtree.
            cur = cur.right;
        }
    }
}
    

// create a helper function to get the next in order succesor
// the smallest in the right subtree. 
// This is the next node larger than current
_getSuccessor(cur){
    cur = cur.right

    // while we have a current and the left which is the next large cur is not null
    // keep going left
    while(cur  !== null && cur.left !== null){
        cur = cur.left
    }
    return cur
}


// delete a node from a tree
deleteItem(value){
    // start from root to check for value to delete
    // call delet node helper function to do the job
    // check for this value in the root, fu=ind and delete it
    this.root = this._deleteNode(this.root, value)
}

// delete a node with this value
_deleteNode(cur, value){

// Base Case: If the value isn't found, do nothing and return null
if(cur === null) return null


    // STEP 1: Search for the node recursively (No while loops needed!)
if(value < cur.data){
    cur.left = this._deleteNode(cur.left, value)
}else if (value > cur.data){
      cur.left = this._deleteNode(cur.right,value)
}

 // STEP 2: Found the target node! Let's handle the three children cases
else 
{

 // Case A: 0 or 1 child (Left side is empty)
// if cur has 0 or 1 child
if(cur.left === null)
   return cur.right // Bubble up the right child to take its place



 // Case B: 1 child (Right side is empty)
if(cur.right === null)
   return cur.left // Bubble up the left child to take its place



// Case C: Node has 2 children
// Get the next smallest element from the right side
// current has two children
// we call succesor to help us decide which should be the next root after we have deleted
const succesor = this._getSuccessor(cur)


// Copy the successor's data onto the current node
cur.data = succesor.data

// now cur has value of successor data but successor data is still there
 // Recursively hunt down and delete that original duplicate successor node
cur.right = this._deleteNode(cur.right, succesor.data)




return cur

}




}


//recursive helper function to get height
_getHeight(node){
        // if there is no node
        //return - 1

        // Edges count: leaf node height is 0, null is -1
        if(!node){
            return - 1
        }

        // if theres a node...we call math .max and pass in
        //call get height recursively on the left side of that node
        //this check recursively to get the largest height of either of each node sub tre
        //we do same for right
        //so the largest one is what max gives us and we add 1 to it
        // 1 here added is the root node we started from
        //height says look down from root..go all the way down
        //check both sides of a subtree...return the bigger heigt to me
        return 1 +
        Math.max(
            this._getHeight(node.left),
            this._getHeight(node.right)
        )
    }


// returns the tallest height in a node subtree
// look downward from this node to the farthese leaf node
// calculate how far it is from the root
height(value){
 // Reuses our find logic to locate the node first
        const cur = this.find(value);

   if(!cur) return undefined

    return this._getHeight(cur)
}


 

   
depth(value){
   let cur = this.root

   let depth = 0

    while(cur !== null){
        if(value === cur.data)
            return depth


        cur = value < cur.data ?
        cur.left
        : cur.right

        depth++
    }

         return undefined
    
  
}

// callback are customs instructions we pass to machines
// a machine can be another function...
//after machine stops running..it doesnt know what to do with its output
//call back is then signalled to perfome certain action everytime machine finish running

_validateCallback(callback){
    if(!callback)
        throw new Error("A callback function is required.");    


}


// uses queing of FIFO
// Level-Order (Breadth-First: Level by level, left to right)
levelOrderforEach(callback){
    this._validateCallback(callback)

    if(!this.root) return
    
    // create an array to store nodes in order they come in
    // populate it with root node
    const queue = [this.root]

    // keep moving while queue contains nodes
    while(queue.length > 0){
        // remove from the first
        const cur = queue.shift()

        //callback...get me the next current node data
        callback(cur.data)

        if(cur.left) queue.push(cur.left)
            if(cur.right) queue.push(cur.right)
    }
}

// left - current - right
inOrderForEach(callback){
     // Step 1: Make sure a callback was provided by calling valoidate function
this._validateCallback(callback)

 // Step 2: Create a recursive helper function...that we can use over 
 //and over
 //function expressions with const are  local or private inside a method

    const traverse = (node) => {

         // Step 3: Base case
        if(!node) return

        //and now there is a node..get eveything on its left
          // Step 4: Visit the left subtree.
        traverse(node.left)

        // you are now at the node...callback..get me the data
         // Step 5: Visit the current node.
        callback(node.data)

           // Step 6: Visit the right subtree.
        traverse(node.right)
    }

// Step 7: Start from the root.
traverse(this.root)
}

// preorder...  current, left, right
preOrderForEach(callback){
    this._validateCallback(callback)

    const traverse = (node) => {
 if(!node) return

 callback(node.data)

 traverse(node.left)

 traverse(node.right)
    }

    traverse(this.root)
}



// Go to the left child.

// If there is another left child...

// Go there too.

// Keep doing this until you can't go left anymore.

// Now...
// Give me THIS node's data.

// Now go right.

// Repeat.







// post-order ... left, right, current
postOrderForEach(callback) {
    this._validateCallback(callback);

    const traverse = (node) => {

        // STEP 1: Base case
        // Once we reach past a leaf node,
        // there's nothing left to visit.
        if (!node) return;

        // STEP 2: Visit the left subtree.
        traverse(node.left);

        // STEP 3: Visit the right subtree.
        traverse(node.right);

        // STEP 4: Visit the current node.
        callback(node.data);
    };

    // STEP 5: Start from the root.
    traverse(this.root);
}

// Checks if the tree's left and right subtrees differ in height by no more than 1
isBalanced() {

  // Helper function that checks the balance of one node at a time
  const checkBalance = (node) => {

    // STEP 1: Base Case (The exit door of recursion)
    // If we travel past a leaf node and hit null, it means there's no node here.
    // An empty spot is perfectly balanced, so we return true.
    if (!node) return true;

    // STEP 2: Gather information for the current node
    // Find the height difference between the left and right subtrees.
    // Math.abs converts any negative difference into a positive number.
  const heightDiff = Math.abs(
  this._getHeight(node.left) - this._getHeight(node.right)
);

    // STEP 3: Test the current node
    // If the height difference is greater than 1,
    // this node is not balanced.
    if (heightDiff > 1) return false;

    // STEP 4: Check both subtrees.
    // The tree is balanced only if both subtrees are balanced.
    return checkBalance(node.left) && checkBalance(node.right);
  };

  // Start checking from the root.
  return checkBalance(this.root);
}


// Reconstructs an unbalanced tree into a perfectly balanced tree
rebalance() {
    // If the tree is completely empty, there's nothing to balance. Stop here.
  if (!this.root) return;

   // STEP 1: Create an empty array to collect our numbers.
    const sortedData = [];

     // STEP 2: Use your In-Order traversal method.
    // Remember: In-Order always visits nodes from smallest to largest!
    // We pass a callback function to scoop up each node's data and push it into our array.
this.inOrderForEach((value) => {
    sortedData.push(value);
});

  // STEP 3: Rebuild the tree from scratch.
    // We feed our beautifully sorted array back into our tree builder to make a fresh, balanced root.
this.root = this._buuildTree(sortedData)


}
  
 

}





// DRIVER SCRIPT


// Helper function to generate random array
function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

// Helper function to print all traversals
function printTraversals(tree) {

    const levelOrder = [];
    tree.levelOrderforEach((value) => levelOrder.push(value));
    console.log(`Level-order: [${levelOrder.join(", ")}]`);

    const preOrder = [];
    tree.preOrderForEach((value) => preOrder.push(value));
    console.log(`Pre-order:   [${preOrder.join(", ")}]`);

    const inOrder = [];
    tree.inOrderForEach((value) => inOrder.push(value));
    console.log(`In-order:    [${inOrder.join(", ")}]`);

    const postOrder = [];
    tree.postOrderForEach((value) => postOrder.push(value));
    console.log(`Post-order:  [${postOrder.join(", ")}]`);
}

// 1. Create a binary search tree from an array of random numbers (< 100)
console.log("--- Step 1: Creating tree with random numbers < 100 ---");
const randomArray = generateRandomArray(15);
console.log("Initial array elements:", randomArray);
const myTree = new Tree(randomArray);

// 2. Confirm that the tree is balanced
console.log("\n--- Step 2: Checking balance state ---");
console.log("Is tree balanced?", myTree.isBalanced());


// \n
//\n means start on a new line right?
// \n is called the newline escape character

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


