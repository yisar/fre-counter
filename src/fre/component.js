import {Dep} from "./dep"
import {renderComponent} from './render'

export class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }

  update() {
    renderComponent(this)
    console.log('需要更新')
  }

  beforeMount() {
    observer(this.state)
    const vdom = watch(this, this.render.bind(this), this.update.bind(this))
  }
}

function observer(state, cb) {
  Object.keys(state).forEach(key => {
    defineReactive(state, key, state[key], cb)
  })
}

function defineReactive(obj, key, val, cb) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) dep.add(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      dep.notify()
    }
  })
}


function watch(vm, exp, cb) {
  Dep.target = cb
  return exp()

}