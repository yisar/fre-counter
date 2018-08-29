"use strict";
exports.__esModule = true;
var dom_1 = require("./dom");
function diff(node, vnode, container) {
    var ret = diffNode(node, vnode);
    if (container && ret.parentNode !== container) {
        container.appendChild(ret);
    }
    return ret;
}
exports.diff = diff;
function diffNode(node, vnode) {
    var newNode = node;
    if (typeof vnode === undefined ||
        typeof vnode === null ||
        typeof vnode === 'boolean') {
        vnode = '';
    }
    if (typeof vnode === 'number')
        vnode = String(vnode);
    if (typeof vnode === 'string') {
        if (node && node.nodeType === 3) {
            if (node.textContent !== vnode) {
                node.textContent = vnode;
            }
        }
        else {
            newNode = document.createTextNode(vnode);
            if (node && node.parentNode) {
                node.parentNode.replaceChild(newNode, node);
            }
        }
        return newNode;
    }
    if (typeof vnode.type === 'function') {
        return diffComponent(node, vnode);
    }
    if (!node || !isSameNodeType(node, vnode)) {
        newNode = document.createElement(vnode.type);
        if (node) {
            node.childNodes.slice().map(newNode.appendChild);
            if (node.parentNode) {
                node.parentNode.replaceChild(newNode, node);
            }
        }
    }
    if (vnode.children && vnode.children.length > 0 || newNode.childNodes && newNode.childNodes.length > 0) {
        diffChildren(newNode, vnode.children);
    }
    diffAttrs(newNode, vnode);
    return newNode;
}
function diffChildren(node, vchildren) {
    var nodeChildren = node.childNodes;
    var children = [];
    var keyed = {};
    if (nodeChildren.length > 0) {
        for (var i = 0; i < nodeChildren.length; i++) {
            var child = nodeChildren[i];
            var key = child.key;
            if (key) {
                keyed[key] = child;
            }
            else {
                children.push(child);
            }
        }
    }
    if (vchildren.length > 0) {
        var min = 0;
        var childrenLen = children.length;
        for (var i = 0; i < vchildren.length; i++) {
            var vchild = vchildren[i];
            var key = vchild.key;
            var child = void 0;
            if (key) {
                if (keyed[key]) {
                    child = keyed[key];
                    keyed[key] = undefined;
                }
            }
            else if (min < childrenLen) {
                for (var j = min; j < childrenLen; j++) {
                    var c = children[j];
                    if (c && isSameNodeType(c, vchild)) {
                        child = c;
                        children[j] = undefined;
                        if (j === children - 1)
                            childrenLen--;
                        if (j === min)
                            min++;
                    }
                }
            }
            child = diffNode(child, vchild);
            var f = nodeChildren[i];
            if (child && child !== node && child !== f) {
                if (!f) {
                    node.appendChild(child);
                }
                else if (child === f.nextSibling) {
                    removeNode(f);
                }
                else {
                    node.insertBefore(child, f);
                }
            }
        }
    }
}
function diffComponent(node, vnode) {
    var component = node && node.component;
    var oldNode = node;
    if (component && component.constructor === vnode.type) {
        setComponentProps(component, vnode.props);
        node = component.base;
    }
    else {
        if (component) {
            unmountComponent(component);
            oldNode = null;
        }
        component = createComponent(vnode.type, vnode.props);
        setComponentProps(component, vnode.props);
        node = component.base;
        if (oldNode && node !== oldNode) {
            oldNode.component = null;
            removeNode(oldNode);
        }
    }
    return node;
}
function setComponentProps(component, props) {
    if (!component.base) {
        if (component.willMount)
            component.willMount();
    }
    else if (component.willChange) {
        component.willChange(props);
    }
    component.props = props;
    renderComponent(component);
}
function renderComponent(component) {
    var base;
    var vnode = component.render();
    if (component.base && component.willUpdate) {
        component.willUpdate();
    }
    base = diffNode(component.base, vnode);
    if (component.base) {
        if (component.updated)
            component.updated();
    }
    else if (component.mounted) {
        component.mounted();
    }
    component.base = base;
}
exports.renderComponent = renderComponent;
function createComponent(component, props) {
    var _this = this;
    var inst;
    if (component.prototype && component.prototype.render) {
        inst = new component(props);
    }
    else {
        inst = new component(props);
        inst.constructor = component;
        inst.render = function () { return _this.constructor(props); };
    }
    return inst;
}
function unmountComponent(component) {
    if (component.willUnmout)
        component.willUnmout();
    removeNode(component.base);
}
function isSameNodeType(node, vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return node.nodeType === 3;
    }
    if (typeof vnode.type === 'string') {
        return node.nodeName.toLowerCase() === vnode.type.toLowerCase();
    }
    return node && node.component && node.component.constructor === vnode.type;
}
function diffAttrs(node, vnode) {
    var nodeAttr = {};
    var vnodeAttr = vnode.props;
    for (var i = 0; i < node.attributes.length; i++) {
        var attr = node.attributes[i];
        nodeAttr[attr.name] = attr.value;
    }
    for (var name_1 in nodeAttr) {
        if (!(name_1 in vnodeAttr)) {
            dom_1.setAttr(node, name_1, undefined);
        }
    }
    for (var name_2 in vnodeAttr) {
        if (nodeAttr[name_2] !== vnodeAttr[name_2]) {
            dom_1.setAttr(node, name_2, vnodeAttr[name_2]);
        }
    }
}
function removeNode(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
//# sourceMappingURL=diff.js.map