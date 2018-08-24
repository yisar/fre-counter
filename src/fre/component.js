import {renderComponent} from './render'
import {Observer} from "./observer"
import {Watcher} from './watcher'

export class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }


  beforeMount() {
    new Observer(this.state)
    const vdom = new Watcher(this, this.render.bind(this), renderComponent(this))
    vdom.update()
  }
}