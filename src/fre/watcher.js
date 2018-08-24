import {Dep} from "./dep"

export class Watcher {
  constructor(vm, expr, cb) {
    this.expr = expr
    this.cb = cb
    this.value = this.get()

  }

  get() {
    Dep.target = this
    let value = this.expr
    Dep.target = null

    return value
  }

  update() {
    let value = this.get()
    let oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb()
    }
    console.log('更新……')
  }
}