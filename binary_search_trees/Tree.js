import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array.sort((a, b) => a - b);
    array = Array.from(new Set(array));
    return this.buildTreeRec(array);
  }

  buildTreeRec(array) {
    if (array.length === 0) {
      return null;
    }

    const midPoint = Math.floor(array.length / 2);
    const root = new Node(array[midPoint]);
    root.left = this.buildTreeRec(array.slice(0, midPoint));
    root.right = this.buildTreeRec(array.slice(midPoint + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (!node) {
      return new Node(value);
    } else {
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
    }

    return node;
  }

  minValueNode(node) {
    let currentNode = node;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  deleteItem(value, node = this.root) {
    if (!node) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) {
        const temp = node.right;
        node = null;
        return temp;
      } else if (!node.right) {
        const temp = node.left;
        node = null;
        return temp;
      }

      node.data = this.minValueNode(node.right).data;
      node.right = this.deleteItem(node.data, node.right);
    }

    return node;
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode.data !== value) {
      currentNode =
        value < currentNode.data ? currentNode.left : currentNode.right;
    }
    return currentNode;
  }

  levelOrder(callback) {
    if (!(callback instanceof Function)) {
      throw new Error("Callback not provided!");
    }

    if (!this.root) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback, node = this.root) {
    if (!(callback instanceof Function)) {
      throw new Error("Callback not provided!");
    }

    if (!node) {
      return;
    }

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!(callback instanceof Function)) {
      throw new Error("Callback not provided!");
    }

    if (!node) {
      return;
    }

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!(callback instanceof Function)) {
      throw new Error("Callback not provided!");
    }

    if (!node) {
      return;
    }

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    if (!node) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    const queue = [];
    queue.push(this.root);
    let level = 0;

    while (queue.length > 0) {
      const queueLength = queue.length;

      for (let i = 0; i < queueLength; i += 1) {
        const currentNode = queue.shift();

        if (currentNode === node) {
          return level;
        }

        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
      }

      level += 1;
    }
  }

  isBalanced() {
    return this.height(this.root.left) - this.height(this.root.right) <= 1;
  }

  rebalance() {
    const sortedArr = [];
    this.inOrder((node) => sortedArr.push(node.data));
    this.root = this.buildTree(sortedArr);
  }
}
