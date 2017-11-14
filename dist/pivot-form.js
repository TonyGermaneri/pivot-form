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
        varSafe: function (value) { return value.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(); },
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
                e = ev.type ? ev : (e || {});
                ev = ev.type || ev;
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
    var attributeList = ['data', 'schema', 'name', 'components'];
    function PivotForm(args) {
        args = args || {};
        // only non-dom related items can be instantiated prior to init (connectedCallback)
        var self = {}, intf;
        self.args = args;
        self.initialized = false;
        self.form = util.createElement('form', null, {className: 'pivot-form'});
        self.uniqueId = Math.random() + '-' + performance.now();
        self.title = '';
        self.componentOrder = [];
        self.components = [];
        self.preInitDataSet = {};
        self.idCounter = -1;
        self.data = {};
        self.initializingComponents = {};
        self.dialogOptions = {};
        intf = window.customElements ? eval('Reflect.construct(HTMLElement, [], new.target)')
            : util.createElement('section');
        function getNewId() {
            self.idCounter += 1;
            return 'p' + Math.floor((Math.random() * Math.pow(2, 30))).toString(36);
        }
        function getComponentsByPropertyValue(key, value) {
            var found = [];
            self.components.forEach(function (component) {
                if (component && component.isContainer) {
                    found = found.concat(component.getComponentsByPropertyValue(key, value));
                }
                if (value === component[key] || (component.header && value === component.header[key])) {
                    found.push(component);
                }
            });
            return found;
        }
        function getComponentByName(value) {
            return getComponentsByPropertyValue('name', value)[0];
        }
        function getComponentById(value) {
            return getComponentsByPropertyValue('id', value)[0];
        }
        function saveState() {
            if (self.name) {
                try {
                    localStorage.setItem('pivot-form-order-' + self.name, JSON.stringify({
                        componentOrder: self.componentOrder
                    }));
                } catch (ignore) {
                    self.componentOrder = [];
                }
            }
        }
        function updateFlexOrder() {
            self.inputComponentOrganicOrder.forEach(function (itemContainer, organicComponentIndex) {
                organicComponentIndex += 1;
                itemContainer.style.order = self.componentOrder.indexOf(organicComponentIndex);
            });
            saveState();
        }
        function loadState() {
            if (self.name && intf.initialized) {
                try {
                    var d = localStorage.getItem('pivot-form-order-' + self.name);
                    d = self.componentOrder = JSON.parse(d).componentOrder;
                } catch (ignore) {
                    self.componentOrder = [];
                }
                updateFlexOrder();
            }
        }
        function reorderComponents(e) {
            // move up e until a base component item is found, then draw a line below it
            // and mark it as the target of the dropping (item reordering)
            self.moveMarker.style.left = e.layerX + 'px';
            self.moveMarker.style.top = e.layerY + 'px';
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
        function endReorderComponents() {
            function reorder() {
                if (!self.moveTo) { return; }
                var o = self.componentOrder.indexOf(self.moveFrom.organicComponentIndex),
                    t = self.componentOrder.indexOf(self.moveTo.organicComponentIndex);
                self.componentOrder.splice(o, 1);
                self.componentOrder.splice(t, 0, self.moveFrom.organicComponentIndex);
                updateFlexOrder();
                return;
            }
            if (self.moveTo) {
                self.moveTo.classList.remove('reorder-drag-over');
            }
            reorder();
            if (self.moveMarker.parentNode) {
                self.moveMarker.parentNode.removeChild(self.moveMarker);
            }
            self.form.classList.remove('noselect');
            self.moveTo = undefined;
            self.moveFrom = undefined;
            self.moveMarker = undefined;
            self.shadowRoot.removeEventListener('mousemove', reorderComponents);
            self.shadowRoot.removeEventListener('mouseup', endReorderComponents);
            return;
        }
        function beginReorderComponent(organicComponentIndex, itemContainer) {
            return function (e) {
                self.form.classList.add('noselect');
                self.moveMarker = util.createElement('div', self.shadowRoot,
                        {className: 'reorder-marker', innerHTML: '\u205E'});
                self.moveFrom = itemContainer;
                self.moveStart = {
                    item: itemContainer.getBoundingClientRect(),
                    clientX: e.clientX,
                    clientY: e.clientY
                };
                reorderComponents(e);
                self.shadowRoot.addEventListener('mousemove', reorderComponents);
                self.shadowRoot.addEventListener('mouseup', endReorderComponents);
            };
        }
        function resize() {
            self.components.forEach(function (component) {
                if (component.resize && typeof component.resize === 'function') {
                    component.resize();
                }
                if (component.dispatchEvent) {
                    component.dispatchEvent(new Event('resize'));
                }
            });
            window.dispatchEvent(new Event('resize'));
        }
        function createDom() {
            self.components.forEach(function (component, organicComponentIndex) {
                organicComponentIndex += 1;
                var container = util.createElement('div', null, {className: 'component-item'}),
                    handle = util.createElement('span', component.header.static
                        ? null : container, {className: 'item-handle', innerHTML: '\u205E'}),
                    dataStub = {};
                if (component.header.hidden) {
                    container.style.display = 'none';
                }
                function initialized() {
                    component.removeEventListener('initialized', initialized);
                    delete intf.initializingComponents[component.id];
                    if (Object.keys(intf.initializingComponents).length === 0 && intf.preInitDataSet) {
                        var f = intf.preInitDataSet;
                        // delete from this form, deletes will propagate up
                        delete self.preInitDataSet;
                        if (intf.pivotForm) {
                            intf.pivotForm.data = f;
                        } else {
                            intf.data = f;
                        }
                        // notify that everything has been initialized on this form
                        intf.dispatchEvent(new Event('initialized'));
                    }
                }
                component.container = container;
                component.handle = handle;
                container.setAttribute('data-uniqueId', self.uniqueId);
                handle.beginReorderComponentFunction = beginReorderComponent(organicComponentIndex, container);
                handle.addEventListener('mousedown', handle.beginReorderComponentFunction);
                container.organicComponentIndex = organicComponentIndex;
                container.name = component.name;
                self.componentOrder[organicComponentIndex] = self.componentOrder[organicComponentIndex] === undefined
                    ? organicComponentIndex : self.componentOrder[organicComponentIndex];
                container.appendChild(component);
                util.setProperties(container.style, component.containerStyle);
                util.setProperties(handle, component.handleStyle);
                util.setProperties(container.style, component.containerStyle);
                util.setProperties(handle, component.handleStyle);
                self.form.appendChild(container);
                self.inputComponentOrganicOrder.push(container);
                if (!component.initialzied && component.header.name && component.header.value) {
                    dataStub[component.header.name] = component.header.value;
                    intf.initializingComponents[component.id] = component;
                    component.addEventListener('initialized', initialized);
                    component.value = dataStub;
                }
            });
            updateFlexOrder();
        }
        function initData(newData) {
            if (!newData && intf.preInitDataSet && intf.initialized) {
                newData = intf.preInitDataSet;
                self.data = newData;
            } else if (!intf.initialized || Object.keys(intf.initializingComponents).length > 0) {
                if (newData && typeof newData === 'object' && Object.keys(newData).length > 0) {
                    intf.preInitDataSet = newData;
                }
                return;
            }
            if (!newData) {
                newData = self.data;
            }
            self.components.forEach(function (component) {
                component.value = newData;
            });
        }
        function disposeComponents() {
            self.components.forEach(function (component) {
                if (component) {
                    if (component.dispose) {
                        component.dispose();
                    }
                    if (component.parentNode) {
                        component.parentNode.removeChild(component);
                    }
                    if (component.handle && component.handle.parentNode) {
                        component.handle.removeEventListener('mousedown', component.handle.beginReorderComponentFunction);
                        component.handle.parentNode.removeChild(component.handle);
                    }
                    if (component.container && component.container.parentNode) {
                        component.container.parentNode.removeChild(component.container);
                    }
                }
            });
        }
        function dispose() {
            disposeComponents();
        }
        function initSchema() {
            if (!self.schema) { return; }
            if (self.components) {
                // dispose previous items
                disposeComponents();
            }
            self.inputComponentOrganicOrder = [];
            self.idCounter = -1;
            self.components = [];
            self.schema.forEach(function (header, index) {
                var t = PivotForm.prototype.components.string,
                    id = getNewId(),
                    component;
                if (PivotForm.prototype.components[header.type]) {
                    t = PivotForm.prototype.components[header.type];
                }
                // instantiate component
                component = t.apply(intf, [header, index, intf]);
                // listen to the component's change event
                function change() {
                    var cData = {};
                    // set the new value of the element to data
                    cData[header.name] = component.input.value;
                    if (intf.pivotForm) {
                        intf.pivotForm.data = cData;
                    } else {
                        initData(cData);
                    }
                    // dispatch the change event to our listeners
                    intf.dispatchEvent(new Event('change'));
                }
                component.addEventListener('change', change);
                // if the component does not define the property value, define it
                if (!component.hasOwnProperty('value')) {
                    Object.defineProperty(component, 'value', {
                        get: function () {
                            // if the component defines an input, grab the value from the input's getter
                            if (component.input) {
                                return component.input.value;
                            }
                            // or just return the value set in data
                            return self.data[header.name];
                        },
                        // use the async value setter for set
                        set: function (value) {
                            // value is the entire data object
                            // if the value set has no property for this component's header name
                            // exit now
                            if (!value || !value.hasOwnProperty(header.name)) { return; }
                            // update value to be the actual value instead of the entire data object
                            value = value[header.name];
                            function setValue(n) {
                                // prevent the word "undefined" from appearing in inputs
                                var v = n === undefined ? '' : n;
                                // set the value of the form
                                self.data[header.name] = v;
                                // if the component has a value to update, update it now
                                if (component.input) {
                                    component.input.value = v;
                                }
                                // if this component has not been initialized (had any initial value set)
                                // mark it as initialized to allow external data to begin flowing into it
                                if (!component.initialized) {
                                    component.initialized = true;
                                    if (component.classList) {
                                        component.classList.remove('loading');
                                    }
                                    if (component.dispatchEvent) {
                                        // tell dom initializer this component has been initialized
                                        component.dispatchEvent(new Event('initialized'));
                                    }
                                }
                            }
                            var r,
                                syncReturn,
                                // if the value passed in was a function, this is the callback for that function
                                callback = function (asyncValue) {
                                    // check if the function returned a value earlier, if so, it's probably a mistake
                                    if (syncReturn) {
                                        throw new Error('Async return detected from value already set via sync function.');
                                    }
                                    // set the value asynchronously via setter
                                    setValue(asyncValue);
                                };
                            // if a function was passed in, it could be async or sync
                            if (typeof value === 'function') {
                                if (component.classList) {
                                    component.classList.add('loading');
                                }
                                r = value.apply(component, [callback]);
                                // sync functions return a value now, async must return undefined (no return or return;)
                                syncReturn = r !== undefined;
                                if (syncReturn) {
                                    // if it was a sync value, run setter now
                                    setValue(r);
                                }
                                return;
                            }
                            // if this was was not a function, run setter now
                            setValue(value);
                        }
                    });
                }
                // add events, properties, id, name, index
                util.addEvents(component, header.componentEvents);
                util.setProperties(component.style, header.componentStyle);
                util.setProperties(component.containerStyle, header.containerStyle);
                component.header = header;
                component.pivotForm = intf.pivotForm || intf;
                component.name = component.name || (header.name === undefined ? '__' + id : header.name);
                component.id = id;
                component.index = index;
                // add component to the stack
                self.components.push(component);
            });
            createDom();
            initData();
        }
        function dispatchResize() {
            intf.dispatchEvent(new Event('resize'));
            requestAnimationFrame(function () {
                window.dispatchEvent(new Event('resize'));
            });
        }
        function init() {
            if (intf.initialized) { return; }
            self.shadowRoot = intf.attachShadow ? intf.attachShadow({mode: 'open'}) : intf;
            self.shadowRoot.appendChild(self.form);
            if (!self.cssAttached) {
                util.createElement('link', self.shadowRoot, {
                    rel: 'stylesheet',
                    href: /^file:\/\/\//.test(window.location) ? '../lib/index.css' : 'data:text/css;base64,Lm5vc2VsZWN0LCAudGFicywgLmRpYWxvZy10aXRsZS1iYXIgewogICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOwogICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7CiAgICB1c2VyLXNlbGVjdDogbm9uZTsKfQoucGl2b3QtZm9ybSB7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLWRpc3BsYXksIGZsZXgpOwogICAgZmxleC1kaXJlY3Rpb246IHZhcigtLXBpdm90LWZvcm0tZmxleC1kaXJlY3Rpb24sIHJvdyk7CiAgICBmbGV4LXdyYXA6IHZhcigtLXBpdm90LWZvcm0tZmxleC13cmFwLCB3cmFwKTsKICAgIGp1c3RpZnktY29udGVudDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1qdXN0aWZ5LWNvbnRlbnQsIHNwYWNlLWJldHdlZW4pOwogICAgd2lkdGg6IHZhcigtLXBpdm90LWZvcm0td2lkdGgsIDEwMCUpOwp9Ci5jb21wb25lbnQtaXRlbSB7CiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOwogICAgZGlzcGxheTogdmFyKC0tcGl2b3QtZm9ybS1kaXNwbGF5LCBmbGV4KTsKICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1waXZvdC1mb3JtLWZsZXgtZGlyZWN0aW9uLCByb3cpOwogICAgZmxleC13cmFwOiB2YXIoLS1waXZvdC1mb3JtLWZsZXgtd3JhcCwgd3JhcCk7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtanVzdGlmeS1jb250ZW50LCBzcGFjZS1iZXR3ZWVuKTsKICAgIG1hcmdpbjogdmFyKC0tcGl2b3QtZm9ybS1jb21wb25lbnQtaXRlbS1tYXJnaW4sIDRweCk7Cn0KLmxhYmVsIHsKICAgIG1pbi13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1taW4td2lkdGgsIDEwMHB4KTsKICAgIG1heC13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1tYXgtd2lkdGgsIDE1MHB4KTsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLWZvbnQtZmFtaWx5LCBzYW5zLXNlcmlmKTsKICAgIGNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLWNvbG9yLCAjMDAwKTsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tbGFiZWwtYmFja2dyb3VuZC1jb2xvciwgdHJhbnNwYXJlbnQpOwp9Ci5zZWxlY3QgewogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgbWluLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLXNlbGVjdC1taW4td2lkdGgsIDEzM3B4KTsKICAgIG1heC13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1zZWxlY3QtbWF4LXdpZHRoLCAxNTBweCk7Cn0KLmlucHV0IHsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIG1pbi13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1taW4td2lkdGgsIDEwMHB4KTsKICAgIG1heC13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1tYXgtd2lkdGgsIDE1MHB4KTsKICAgIGZvbnQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS1pbnB1dC1mb250LXNpemUsIDEycHgpOwp9Ci5pdGVtLWhhbmRsZSwgLnJlb3JkZXItbWFya2VyIHsKICAgIGN1cnNvcjogbW92ZTsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIHdpZHRoOiA3cHg7CiAgICBoZWlnaHQ6IDE5cHg7CiAgICBtaW4td2lkdGg6IDVweDsKICAgIG1hcmdpbi1yaWdodDogNXB4OwogICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWNvbG9yLCAjMzMzKTsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJhY2tncm91bmQtY29sb3IsICNFRUUpOwogICAgYm9yZGVyLXJhZGl1czogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtYm9yZGVyLXJhZGl1cywgNHB4KTsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtYm9yZGVyLWNvbG9yLCAjQ0NDKTsKICAgIGJvcmRlci1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItd2lkdGg6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci13aWR0aCwgMXB4KTsKfQoucmVvcmRlci1kcmFnLW92ZXIgLml0ZW0taGFuZGxlOm50aC1jaGlsZCgxKSB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1kcmFnLWJhY2tncm91bmQtY29sb3IsIHJnYmEoMTEwLCAxNjgsIDI1NSwgMSkpOwp9Ci5yZW9yZGVyLW1hcmtlciB7CiAgICBjb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtcmVvcmRlcmluZy1tYXJrZXItY29sb3IsICMzMzMpOwogICAgYmFja2dyb3VuZDogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtcmVvcmRlcmluZy1tYXJrZXItY29sb3IsICNFRUUpOwogICAgaGVpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1yZW9yZGVyaW5nLW1hcmtlci1oZWlnaHQsIDIzcHgpOwogICAgd2lkdGg6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLXJlb3JkZXJpbmctbWFya2VyLXdpZHRoLCAxMHB4KTsKICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgIHotaW5kZXg6IDEwOwp9Ci50YWJiZWQtY29tcG9uZW50IHsKICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi1ib3R0b20sIDhweCk7CiAgICBtYXJnaW4tdG9wOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi10b3AsIDRweCk7CiAgICBtYXJnaW4tbGVmdDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tbGVmdCwgMCk7CiAgICBtYXJnaW4tcmlnaHQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtbWFyZ2luLXJpZ2h0LCAwKTsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LXdpZHRoLCAxMDAlKTsKfQoudGFicyB7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb21wb25lbnQtZGlzcGxheSwgaW5saW5lLWZsZXgpOwogICAgZmxleC1kaXJlY3Rpb246IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbXBvbmVudC1mbGV4LWRpcmVjdGlvbiwgcm93KTsKICAgIGZsZXgtd3JhcDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29tcG9uZW50LWZsZXgtd3JhcCwgd3JhcC1yZXZlcnNlKTsKICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci10b3AtbGVmdC1yYWRpdXMsIDRweCk7CiAgICBib3JkZXItbGVmdC1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItbGVmdC13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXdpZHRoLCAxcHgpOwogICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1jb2xvciwgI0JCQik7CiAgICBtYXJnaW4tbGVmdDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tcmlnaHQsIDEwcHgpOwogICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi1yaWdodCwgMTBweCk7Cn0KLnRhYiB7CiAgICBwYWRkaW5nLXRvcDogdmFyKC0tcGl2b3QtZm9ybS10YWItcGFkZGluZy10b3AsIDRweCk7CiAgICBwYWRkaW5nLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLXBhZGRpbmctbGVmdCwgNHB4KTsKICAgIHBhZGRpbmctYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1wYWRkaW5nLWJvdHRvbSwgNHB4KTsKICAgIHBhZGRpbmctcmlnaHQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLXBhZGRpbmctcmlnaHQsIDRweCk7CiAgICBjb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItY29sb3IsICMzMzMpOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYmFja2dyb3VuZC1jb2xvciwgI0VFRSk7CiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItdG9wLWxlZnQtcmFkaXVzLCA0cHgpOwogICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci10b3AtcmlnaHQtcmFkaXVzLCA0cHgpOwogICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItY29sb3IsICNCQkIpOwogICAgYm9yZGVyLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXdpZHRoLCAxcHgpOwogICAgYm9yZGVyLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLWJvdHRvbSwgbm9uZSk7CiAgICBib3JkZXItbGVmdDogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLWxlZnQsIG5vbmUpOwogICAgZm9udC1zaXplOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1mb250LXNpemUsIDE0cHgpOwogICAgZGlzcGxheTogdmFyKC0tcGl2b3QtZm9ybS10YWItZGlzcGxheSwgaW5saW5lLWJsb2NrKTsKICAgIGN1cnNvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItY3Vyc29yLCBwb2ludGVyKTsKICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLW1hcmdpbi1ib3R0b20sIC0xcHgpOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLW1hcmdpbi1sZWZ0LCAwKTsKICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1mb250LWZhbWlseSwgc2Fucy1zZXJpZik7CiAgICBib3gtc2hhZG93OiBpbnNldCAwIC0ycHggMnB4IHZhcigtLXBpdm90LWZvcm0tdGFiLWluYWN0aXZlLWJveC1zaGFkb3ctY29sb3IsICNEREQpOwp9Ci50YWItYWN0aXZlIHsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYWN0aXZlLWJvcmRlci1jb2xvciwgI0FBQSk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1hY3RpdmUtYmFja2dyb3VuZC1jb2xvciwgI0ZFRkVGRSk7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1hY3RpdmUtbWFyZ2luLWJvdHRvbSwgLTFweCk7CiAgICBib3gtc2hhZG93OiBpbnNldCAwIC0zcHggM3B4IHRyYW5zcGFyZW50Owp9Ci50YWItY29udGVudCB7CiAgICBkaXNwbGF5OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LWRpc3BsYXksIGZsZXgpOwogICAgZmxleC1kaXJlY3Rpb246IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtZmxleC1kaXJlY3Rpb24sIHJvdyk7CiAgICBmbGV4LXdyYXA6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtZmxleC13cmFwLCB3cmFwKTsKICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtbWFyZ2luLWJvdHRvbSwgMCk7CiAgICBtYXJnaW4tdG9wOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi10b3AsIDApOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtbWFyZ2luLWxlZnQsIDEwcHgpOwogICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi1yaWdodCwgMTBweCk7CiAgICBwYWRkaW5nLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtcGFkZGluZy1sZWZ0LCAwKTsKICAgIHBhZGRpbmctcmlnaHQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtcGFkZGluZy1yaWdodCwgMCk7CiAgICBwYWRkaW5nLXRvcDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1wYWRkaW5nLXRvcCwgMCk7CiAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1wYWRkaW5nLWJvdHRvbSwgMCk7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtYm9yZGVyLWNvbG9yLCAjOTk5KTsKICAgIGJvcmRlci1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1ib3JkZXItd2lkdGgsIDFweCk7Cn0KLnRhYi1jb250ZW50LWluYWN0aXZlIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLnRhYi1jb250ZW50LWFjdGl2ZSB7CiAgICBkaXNwbGF5OiBibG9jazsKfQouY2FudmFzLWRhdGFncmlkLWNoaWxkIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWNhbnZhcy1kYXRhZ3JpZC13aWR0aCwgMTAwJSk7CiAgICBoZWlnaHQ6IHZhcigtLXBpdm90LWZvcm0tY2FudmFzLWRhdGFncmlkLW1pbi1oZWlnaHQsIDE3NXB4KTsKfQouZGlhbG9nIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy13aWR0aCwgNTAwcHgpOwogICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1ib3JkZXItY29sb3IsICM4ODgpOwogICAgYm9yZGVyLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1ib3JkZXItc3R5bGUsIHNvbGlkKTsKICAgIGJvcmRlci13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctYm9yZGVyLXdpZHRoLCAxcHgpOwogICAgcG9zaXRpb246IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXBvc2l0aW9uLCBhYnNvbHV0ZSk7CiAgICBvdmVyZmxvdzogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctb3ZlcmZsb3csIGhpZGRlbik7CiAgICB6LWluZGV4OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy16LWluZGV4LCAxMDAwMCk7Cn0KLmRpYWxvZy1jb250ZW50IHsKICAgIHBhZGRpbmctdG9wOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250ZW50LXBhZGRpbmctdG9wLCAycHgpOwogICAgcGFkZGluZy1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250ZW50LXBhZGRpbmctbGVmdCwgMCk7CiAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udGVudC1wYWRkaW5nLWJvdHRvbSwgMnB4KTsKICAgIHBhZGRpbmctcmlnaHQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRlbnQtcGFkZGluZy1yaWdodCwgMCk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250ZW50LWJhY2tncm91bmQtY29sb3IsICNGRkYpOwogICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFyLWhlaWdodCwgMjdweCkpOwogICAgbWF4LWhlaWdodDogY2FsYygxMDAlIC0gdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFyLWhlaWdodCwgMjdweCkpOwogICAgbWluLXdpZHRoOiAxMDAlOwogICAgbWF4LXdpZHRoOiAxMDAlOwogICAgb3ZlcmZsb3c6IGF1dG87Cn0KLmRpYWxvZy10aXRsZSB7CiAgICBmbG9hdDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtZmxvYXQsIGxlZnQpOwogICAgZm9udC1zaXplOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1mb250LXNpemUsIDIwcHgpOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLW1hcmdpbi1sZWZ0LCA3cHgpOwogICAgbWFyZ2luLXRvcDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtbWFyZ2luLXRvcCwgM3B4KTsKICAgIGZvbnQtZmFtaWx5OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1mb250LWZhbWlseSwgc2Fucy1zZXJpZik7CiAgICBjdXJzb3I6IGRlZmF1bHQ7CiAgICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgICB0b3A6IDBweDsKICAgIGxlZnQ6IDBweDsKfQouZGlhbG9nLXRpdGxlLWJhciB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYWNrZ3JvdW5kLWNvbG9yLCAjREREKTsKICAgIHRleHQtYWxpZ246IHJpZ2h0OwogICAgaGVpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYXItaGVpZ2h0LCAyN3B4KTsKICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWJhci1ib3JkZXItYm90dG9tLWNvbG9yLCAjQkJCKTsKICAgIGJvcmRlci1ib3R0b20tc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWJhci1ib3JkZXItYm90dG9tLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItYm90dG9tLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYXItYm9yZGVyLWJvdHRvbS13aWR0aCwgMXB4KTsKfQouZGlhbG9nLW1pbmltaXplLCAuZGlhbG9nLXJlc3RvcmUsIC5kaWFsb2ctbWF4aW1pemUsIC5kaWFsb2ctY2xvc2UgewogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgYmFja2dyb3VuZC1zaXplOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1iYWNrZ3JvdW5kLXNpemUsIDI3cHgpOwogICAgYmFja2dyb3VuZC1yZXBlYXQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LWJhY2tncm91bmQtcmVwZWF0LCBuby1yZXBlYXQpOwogICAgd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXdpZHRoLCAyN3B4KTsKICAgIGhlaWdodDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtd2lkdGgsIDE4cHgpOwogICAgbWFyZ2luOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1tYXJnaW4sIDNweCk7CiAgICBjdXJzb3I6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LWN1cnNvciwgcG9pbnRlcik7Cn0KLmRpYWxvZy1taW5pbWl6ZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1taW5pbWl6ZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUC8vLzNkM2R5SDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSWhqSStweSswUG81eTAyb3V6M3J6N0Q0WVlRSlpsWjZab2VvcnVDOGZ5VEU4RkFEcz0pKTsKfQouZGlhbG9nLXJlc3RvcmUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtcmVzdG9yZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUEh4OFhaMmRpSDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSXZqSStweSswUG81eTAyb3V6QnJ3RG5YZ2RpSHdsS1hLR3VhVXJHcjRndTQ1elRNb0hQYnY1RHd3S2g4UWlxUUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWF4aW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtbWF4aW1pemUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVAvLy8zZDNkeUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUl0akkrcHkrMFBvNXkwMm91ejNnMzQvM0VCU0lva2FDNUFxcXljbThDYWZOQ1lQWnFuSi9iK0R3d0toNW9DQURzPSkpOwp9Ci5kaWFsb2ctY2xvc2UgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtY2xvc2UtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVBIeDhYZDNkeUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUlwakkrcHkrMFBvNXkwMm91ejN2d0M5WFZCYUpCaWFJcGpxZ0pzaDZvbDhtSnNMZWY2enZlK1dBQUFPdz09KSk7Cn0KLmRpYWxvZy1tYXhpbWl6ZWQgLmRpYWxvZy1tYXhpbWl6ZSB7CiAgICBiYWNrZ3JvdW5kLWltYWdlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1yZXN0b3JlLWJhY2tncm91bmQtaW1hZ2UsIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJZ0FZQUlBQUFQSHg4WFoyZGlINUJBQUFBQUFBTEFBQUFBQWlBQmdBQUFJdmpJK3B5KzBQbzV5MDJvdXpCcndEblhnZGlId2xLWEtHdWFVckdyNGd1NDV6VE1vSFBidjVEd3dLaDhRaXFRQUFPdz09KSk7Cn0KLmRpYWxvZy1tYXhpbWl6ZWQgewogICAgaGVpZ2h0OiAxMDAlOwogICAgd2lkdGg6IDEwMCU7CiAgICBwb3NpdGlvbjogZml4ZWQ7CiAgICB0b3A6IDA7CiAgICBsZWZ0OiAwOwp9Ci5kaWFsb2ctbWluaW1pemVkIHsKICAgIHdpZHRoOiAyMDBweDsKICAgIGhlaWdodDogMjdweDsKICAgIHJpZ2h0OiAwOwp9Ci5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctbWluaW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtcmVzdG9yZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUEh4OFhaMmRpSDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSXZqSStweSswUG81eTAyb3V6QnJ3RG5YZ2RpSHdsS1hLR3VhVXJHcjRndTQ1elRNb0hQYnY1RHd3S2g4UWlxUUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctdGl0bGUgewogICAgZm9udC1zaXplOiAxN3B4Owp9Ci5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctcmVzdG9yZSwKLmRpYWxvZy1taW5pbWl6ZWQgLmRpYWxvZy1jbG9zZSwKLmRpYWxvZy1taW5pbWl6ZWQgLmRpYWxvZy1jb250ZW50IHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLmRpYWxvZy1jbG9zZWQgewogICAgZGlzcGxheTogbm9uZTsKfQo='
                });
                self.cssAttached = true;
            }
            self.shadowRoot.appendChild(self.form);
            if (intf.mode === 'dialog') {
                self.dialogOptions.title = intf.title;
                if (!self.dialog) {
                    self.dialog = dialog(self.dialogOptions);
                }
                self.dialog.addEventListener('resized', dispatchResize);
                self.dialog.content.appendChild(self.form);
                self.shadowRoot.appendChild(self.dialog);
                self.dialog.attached = true;
            }
            intf.form = self.form;
            intf.initialized = true;
            loadState();
            if (self.dialog) {
                self.dialog.centerHorizontally();
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
            var d = {};
            self.components.forEach(function getComponentValue(component) {
                var cValue = {};
                if (component.isContainer) {
                    Object.assign(d, component.value);
                } else {
                    cValue[component.header.name] = component.value;
                    Object.assign(d, cValue);
                }
            });
            // create getter setters for each key returned from data
            // so data can be set into it
            Object.keys(d).forEach(function (dataKey) {
                // prevent stack overflows by getting data ref prior to defineProperty
                var getValue = d[dataKey];
                Object.defineProperty(d, dataKey, {
                    get: function () {
                        return getValue;
                    },
                    set: function (value) {
                        var cData = {};
                        cData[dataKey] = value;
                        dataSetter(cData);
                        return;
                    }
                });
            });
            return d;
        }
        function schemaSetter(value) {
            self.schema = value;
            initSchema();
        }
        // public interface definitions
        intf.init = init;
        intf.dispose = dispose;
        intf.getComponentByName = getComponentByName;
        intf.getComponentById = getComponentById;
        intf.getComponentsByPropertyValue = getComponentsByPropertyValue;
        intf.resize = resize;
        // Object.defineProperty(intf, 'initialized', {
        //     get: function () { return intf.pivotForm ? intf.pivotForm.initialized : self.initialized; },
        //     set: function (value) {
        //         if (intf.pivotForm) {
        //             intf.pivotForm.initialized = !!value;
        //             return;
        //         }
        //         self.initialized = !!value;
        //     }
        // });
        Object.defineProperty(intf, 'isContainer', {
            get: function () { return true; }
        });
        Object.defineProperty(intf, 'components', {
            get: function () {
                return self.components;
            }
        });
        Object.defineProperty(intf, 'preInitDataSet', {
            get: function () {
                var p = intf.pivotForm ? intf.pivotForm.preInitDataSet : self.preInitDataSet;
                return p;
            },
            set: function (value) {
                var p = intf.pivotForm ? intf.pivotForm.preInitDataSet : self.preInitDataSet;
                Object.assign(p, value);
            }
        });
        Object.defineProperty(intf, 'data', {
            get: dataGetter,
            set: dataSetter
        });
        Object.defineProperty(intf, 'mode', {
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
                    if (!self.dialog) {
                        self.dialog = dialog(self.dialogOptions);
                    }
                    self.dialog.title.innerHTML = self.title;
                    self.dialog.content.appendChild(self.form);
                    intf.appendChild(self.dialog);
                    self.dialog.attached = true;
                    requestAnimationFrame(function () {
                        self.dialog.centerHorizontally();
                    });
                } else {
                    if (self.dialog) {
                        self.dialog.attached = false;
                    }
                    intf.appendChild(self.form);
                }
            }
        });
        Object.defineProperty(intf, 'initializingComponents', {
            get: function () {
                if (intf.pivotForm) {
                    return intf.pivotForm.initializingComponents;
                }
                return self.initializingComponents;
            }
        });
        Object.defineProperty(intf, 'title', {
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
        Object.defineProperty(intf, 'dialog', {
            get: function () {
                return self.dialog || { attached: false };
            }
        });
        Object.defineProperty(intf, 'schema', {
            get: function () {
                return self.schema;
            },
            set: schemaSetter
        });
        Object.defineProperty(intf, 'name', {
            get: function () {
                return self.name;
            },
            set: function (value) {
                self.name = value;
                loadState();
            }
        });
        Object.defineProperty(intf, 'stylesheet', {
            get: function () {
                return self.userStyleSheet;
            },
            set: function (value) {
                if (self.userStyleSheet && self.userStyleSheet.parentNode) {
                    self.userStyleSheet.parentNode.removeChild(self.userStyleSheet);
                }
                self.userStyleSheet = util.createElement('link');
                self.userStyleSheet.rel = 'stylesheet';
                self.userStyleSheet.src = value;
                self.shadowRoot.appendChild(self.userStyleSheet);
            }
        });
        initSchema();
        return intf;
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
    PivotForm.prototype.components = defaultComponents;
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
    var components = {};
    // components that contain other components must be described here because
    // of the inherit circular reference to the components module
    function inputComponentFactory(inputOptions) {
        return function (header, index, pivotForm) {
            var component = util.createElement('span', null, {className: 'component input-type-' + inputOptions.type}),
                label = util.createElement('span', component, {className: 'label'}),
                input = util.createElement('input', component, inputOptions);
            label.innerHTML = header.title === undefined ? header.name : header.title;
            component.label = label;
            component.input = input;
            util.addEvents(input, header.events);
            util.addEvents(label, header.labelEvents);
            util.setProperties(input.style, header.style);
            util.setProperties(label.style, header.labelStyle);
            component.addEventListener = input.addEventListener;
            component.removeEventListener = input.removeEventListener;
            return component;
        };
    }
    // html 4 input types
    ['checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'text',
        // html 5 input types
        'color', 'date', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time',
        'url', 'week'].forEach(function (typeKey) {
        components[typeKey] = inputComponentFactory({className: 'input', type: typeKey});
    });
    components.select = function (header, index, pivotForm) {
        var componentContext = this,
            component = util.createElement('span', null, {className: 'component'}),
            label = util.createElement('span', component, {className: 'label'}),
            input = util.createElement('select', component, {className: 'select'}),
            fEnumVal,
            options = [];
        function fillOptions(arr) {
            arr.forEach(function (item) {
                var option;
                if (!Array.isArray(item)) { item = [item, item]; }
                option = util.createElement('option', input, {value: item[0], innerHTML: item[1]});
                util.setProperties(option, header.optionStyle);
                options.push(option);
            });
        }
        label.innerHTML = header.title === undefined ? header.name : header.title;
        component.label = label;
        component.input = input;
        component.containerStyle = {};
        util.addEvents(input, header.events);
        util.addEvents(label, header.labelEvents);
        util.setProperties(input.style, header.style);
        util.setProperties(label.style, header.labelStyle);
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
        component.addEventListener = input.addEventListener;
        component.removeEventListener = input.removeEventListener;
        return component;
    };
    components.HTMLElement = function (header, index, pivotForm) {
        var component = util.createElement(header.tagName, null, header);
        util.addEvents(component, header.componentEvents);
        util.setProperties(component.style, header.componentStyle);
        util.setProperties(component.containerStyle, header.containerStyle);
        return component;
    };
    ['h1', 'h2', 'h3', 'h4', 'button', 'hr', 'pre',
        'label', 'div', 'p', 'span', 'i', 'a'].forEach(function (h) {
        components[h] = function (header, index, pivotForm) {
            header.tagName = h;
            return components.HTMLElement(header, index, pivotForm);
        };
    });
    components.string = components.text;
    components['canvas-datagrid'] = function (header, index, pivotForm) {
        var pContext, component, grid, importScript;
        if (!window.canvasDatagrid) {
            importScript = util.createElement('script', null);
            importScript.src = header.src || 'https://unpkg.com/canvas-datagrid';
            importScript.type = 'text/javascript';
            importScript.async = false;
            document.getElementsByTagName('head')[0].appendChild(importScript);
        }
        pContext = this;
        component = util.createElement('div', null, {className: 'canvas-datagrid-child'});
        grid = window.canvasDatagrid();
        component.containerStyle = {
            width: '100%',
            height: '100%'
        };
        component.input = grid;
        header.static = header.static === undefined ? true : header.static;
        component.appendChild(grid);
        Object.keys(header).forEach(function (propertyKey) {
            grid[propertyKey] = header[propertyKey];
        });
        util.setProperties(grid, header);
        grid.name = pContext.name ? (pContext.name + '_canvas-datagrid_' + index) : undefined;
        util.addEvents(grid, header.events);
        util.addEvents(component, header.componentEvents);
        component.resize = function () {
            setTimeout(function () { grid.resize(true); }, 10);
        };
        function changeEvent() {
            // break circular refs
            if (!pivotForm.data) { return; }
            pivotForm.data[header.name] = util.jsonCopy(grid.data);
            pivotForm.dispatchEvent(new Event('change'));
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
        return component;
    };
    // hierarchical components
    components['pivot-form'] = function (header, index, pivotForm) {
        var pContext = this,
            component,
            name = pContext.name ? (pContext.name + '_pivot-form_' + index) : undefined;
        component = window.pivotForm();
        component.containerStyle = {};
        component.className = 'pivot-form-child';
        component.name = name;
        component.schema = header.schema;
        component.pivotForm = pivotForm;
        component.index = index;
        header.static = header.static === undefined ? true : header.static;
        util.setProperties(component.style, header.style);
        util.addEvents(component, header.events);
        Object.defineProperty(component, 'value', {
            get: function () {
                return component.data;
            },
            set: function (value) {
                component.data = value;
            }
        });
        return component;
    };
    components.tabs = function (header, index, pivotForm) {
        var component = util.createElement('div', null, {className: 'tabbed-component'}),
            tabsContainer = util.createElement('div', component, {className: 'tabs'}),
            activeTabIndex,
            tabs = [],
            defaultTab = header.defaultTabIndex || 0;
        component.containerStyle = {
            width: '100%'
        };
        component.isContainer = true;
        component.tabsContainer = tabsContainer;
        component.tabs = tabs;
        header.static = header.static === undefined ? true : header.static;
        function activateTab(tabIndex) {
            var activeTabItem = tabs[tabIndex],
                e = new Event('activatetab');
            e.tab = activeTabItem;
            if (!activeTabItem) { return; }
            activeTabIndex = tabIndex;
            tabs.forEach(function (tab) {
                var ev = new Event('deactivatetab');
                ev.tab = tab;
                tab.tabElement.classList.add('tab-inactive');
                tab.tabElement.classList.remove('tab-active');
                tab.content.classList.remove('tab-content-active');
                if (tab.content.parentNode) {
                    requestAnimationFrame(function () {
                        tab.content.parentNode.removeChild(tab.content);
                    });
                    component.dispatchEvent(ev);
                }
            });
            activeTabItem.tabElement.classList.add('tab-active');
            activeTabItem.tabElement.classList.remove('tab-inactive');
            activeTabItem.content.classList.add('tab-content-active');
            component.appendChild(activeTabItem.content);
            activeTabItem.pivotForm.resize();
            component.dispatchEvent(e);
        }
        header.tabs.forEach(function (tabHeader, index) {
            var tab = {};
            tab.tabElement = util.createElement('div', tabsContainer, {
                className: 'tab ' + 'tab-' + util.varSafe(tabHeader.name),
                events: {
                    click: function (e) {
                        if (activeTabIndex === index) { return; }
                        activateTab(index);
                    }
                },
                innerHTML: tabHeader.title || tabHeader.name
            });
            tab.content = util.createElement('div', null, { className: 'tab-content' });
            tab.pivotForm = components['pivot-form'](tabHeader, index, pivotForm);
            tab.pivotForm.addEventListener('change', function () {
                pivotForm.dispatchEvent(new Event('change'));
            });
            util.setProperties(tab.pivotForm, tabHeader);
            util.setProperties(tab.tabElement, tabHeader.tabStyle);
            util.setProperties(tab.content, tabHeader.contentStyle);
            util.addEvents(tab.tabElement, tabHeader.tabEvents);
            util.addEvents(tab.content, tabHeader.contentEvents);
            util.addEvents(tab.pivotForm, tabHeader.events);
            tab.content.appendChild(tab.pivotForm);
            tabs.push(tab);
        });
        component.getComponentsByPropertyValue = function getComponentsByPropertyValue(key, value) {
            var found = [];
            tabs.forEach(function (tab) {
                found = found.concat(tab.pivotForm.getComponentsByPropertyValue(key, value));
            });
            return found;
        };
        component.getCompoentByName = function getCompoentByName(value) {
            return component.getComponentsByPropertyValue('name', value)[0];
        };
        component.getCompoentById = function getCompoentById(value) {
            return component.getComponentsByPropertyValue('id', value)[0];
        };
        util.addEventInterface(component, header, index, pivotForm);
        util.addEvents(component, header.events);
        util.setProperties(component.containerStyle, header.containerStyle);
        // instantiate each tab
        header.tabs.forEach(function (tabName, index) {
            if (defaultTab === index) { return; }
            activateTab(index);
        });
        activateTab(defaultTab || 0);
        Object.defineProperty(component, 'tabIndex', {
            get: function () {
                return activeTabIndex;
            },
            set: function (value) {
                return activateTab(Math.max(value, tabs.length - 1));
            }
        });
        Object.defineProperty(component, 'value', {
            get: function () {
                var d = {};
                tabs.forEach(function (tab) {
                    Object.assign(d, tab.pivotForm.data);
                });
                return d;
            },
            set: function (value) {
                tabs.forEach(function (tab) {
                    tab.pivotForm.value = value;
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
        self.closeable = true;
        self.maximizeable = false;
        self.minimizable = false;
        self.stayCenteredHorizontally = false;
        self.stayCenteredVertically = false;
        intf.minWidth = 300;
        intf.minHeight = 27;
        // a rough area were bandit pixels hang out
        self.borderZone = 10;
        intf.attached = false;
        function resizeMouseHover(ev) {
            if (self.moving) { return; }
            if (self.minimized) { return; }
            if (self.maximized) { return; }
            self.borderResizeCursor = 'auto';
            self.borderResizeMode = undefined;
            var d = intf.getBoundingClientRect(),
                b = self.borderZone,
                x = ev.clientX - d.left,
                y = ev.clientY - d.top,
                height = d.height,
                width = d.width,
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
        function centerVertically(verticalAlso) {
            intf.style.top = document.scrollingElement.scrollTop + (window.innerHeight / 2) - (self.intf.offsetHeight / 2) + 'px';
        }
        function centerHorizontally(verticalAlso) {
            intf.style.left = (window.innerWidth / 2) - (self.intf.offsetWidth / 2) + 'px';
        }
        function center() {
            centerVertically();
            centerHorizontally();
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
            if (self.stayCenteredHorizontally) {
                centerHorizontally();
            }
            if (self.stayCenteredVertically) {
                centerVertically();
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
            self.modalElement = ce('div', null, {
                style: {
                    top: 0,
                    left: 0,
                    position: 'fixed',
                    background: 'rgba(0, 0, 0, 0.25)',
                    height: '100%',
                    width: '100%'
                }
            });
            self.titleBar = ce('div', intf, {className: 'dialog-title-bar'});
            self.title = ce('span', self.titleBar, {className: 'dialog-title', innerHTML: args.title || '' });
            self.content = ce('div', intf, {className: 'dialog-content'});
            self.card = ce('div', null, {className: 'dialog-card'});
            self.controlBoxMinimize = ce('div', null, {className: 'dialog-minimize'});
            self.controlBoxMaximize = ce('div', null, {className: 'dialog-maximize'});
            self.controlBoxClose = ce('div', self.titleBar, {className: 'dialog-close'});
            self.titleBar.addEventListener('mousedown', beginDialogMove);
            intf.style.top = document.scrollingElement.scrollTop + 20 + 'px';
            window.addEventListener('resize', resize);
            intf.addEventListener('mousedown', beginDialogMove);
            intf.addEventListener('mousemove', resizeMouseHover);
            // interface
            Object.defineProperty(intf, 'title', {
                get: function () {
                    return self.title;
                }
            });
            Object.defineProperty(intf, 'modal', {
                get: function (value) {
                    return self.modal;
                },
                set: function (value) {
                    self.modal = !!value;
                    if (self.modal) {
                        document.body.appendChild(self.modalElement);
                    } else {
                        document.body.removeChild(self.modalElement);
                    }
                    window.dispatchEvent(new Event('resize'));
                }
            });
            Object.defineProperty(intf, 'value', {
                get: function () {
                    return self.title.innerHTML;
                },
                set: function (value) {
                    self.card.innerHTML = value;
                    self.title.innerHTML = value;
                }
            });
            Object.defineProperty(intf, 'closeable', {
                get: function () {
                    return self.closeable;
                },
                set: function (value) {
                    self.closeable = !!value;
                    self.controlBoxClose.style.display = self.closeable ? 'inline-block' : 'none';
                }
            });
            Object.defineProperty(intf, 'maximizeable', {
                get: function () {
                    return self.maximizeable;
                },
                set: function (value) {
                    self.maximizeable = !!value;
                    self.controlBoxMaximize.style.display = self.maximizeable ? 'inline-block' : 'none';
                    self.titleBar.ondblclick = self.maximizeable ? maximize : undefined;
                }
            });
            Object.defineProperty(intf, 'stayCenteredHorizontally', {
                get: function () {
                    return self.stayCenteredHorizontally;
                },
                set: function (value) {
                    self.stayCenteredHorizontally = !!value;
                    resize();
                }
            });
            Object.defineProperty(intf, 'stayCenteredVertically', {
                get: function () {
                    return self.stayCenteredVertically;
                },
                set: function (value) {
                    self.stayCenteredVertically = !!value;
                    resize();
                }
            });
            Object.defineProperty(intf, 'minimizable', {
                get: function () {
                    return self.minimizable;
                },
                set: function (value) {
                    self.minimizable = !!value;
                    self.controlBoxMinimize.style.display = self.minimizable ? 'inline-block' : 'none';
                }
            });
            intf.content = self.content;
            intf.card = self.card;
            intf.titleBar = self.titleBar;
            intf.center = center;
            intf.centerHorizontally = centerHorizontally;
            intf.centerVertically = centerVertically;
            intf.controlBoxMinimize = self.controlBoxMinimize;
            intf.controlBoxMaximize = self.controlBoxMaximize;
            intf.controlBoxClose = self.controlBoxClose;
            intf.open = open;
            intf.close = close;
            intf.dispose = dispose;
            intf.maximize = maximize;
            intf.minimize = minimize;
            intf.maximize = maximize;
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
