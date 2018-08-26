import {renderComponent} from './render'

let updateQueue = []
let renderQueue = []

export function enqueueUpdate(stateChange, component) {
  if (updateQueue.length === 0) {
    defer(flush)
  }
  updateQueue.push({stateChange, component})

  if (!renderQueue.some(item => item === component)) {
    renderQueue.push(component)
  }

}

function flush() {
  let item, component

  while (item = updateQueue.shift()) {

    const {stateChange, component} = item

    if (!component.prevState) {
      component.prevState = Object.assign({}, component.state)
    }

    if (typeof stateChange === 'function') {
      Object.assign(component.state, stateChange(component.prevState, component.props))
    } else {

      Object.assign(component.state, stateChange)
    }

    component.prevState = component.state

  }

  while (component = renderQueue.shift()) {
    renderComponent(component)
  }

}


function defer(fn) {
  return Promise.resolve().then(fn)
}