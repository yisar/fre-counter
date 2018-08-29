import {Dep} from "./dep"
import {renderComponent} from './diff'

export class Watcher {
    vm
    value

    constructor(vm) {
        this.vm = vm
        this.value = this.get()
        Dep.target = this
        this.update = this.update.bind(this)

    }

    get() {
        Dep.target = this
        this.value = this.vm.state.count
        Dep.target = null
    }

    update() {
        console.log('111')
        renderComponent(this.vm)
    }
}