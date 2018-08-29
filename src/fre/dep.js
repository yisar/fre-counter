"use strict";
exports.__esModule = true;
var Dep = (function () {
    function Dep() {
        this.subs = [];
        this.add = this.add.bind(this);
        this.notify = this.notify.bind(this);
    }
    Dep.prototype.add = function (watcher) {
        this.subs.push(watcher);
    };
    Dep.prototype.clean = function () {
        this.subs = [];
    };
    Dep.prototype.notify = function () {
        this.subs.forEach(function (watcher) { return watcher.update(); });
    };
    return Dep;
}());
exports.Dep = Dep;
Dep.target = null;
//# sourceMappingURL=dep.js.map