export function render(vnode, container) {
  return container.appendChild(_render(vnode))
}


function _render(vnode) {
  if (vnode === 'undefined' || vnode === 'null' || typeof vnode === 'boolean') vnode = ''
  if (typeof vnode.tag === 'function') {
    const component = createComponent(vnode.tag, vnode.attrs)
    setComponentProps(component, vnode.attrs)

    return component.base
  }

  if (typeof vnode === 'number') vnode = String(vnode)

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)

  }
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      setAttribute(dom, key, value)
    })
  }
  vnode.children.forEach(child => {
    render(child, dom)
  })

  return dom
}

function setAttribute(dom, name, value) {
  if (name === 'className') name = 'class'
  if (/on\w+/.test(name)) {
    name = name.toLowerCase()
    dom[name] = value || ''
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      for (let name in value) {
        dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name]
      }
    }
  } else {
    if (name in dom) {
      dom[name] = value || ''
    }
    if (value) {
      dom.setAttribute(name, value)
    } else {
      dom.removeAttribute(name)
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

  const renderer = component.render()


  if (component.base && component.beforeUpdate) {
    component.beforeUpdate()
  }

  base = _render(renderer)


  if (component.base) {
    if (component.updated) component.updated()
  } else if (component.mounted) {
    component.mounted()
  }


  setTimeout(() => {
    console.log(component.base)
    if (component.base && component.base.parentNode) {
      component.base.parentNode.replaceChild(base, component.base)
    }
  }, 0)


  component.base = base
  base.component = component

}