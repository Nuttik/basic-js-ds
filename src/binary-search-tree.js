const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = addNodeIn(this.treeRoot, data);

    //рекурсивная функция для поиска места и вставки новой ноды
    function addNodeIn(node, data) {
      //если узла не существует, то на его место ставим новую ноду
      if (!node) {
        return new TreeNode(data);
      }
      //не добавляем в дерево повторов
      if (node.data === data) {
        return node;
      }
      //проверяем в какую ветку добавляем новую ноду
      if (node.data > data) {
        node.left = addNodeIn(node.left, data);
      }
      if (node.data < data) {
        node.right = addNodeIn(node.right, data);
      }
      //возвращаем ноду, к которой присоединяем новую, чтобы продолжить поиск места для вставки через рекурсию
      return node;
    }
  }

  has(data) {
    return search(this.treeRoot, data);

    //рекурсивная функция поиска
    function search(node, data) {
      //дошли до последнего узла и попали на несуществующий,но нашли значение
      if (!node) {
        return false;
      }
      //нашли искомое значение
      if (node.data === data) {
        return true;
      }
      //не нашли значение и выбираем в какую ветку идти для продолжения поиска
      if (node.data > data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
  }

  find(data) {
    return search(this.treeRoot, data);

    //рекурсивная функция поиска
    function search(node, data) {
      //дошли до последнего узла и попали на несуществующий,но нашли значение
      if (!node) {
        return null;
      }
      //нашли искомое значение
      if (node.data === data) {
        return node;
      }
      //не нашли значение и выбираем в какую ветку идти для продолжения поиска
      if (node.data > data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
  }

  remove(data) {
    this.treeRoot = deleteNode(this.treeRoot, data);

    //рекурсивная функция для удаления ноды
    function deleteNode(node, data) {
      //прошли по дереву до конца и не нашли эллемент, который нужно удалить
      if (!node) {
        return null;
      }

      //выбираем в какой ветке искать ноду для удаления
      if (node.data > data) {
        //искомое значение меньше чем в текущем узле
        node.left = deleteNode(node.left, data);
        //возвращаем дерево для дальнейшей рекурсии
        return node;
      } else if (node.data < data) {
        //искомое значение больше чем в текущем узле
        node.right = deleteNode(node.right, data);
        //возвращаем дерево для дальнейшей рекурсии
        return node;
      } else {
        //нашли искомую ноду - ее значение равно значению узла

        //1.это последний эллемент дерева и у него нет потомков - безопасно удаляем
        if (!node.left && !node.right) {
          return null;
        }

        //2. если нет левого потомка
        if (!node.left && !node.right) {
          node = node.right;
          return node;
        }

        //3. если нет правого потомка
        if (!node.right) {
          node = node.left;
          return node;
        }

        //4.оба потомка есть
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = deleteNode(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    //проверяем есть ли дерево
    if (!this.treeRoot) {
      return;
    }
    //ищем самый маленький эллемент, он всегда слева
    let currentNode = this.treeRoot;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    //проверяем есть ли дерево
    if (!this.treeRoot) {
      return;
    }
    //ищем самый большой эллемент, он всегда справа
    let currentNode = this.treeRoot;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
