import Fre from './fre/fre'

class App extends Fre.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      sex: 'boy'
    }
  }

  up() {
    this.state.count++
  }

  change() {
    this.state.sex === 'boy' ? this.state.sex = 'girl' : this.state.sex = 'boy'
  }

  down() {
    this.state.count--
  }

  render() {
    return (
      <div>
        <h1>{this.state.sex}</h1>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.change()}>变性</button>
        <button onClick={() => this.up()}>+</button>
      </div>
    )
  }
}

Fre.render(<App/>, document.body)
