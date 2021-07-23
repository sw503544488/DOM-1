window.dom = {

  creat(string) {
    const container = document.createElement('template') //template是万能标签可以容纳所有标签,用来解决一些问题,比如要容纳要写td标签必须写在tr标签下面
    container.innerHTML = string.trim(); //trim用于消除字符串两边的空格
    return container.content.firstChild;
  }
  //用于新增节点
  ,
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  } //在节点后面新增一个节点
  ,
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  } //insertBefore()方法是在参考节点之前插入一个拥有指定父节点的子节点,第一个参数是用于插入的节点第二个参数是将要插在这个节点之前
  //用于在节点前面新增一个节点
  ,
  append(parent, node) {
    parent.appendChild(node)
  }, //新增一个子节点

  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)

  }, //给node新增一个父节点,

  remove(node) {
    node.parentNode.removeChild(node)
    return node
  }, //删除节点

  empty(node) {
    const n = node.childNodes.length
    // const n = node.childNodes.length  不包含文本节点
    const array = []
    for (let i = 0; i < n; i++) {
      array.push(node.childNodes[0])
      dom.remove(node.childNodes[0])
      // array.push(node.children[0])不包含文本节点
      // dom.remove(node.children[0])不包含文本节点
    }
    return array
  }, //删除所有后代节点,并返回这些节点

  attr(node, name, value) { //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  }, // 输入三个值给节点增加attribute
  //输入两个值获取节点name

  text(node, string) {
    if (arguments.length === 2) {


      node.innerText = string
    } else {
      return node.innerText
    }
  }, //修改文本内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },

  style(node, name, value) {

    if (arguments.length === 3) {
      //dom.style(div,"color",'red')  
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === "string") {

        //dom.style(div1,'color')
        return node.style[name]
      } else if (arguments[1].__proto__ === {}.__proto__) {
        const object = name
        //dom.style(div1,{border:"1px solid black",color:"red"})
        for (let key in object) {
          node.style[key] = object[key]
        }
      }
    }
  }, //修改style属性,输入属性为dom.style(div1,{border:"1px solid black",color:"red"})
  class: {
    add(node, className) {
      node.classList.add(className)
    }, //给节点添加类名
    remove(node, className) {
      node.classList.remove(className)
    }, //删除节点类名
    has(node, className) {
      return node.classList.contains(className)
    } // 查看是否拥有类名
  }, //修改添加类名

  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  }, //添加点击事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  }, //删除点击事件,有名字才能移除,最好先添加代码
  find(selector, scope) {

    return (scope || document).querySelectorAll(selector)
    // return document.querySelectorAll(selector)[0]
  }, //获取元素第0个,如果存在第二个元素则在第二个元素中获取
  //id名.querySelectorAll 可以在这个id下找元素
  parent(node) {
    return node.parentNode
  }, //返回节点的父节点

  children(node) {
    return node.children
  }, //返回节点的子节点

  siblings(node) {
    return Array.from(node.parentNode.children)
      .filter(n => n !== node)
  }, //返回兄弟节点

  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  }, //返回下一个节点(弟弟)
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    } //回车属于text节点,text的姐节点类型是3
    return x
  }, //返回上一个节点


  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    } //遍历所有节点
  },
  index(node) {
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  } //获取排行


}