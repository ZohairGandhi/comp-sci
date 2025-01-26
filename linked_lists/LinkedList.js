import Node from './Node.js';

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = new Node(value);
  }

  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    const newNode = new Node(value, this.head);
    this.head = newNode;
  }

  size() {
    if (this.head === null) {
      return 0;
    }

    let currentNode = this.head;
    let count = 1;
    while (currentNode.nextNode !== null) {
      count += 1;
      currentNode = currentNode.nextNode;
    }

    return count;
  }

  getHead() {
    return this.head;
  }

  tail() {
    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  at(index) {
    if (this.head === null) {
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode !== null) {
      if (currentIndex === index) {
        return currentNode;
      }

      currentIndex += 1;
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  pop() {
    if (this.head === null) {
      return null;
    }

    if (this.size() === 1) {
      const returnNode = this.head;
      this.head = null;
      return returnNode;
    }

    let currentNode = this.head;
    let prevNode = null;
    while (currentNode.nextNode !== null) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    prevNode.nextNode = null;
    return currentNode;
  }

  contains(value) {
    if (this.head === null) {
      return false;
    }

    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }

      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    if (this.head === null) {
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentIndex;
      }

      currentNode = currentNode.nextNode;
      currentIndex += 1;
    }

    return null;
  }

  toString() {
    if (this.head === null) {
      return null;
    }

    let currentNode = this.head;
    let listString = '';
    while (currentNode.nextNode !== null) {
      listString = listString.concat(`( ${currentNode.value} ) -> `);
      currentNode = currentNode.nextNode;
    }

    listString = listString.concat(`( ${currentNode.value} ) -> null`);
    return listString;
  }
}
