class Node{
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right
    }
}

class Tree{
    constructor(array){
        // clean the array of duplicates and also sort from small to big
        const unique = [... new Set(array)].sort((a, b) => a - b)
        // find the root of array which is the middle using build tree recursive funtion
        this.root = this.buildTree(unique)
    }

    buildTree(array){
        if(array.length === 0) return null

        // find middle of array
        const mid = Math.floor((array.length) / 2)

        // create new node using mid
        const node = new Node(array[mid])

        // create left node
        node.left = this.buildTree(array.slice(0, mid))

        // create right node
        node.right = this.buildTree(array.slice(mid + 1))

        return node

    }

    includes(value){
        // const node = new Node([value])
        let currentNode = this.root

        while(currentNode !== null){
            if(currentNode.data === value){
                return true
            }
            if(value < currentNode.data){
                currentNode = currentNode.left
            }else{
                currentNode = currentNode.right
            }
              
        }
      
 return false
    }


    // Insert
insert(value) {
    let current = this.root;

    // If the tree is empty, create the root
    if (!current) {
        this.root = new Node(value);
        return;
    }

    while (current !== null) {

        // Don't insert duplicates
        if (current.data === value) {
            return;
        }

        // Go left
        if (value < current.data) {

            if (current.left) {
                current = current.left;
            } else {
                current.left = new Node(value);
                return;
            }

        }

        // Go right
        else {

            if (current.right) {
                current = current.right;
            } else {
                current.right = new Node(value);
                return;
            }

        }
    }
}


// deleteitem
deleteItem(value){
  // Start deleting from the root of the tree.
// deleteNode() searches for the value.
// It returns the new root of the tree (or subtree) after the deletion.
  this.root = this.deleteNode(this.root, value)
}
    
 

// Recursive delete helper
deleteNode(currentRoot, value){
  if(currentRoot === null) return null


  if(value < currentRoot.data){

    currentRoot.left = this.deleteNode(currentRoot.left, value)
    return currentRoot

  }
  
  if(value > currentRoot.data){
        currentRoot.right = this.deleteNode(currentRoot.right, value)
        return currentRoot
    }else{

        // found node we are looking for...if its leftis null
        //we return its right
  if(currentRoot.left === null){
   return currentRoot.right
  }
    if(currentRoot.right === null){
        return currentRoot.left
    }

 const successor = this.getSuccessor(currentRoot)
 
//  replace root with successor
    currentRoot.data = successor.data

    // delete duplicate
    currentRoot.right = this.deleteNode(currentRoot.right, successor.data)
return currentRoot

  }

 
  }
    
  
//   so in order words...a successoris basically the next larger
//number after the current root node we have found
  getSuccessor(node){
    node = node.right

    while(node.left !== null){
        node = node.left
    }
    return node



  }



        
// end of tree class
}

      