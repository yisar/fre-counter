export function diff(dom, vnode) {
  let out = dom

  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = ''

  if (typeof vnode === 'number') vnode = String(vnode)

  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode
      }
    } else {
      out = document.createTextNode(vnode)
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(out, dom)
      }
    }
    return out
  }

  if (!dom || dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
    out = document.createElement(vnode.tag)

    if (dom) {
      [...dom.childNodes].map(out.appendChild)
      if (dom.parentNode) {
        dom.parentNode.replaceChild(out, dom)
      }
    }
  }


}