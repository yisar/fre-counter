"use strict";
exports.__esModule = true;
var dep_1 = require("./dep");
var diff_1 = require("./diff");
var Watcher = (function () {
    function Watcher(vm) {
        this.vm = vm;
        this.value = this.get();
        dep_1.Dep.target = this;
        this.update = this.update.bind(this);
    }
    Watcher.prototype.get = function () {
        dep_1.Dep.target = this;
        this.value = this.vm.state.count;
        dep_1.Dep.target = null;
    };
    Watcher.prototype.update = function () {
        console.log('111');
        diff_1.renderComponent(this.vm);
    };
    return Watcher;
}());
exports.Watcher = Watcher;
//# sourceMappingURL=watcher.js.map