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
/*globals define: false, Event: false*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
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
/*globals define: false, performance: false, requestAnimationFrame: false, Event: false*/
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
        self.fields = [];
        self.idCounter = -1;
        self.components = {};
        self.data = {};
        self.initializingFields = [];
        self.intf = window.customElements ? eval('Reflect.construct(HTMLElement, [], new.target)') : ce('section');
        util.addEventInterface(self.intf);
        function getNewId() {
            self.idCounter += 1;
            return self.idCounter.toString(36);
        }
        function getFieldsByPropertyValue(key, value) {
            var found = [];
            self.fields.forEach(function (field) {
                if (field.component && field.component.isContainer) {
                    found = found.concat(field.component.getFieldsByPropertyValue(key, value));
                }
                if (value === field[key] || (field.header && value === field.header[key])) {
                    found.push(field);
                }
            });
            return found;
        }
        function getFieldByName(value) {
            return getFieldsByPropertyValue('name', value)[0];
        }
        function getFieldById(value) {
            return getFieldsByPropertyValue('id', value)[0];
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
            self.fields.forEach(function (field, organicFieldIndex) {
                organicFieldIndex += 1;
                var container = ce('div', null, {className: 'component-item'}),
                    handle = ce('div', field.header.static ? null : container, {className: 'item-handle'}),
                    dataStub = {};
                if (field.header.hidden) {
                    container.style.display = 'none';
                }
                function initialized() {
                    field.component.removeEventListener('initialized', initialized);
                    delete self.initializingFields[organicFieldIndex];
                    if (self.initializingFields.filter(function (i) { return !!i; })
                            .length === 0 && self.preInitDataSet) {
                        var f = self.preInitDataSet;
                        delete self.preInitDataSet;
                        self.intf.data = f;
                    }
                }
                field.container = container;
                field.handle = container;
                container.setAttribute('data-uniqueId', self.uniqueId);
                handle.beginReorderFieldFunction = beginReorderField(organicFieldIndex, container);
                handle.addEventListener('mousedown', handle.beginReorderFieldFunction);
                container.organicFieldIndex = organicFieldIndex;
                container.name = field.name;
                self.fieldOrder[organicFieldIndex] = self.fieldOrder[organicFieldIndex] === undefined
                    ? organicFieldIndex : self.fieldOrder[organicFieldIndex];
                container.appendChild(field.component);
                sp(container.style, field.component.containerStyle);
                sp(handle, field.component.handleStyle);
                sp(container.style, field.containerStyle);
                sp(handle, field.handleStyle);
                self.form.appendChild(container);
                self.inputFieldOrganicOrder.push(container);
                if (field.header.name && field.header.value) {
                    dataStub[field.header.name] = field.header.value;
                    self.initializingFields[organicFieldIndex] = field;
                    field.component.addEventListener('initialized', initialized);
                    field.component.value = dataStub;
                }
            });
            updateFlexOrder();
        }
        function addComponents(obj) {
            if (!obj) { return; }
            if (typeof obj !== 'object') { throw new TypeError('Component object must be an object'); }
            Object.keys(obj).forEach(function (type) {
                self.components[type] = obj[type];
            });
        }
        function initData(newData) {
            if (!newData) { return; }
            if (!self.initialized || self.initializingFields.filter(function (i) { return !!i; }).length > 0) {
                self.preInitDataSet = newData;
                return;
            }
            // set component values
            self.fields.forEach(function (field) {
                field.component.value = newData;
            });
        }
        function disposeFields() {
            self.fields.forEach(function (field) {
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
            self.idCounter = -1;
            self.fields = [];
            self.schema.forEach(function (header, index) {
                var t = self.components.string,
                    id = header.name === undefined ? getNewId() : header.name,
                    component;
                if (getFieldById(id)) {
                    throw new Error('Duplicate id in schema ' + id);
                }
                if (self.components[header.type]) {
                    t = self.components[header.type];
                }
                component = t.apply(self.intf, [header, index, self]);
                component.addEventListener('change', function () {
                    self.intf.dispatchEvent('change', {data: self.data});
                });
                self.fields.push({
                    name: header.name === undefined ? '__' + id : header.name,
                    id: id,
                    header: header,
                    component: component,
                    index: index
                });
            });
            createDom();
            initData(self.data);
        }
        function dispatchResize() {
            self.intf.dispatchEvent('resize');
            requestAnimationFrame(function () {
                window.dispatchEvent(new Event('resize'));
            });
        }
        function init() {
            if (!self.initialized) {
                self.shadowRoot = self.intf.attachShadow ? self.intf.attachShadow({mode: 'open'}) : self.intf;
                self.shadowRoot.appendChild(self.form);
                self.inputFieldOrganicOrder = [];
                if (!self.cssAttached) {
                    ce('link', self.shadowRoot, {
                        rel: 'stylesheet',
                        href: /^file:\/\/\//.test(window.location) ? '../lib/index.css' : 'data:text/css;base64,Lm5vc2VsZWN0LCAudGFicywgLmRpYWxvZy10aXRsZS1iYXIgewogICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOwogICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7CiAgICB1c2VyLXNlbGVjdDogbm9uZTsKfQouY29tcG9uZW50IHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWNvbXBvbmVudC13aWR0aCwgMTAwJSk7Cn0KLmxhYmVsIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLXdpZHRoLCAxMDBweCk7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLWRpc3BsYXksIGlubGluZS1ibG9jayk7CiAgICBmb250LWZhbWlseTogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1mb250LWZhbWlseSwgc2Fucy1zZXJpZik7CiAgICBjb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1jb2xvciwgIzAwMCk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLWJhY2tncm91bmQtY29sb3IsIHRyYW5zcGFyZW50KTsKfQoudGFiYmVkLWNvbXBvbmVudCB7CiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOwogICAgd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbXBvbmVudC13aWR0aCwgJzEwMCUnKTsKfQoudGFicyB7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb21wb25lbnQtZGlzcGxheSwgaW5saW5lLWZsZXgpOwogICAgZmxleC1kaXJlY3Rpb246IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbXBvbmVudC1mbGV4LWRpcmVjdGlvbiwgcm93KTsKICAgIGZsZXgtd3JhcDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29tcG9uZW50LWZsZXgtd3JhcCwgd3JhcC1yZXZlcnNlKTsKICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci10b3AtbGVmdC1yYWRpdXMsIDRweCk7CiAgICBib3JkZXItbGVmdC1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItbGVmdC13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXdpZHRoLCAxcHgpOwogICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1jb2xvciwgIzk5OSk7CiAgICBib3JkZXItYm90dG9tLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci1ib3R0b20td2lkdGg6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci13aWR0aCwgMXB4KTsKICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1jb2xvciwgIzk5OSk7CiAgICB3aWR0aDogY2FsYygxMDAlIC0gMXB4KTsKfQoudGFiIHsKICAgIHBhZGRpbmctdG9wOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1wYWRkaW5nLXRvcCwgNHB4KTsKICAgIHBhZGRpbmctbGVmdDogdmFyKC0tcGl2b3QtZm9ybS10YWItcGFkZGluZy1sZWZ0LCA0cHgpOwogICAgcGFkZGluZy1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLXBhZGRpbmctYm90dG9tLCA0cHgpOwogICAgcGFkZGluZy1yaWdodDogdmFyKC0tcGl2b3QtZm9ybS10YWItcGFkZGluZy1yaWdodCwgNHB4KTsKICAgIGNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb2xvciwgIzMzMyk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1iYWNrZ3JvdW5kLWNvbG9yLCAjRUVFKTsKICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci10b3AtbGVmdC1yYWRpdXMsIDRweCk7CiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMsIDRweCk7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1jb2xvciwgIzk5OSk7CiAgICBib3JkZXItc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItd2lkdGgsIDFweCk7CiAgICBib3JkZXItYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItYm90dG9tLCBub25lKTsKICAgIGJvcmRlci1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItbGVmdCwgbm9uZSk7CiAgICBmb250LXNpemU6IHZhcigtLXBpdm90LWZvcm0tdGFiLWZvbnQtc2l6ZSwgMTRweCk7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1kaXNwbGF5LCBpbmxpbmUtYmxvY2spOwogICAgY3Vyc29yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jdXJzb3IsIHBvaW50ZXIpOwogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItbWFyZ2luLWJvdHRvbSwgMCk7CiAgICBtYXJnaW4tbGVmdDogdmFyKC0tcGl2b3QtZm9ybS10YWItbWFyZ2luLWxlZnQsIDApOwogICAgZm9udC1mYW1pbHk6IHZhcigtLXBpdm90LWZvcm0tdGFiLWZvbnQtZmFtaWx5LCBzYW5zLXNlcmlmKTsKICAgIGJveC1zaGFkb3c6IGluc2V0IDAgLTJweCAycHggdmFyKC0tcGl2b3QtZm9ybS10YWItaW5hY3RpdmUtYm94LXNoYWRvdy1jb2xvciwgI0RERCk7Cn0KLnRhYi1hY3RpdmUgewogICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1hY3RpdmUtYm9yZGVyLWNvbG9yLCAjQUFBKTsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yLCAjRkVGRUZFKTsKICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLWFjdGl2ZS1tYXJnaW4tYm90dG9tLCAtMXB4KTsKICAgIGJveC1zaGFkb3c6IGluc2V0IDAgLTNweCAzcHggdHJhbnNwYXJlbnQ7Cn0KLnRhYi1jb250ZW50IHsKICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tY29udGVudC1tYXJnaW4tYm90dG9tLCA1cHgpOwogICAgcGFkZGluZzogdmFyKC0tcGl2b3QtZm9ybS1jb250ZW50LXBhZGRpbmcsIDdweCk7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0tY29udGVudC1ib3JkZXItY29sb3IsICM5OTkpOwogICAgYm9yZGVyLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLWNvbnRlbnQtYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tY29udGVudC1ib3JkZXItd2lkdGgsIDFweCk7CiAgICBib3JkZXItdG9wOiBub25lOwp9Ci50YWItY29udGVudC1pbmFjdGl2ZSB7CiAgICBkaXNwbGF5OiBub25lOwp9Ci50YWItY29udGVudC1hY3RpdmUgewogICAgZGlzcGxheTogYmxvY2s7Cn0KLml0ZW0taGFuZGxlLCAucmVvcmRlci1tYXJrZXIgewogICAgY3Vyc29yOiBtb3ZlOwogICAgd2lkdGg6IDhweDsKICAgIG1pbi13aWR0aDogOHB4OwogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgZmxvYXQ6IGxlZnQ7CiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICBtYXJnaW4tbGVmdDogNXB4OwogICAgbWFyZ2luLXJpZ2h0OiA1cHg7CiAgICBtYXJnaW4tYm90dG9tOiA1cHg7CiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICBjb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtY29sb3IsICMzMzMpOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtYmFja2dyb3VuZC1jb2xvciwgI0VFRSk7CiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1ib3JkZXItcmFkaXVzLCA0cHgpOwogICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1ib3JkZXItY29sb3IsICNDQ0MpOwogICAgYm9yZGVyLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtYm9yZGVyLXdpZHRoLCAxcHgpOwp9Ci5yZW9yZGVyLW1hcmtlcjpiZWZvcmUsIC5pdGVtLWhhbmRsZTpiZWZvcmUgewogICAgY29udGVudDogdmFyKC0tcGl2b3QtZm9ybS1yZW9yZGVyLW1hcmtlci1jb250ZW50LCAnXDAwMjA1RScpOwp9Ci5pbnB1dCB7CiAgICBwYWRkaW5nLXRvcDogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1wYWRkaW5nLXRvcCwgMnB4KTsKICAgIHBhZGRpbmctbGVmdDogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1wYWRkaW5nLWxlZnQsIDRweCk7CiAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1wYWRkaW5nLWJvdHRvbSwgMnB4KTsKICAgIHBhZGRpbmctcmlnaHQ6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtcGFkZGluZy1yaWdodCwgM3B4KTsKICAgIG1hcmdpbi10b3A6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtbWFyZ2luLXRvcCwgMnB4KTsKICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LW1hcmdpbi1sZWZ0LCAxcHgpOwogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1tYXJnaW4tYm90dG9tLCAycHgpOwogICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWlucHV0LW1hcmdpbi1yaWdodCwgMXB4KTsKICAgIGZvbnQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1mb250LXNpemUsIDEycHgpOwp9Ci5jb21wb25lbnQtaXRlbSB7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLWNvbXBvbmVudCwgaW5saW5lLWZsZXgpOwp9Ci5yZW9yZGVyLWRyYWctb3ZlciAuaXRlbS1oYW5kbGU6bnRoLWNoaWxkKDEpIHsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWRyYWctYmFja2dyb3VuZC1jb2xvciwgcmdiYSgxMTAsIDE2OCwgMjU1LCAxKSk7Cn0KLnJlb3JkZXItbWFya2VyIHsKICAgIGNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1yZW9yZGVyaW5nLW1hcmtlci1jb2xvciwgIzMzMyk7CiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1yZW9yZGVyaW5nLW1hcmtlci1jb2xvciwgI0VFRSk7CiAgICBoZWlnaHQ6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLXJlb3JkZXJpbmctbWFya2VyLWhlaWdodCwgMjNweCk7CiAgICB3aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtcmVvcmRlcmluZy1tYXJrZXItd2lkdGgsIDEwcHgpOwogICAgcG9zaXRpb246IGFic29sdXRlOwogICAgei1pbmRleDogMTA7Cn0KLnBpdm90LWZvcm0gewogICAgZGlzcGxheTogdmFyKC0tcGl2b3QtZm9ybS1kaXNwbGF5LCBmbGV4KTsKICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1waXZvdC1mb3JtLWZsZXgtZGlyZWN0aW9uLCByb3cpOwogICAgZmxleC13cmFwOiB2YXIoLS1waXZvdC1mb3JtLWZsZXgtd3JhcCwgd3JhcCk7Cn0KLmNhbnZhcy1kYXRhZ3JpZC1jaGlsZCB7CiAgICB3aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1jYW52YXMtZGF0YWdyaWQtd2lkdGgsIDEwMCUpOwogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS1jYW52YXMtZGF0YWdyaWQtbWFyZ2luLWJvdHRvbSwgNXB4KTsKfQouZGlhbG9nIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy13aWR0aCwgNTAwcHgpOwogICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1ib3JkZXItY29sb3IsICMwMDApOwogICAgYm9yZGVyLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctYm9yZGVyLXdpZHRoLCAxcHgpOwogICAgcG9zaXRpb246IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXBvc2l0aW9uLCBhYnNvbHV0ZSk7CiAgICBvdmVyZmxvdzogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctb3ZlcmZsb3csIGhpZGRlbik7CiAgICB6LWluZGV4OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy16LWluZGV4LCAxMDAwMCk7Cn0KLmRpYWxvZy1jb250ZW50IHsKICAgIHBhZGRpbmc6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRlbnQtYmFja2dyb3VuZC1wYWRkaW5nLCA1cHgpOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udGVudC1iYWNrZ3JvdW5kLWNvbG9yLCAjRkZGKTsKICAgIG1pbi1oZWlnaHQ6IDEwMCU7CiAgICBtaW4td2lkdGg6IDEwMCU7Cn0KLmRpYWxvZy10aXRsZSB7CiAgICBmbG9hdDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtZmxvYXQsIGxlZnQpOwogICAgZm9udC1zaXplOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1mb250LXNpemUsIDIwcHgpOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLW1hcmdpbi1sZWZ0LCA3cHgpOwogICAgbWFyZ2luLXRvcDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtbWFyZ2luLXRvcCwgM3B4KTsKICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1mb250LWZhbWlseSwgc2Fucy1zZXJpZik7CiAgICBjdXJzb3I6IGRlZmF1bHQ7Cn0KLmRpYWxvZy10aXRsZS1iYXIgewogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFja2dyb3VuZC1jb2xvciwgI0RERCk7CiAgICB0ZXh0LWFsaWduOiByaWdodDsKICAgIGhlaWdodDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFyLWhlaWdodCwgMjdweCk7Cn0KLmRpYWxvZy1taW5pbWl6ZSwgLmRpYWxvZy1yZXN0b3JlLCAuZGlhbG9nLW1heGltaXplLCAuZGlhbG9nLWNsb3NlIHsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtYmFja2dyb3VuZC1zaXplLCAyN3B4KTsKICAgIGJhY2tncm91bmQtcmVwZWF0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1iYWNrZ3JvdW5kLXJlcGVhdCwgbm8tcmVwZWF0KTsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC13aWR0aCwgMjdweCk7CiAgICBoZWlnaHQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXdpZHRoLCAxOHB4KTsKICAgIG1hcmdpbjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtbWFyZ2luLCAzcHgpOwogICAgY3Vyc29yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1jdXJzb3IsIHBvaW50ZXIpOwp9Ci5kaWFsb2ctbWluaW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtbWluaW1pemUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVAvLy8zZDNkeUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUloakkrcHkrMFBvNXkwMm91ejNyejdENFlZUUpabFo2Wm9lb3J1QzhmeVRFOEZBRHM9KSk7Cn0KLmRpYWxvZy1yZXN0b3JlIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXJlc3RvcmUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVBIeDhYWjJkaUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUl2akkrcHkrMFBvNXkwMm91ekJyd0RuWGdkaUh3bEtYS0d1YVVyR3I0Z3U0NXpUTW9IUGJ2NUR3d0toOFFpcVFBQU93PT0pKTsKfQouZGlhbG9nLW1heGltaXplIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LW1heGltaXplLWJhY2tncm91bmQtaW1hZ2UsIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJZ0FZQUlBQUFQLy8vM2QzZHlINUJBQUFBQUFBTEFBQUFBQWlBQmdBQUFJdGpJK3B5KzBQbzV5MDJvdXozZzM0LzNFQlNJb2thQzVBcXF5Y204Q2FmTkNZUFpxbkovYitEd3dLaDVvQ0FEcz0pKTsKfQouZGlhbG9nLWNsb3NlIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LWNsb3NlLWJhY2tncm91bmQtaW1hZ2UsIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJZ0FZQUlBQUFQSHg4WGQzZHlINUJBQUFBQUFBTEFBQUFBQWlBQmdBQUFJcGpJK3B5KzBQbzV5MDJvdXozdndDOVhWQmFKQmlhSXBqcWdKc2g2b2w4bUpzTGVmNnp2ZStXQUFBT3c9PSkpOwp9Ci5kaWFsb2ctbW9kYWwgewogICAgaGVpZ2h0OiAxMDAlOwogICAgd2lkdGg6IDEwMCU7CiAgICBwb3NpdGlvbjogZml4ZWQ7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1tb2RhbC1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDAsIDAsIDAsIDAuMjUpKTsKICAgIHotaW5kZXg6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLW1vZGFsLXotaW5kZXgsIDk5OTkpOwp9Ci5kaWFsb2ctbWF4aW1pemVkIC5kaWFsb2ctbWF4aW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtcmVzdG9yZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUEh4OFhaMmRpSDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSXZqSStweSswUG81eTAyb3V6QnJ3RG5YZ2RpSHdsS1hLR3VhVXJHcjRndTQ1elRNb0hQYnY1RHd3S2g4UWlxUUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWF4aW1pemVkIHsKICAgIGhlaWdodDogMTAwJTsKICAgIHdpZHRoOiAxMDAlOwogICAgcG9zaXRpb246IGZpeGVkOwogICAgdG9wOiAwOwogICAgbGVmdDogMDsKfQouZGlhbG9nLW1pbmltaXplZCB7CiAgICB3aWR0aDogMjAwcHg7CiAgICBoZWlnaHQ6IDI3cHg7CiAgICByaWdodDogMDsKfQouZGlhbG9nLW1pbmltaXplZCAuZGlhbG9nLW1pbmltaXplIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXJlc3RvcmUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVBIeDhYWjJkaUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUl2akkrcHkrMFBvNXkwMm91ekJyd0RuWGdkaUh3bEtYS0d1YVVyR3I0Z3U0NXpUTW9IUGJ2NUR3d0toOFFpcVFBQU93PT0pKTsKfQouZGlhbG9nLW1pbmltaXplZCAuZGlhbG9nLXRpdGxlIHsKICAgIGZvbnQtc2l6ZTogMTdweDsKfQouZGlhbG9nLW1pbmltaXplZCAuZGlhbG9nLXJlc3RvcmUsCi5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctY2xvc2UsCi5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctY29udGVudCB7CiAgICBkaXNwbGF5OiBub25lOwp9Ci5kaWFsb2ctY2xvc2VkIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0K'
                    });
                    self.cssAttached = true;
                }
                self.shadowRoot.appendChild(self.form);
                if (self.intf.mode === 'dialog' || self.intf.dialogOptions !== undefined) {
                    dialogOptions = self.intf.dialogOptions || {};
                    dialogOptions.title = self.intf.title;
                    self.dialog = dialog(dialogOptions);
                    self.dialog.addEventListener('resized', dispatchResize);
                    self.dialog.content.appendChild(self.form);
                    self.shadowRoot.appendChild(self.dialog);
                    self.dialog.attached = true;
                }
                addComponents(defaultComponents);
                addComponents(self.args.components);
                self.intf.form = self.form;
                self.initialized = true;
            }
            loadState();
            initSchema();
            if (self.dialog) {
                self.dialog.center();
            }
        }
        function dataSetter(value) {
            if (!self.schema) {
                self.data = value;
                return;
            }
            initData(value);
        }
        function dataGetter() {
            var d = self.data || {};
            self.fields.forEach(function (field) {
                var cValue = {};
                if (field.component.isContainer) {
                    Object.assign(d, field.component.value);
                } else {
                    cValue[field.header.name] = field.component.value;
                    Object.assign(d, cValue);
                }
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
        self.intf.isContainer = true;
        self.intf.addComponents = addComponents;
        self.intf.addComponent = addComponent;
        self.intf.getFieldByName = getFieldByName;
        self.intf.getFieldById = getFieldById;
        self.intf.getFieldsByPropertyValue = getFieldsByPropertyValue;
        Object.defineProperty(self.intf, 'fields', {
            get: function () {
                return self.fields;
            }
        });
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
                    if (self.dialog && self.dialog.dispose) {
                        self.dialog.dispose();
                    }
                    self.dialog = dialog(self.dialogOptions);
                    self.dialog.title.innerHTML = self.title;
                    self.dialog.content.appendChild(self.form);
                    self.intf.appendChild(self.dialog);
                    self.dialog.attached = true;
                    requestAnimationFrame(function () {
                        self.dialog.center();
                    });
                } else {
                    if (self.dialog) {
                        self.dialog.attached = false;
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
                if (self.dialog) {
                    self.dialog.title.innerHTML = value;
                }
            }
        });
        Object.defineProperty(self.intf, 'dialog', {
            get: function () {
                return self.dialog;
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
/*globals define: false, requestAnimationFrame: false, Event: false*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ../util.js */ 0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (util) {
    'use strict';
    var components = {}, ce = util.createElement, sp = util.setProperties;
    // components that contain other components must be described here because
    // of the inherit circular reference to the components module
    function inputComponentFactory(inputOptions) {
        return function (header, index, form) {
            var component = ce('div', null, {className: 'component'}),
                label = ce('div', component, {className: 'label'}),
                input = ce('input', component, inputOptions);
            component.containerStyle = {};
            label.innerHTML = header.title === undefined ? header.name : header.title;
            component.header = header;
            component.label = label;
            component.input = input;
            input.onchange = function () {
                form.data[header.name] = input.value;
            };
            Object.defineProperty(component, 'value', {
                get: function () {
                    return input.value;
                },
                set: util.asyncValueSetter({
                    component: component,
                    input: input,
                    label: label,
                    header: header,
                    form: form
                })
            });
            util.addEvents(input, header.events);
            util.addEvents(label, header.labelEvents);
            util.addEvents(component, header.componentEvents);
            sp(input.style, header.style);
            sp(label.style, header.labelStyle);
            sp(component.style, header.componentStyle);
            sp(component.containerStyle, header.containerStyle);
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
    components.select = function (header, index, form) {
        var componentContext = this,
            component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'}),
            input = ce('select', component, {className: 'select'}),
            fEnumVal,
            options = [];
        function fillValue(val) {
            var cData = {};
            cData[header.name] = val;
            util.asyncValueSetter({
                component: component,
                input: input,
                label: label,
                header: header,
                form: form
            })(cData);
        }
        function fillOptions(arr) {
            arr.forEach(function (item) {
                var option;
                if (!Array.isArray(item)) { item = [item, item]; }
                option = ce('option', input, {value: item[0], innerHTML: item[1]});
                sp(option, header.optionStyle);
                options.push(option);
            });
            fillValue(header.value);
        }
        label.innerHTML = header.title === undefined ? header.name : header.title;
        component.label = label;
        component.input = input;
        component.header = header;
        component.containerStyle = {};
        util.addEvents(input, header.events);
        util.addEvents(label, header.labelEvents);
        util.addEvents(component, header.componentEvents);
        sp(input.style, header.style);
        sp(label.style, header.labelStyle);
        sp(component.style, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        if (Array.isArray(header.enum)) {
            fillOptions(header.enum);
        } else if (typeof header.enum === 'function') {
            fEnumVal = header.enum.apply(componentContext, [function (value) {
                if (fEnumVal) { throw new Error('Async return detected from value already set via sync function.'); }
                fillOptions(value);
            }]);
            if (fEnumVal) {
                fillOptions(fEnumVal);
            }
        }
        input.onchange = function () {
            form.data[header.name] = input.value;
        };
        Object.defineProperty(component, 'value', {
            get: function () {
                return input.value;
            },
            set: util.asyncValueSetter({
                component: component,
                input: input,
                label: label,
                header: header,
                form: form
            })
        });
        component.addEventListener = input.addEventListener;
        component.removeEventListener = input.removeEventListener;
        return component;
    };
    components.title = function (header, index, form) {
        var component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'});
        label.innerHTML = header.title === undefined ? header.name : header.title;
        component.containerStyle = {};
        component.label = label;
        component.header = header;
        sp(label.style, header.style);
        sp(component.style, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        util.addEvents(label, header.labelEvents);
        util.addEvents(component, header.componentEvents);
        Object.defineProperty(component, 'value', {
            get: function () {
                return label.innerHTML;
            },
            set: util.asyncValueSetter({
                component: component,
                label: label,
                header: header,
                form: form
            })
        });
        return component;
    };
    components.HTMLElement = function (header, index, form) {
        return ce(header.tagName, null, header);
    };
    components.button = function (header, index, form) {
        return ce('button', null, header);
    };
    components.string = components.text;
    components['canvas-datagrid'] = function (header, index, form) {
        var pContext = this,
            component = ce('div', null, {className: 'canvas-datagrid-child'}),
            grid = window.canvasDatagrid();
        component.containerStyle = {};
        component.input = grid;
        component.header = header;
        component.appendChild(grid);
        Object.keys(header).forEach(function (propertyKey) {
            grid[propertyKey] = header[propertyKey];
        });
        sp(grid, header);
        grid.name = pContext.name ? (pContext.name + '_canvas-datagrid_' + index) : undefined;
        util.addEvents(grid, header.events);
        util.addEvents(component, header.componentEvents);
        sp(component.style, header.componentStyle);
        sp(component.containerStyle, header.containerStyle);
        component.resize = function () {
            grid.resize(true);
        };
        function changeEvent() {
            // break circular refs
            if (!form.data) { return; }
            form.data[header.name] = util.jsonCopy(grid.data);
            component.dispatchEvent(new Event('change'));
        }
        grid.addEventListener('datachanged', changeEvent);
        grid.addEventListener('endedit', changeEvent);
        Object.defineProperty(grid, 'value', {
            set: function (value) {
                grid.data = value;
            },
            get: function () {
                return grid.data;
            }
        });
        Object.defineProperty(component, 'value', {
            get: function () {
                return grid.data;
            },
            set: util.asyncValueSetter({
                component: component,
                input: grid,
                label: grid.name,
                header: header,
                form: form
            })
        });
        return component;
    };
    // hierarchical components
    components['pivot-form'] = function (header, index, form) {
        var pContext = this,
            f,
            name = pContext.name ? (pContext.name + '_pivot-form_' + index) : undefined;
        f = window.pivotForm();
        f.containerStyle = {};
        f.className = 'pivot-form-child';
        f.name = name;
        f.schema = header.schema;
        f.data = form.data;
        f.addComponents(pContext.components);
        sp(f.containerStyle, header.containerStyle);
        sp(f.style, header.style);
        util.addEvents(f, header.events);
        Object.defineProperty(f, 'value', {
            get: function () {
                return f.data;
            },
            set: function (value) {
                f.data = value;
            }
        });
        return f;
    };
    components.tabs = function (header, index, form) {
        var componentContext = this,
            tabComponents = [],
            component = ce('div', null, {className: 'tabbed-component'}),
            tabs = ce('div', component, {className: 'tabs'}),
            activeTab,
            defaultTab = header.defaultTabIndex || 0;
        component.containerStyle = {};
        component.isContainer = true;
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
                    subComponent = t.apply(componentContext, [header, index, form]);
                subComponent.addEventListener('change', function () {
                    form.intf.dispatchEvent('change', {data: form.data});
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
        component.getFieldsByPropertyValue = function getFieldsByPropertyValue(key, value) {
            var found = [];
            tabComponents.forEach(function (field) {
                if (field.isContainer) {
                    found = found.concat(field.getFieldsByPropertyValue(key, value));
                }
                if (value === field[key] || (field.header && value === field.header[key])) {
                    found.push(field);
                }
            });
            return found;
        };
        component.getFieldByName = function getFieldByName(value) {
            return component.getFieldsByPropertyValue('name', value)[0];
        };
        component.getFieldById = function getFieldById(value) {
            return component.getFieldsByPropertyValue('id', value)[0];
        };
        util.addEventInterface(component, header, index, form);
        util.addEvents(component, header.events);
        sp(component.style, header.componentStyle);
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
                    var cValue = {};
                    if (component.isContainer) {
                        Object.assign(d, component.value);
                    } else {
                        cValue[component.header.name] = component.value;
                        Object.assign(d, cValue);
                    }
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
        function resize() {
            if (self.maximized) {
                intf.style.width = window.innerWidth + 'px';
                intf.style.height = window.innerHeight + 'px';
            }
        }
        function dispose() {
            if (intf.parentNode) {
                intf.parentNode.removeChild(intf);
            }
            window.removeEventListener('resize', resize);
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
            window.addEventListener('resize', resize);
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
            intf.close = close;
            intf.dispose = dispose;
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
