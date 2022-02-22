///////////////////////////// AVL TREE ////////////////////////////////////////

// //          4
// //        /   \
// //       2     6
// //     /  \   /  \
// //    1    3 5    7
// //                 \
// //                  8

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
    this.nodeHeight = 0;
  }

  insertNodeAVL(val, root) {
    // Insert Node
    if (root === null) {
      return new Node(val);
    }
    if (val < root.value) {
      root.left = this.insertNodeAVL(val, root.left);
    } else if (val > root.value) {
      root.right = this.insertNodeAVL(val, root.right);
    }
    // Updte Height
    root.nodeHeight =
      Math.max(this.getNodeHeight(root.left), this.getNodeHeight(root.right)) +
      1;
    // Check Balance Factor and rotate accordingly
    // Left Heavy
    if (this.balanceFactor(root) == 2 && this.balanceFactor(root.left) >= 0) {
      return this.rotateRight(root); // Left-Left Case
    } else if (
      this.balanceFactor(root) == 2 &&
      this.balanceFactor(root.left) < 0
    ) {
      root.left = this.rotateLeft(root.left); // Left-Right Case
      return this.rotateRight(root);
    }
    // Right Heavy
    else if (
      this.balanceFactor(root) == -2 &&
      this.balanceFactor(root.right) <= 0
    ) {
      return this.rotateLeft(root); // Right-Right Case
    } else if (
      this.balanceFactor(root) == -2 &&
      this.balanceFactor(root.right) > 0
    ) {
      root.right = this.rotateRight(root.right); // Right-Left Case
      return this.rotateLeft(root);
    }
    return root;
  }

  visit() {
    if (this.left) {
      this.left.visit();
    }
    console.log(this.value);

    if (this.right) {
      this.right.visit();
    }
  }

  getMin() {
    let current = this;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  getMAx() {
    let current = this;
    while (current.right) {
      current = current.right;
    }
    console.log(current.value);
    return current.value;
  }

  searchNode(val) {
    if (val == this.value) {
      console.log(this);
      return this;
    } else if (this.left && val < this.value) {
      return this.left.searchNode(val);
    } else if (this.right && val > this.value) {
      return this.right.searchNode(val);
    } else {
      console.log(`Node not found!!!`);
      return;
    }
  }

  delete(val) {
    if (this.left && val < this.value) {
      this.left = this.left.delete(val);
    }
    if (this.right && val > this.value) {
      this.right = this.right.delete(val);
    }
    if (val == this.value) {
      if (this.right && this.left) {
        let minValue = this.right.getMin();
        this.value = minValue;
        this.right = this.right.delete(minValue);
      } else if (this.left == null && this.right) {
        return this.right;
      } else if (this.right == null && this.left) {
        return this.left;
      } else if (this.left == null && this.right == null) {
        return null;
      }
    }
    this.nodeHeight =
      Math.max(this.getNodeHeight(this.left), this.getNodeHeight(this.right)) +
      1;
    return this;
  }

  invert() {
    if (this.left) {
      this.left.invert();
    }
    if (this.right) {
      this.right.invert();
    }
    if (this.left == null && this.right == null) {
      return;
    } else if (
      (this.right && this.left == null) ||
      (this.left && this.right == null) ||
      (this.left && this.right)
    ) {
      let temp = this.right;
      this.right = this.left;
      this.left = temp;
    }
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    let height =
      Math.max(node.getNodeHeight(node.left), node.getNodeHeight(node.right)) +
      1;
    return height;
  }

  balanceFactor(node) {
    let leftHeight = node.getNodeHeight(node.left);
    let rightHeight = node.getNodeHeight(node.right);
    let nodeBalanceFactor = leftHeight - rightHeight;

    return nodeBalanceFactor;
  }

  rotateRight(node) {
    let temp = node.left;
    let temp2 = temp.right;
    temp.right = node;
    node.left = temp2;
    node.nodeHeight =
      Math.max(this.getTreeHeight(node.left), this.getTreeHeight(node.right)) +
      1;
    temp.nodeHeight =
      Math.max(this.getTreeHeight(temp.left), this.getTreeHeight(temp.right)) +
      1;
    return temp;
  }

  rotateLeft(node) {
    let temp = node.right;
    let temp2 = temp.left;
    temp.left = node;
    node.right = temp2;
    node.nodeHeight =
      Math.max(this.getTreeHeight(node.left), this.getTreeHeight(node.right)) +
      1;
    temp.nodeHeight =
      Math.max(this.getTreeHeight(temp.left), this.getTreeHeight(temp.right)) +
      1;
    return temp;
  }

  getTreeHeight(node) {
    if (node == null) {
      return -1;
    } else {
      return node.getNodeHeight(node);
    }
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  traverse() {
    if (this.root === null) {
      console.log(`Empty Tree`);
      return;
    }
    this.root.visit();
  }

  findMin() {
    if (this.root === null) {
      console.log(`Empty Tree`);
      return null;
    } else {
      return this.root.getMin();
    }
  }

  findMax() {
    if (this.root === null) {
      console.log(`Empty Tree`);
      return null;
    } else {
      this.root.getMAx();
    }
  }

  search(val) {
    if (this.root === null) {
      console.log(`Empty Tree`);
      return null;
    }
    if (val == this.root.value) {
      console.log(this.root);
      return this.root;
    } else {
      return this.root.searchNode(val);
    }
  }

  deleteNode(val) {
    if (this.root === null) {
      console.log(`Empty Tree`);
      return null;
    } else {
      this.root.delete(val);
    }
  }

  invertTree() {
    if (this.root == null) {
      return;
    } else {
      this.root.invert();
    }
  }

  insertAVL(val) {
    if (this.root) {
      this.root = this.root.insertNodeAVL(val, this.root);
    } else {
      this.root = new Node(val);
    }
  }

  getTreeHeight(node) {
    if (node == null) {
      console.log(-1);
      return -1;
    } else {
      console.log(node.getNodeHeight(node));
      return node.getNodeHeight(node);
    }
  }
}

const tree = new Tree();

// for (let i = 1; i < 10; i++) {
//   let data = Math.floor(Math.random() * 100) + 1;
//   tree.insertAVL(data);
// }

// tree.insertAVL();
// tree.deleteNode()
// tree.search();
// tree.findMin();
// tree.findMax();
// tree.invertTree();
// tree.getTreeHeight(tree.root);

console.log(tree);

// tree.traverse();
