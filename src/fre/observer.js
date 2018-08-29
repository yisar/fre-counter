"use strict";
exports.__esModule = true;
var dep_1 = require("./dep");
var Observer = (function () {
    function Observer(state) {
        this.state = new Proxy(state, {});
        this.observe(this.state);
    }
    Observer.prototype.observe = function (state) {
        var _this = this;
        if (!state || typeof state !== 'object') {
            return;
        }
        Object.keys(state).forEach(function (key) {
            _this.defineReactive(state, key, state[key]);
            _this.observe(state[key]);
        });
    };
    Observer.prototype.defineReactive = function (obj, key, val) {
        var that = this;
        var dep = new dep_1.Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                dep.clean();
                dep.add(dep_1.Dep.target);
                return val;
            },
            set: function (newVal) {
                if (newVal !== val) {
                    that.observe(newVal);
                    val = newVal;
                    dep.notify();
                }
            }
        });
    };
    return Observer;
}());
exports.Observer = Observer;
//# sourceMappingURL=observer.js.map