# fre-counter
A demo for Fre

```javascript
import Fre from 'fre'

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
        <h1>{this.state.msg}</h1>
        <button onClick={this.handleClick.bind(this)}>反转</button>
      </div>
    )
  }
}

Fre.render(<App/>, document.getElementById('app'))

```

API 如上

目前搞定了这么多：

1.对象劫持

2.jsx、react-like 的组件化方案

3.生命周期

4.事件绑定


