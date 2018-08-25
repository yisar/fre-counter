import {Vnode} from "./h"
import {render, setAttribute} from "./render"

let allPatches
let index = 0

export function patch(node, patches) {
  allPatches = patches


  walk(node)
}

function walk(node) {
  let currentPatch = allPatches[index++]
  let childNodes = node.childNodes

  childNodes.forEach(child => walk(child))

  if (currentPatch) {
    doPatch(node, currentPatch)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'ATTRS':
        for (let name in patch.attrs) {
          let value = patch.attrs[name]
          if (value) {
            setAttribute(node, name, value)
          } else {
            node.removeAttribute(name)
          }
        }
        break
      case 'TEXT':
        node.textContent = patch.text
        break
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break
      case 'REPLACE':
        let newNode = (patch.newNode instanceof Vnode) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break
    }
  })
}