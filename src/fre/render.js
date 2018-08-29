"use strict";
exports.__esModule = true;
var diff_1 = require("./diff");
function render(vnode, container, node) {
    return diff_1.diff(node, vnode, container);
}
exports["default"] = render;
//# sourceMappingURL=render.js.map