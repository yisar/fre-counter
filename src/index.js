import Fre from './fre/fre'

class App extends Fre.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      sex: 'boy',
      msg: ''
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

  handleChange(v) {
    this.state.msg = v
  }

  render() {
    return (
      <div>
        <h1>{this.state.sex}</h1>
        <h1>{this.state.count}</h1>
        <div>
          <h1>{this.state.msg}</h1>
        </div>
        <button onClick={() => this.change()}>变性</button>
        <button onClick={() => this.up()}>+</button>
        <input type="text" onChange={e => {
          this.handleChange(e.target.value)
        }}/>
      </div>
    )
  }
}

Fre.render(<App/>, document.body)
