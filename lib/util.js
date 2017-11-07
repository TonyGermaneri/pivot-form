/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false*/
define([], function () {
    'use strict';
    return {
        asyncValueSetter: function (el) {
            return function (value) {
                var r,
                    syncReturn,
                    callback = function (value) {
                        if (syncReturn) {
                            throw new Error('Async return detected from value already set via sync function.');
                        }
                        el.value = value;
                    };
                if (typeof value === 'function') {
                    r = value(callback);
                    syncReturn = r !== undefined;
                    return;
                }
                el.value = value;
            };
        },
        setProperties: function (root, props) {
            if (typeof props !== 'object' || props === null) { return; }
            Object.keys(props).forEach(function (keyName) {
                root[keyName] = props[keyName];
            });
        },
        createElement: function createElement(tag, parentNode, attributes) {
            var el = document.createElement(tag);
            if (attributes) {
                Object.keys(attributes).forEach(function (attrKey) {
                    var value = attributes[attrKey];
                    if (attrKey === 'value') {
                        el.value = value;
                        return;
                    }
                    if (attrKey === 'className') {
                        el.className = value;
                        return;
                    }
                    if (attrKey === 'style') {
                        Object.keys(attributes.style).forEach(function (cKey) {
                            el.style[cKey] = attributes.style[cKey];
                        });
                        return;
                    }
                    if (attrKey === 'events') {
                        Object.keys(attributes.events).forEach(function (eKey) {
                            el.addEventListener(eKey, attributes.events[eKey]);
                        });
                        return;
                    }
                    if (attrKey === 'innerHTML') {
                        el.innerHTML = value;
                        return;
                    }
                    el.setAttribute(attrKey, value);
                });
            }
            if (parentNode) {
                parentNode.appendChild(el);
            }
            return el;
        }
    };
});
