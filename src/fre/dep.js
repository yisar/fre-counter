export class Dep {
  constructor() {
    this.subs = []
    this.add = this.add.bind(this)
    this.notify = this.notify.bind(this)
  }

  add(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

Dep.target = null
