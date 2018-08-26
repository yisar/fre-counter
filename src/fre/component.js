import { enqueueSetState } from './set-state-queue'

export class Component {
  constructor(props = {}) {
    this.isReactComponent = true

    this.state = {}
    this.props = props
  }

  setState(stateChange) {
    enqueueSetState(stateChange, this)
  }
}

export default Component
