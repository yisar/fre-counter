"use strict";
exports.__esModule = true;
var watcher_1 = require("./watcher");
var observer_1 = require("./observer");
var Component = (function () {
    function Component(props) {
        if (props === void 0) { props = {}; }
        this.state = {};
        this.props = props;
    }
    Component.prototype.willMount = function () {
        new observer_1.Observer(this.state);
        new watcher_1.Watcher(this);
    };
    return Component;
}());
exports.Component = Component;
exports["default"] = Component;
//# sourceMappingURL=component.js.map