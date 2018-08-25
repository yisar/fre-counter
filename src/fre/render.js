import {diff} from './diff'

export function render(vnode, container) {
  return container.appendChild(_render(vnode))
}


function _render(vnode) {
  if (typeof vnode.type === 'function') {
    const component = createComponent(vnode.type, vnode.props)
    setComponentProps(component, vnode.props)
    return component.base
  }

  if (typeof vnode === 'number') vnode = String(vnode)

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)

  }
  const node = document.createElement(vnode.type)
  if (vnode.props) {
    Object.keys(vnode.props).forEach(key => {
      const value = vnode.props[key]
      setAttribute(node, key, value)
    })
  }
  vnode.children.forEach(child => {
    render(child, node)
  })

  return vnode
}

export function setAttribute(node, name, value) {
  if (/on\w+/.test(name)) {
    name = name.toLowerCase()
    node[name] = value
  } else {
    switch (name) {
      case 'className':
        name = 'class'
        break
      case 'value':
        if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
          node.value = value
        } else {
          node.setAttribute(name, value)
        }
        break
      case 'style':
        node.style.cssText = value
        break
      default:
        node.setAttribute(name, value)
        break
    }
  }

}

function createComponent(component, props) {
  let inst
  if (component.prototype && component.prototype.render) {
    inst = new component(props)
  } else {
    inst = new component(props)
    inst.constructor = component
    inst.render = () => {
      return this.constructor(props)
    }
  }
  return inst
}

function setComponentProps(component, props) {
  if (!component.base) {
    if (component.beforeMount) component.beforeMount()
  } else if (component.beforeChange) {
    component.beforeChange(props)
  }

  component.props = props
  renderComponent(component)
}

export function renderComponent(component) {

  let base
  const renderer = component.render() //返回了一个 vnode


  if (component.base && component.beforeUpdate) {
    component.beforeUpdate()
  }

  base = _render(renderer)

  if (component.base) {
    if (component.updated) component.updated()
  } else if (component.mounted) {
    component.mounted()
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base)
  }


  component.base = base
  base.component = component

}