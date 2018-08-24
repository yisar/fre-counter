import Fre from './fre/fre'

class App extends Fre.Component {
  constructor() {
    super()
    this.state = {
      msg: 'loading……'
    }
  }

  mounted(){
    this.state.msg = 'mounted!'
  }

  render() {
    return (
      <div>
        <div id="msg">{this.state.msg}</div>
      </div>

    )
  }
}

Fre.render(<App/>, document.body)

