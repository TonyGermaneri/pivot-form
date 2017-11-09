/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, Event: false*/
define([], function () {
    'use strict';
    return {
        jsonCopy: function (value) { return JSON.parse(JSON.stringify(value)); },
        addEventInterface: function (component, header, index, data, intf) {
            component.events = {};
            component.addEventListener = function (ev, fn) {
                component.events[ev] = component.events[ev] || [];
                component.events[ev].unshift(fn);
            };
            component.removeEventListener = function (ev, fn) {
                (component.events[ev] || []).forEach(function removeEachListener(sfn, idx) {
                    if (fn === sfn) {
                        component.events[ev].splice(idx, 1);
                    }
                });
            };
            component.dispatchEvent = function (ev, e) {
                e = e || {};
                var defaultPrevented;
                function preventDefault() {
                    defaultPrevented = true;
                }
                if (!component.events[ev]) { return; }
                component.events[ev].forEach(function dispatchEachEvent(fn) {
                    e.preventDefault = preventDefault;
                    fn.apply(component, [e, component, header, index, data, intf]);
                });
                return defaultPrevented;
            };
        },
        asyncValueSetter: function (e) {
            return function (value) {
                if (!value) { return; }
                value = value[e.header.name];
                function setValue(n) {
                    var v = n === undefined ? '' : n;
                    e.form.data[e.header.name] = v;
                    if (e.input) {
                        e.input.value = v;
                        if (!e.component.initialized) {
                            e.component.initialized = true;
                            e.component.classList.remove('loading');
                            e.component.dispatchEvent(new Event('initialized'));
                        }
                    }
                }
                var r,
                    syncReturn,
                    callback = function (asyncValue) {
                        if (syncReturn) {
                            throw new Error('Async return detected from value already set via sync function.');
                        }
                        setValue(asyncValue);
                    };
                if (typeof value === 'function') {
                    e.component.classList.add('loading');
                    r = value.apply(e, [callback]);
                    syncReturn = r !== undefined;
                    if (syncReturn) {
                        setValue(r);
                    }
                    return;
                }
                setValue(value);
            };
        },
        setProperties: function (root, props) {
            if (typeof props !== 'object' || props === null) { return; }
            Object.keys(props).forEach(function (keyName) {
                root[keyName] = props[keyName];
            });
        },
        addEvents: function (el, events) {
            if (events && typeof events === 'object' && events !== null) {
                Object.keys(events).forEach(function (eKey) {
                    el.addEventListener(eKey, events[eKey]);
                });
            }
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
