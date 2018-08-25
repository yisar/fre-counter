import Fre from './fre/fre'


class App extends Fre.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  up() {
    this.state.count++
  }

  down() {
    this.state.count--
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.up.bind(this)}>+</button>
        <button onClick={this.down.bind(this)}>-</button>
      </div>
    )
  }
}

Fre.render(<App/>, window.app)

