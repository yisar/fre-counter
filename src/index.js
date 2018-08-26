import Fre from './fre/fre'

class Counter extends Fre.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 1
    }
  }

  onClick() {
    this.state.num++
  }

  render() {
    return (
      <div>
        <h1>count: {this.state.num}</h1>
        <button onClick={() => this.onClick()}>add</button>
      </div>
    )
  }
}

Fre.render(<Counter />, document.getElementById('root'))
