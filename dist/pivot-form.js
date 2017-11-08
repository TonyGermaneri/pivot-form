(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pivot-form"] = factory();
	else
		root["pivot-form"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    'use strict';
    return {
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
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, performance: false, requestAnimationFrame: false*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./components/index.js */ 2), __webpack_require__(/*! ./util.js */ 0), __webpack_require__(/*! ./dialog.js */ 3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (defaultComponents, util, dialog) {
    'use strict';
    var ce = util.createElement,
        sp = util.setProperties,
        attributeList = ['data', 'schema', 'name', 'components'];
    function PivotForm(args) {
        args = args || {};
        // only non-dom related items can be instantiated prior to init (connectedCallback)
        var dialogOptions, self = {};
        self.args = args;
        self.initialized = false;
        self.form = ce('form', null, {className: 'pivot-form'});
        self.uniqueId = Math.random() + '-' + performance.now();
        self.title = '';
        self.fieldOrder = [];
        self.fields = {};
        self.components = {};
        self.intf = window.customElements ? eval('Reflect.construct(HTMLElement, [], new.target)') : ce('section');
        util.addEventInterface(self.intf);
        function getFieldByName(name) {
            return self.fields[name];
        }
        function saveState() {
            if (self.name) {
                try {
                    localStorage.setItem('pivot-form-order-' + self.name, JSON.stringify({
                        fieldOrder: self.fieldOrder
                    }));
                } catch (ignore) {}
            }
        }
        function updateFlexOrder() {
            self.inputFieldOrganicOrder.forEach(function (itemContainer, organicFieldIndex) {
                organicFieldIndex += 1;
                itemContainer.style.order = self.fieldOrder.indexOf(organicFieldIndex);
            });
            saveState();
        }
        function loadState() {
            if (self.name && self.initialized) {
                try {
                    var d = localStorage.getItem('pivot-form-order-' + self.name);
                    d = self.fieldOrder = JSON.parse(d).fieldOrder;
                } catch (ignore) {
                    self.fieldOrder = [];
                }
                updateFlexOrder();
            }
        }
        function reorderComponents() {
            if (!self.moveTo) { return; }
            var o = self.fieldOrder.indexOf(self.moveFrom.organicFieldIndex),
                t = self.fieldOrder.indexOf(self.moveTo.organicFieldIndex);
            self.fieldOrder.splice(o, 1);
            self.fieldOrder.splice(t, 0, self.moveFrom.organicFieldIndex);
            updateFlexOrder();
            return;
        }
        function reorderField(e) {
            // move up e until a base component item is found, then draw a line below it
            // and mark it as the target of the dropping (item reordering)
            self.moveMarker.style.left = e.clientX + 'px';
            self.moveMarker.style.top = e.clientY + 'px';
            var tOrd, uid, el = e.target;
            while (el && el.parentNode && el.tagName !== 'BODY') {
                tOrd = parseInt(self.moveFrom.style.order, 10);
                uid = el.getAttribute('data-uniqueId');
                if (uid === self.uniqueId && el !== self.moveFrom) {
                    if (self.moveTo) {
                        self.moveTo.classList.remove('reorder-drag-over');
                    }
                    self.moveTo = el;
                    self.moveTo.classList.add('reorder-drag-over');
                    self.moveTargetIndex = parseInt(tOrd, 10);
                    return;
                }
                el = el.parentNode;
            }
            return;
        }
        function endReorderField() {
            if (self.moveTo) {
                self.moveTo.classList.remove('reorder-drag-over');
            }
            reorderComponents();
            if (self.moveMarker.parentNode) {
                self.moveMarker.parentNode.removeChild(self.moveMarker);
            }
            self.form.classList.remove('noselect');
            self.moveTo = undefined;
            self.moveFrom = undefined;
            self.moveMarker = undefined;
            self.shadowRoot.removeEventListener('mousemove', reorderField);
            self.shadowRoot.removeEventListener('mouseup', endReorderField);
            return;
        }
        function beginReorderField(organicFieldIndex, itemContainer) {
            return function (e) {
                self.form.classList.add('noselect');
                self.moveMarker = ce('div', self.shadowRoot, {className: 'reorder-marker'});
                self.moveFrom = itemContainer;
                reorderField(e);
                self.shadowRoot.addEventListener('mousemove', reorderField);
                self.shadowRoot.addEventListener('mouseup', endReorderField);
            };
        }
        function createDom() {
            var iFields = Object.keys(self.fields);
            iFields.forEach(function (inputFieldName, organicFieldIndex) {
                organicFieldIndex += 1;
                var container = ce('div', null, {className: 'component-item'}),
                    field = self.fields[inputFieldName],
                    handle = ce('div', field.header.static ? null : container, {className: 'item-handle'});
                field.container = container;
                field.handle = container;
                container.setAttribute('data-uniqueId', self.uniqueId);
                handle.beginReorderFieldFunction = beginReorderField(organicFieldIndex, container);
                handle.addEventListener('mousedown', handle.beginReorderFieldFunction);
                container.organicFieldIndex = organicFieldIndex;
                container.name = inputFieldName;
                self.fieldOrder[organicFieldIndex] = self.fieldOrder[organicFieldIndex] === undefined
                    ? organicFieldIndex : self.fieldOrder[organicFieldIndex];
                container.appendChild(field.component);
                sp(container.style, field.component.containerStyle);
                sp(handle, field.component.handleStyle);
                sp(container.style, field.containerStyle);
                sp(handle, field.handleStyle);
                self.form.appendChild(container);
                self.inputFieldOrganicOrder.push(container);
            });
            updateFlexOrder();
        }
        function createTempSchema() {
            if (self.data && !self.schema) {
                self.schema = Object.keys(self.data).forEach(function (colName) {
                    return {
                        name: colName,
                        type: 'string'
                    };
                });
            }
            return;
        }
        function addComponents(obj) {
            if (!obj) { return; }
            if (typeof obj !== 'object') { throw new TypeError('Component object must be an object'); }
            Object.keys(obj).forEach(function (type) {
                self.components[type] = obj[type];
            });
        }
        function initData() {
            if (!self.initialized) { return; }
            if (!self.data) { return; }
            Object.keys(self.fields).forEach(function (inputFieldName) {
                var inputField = self.fields[inputFieldName];
                inputField.component.value = self.data;
            });
        }
        function disposeFields() {
            Object.keys(self.fields).forEach(function (key) {
                var field = self.fields[key];
                if (field && field.component) {
                    if (field.component.dispose) {
                        field.component.dispose();
                    }
                    if (field.component.parentNode) {
                        field.component.parentNode.removeChild(field.component);
                    }
                    if (field.handle && field.handle.parentNode) {
                        field.handle.removeEventListener('mousedown', field.handle.beginReorderFieldFunction);
                        field.handle.parentNode.removeChild(field.handle);
                    }
                    if (field.container && field.container.parentNode) {
                        field.container.parentNode.removeChild(field.container);
                    }
                }
            });
        }
        function dispose() {
            disposeFields();
        }
        function initSchema() {
            if (!self.initialized) { return; }
            if (!self.schema) { return; }
            if (self.fields) {
                // dispose previous items
                disposeFields();
            }
            self.fields = {};
            self.schema.forEach(function (header, index) {
                var t = self.components.string,
                    component;
                if (self.components[header.type]) {
                    t = self.components[header.type];
                }
                component = t.apply(self.intf, [header, index, self.data, self.intf]);
                component.addEventListener('change', function () {
                    self.intf.dispatchEvent('change', {data: self.data});
                });
                self.fields[header.name] = {
                    header: header,
                    component: component,
                    index: index
                };
            });
            createDom();
            initData();
        }
        function dispatchResize() {
            self.intf.dispatchEvent('resize');
            requestAnimationFrame(function () {
                window.dispatchEvent(new Event('resize'));
            });
        }
        function init() {
            if (!self.initialized) {
                self.initialized = true;
                self.shadowRoot = self.intf.attachShadow ? self.intf.attachShadow({mode: 'open'}) : self.intf;
                self.shadowRoot.appendChild(self.form);
                self.inputFieldOrganicOrder = [];
                if (!self.cssAttached) {
                    ce('link', self.shadowRoot, {
                        rel: 'stylesheet',
                        href: /^file:\/\/\//.test(window.location) ? '../lib/index.css' : 'data:text/css;base64,Lm5vc2VsZWN0LCAudGFicywgLmRpYWxvZy10aXRsZS1iYXIgewogICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOwogICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7CiAgICB1c2VyLXNlbGVjdDogbm9uZTsKfQouY29tcG9uZW50IHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWNvbXBvbmVudC13aWR0aCwgMTAwJSk7Cn0KLmxhYmVsIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLXdpZHRoLCAxMDBweCk7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLWRpc3BsYXksIGlubGluZS1ibG9jayk7CiAgICBmb250LWZhbWlseTogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1mb250LWZhbWlseSwgc2Fucy1zZXJpZik7Cn0KLnRhYmJlZC1jb21wb25lbnQgewogICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICAgIHdpZHRoOiAxMDAlOwp9Ci50YWJzIHsKICAgIGRpc3BsYXk6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbXBvbmVudC1kaXNwbGF5LCBpbmxpbmUtZmxleCk7CiAgICBmbGV4LWRpcmVjdGlvbjogdmFyKC0tcGl2b3QtZm9ybS10YWItY29tcG9uZW50LWZsZXgtZGlyZWN0aW9uLCByb3cpOwogICAgZmxleC13cmFwOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb21wb25lbnQtZmxleC13cmFwLCB3cmFwLXJldmVyc2UpOwogICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cywgNHB4KTsKICAgIGJvcmRlci1sZWZ0LXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci1sZWZ0LXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItd2lkdGgsIDFweCk7CiAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLWNvbG9yLCAjOTk5KTsKICAgIGJvcmRlci1ib3R0b20tc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXdpZHRoLCAxcHgpOwogICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLWNvbG9yLCAjOTk5KTsKICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAxcHgpOwp9Ci50YWIgewogICAgcGFkZGluZy10b3A6IHZhcigtLXBpdm90LWZvcm0tdGFiLXBhZGRpbmctdG9wLCA0cHgpOwogICAgcGFkZGluZy1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1wYWRkaW5nLWxlZnQsIDRweCk7CiAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItcGFkZGluZy1ib3R0b20sIDRweCk7CiAgICBwYWRkaW5nLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1wYWRkaW5nLXJpZ2h0LCA0cHgpOwogICAgY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbG9yLCAjMzMzKTsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJhY2tncm91bmQtY29sb3IsICNFRUUpOwogICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cywgNHB4KTsKICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1cywgNHB4KTsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLWNvbG9yLCAjOTk5KTsKICAgIGJvcmRlci1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci13aWR0aCwgMXB4KTsKICAgIGJvcmRlci1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1ib3R0b20sIG5vbmUpOwogICAgYm9yZGVyLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1sZWZ0LCBub25lKTsKICAgIGZvbnQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS10YWItZm9udC1zaXplLCAxNHB4KTsKICAgIGRpc3BsYXk6IHZhcigtLXBpdm90LWZvcm0tdGFiLWRpc3BsYXksIGlubGluZS1ibG9jayk7CiAgICBjdXJzb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWN1cnNvciwgcG9pbnRlcik7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1tYXJnaW4tYm90dG9tLCAwKTsKICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1tYXJnaW4tbGVmdCwgMCk7CiAgICBmb250LWZhbWlseTogdmFyKC0tcGl2b3QtZm9ybS10YWItZm9udC1mYW1pbHksIHNhbnMtc2VyaWYpOwogICAgYm94LXNoYWRvdzogaW5zZXQgMCAtMnB4IDJweCB2YXIoLS1waXZvdC1mb3JtLXRhYi1pbmFjdGl2ZS1ib3gtc2hhZG93LWNvbG9yLCAjREREKTsKfQoudGFiLWFjdGl2ZSB7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWFjdGl2ZS1ib3JkZXItY29sb3IsICNBQUEpOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYWN0aXZlLWJhY2tncm91bmQtY29sb3IsICNGRUZFRkUpOwogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItYWN0aXZlLW1hcmdpbi1ib3R0b20sIC0xcHgpOwogICAgYm94LXNoYWRvdzogaW5zZXQgMCAtM3B4IDNweCB0cmFuc3BhcmVudDsKfQoudGFiLWNvbnRlbnQgewogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS1jb250ZW50LW1hcmdpbi1ib3R0b20sIDVweCk7CiAgICBwYWRkaW5nOiB2YXIoLS1waXZvdC1mb3JtLWNvbnRlbnQtcGFkZGluZywgN3B4KTsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1jb250ZW50LWJvcmRlci1jb2xvciwgIzk5OSk7CiAgICBib3JkZXItc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tY29udGVudC1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1jb250ZW50LWJvcmRlci13aWR0aCwgMXB4KTsKICAgIGJvcmRlci10b3A6IG5vbmU7Cn0KLnRhYi1jb250ZW50LWluYWN0aXZlIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLnRhYi1jb250ZW50LWFjdGl2ZSB7CiAgICBkaXNwbGF5OiBibG9jazsKfQouaXRlbS1oYW5kbGUsIC5yZW9yZGVyLW1hcmtlciB7CiAgICBjdXJzb3I6IG1vdmU7CiAgICB3aWR0aDogOHB4OwogICAgbWluLXdpZHRoOiA4cHg7CiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICBmbG9hdDogbGVmdDsKICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIG1hcmdpbi1sZWZ0OiA1cHg7CiAgICBtYXJnaW4tcmlnaHQ6IDVweDsKICAgIG1hcmdpbi1ib3R0b206IDVweDsKICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIGNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1jb2xvciwgIzMzMyk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1iYWNrZ3JvdW5kLWNvbG9yLCAjRUVFKTsKICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci1yYWRpdXMsIDRweCk7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci1jb2xvciwgI0NDQyk7CiAgICBib3JkZXItc3R5bGU6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1ib3JkZXItd2lkdGgsIDFweCk7Cn0KLnJlb3JkZXItbWFya2VyOmJlZm9yZSwgLml0ZW0taGFuZGxlOmJlZm9yZSB7CiAgICBjb250ZW50OiB2YXIoLS1waXZvdC1mb3JtLXJlb3JkZXItbWFya2VyLWNvbnRlbnQsICdcMDAyMDVFJyk7Cn0KLmlucHV0IHsKICAgIHBhZGRpbmctdG9wOiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LXBhZGRpbmctdG9wLCAycHgpOwogICAgcGFkZGluZy1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LXBhZGRpbmctbGVmdCwgNHB4KTsKICAgIHBhZGRpbmctYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LXBhZGRpbmctYm90dG9tLCAycHgpOwogICAgcGFkZGluZy1yaWdodDogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1wYWRkaW5nLXJpZ2h0LCAzcHgpOwogICAgbWFyZ2luLXRvcDogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1tYXJnaW4tdG9wLCAycHgpOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtbWFyZ2luLWxlZnQsIDFweCk7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LW1hcmdpbi1ib3R0b20sIDJweCk7CiAgICBtYXJnaW4tcmlnaHQ6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtbWFyZ2luLXJpZ2h0LCAxcHgpOwogICAgZm9udC1zaXplOiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LWZvbnQtc2l6ZSwgMTJweCk7Cn0KLmNvbXBvbmVudC1pdGVtIHsKICAgIGRpc3BsYXk6IHZhcigtLXBpdm90LWZvcm0tY29tcG9uZW50LCBpbmxpbmUtZmxleCk7Cn0KLnJlb3JkZXItZHJhZy1vdmVyIC5pdGVtLWhhbmRsZTpudGgtY2hpbGQoMSkgewogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtZHJhZy1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDExMCwgMTY4LCAyNTUsIDEpKTsKfQoucmVvcmRlci1tYXJrZXIgewogICAgY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLXJlb3JkZXJpbmctbWFya2VyLWNvbG9yLCAjMzMzKTsKICAgIGJhY2tncm91bmQ6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLXJlb3JkZXJpbmctbWFya2VyLWNvbG9yLCAjRUVFKTsKICAgIGhlaWdodDogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtcmVvcmRlcmluZy1tYXJrZXItaGVpZ2h0LCAyM3B4KTsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1yZW9yZGVyaW5nLW1hcmtlci13aWR0aCwgMTBweCk7CiAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICB6LWluZGV4OiAxMDsKfQoucGl2b3QtZm9ybSB7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLWRpc3BsYXksIGZsZXgpOwogICAgZmxleC1kaXJlY3Rpb246IHZhcigtLXBpdm90LWZvcm0tZmxleC1kaXJlY3Rpb24sIHJvdyk7CiAgICBmbGV4LXdyYXA6IHZhcigtLXBpdm90LWZvcm0tZmxleC13cmFwLCB3cmFwKTsKfQouY2FudmFzLWRhdGFncmlkLWNoaWxkIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWNhbnZhcy1kYXRhZ3JpZC13aWR0aCwgMTAwJSk7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLWNhbnZhcy1kYXRhZ3JpZC1tYXJnaW4tYm90dG9tLCA1cHgpOwp9Ci5kaWFsb2cgewogICAgd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXdpZHRoLCA1MDBweCk7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWJvcmRlci1jb2xvciwgIzAwMCk7CiAgICBib3JkZXItc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1ib3JkZXItd2lkdGgsIDFweCk7CiAgICBwb3NpdGlvbjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctcG9zaXRpb24sIGFic29sdXRlKTsKICAgIG92ZXJmbG93OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1vdmVyZmxvdywgaGlkZGVuKTsKICAgIHotaW5kZXg6IDI7Cn0KLmRpYWxvZy1jb250ZW50IHsKICAgIHBhZGRpbmc6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRlbnQtYmFja2dyb3VuZC1wYWRkaW5nLCA1cHgpOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udGVudC1iYWNrZ3JvdW5kLWNvbG9yLCAjRkZGKTsKfQouZGlhbG9nLXRpdGxlIHsKICAgIGZsb2F0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1mbG9hdCwgbGVmdCk7CiAgICBmb250LXNpemU6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWZvbnQtc2l6ZSwgMjBweCk7CiAgICBtYXJnaW4tbGVmdDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtbWFyZ2luLWxlZnQsIDdweCk7CiAgICBtYXJnaW4tdG9wOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1tYXJnaW4tdG9wLCAzcHgpOwogICAgZm9udC1mYW1pbHk6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWZvbnQtZmFtaWx5LCBzYW5zLXNlcmlmKTsKICAgIGN1cnNvcjogZGVmYXVsdDsKfQouZGlhbG9nLXRpdGxlLWJhciB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYWNrZ3JvdW5kLWNvbG9yLCAjREREKTsKICAgIHRleHQtYWxpZ246IHJpZ2h0OwogICAgaGVpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYXItaGVpZ2h0LCAyN3B4KTsKfQouZGlhbG9nLW1pbmltaXplLCAuZGlhbG9nLXJlc3RvcmUsIC5kaWFsb2ctbWF4aW1pemUsIC5kaWFsb2ctY2xvc2UgewogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgYmFja2dyb3VuZC1zaXplOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1iYWNrZ3JvdW5kLXNpemUsIDI3cHgpOwogICAgYmFja2dyb3VuZC1yZXBlYXQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LWJhY2tncm91bmQtcmVwZWF0LCBuby1yZXBlYXQpOwogICAgd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXdpZHRoLCAyN3B4KTsKICAgIGhlaWdodDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtd2lkdGgsIDE4cHgpOwogICAgbWFyZ2luOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1tYXJnaW4sIDNweCk7CiAgICBjdXJzb3I6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LWN1cnNvciwgcG9pbnRlcik7Cn0KLmRpYWxvZy1taW5pbWl6ZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1taW5pbWl6ZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUC8vLzNkM2R5SDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSWhqSStweSswUG81eTAyb3V6M3J6N0Q0WVlRSlpsWjZab2VvcnVDOGZ5VEU4RkFEcz0pKTsKfQouZGlhbG9nLXJlc3RvcmUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtcmVzdG9yZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUEh4OFhaMmRpSDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSXZqSStweSswUG81eTAyb3V6QnJ3RG5YZ2RpSHdsS1hLR3VhVXJHcjRndTQ1elRNb0hQYnY1RHd3S2g4UWlxUUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWF4aW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtbWF4aW1pemUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVAvLy8zZDNkeUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUl0akkrcHkrMFBvNXkwMm91ejNnMzQvM0VCU0lva2FDNUFxcXljbThDYWZOQ1lQWnFuSi9iK0R3d0toNW9DQURzPSkpOwp9Ci5kaWFsb2ctY2xvc2UgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtY2xvc2UtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVBIeDhYZDNkeUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUlwakkrcHkrMFBvNXkwMm91ejN2d0M5WFZCYUpCaWFJcGpxZ0pzaDZvbDhtSnNMZWY2enZlK1dBQUFPdz09KSk7Cn0KLmRpYWxvZy1tb2RhbCB7CiAgICBoZWlnaHQ6IDEwMCU7CiAgICB3aWR0aDogMTAwJTsKICAgIHBvc2l0aW9uOiBmaXhlZDsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLW1vZGFsLWJhY2tncm91bmQtY29sb3IsIHJnYmEoMCwgMCwgMCwgMC4yNSkpOwogICAgei1pbmRleDogLTE7Cn0KLmRpYWxvZy1tYXhpbWl6ZWQgLmRpYWxvZy1tYXhpbWl6ZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1yZXN0b3JlLWJhY2tncm91bmQtaW1hZ2UsIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJZ0FZQUlBQUFQSHg4WFoyZGlINUJBQUFBQUFBTEFBQUFBQWlBQmdBQUFJdmpJK3B5KzBQbzV5MDJvdXpCcndEblhnZGlId2xLWEtHdWFVckdyNGd1NDV6VE1vSFBidjVEd3dLaDhRaXFRQUFPdz09KSk7Cn0KLmRpYWxvZy1tYXhpbWl6ZWQgewogICAgaGVpZ2h0OiAxMDAlOwogICAgd2lkdGg6IDEwMCU7CiAgICBwb3NpdGlvbjogZml4ZWQ7CiAgICB0b3A6IDA7CiAgICBsZWZ0OiAwOwp9Ci5kaWFsb2ctbWluaW1pemVkIHsKICAgIHdpZHRoOiAyMDBweDsKICAgIGhlaWdodDogMjdweDsKICAgIHJpZ2h0OiAwOwp9Ci5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctbWluaW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtcmVzdG9yZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUEh4OFhaMmRpSDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSXZqSStweSswUG81eTAyb3V6QnJ3RG5YZ2RpSHdsS1hLR3VhVXJHcjRndTQ1elRNb0hQYnY1RHd3S2g4UWlxUUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctdGl0bGUgewogICAgZm9udC1zaXplOiAxN3B4Owp9Ci5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctcmVzdG9yZSwKLmRpYWxvZy1taW5pbWl6ZWQgLmRpYWxvZy1jbG9zZSwKLmRpYWxvZy1taW5pbWl6ZWQgLmRpYWxvZy1jb250ZW50IHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLmRpYWxvZy1jbG9zZWQgewogICAgZGlzcGxheTogbm9uZTsKfQo='
                    });
                    self.cssAttached = true;
                }
                self.shadowRoot.appendChild(self.form);
                if (self.intf.mode === 'dialog' || self.intf.dialogOptions !== undefined) {
                    dialogOptions = self.intf.dialogOptions || {};
                    dialogOptions.title = self.intf.title;
                    self.intf.dialog = dialog(dialogOptions);
                    self.intf.dialog.addEventListener('resized', dispatchResize);
                    self.intf.dialog.content.appendChild(self.form);
                    self.shadowRoot.appendChild(self.intf.dialog);
                    self.intf.dialog.attached = true;
                }
                addComponents(defaultComponents);
                addComponents(self.args.components);
                self.intf.form = self.form;
            }
            loadState();
            initSchema();
            if (self.intf.dialog) {
                self.intf.dialog.center();
            }
        }
        function dataSetter(value) {
            if (!self.schema) {
                createTempSchema();
            }
            self.data = value;
            initData();
        }
        function dataGetter() {
            var d = self.data || {};
            Object.keys(self.fields).forEach(function (fieldKey) {
                var cValue = self.fields[fieldKey].component.value;
                Object.assign(d, cValue);
            });
            return d;
        }
        function schemaSetter(value) {
            self.schema = value;
            initSchema();
        }
        function addComponent(name, compProc) {
            if (typeof name !== 'string') { throw new TypeError('Argument 0, name, must be a string.'); }
            if (typeof compProc !== 'string') { throw new TypeError('Argument 1, component procedure, must be a function that returns an object.'); }
            self.componenets[name] = compProc;
        }
        // public interface definitions
        self.intf.init = init;
        self.intf.dispose = dispose;
        self.intf.addComponents = addComponents;
        self.intf.addComponent = addComponent;
        self.intf.getFieldByName = getFieldByName;
        self.intf.fields = self.fields;
        Object.defineProperty(self.intf, 'isValid', {
            get: function () {
                return false;
            }
        });
        Object.defineProperty(self.intf, 'components', {
            get: function () {
                return self.components;
            }
        });
        Object.defineProperty(self.intf, 'data', {
            get: dataGetter,
            set: dataSetter
        });
        Object.defineProperty(self.intf, 'dialogOptions', {
            get: function () {
                return self.dialogOptions;
            },
            set: function (value) {
                self.dialogOptions = value;
            }
        });
        Object.defineProperty(self.intf, 'mode', {
            get: function () {
                return self.mode;
            },
            set: function (value) {
                if (value === 'dialog') {
                    self.mode = 'dialog';
                } else {
                    self.mode = 'block';
                }
                if (self.mode === 'dialog') {
                    if (self.intf.dialog && self.intf.dialog.dispose) {
                        self.intf.dialog.dispose();
                    }
                    self.intf.dialog = dialog(self.dialogOptions);
                    self.intf.dialog.title.innerHTML = self.title;
                    self.intf.dialog.content.appendChild(self.form);
                    self.intf.appendChild(self.intf.dialog);
                    self.intf.dialog.attached = true;
                    requestAnimationFrame(function () {
                        self.intf.dialog.center();
                    });
                } else {
                    if (self.intf.dialog) {
                        self.intf.dialog.attached = false;
                    }
                    self.intf.appendChild(self.form);
                }
            }
        });
        Object.defineProperty(self.intf, 'title', {
            get: function () {
                return self.title;
            },
            set: function (value) {
                self.title = value;
                if (self.intf.dialog) {
                    self.intf.dialog.title.innerHTML = value;
                }
            }
        });
        Object.defineProperty(self.intf, 'schema', {
            get: function () {
                return self.schema;
            },
            set: schemaSetter
        });
        Object.defineProperty(self.intf, 'name', {
            get: function () {
                return self.name;
            },
            set: function (value) {
                self.name = value;
                loadState();
            }
        });
        return self.intf;
    }
    function connectedCallback(el) {
        (el || this).init();
        return;
    }
    PivotForm.prototype = Object.create(window.HTMLElement.prototype);
    if (window.customElements) {
        PivotForm.prototype.disconnectedCallback = function () {
            return;
        };
        PivotForm.prototype.getObservableAttributes = function () {
            return attributeList;
        };
        PivotForm.prototype.connectedCallback = connectedCallback;
        PivotForm.prototype.adoptedCallback = function () {
            return;
        };
        PivotForm.prototype.attributeChangedCallback = function (attrName, oldVal, newVal) {
            this[attrName] = newVal;
            return;
        };
        window.customElements.define('pivot-form', PivotForm);
    }
    function pivotFormFactory(args) {
        args = args || {};
        requestAnimationFrame(function () {
            window.dispatchEvent(new Event('resize'));
        });
        if (window.customElements) {
            return new PivotForm(args);
        }
        var f = new PivotForm(args);
        if (args.parentNode) {
            args.parentNode.appendChild(f.form);
        }
        attributeList.forEach(function (attrKey) {
            if (args[attrKey]) {
                f[attrKey] = args[attrKey];
            }
        });
        if (!f.form) {
            connectedCallback(f);
        }
        return f;
    }
    window.pivotForm = pivotFormFactory;
    return pivotFormFactory;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/*!*********************************!*\
  !*** ./lib/components/index.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, requestAnimationFrame: false*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../util.js */ 0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (util) {
    'use strict';
    var components = {}, ce = util.createElement, sp = util.setProperties;
    // components that contain other components must be described here because
    // of the inherit circular reference to the components module
    function inputComponentFactory(inputOptions) {
        return function (header, index, data, intf) {
            var component = ce('div', null, {className: 'component'}),
                label = ce('div', component, {className: 'label'}),
                input = ce('input', component, inputOptions);
            component.containerStyle = {};
            label.innerHTML = header.name;
            component.header = header;
            component.label = label;
            input.onchange = function () {
                data[header.name] = input.value;
            };
            Object.defineProperty(component, 'value', {
                get: function () {
                    var d = {};
                    d[header.name] = input.value;
                    return d;
                },
                set: function (value) {
                    var v = value[header.name];
                    input.value = v === undefined ? '' : v;
                }
            });
            sp(input, header.style);
            sp(label, header.labelStyle);
            sp(component, header.componentStyle);
            sp(component.containerStyle, header.containerStyle);
            util.asyncValueSetter(component);
            component.addEventListener = input.addEventListener;
            component.removeEventListener = input.removeEventListener;
            return component;
        };
    }
    // html 4 input types
    ['button', 'checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'text',
        // html 5 input types
        'color', 'date', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time',
        'url', 'week'].forEach(function (typeKey) {
        components[typeKey] = inputComponentFactory({className: 'input', type: typeKey});
    });
    components.select = function (header, index, data, intf) {
        var component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'}),
            input = ce('select', component, {className: 'select'}),
            options = [];
        label.innerHTML = header.name;
        component.label = label;
        component.containerStyle = {};
        sp(input, header.style);
        sp(label, header.labelStyle);
        sp(component, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        if (header.enum) {
            header.enum.forEach(function (item) {
                var option;
                if (!Array.isArray(item)) { item = [item, item]; }
                option = ce('option', input, {value: item[0], innerHTML: item[1]});
                sp(option, header.optionStyle);
                options.push(option);
            });
        }
        input.onchange = function () {
            data[header.name] = input.value;
        };
        Object.defineProperty(component, 'value', {
            get: function () {
                var d = {};
                d[header.name] = input.value;
                return d;
            },
            set: function (value) {
                input.value = value[header.name];
            }
        });
        util.asyncValueSetter(component);
        component.addEventListener = input.addEventListener;
        component.removeEventListener = input.removeEventListener;
        return component;
    };
    components.title = function (header, index, data, intf) {
        var component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'});
        label.innerHTML = header.name;
        component.containerStyle = {};
        sp(label, header.style);
        sp(component, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        Object.defineProperty(component, 'value', {
            get: function () {
                var d = {};
                d[header.name] = label.innerHTML;
                return d;
            },
            set: function (value) {
                label.innerHTML = value[header.name];
            }
        });
        return component;
    };
    components.HTMLElement = function (header, index, data, intf) {
        return ce(header.tagName, null, header);
    };
    components.button = function (header, index, data, intf) {
        return ce('button', null, header);
    };
    components.string = components.text;
    components['canvas-datagrid'] = function (header, index, data, intf) {
        var pContext = this,
            component = ce('div', null, {className: 'canvas-datagrid-child'}),
            grid = window.canvasDatagrid();
        component.containerStyle = {};
        component.appendChild(grid);
        Object.keys(header).forEach(function (propertyKey) {
            grid[propertyKey] = header[propertyKey];
        });
        grid.name = pContext.name ? (pContext.name + '_canvas-datagrid_' + index) : undefined;
        sp(grid, header.style);
        sp(component, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        component.resize = function () {
            grid.resize(true);
        };
        function changeEvent() {
            // break circular refs
            if (!data) { return; }
            data[header.name] = JSON.parse(JSON.stringify(grid.data));
            component.dispatchEvent('change', {data: data});
        }
        util.addEventInterface(component, header, index, data, intf);
        grid.addEventListener('datachanged', changeEvent);
        grid.addEventListener('endedit', changeEvent);
        Object.defineProperty(component, 'value', {
            get: function () {
                var d = {};
                d[header.name] = grid.data;
                return d;
            },
            set: function (value) {
                grid.data = value[header.name];
            }
        });
        return component;
    };
    components['pivot-form'] = function (header, index, data, intf) {
        var pContext = this,
            f,
            name = pContext.name ? (pContext.name + '_pivot-form_' + index) : undefined;
        f = window.pivotForm();
        f.containerStyle = {};
        f.className = 'pivot-form-child';
        f.name = name;
        f.schema = header.schema;
        f.data = data;
        f.addComponents(pContext.components);
        sp(f.containerStyle, header.containerStyle);
        sp(f, header.style);
        Object.defineProperty(f, 'value', {
            get: function () {
                return f.data;
            },
            set: function (value) {
                Object.keys(f.fields).forEach(function (fieldKey) {
                    f.fields[fieldKey].value = value;
                });
            }
        });
        return f;
    };
    components.tabs = function (header, index, data, intf) {
        var componentContext = this,
            tabComponents = [],
            component = ce('div', null, {className: 'tabbed-component'}),
            tabs = ce('div', component, {className: 'tabs'}),
            activeTab,
            defaultTab = header.defaultTabIndex || 0;
        component.containerStyle = {};
        function activateTab(activeTabName) {
            var activeTabItem = header.tabs[activeTabName];
            activeTab = activeTabName;
            Object.keys(header.tabs).forEach(function (tabName) {
                var tabItem = header.tabs[tabName];
                tabItem.tab.classList.add('tab-inactive');
                tabItem.tab.classList.remove('tab-active');
                tabItem.content.classList.remove('tab-content-active');
                if (tabItem.content.parentNode) {
                    tabItem.content.parentNode.removeChild(tabItem.content);
                }
            });
            activeTabItem.tab.classList.add('tab-active');
            activeTabItem.tab.classList.remove('tab-inactive');
            activeTabItem.content.classList.add('tab-content-active');
            component.containerStyle = {
                width: '100%'
            };
            component.appendChild(activeTabItem.content);
            activeTabItem.resize();
        }
        Object.keys(header.tabs).forEach(function (tabName) {
            var tabItem = header.tabs[tabName];
            tabItem.components = [];
            tabItem.tab = ce('div', tabs, {
                className: 'tab',
                events: {
                    click: function (e) {
                        if (activeTab === tabName) { return; }
                        activateTab(tabName);
                    }
                },
                innerHTML: tabName
            });
            tabItem.content = ce('div', null, { className: 'tab-content' });
            tabItem.forEach(function (header, index) {
                var t = components[header.type] || components.string,
                    subComponent = t.apply(componentContext, [header, index, data, intf]);
                subComponent.addEventListener('change', function () {
                    intf.dispatchEvent('change', {data: data});
                });
                tabComponents.push(subComponent);
                tabItem.components.push(subComponent);
                tabItem.content.appendChild(subComponent);
            });
            tabItem.resize = function () {
                tabItem.components.forEach(function (subComponent) {
                    if (subComponent.resize) {
                        requestAnimationFrame(subComponent.resize);
                    }
                });
            };
        });
        util.addEventInterface(component, header, index, data, intf);
        sp(component, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        Object.keys(header.tabs).forEach(function (tabName, index) {
            if (defaultTab === index) { return; }
            requestAnimationFrame(function () { activateTab(tabName); });
        });
        requestAnimationFrame(function () { activateTab(Object.keys(header.tabs)[defaultTab]); });
        Object.defineProperty(component, 'value', {
            get: function () {
                var d = {};
                tabComponents.forEach(function (component) {
                    Object.assign(d, component.value);
                });
                return d;
            },
            set: function (value) {
                tabComponents.forEach(function (component) {
                    component.value = value;
                });
                return;
            }
        });
        return component;
    };
    return components;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 3 */
/*!***********************!*\
  !*** ./lib/dialog.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, performance: false, Event: false*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./util.js */ 0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (util) {
    'use strict';
    var ce = util.createElement;
    function dialogModule(args) {
        args = args || {};
        var self = {},
            intf = ce('div', null, {className: 'dialog'});
        self.intf = intf;
        intf.minWidth = 300;
        intf.minHeight = 27;
        // a rough area were bandit pixels hang out
        self.borderZone = 5;
        intf.attached = false;
        function resizeMouseHover(ev) {
            if (self.moving) { return; }
            if (self.minimized) { return; }
            if (self.maximized) { return; }
            self.borderResizeCursor = 'auto';
            self.borderResizeMode = undefined;
            var b = self.borderZone,
                x = ev.layerX,
                y = ev.layerY,
                height = intf.offsetHeight,
                width = intf.offsetWidth,
                n = y < b,
                w = x < b,
                e = x - width + b > 0,
                s = y - height + b > 0,
                m = y < self.titleBar.offsetHeight;
            self.borderResizeMode = {n: n, s: s, e: e, w: w, m: m};
            if (n && w) {
                self.borderResizeCursor = 'nwse-resize';
            } else if (n && e) {
                self.borderResizeCursor = 'nesw-resize';
            } else if (s && w) {
                self.borderResizeCursor = 'nesw-resize';
            } else if (s && e) {
                self.borderResizeCursor = 'nwse-resize';
            } else if (n) {
                self.borderResizeCursor = 'ns-resize';
            } else if (s) {
                self.borderResizeCursor = 'ns-resize';
            } else if (e) {
                self.borderResizeCursor = 'ew-resize';
            } else if (w) {
                self.borderResizeCursor = 'ew-resize';
            }
            intf.style.cursor = self.borderResizeCursor;
        }
        function moveResizeDialog(e) {
            if (self.minimized) { return; }
            if (self.maximized) { return; }
            var s = self.startMove,
                r = self.borderResizeMode,
                deltaY = (e.clientY -  s.clientY),
                deltaX = (e.clientX -  s.clientX);
            intf.classList.add('noselect');
            if (r.n || r.s || r.e || r.w) {
                if (r.n) {
                    intf.style.top = s.offsetTop + deltaY + 'px';
                    intf.style.height = Math.max(intf.minHeight, s.offsetHeight - deltaY) + 'px';
                }
                if (r.s) {
                    intf.style.height = Math.max(intf.minHeight, s.offsetHeight + deltaY) + 'px';
                }
                if (r.w) {
                    intf.style.left = s.offsetLeft + deltaX + 'px';
                    intf.style.width = Math.max(intf.minWidth, s.offsetWidth - deltaX) + 'px';
                }
                if (r.e) {
                    intf.style.width = Math.max(intf.minWidth, s.offsetWidth + deltaX) + 'px';
                }
                window.dispatchEvent(new Event('resize'));
            } else if (r.m) {
                intf.style.top = s.offsetTop + deltaY + 'px';
                intf.style.left = s.offsetLeft + deltaX + 'px';
            }
            e.stopPropagation();
        }
        function center(verticalAlso) {
            intf.style.left = (window.innerWidth / 2) - (self.intf.offsetWidth / 2) + 'px';
            if (verticalAlso) {
                intf.style.top = document.scrollingElement.scrollTop + (window.innerHeight / 2) - (self.intf.offsetHeight / 2) + 'px';
            } else {
                intf.style.top = document.scrollingElement.scrollTop + 20 + 'px';
            }
        }
        function endMove(e) {
            self.moving = false;
            intf.classList.remove('noselect');
            document.removeEventListener('mouseup', endMove);
            document.removeEventListener('mousemove', moveResizeDialog);
        }
        function beginDialogMove(e) {
            if (self.minimized) { return; }
            if (self.maximized) { return; }
            self.moving = true;
            self.startMove = {
                clientX: e.clientX,
                clientY: e.clientY,
                offsetWidth: intf.offsetWidth,
                offsetHeight: intf.offsetHeight,
                offsetLeft: intf.offsetLeft,
                offsetTop: intf.offsetTop,
            };
            document.addEventListener('mouseup', endMove);
            document.addEventListener('mousemove', moveResizeDialog);
        }
        function open() {
            intf.classList.remove('dialog-closed');
            window.dispatchEvent(new Event('resize'));
        }
        function close() {
            intf.classList.add('dialog-closed');
            window.dispatchEvent(new Event('resize'));
        }
        function restoreSavedSize() {
            intf.style.top = self.restoreRect.top + 'px';
            intf.style.left = self.restoreRect.left + 'px';
            intf.style.height = self.restoreRect.height + 'px';
            intf.style.width = self.restoreRect.width + 'px';
        }
        function minimize() {
            self.minimized = !self.minimized;
            if (self.minimized) {
                self.restoreRect = intf.getBoundingClientRect();
                intf.classList.add('dialog-minimized');
                self.controlBoxMaximize.classList.add('dialog-restore');
                window.dispatchEvent(new Event('resize'));
                intf.style.top = '';
                intf.style.left = '';
                intf.style.width = '';
                intf.style.height = '';
                return;
            }
            restoreSavedSize();
            intf.classList.remove('dialog-minimized');
            self.controlBoxMaximize.classList.remove('dialog-restore');
            window.dispatchEvent(new Event('resize'));
        }
        function maximize() {
            self.maximized = !self.maximized;
            if (self.maximized) {
                self.restoreRect = intf.getBoundingClientRect();
                intf.classList.add('dialog-maximized');
                self.controlBoxMaximize.classList.add('dialog-restore');
                intf.style.top = '0px';
                intf.style.left = '0px';
                intf.style.width = window.innerWidth + 'px';
                intf.style.height = window.innerHeight + 'px';
                window.dispatchEvent(new Event('resize'));
                return;
            }
            intf.classList.remove('dialog-maximized');
            self.controlBoxMaximize.classList.remove('dialog-restore');
            restoreSavedSize();
            window.dispatchEvent(new Event('resize'));
        }
        function init() {
            self.modal = ce('div', null, {className: 'dialog-modal'});
            self.titleBar = ce('div', intf, {className: 'dialog-title-bar'});
            self.title = ce('span', self.titleBar, {className: 'dialog-title', innerHTML: args.title || '' });
            self.content = ce('div', intf, {className: 'dialog-content'});
            self.card = ce('div', null, {className: 'dialog-card'});
            self.controlBoxMinimize = ce('div', null, {className: 'dialog-minimize'});
            self.controlBoxMaximize = ce('div', null, {className: 'dialog-maximize'});
            self.controlBoxClose = ce('div', self.titleBar, {className: 'dialog-close'});
            self.titleBar.addEventListener('mousedown', beginDialogMove);
            window.addEventListener('resize', function () {
                if (self.maximized) {
                    intf.style.width = window.innerWidth + 'px';
                    intf.style.height = window.innerHeight + 'px';
                }
            });
            intf.addEventListener('mousedown', beginDialogMove);
            intf.addEventListener('mousemove', function (e) {
                resizeMouseHover(e);
            });
            // interface
            intf.content = self.content;
            intf.card = self.card;
            intf.titleBar = self.titleBar;
            Object.defineProperty(intf, 'title', {
                get: function () {
                    return self.title;
                }
            });
            intf.controlBoxMinimize = self.controlBoxMinimize;
            intf.controlBoxMaximize = self.controlBoxMaximize;
            intf.controlBoxClose = self.controlBoxClose;
            intf.center = center;
            Object.defineProperty(intf, 'modal', {
                get: function (value) {
                    return self.modal;
                },
                set: function (value) {
                    self.modal = !!value;
                    if (self.modal) {
                        document.body.appendChild(self.modal);
                    } else {
                        document.body.removeChild(self.modal);
                    }
                    window.dispatchEvent(new Event('resize'));
                }
            });
            Object.defineProperty(self.titleBar, 'value', {
                get: function () {
                    return self.title.innerHTML;
                },
                set: function (value) {
                    self.card.innerHTML = value;
                    self.title.innerHTML = value;
                }
            });
            intf.open = open;
            intf.maximize = maximize;
            intf.minimize = minimize;
            intf.maximize = maximize;
            //self.titleBar.ondblclick = maximize;
            self.controlBoxClose.onclick = close;
            self.controlBoxMinimize.onclick = minimize;
            self.controlBoxMaximize.onclick = maximize;
        }
        init();
        return intf;
    }
    return dialogModule;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);
});
//# sourceMappingURL=pivot-form.map
