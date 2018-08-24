import {Observer} from "./observer"
import {Watcher} from './watcher'

export class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }


  beforeMount() {
    new Observer(this.state)
    new Watcher(this, this.render.bind(this))
  }

  beforeUpdate() {
    new Watcher(this, this.render.bind(this))
  }
}