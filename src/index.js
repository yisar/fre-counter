import Fre from './fre/fre'

class App extends Fre.Component {
  constructor() {
    super()
    this.state = {
      msg: "恨你！"
    }
  }

  handleClick() {
    this.state.msg = this.state.msg === '恨你！' ? '爱你！' : '恨你！'
  }

  render() {
    return (
      <div>
        <div id="msg">{this.state.msg}</div>
        <button onClick={this.handleClick.bind(this)}>反转</button>
      </div>

    )
  }
}

Fre.render(<App/>, document.getElementById('app'))

