import {Dep} from "./dep"
import {renderComponent} from './render'

export class Watcher {
  constructor(vm, expr) {
    console.log(expr)
    this.vm = vm
    this.expr = expr
    this.value = this.get()
    this.update = this.update.bind(this)
  }

  get() {
    Dep.target = this
  }

  update() {
    renderComponent(this.vm)
  }
}