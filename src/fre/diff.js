const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'


export function diff(oldTree, newTree) {
  let patches = {}
  let index = 0
  walk(oldTree, newTree, index, patches)
  return patches
}

function diffAttrs(oldAttrs, newAttrs) {
  let patch = {}
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key]
    }
  }

  return patch
}

function walk(oldNode, newNode, index, patches) {
  let currentPatches = []

  if (!newNode) {
    currentPatches.push({type: REMOVE, index})
  }

  if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      currentPatches.push({type: TEXT, text: newNode})
    }

  } else if (oldNode.type !== newNode.type) {
    let attrs = diffAttrs(oldNode.props, newNode.props)

    if (Object.keys(attrs).length > 0) {
      currentPatches.push({type: ATTRS, attrs})
    }

    diffChildren(oldNode.children, newNode.children, patches)
  } else {
    currentPatches.push({type: REPLACE, newNode})
  }

  if (currentPatches.length > 0) {
    patches[index] = currentPatches
  }


}

let Index = 0

function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++Index, patches)
  })
}
