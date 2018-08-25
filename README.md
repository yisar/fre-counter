# fre-counter
A demo for Fre

```javascript
import Fre from 'fre'

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

Fre.render(<App/>, document.getElementById('app'))

```

API 如上

目前搞定了这么多：

1.对象劫持

2.jsx、react-like 的组件化方案

3.生命周期

4.事件绑定


