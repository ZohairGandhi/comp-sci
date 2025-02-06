import Tree from "./Tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function createRandomArr() {
  const randomArr = [];
  for (let i = 0; i < 10; i += 1) {
    randomArr.push(Math.floor(Math.random() * 100));
  }
  return randomArr;
}

const testArr = createRandomArr();
console.log(testArr);
const testTree = new Tree(testArr);

prettyPrint(testTree.root);
console.log(`Is Balanced: ${testTree.isBalanced()}`);
console.log("Level Order");
testTree.levelOrder((node) => console.log(node.data));
console.log("In Order");
testTree.inOrder((node) => console.log(node.data));
console.log("Pre Order");
testTree.preOrder((node) => console.log(node.data));
console.log("Post Order");
testTree.postOrder((node) => console.log(node.data));

testTree.insert(121);
testTree.insert(169);
testTree.insert(210);

testTree.rebalance();

prettyPrint(testTree.root);
console.log(`Is Balanced: ${testTree.isBalanced()}`);
console.log("Level Order");
testTree.levelOrder((node) => console.log(node.data));
console.log("In Order");
testTree.inOrder((node) => console.log(node.data));
console.log("Pre Order");
testTree.preOrder((node) => console.log(node.data));
console.log("Post Order");
testTree.postOrder((node) => console.log(node.data));
