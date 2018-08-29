"use strict";
exports.__esModule = true;
var Vnode = (function () {
    function Vnode(type, props, children) {
        props = props || {};
        this.type = type;
        this.props = props;
        this.children = children;
        this.key = this.props.key || null;
    }
    return Vnode;
}());
exports.Vnode = Vnode;
function h(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return new Vnode(type, props, children);
}
exports.h = h;
//# sourceMappingURL=h.js.map