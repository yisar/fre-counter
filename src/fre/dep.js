export class Dep {
  constructor() {
    this.subs = []
  }

  add(cb) {
    this.subs.push(cb)
  }

  notify() {
    this.subs.forEach((cb) => cb())
  }
}
