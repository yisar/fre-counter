import {Observer} from "./observer"
import {Watcher} from './watcher'

export class Component {
  constructor(props = {}) {
    this.state = {}
    this.props = props
    this.render = this.render.bind(this)
  }


  beforeMount() {
    new Observer(this.state)
    new Watcher(this)
  }

  mounted() {
    console.log('111')
  }
}