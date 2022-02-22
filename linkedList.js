////////////////////// LINKED LIST ///////////////////////

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  push(data) {
    let node = new Node(data);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
  delete(data) {
    let deleteItem = this.findwithData(data);
    if (deleteItem.data === this.head.data) {
      let temp = this.head.next;
      this.head = temp;
      this.length--;
      return;
    }

    // Get Previous Element
    let deleteItemIndex = this.indexOf(deleteItem.data);
    let previousItem = this.findwithIndex(deleteItemIndex - 1);

    // Delete
    let temp = deleteItem.next;
    deleteItem.next = null;
    previousItem.next = temp;
    this.length--;
  }
  deleteAtIndex(index) {
    let item = this.findwithIndex(index);
    item ? this.delete(item.data) : console.log(`Not found!`);
  }
  findwithIndex(idx) {
    let index = 0;
    let current = this.head;
    if (idx === 0) {
      return this.head;
    }
    while (current.next) {
      current = current.next;
      index++;
      if (index === idx) {
        return current;
      }
    }
    return `Not found!`;
  }
  insertAtIndex(data, index) {
    let node = new Node(data);
    let current = this.findwithIndex(index);
    let previous = this.findwithIndex(index - 1);
    let temp;
    if (index === 0) {
      temp = this.head;
      this.head = node;
      node.next = temp;
      this.length++;
      return;
    }

    temp = current;
    previous.next = node;
    node.next = temp;
    this.length++;
  }
  indexOf(data) {
    let index = 0;
    let current = this.head;
    if (current.data === data) {
      console.log(index);
      return index;
    } else {
      while (current.next) {
        current = current.next;
        index++;
        if (current.data === data) {
          return index;
        }
      }
    }
  }
  findwithData(data) {
    let result;
    let current = this.head;
    if (current.data === data) {
      result = current;
    } else {
      while (current.next) {
        current = current.next;
        if (current.data === data) {
          result = current;
        }
      }
    }
    return result || "Not found";
  }
  clearList() {
    this.head = null;
    this.length = 0;
  }
  size() {
    console.log(this.length);
    return this.length;
  }
  isEmpty() {
    let peep = this.length === 0;
    console.log(peep);
    return peep;
  }
  getHeadNode() {
    console.log(this.head);
    return this.head;
  }
  insertAtHead(data) {
    let node = new Node(data);
    if (this.head === null) {
      this.head = node;
    } else {
      let head = this.head;
      this.head = node;
      node.next = head;
    }
    this.length++;
  }
  traverse() {
    let current = this.head;
    console.log(current.data);
    while (current.next) {
      current = current.next;
      console.log(current.data);
    }
  }
  getMin() {
    let min = this.head.data;
    let current = this.head;

    while (current.next) {
      if (current.data < min) {
        min = current.data;
      }
      current = current.next;
    }
    console.log(min);
    return min;
  }
  getMax() {
    let max = this.head.data;
    let current = this.head;

    while (current.next) {
      if (current.data > max) {
        max = current.data;
      }
      current = current.next;
    }
    console.log(max);
    return max;
  }
  removeTail() {
    let index = 0;
    let current = this.head;
    if (current.next === null) {
      this.head = null;
      this.length--;
      return;
    }
    while (current.next) {
      current = current.next;
      index++;
    }
    let previous = this.findwithIndex(index - 1);
    previous.next = null;
    this.length--;
    return;
  }
}

const linkedList = new LinkedList();

linkedList.push(40);
linkedList.push(50);
linkedList.push(10);
linkedList.push(20);
linkedList.push(30);

// linkedList.delete(10);
// linkedList.isEmpty();
// linkedList.size();
// linkedList.getHeadNode();
// linkedList.traverse();
// linkedList.getMin();
// linkedList.getMax();
// linkedList.insertAtHead();
// linkedList.findwithData(30);
// linkedList.findwithIndex(3);
// linkedList.indexOf(10);
// linkedList.deleteAtIndex(4);
// linkedList.insertAtIndex(777, 2);
// linkedList.removeTail();
// linkedList.clearList();

console.log(linkedList);
