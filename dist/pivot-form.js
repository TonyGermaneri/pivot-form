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
    var idPrefix = 'p' + Math.floor(Math.random() * Math.pow(10, 10)).toString(16),
        idCounter = 0;
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
        setProperties: function setProperties(root, props) {
            if (typeof props !== 'object' || props === null || !root) { return; }
            Object.keys(props).forEach(function (keyName) {
                // if trying to bind to an existing object, assign individual items to avoid
                // illegality
                if (typeof root[keyName] === 'object' && !Array.isArray(root[keyName])
                        && root[keyName] !== null) {
                    setProperties(root[keyName], props[keyName]);
                    return;
                }
                root[keyName] = props[keyName];
            });
        },
        createId: function () {
            idCounter += 1;
            return idPrefix + idCounter;
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
        self.legend = util.createElement('legend', null, {className: 'legend'});
        self.uniqueId = Math.random() + '-' + performance.now();
        self.title = '';
        self.componentOrder = [];
        self.initializingComponents = {};
        // represents data input via data setter prior to async init values completed
        self.preInitData = {};
        self.components = [];
        self.idCounter = -1;
        self.data = {};
        self.dialogOptions = {};
        self.childForms = [];
        intf = window.customElements ? eval('Reflect.construct(HTMLElement, [], new.target)')
            : util.createElement('section');
        function getNewId() {
            self.idCounter += 1;
            return 'p' + Math.floor((Math.random() * Math.pow(2, 30))).toString(36);
        }
        function getComponentsByPropertyValue(key, value) {
            var found = [];
            intf.childForms.forEach(function (form) {
                found = found.concat(form.getComponentsByPropertyValue(key, value));
            });
            self.components.forEach(function (component) {
                if (component && component.isContainer) {
                    // this list of components will be in the above child forms
                    return;
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
        function setPreInitData() {
            if (!self.initialized) { return; }
            if (Object.keys(self.preInitData).length > 0) {
                intf.data = self.preInitData;
            }
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
            if (!self.inputComponentOrganicOrder) { return; }
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
        function doneInitializing() {
            if (Object.keys(self.initializingComponents).length === 0) {
                // notify that everything has been initialized on this form
                intf.classList.remove('loading');
                intf.dispatchEvent(new Event('initialized'));
                console.log('initialized');
                self.initialized = true;
            }
        }
        function createDom() {
            self.components.forEach(function (component, organicComponentIndex) {
                organicComponentIndex += 1;
                var container = util.createElement('div', null, {className: 'component-item'}),
                    handle = util.createElement('span', component.header.moveable
                        ? container : null, {className: 'item-handle', innerHTML: '\u205E'}),
                    dataStub = {};
                if (component.header.hidden) {
                    container.style.display = 'none';
                }
                function initialized() {
                    component.removeEventListener('initialized', initialized);
                    delete self.initializingComponents[component.id];
                    doneInitializing();
                    setPreInitData();
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
                // a value was defined in the schema as a default
                // assume this is an async function and delay loading of data via data setter
                // by adding items to self.initializingComponents
                if (!component.initialzied && component.header.name && component.header.value) {
                    dataStub[component.header.name] = component.header.value;
                    self.initializingComponents[component.id] = component;
                    component.addEventListener('initialized', initialized);
                    component.value = dataStub;
                    return;
                }
                // if a component does not have initial data, call initialized
                // after just a moment to allow additional components in the array
                // to fill self.initializingComponents before it is checked for the first time.
                requestAnimationFrame(initialized);
            });
            updateFlexOrder();
        }
        function initData(newData) {
            function componentDataSetter(component) {
                component.value = newData;
            }
            self.components.forEach(componentDataSetter);
            intf.childForms.forEach(function (form) {
                form.components.forEach(componentDataSetter);
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
                component = t.call(intf, header, index, intf);
                // add events, properties, id, name, index
                util.addEvents(component, header.componentEvents);
                component.header = header;
                component.name = component.name || (header.name === undefined ? '__' + id : header.name);
                component.id = id;
                component.index = index;
                // add component to the stack
                self.components.push(component);
                // listen to the component's change event
                function change() {
                    var cData = {};
                    // set the new value of the element to data
                    cData[header.name] = component.input.value;
                    //intf.data = cData;
                    // update any other components of the same header.name with this value
                    getComponentsByPropertyValue('name', header.name).forEach(function (comp) {
                        if (comp !== component) {
                            comp.value = cData;
                        }
                    });
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
                            function setValue(v) {
                                // set the value of the form
                                intf.data[header.name] = v;
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
                                        // delay by one animation frame to allow for
                                        // other async setters in the schema to setup their functions
                                        requestAnimationFrame(function () {
                                            component.dispatchEvent(new Event('initialized'));
                                        });
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
                                    return;
                                }
                                component.async = true;
                                return;
                            }
                            // if this was was not a function, run setter now
                            setValue(value);
                        }
                    });
                }
                util.setProperties(component.style, header.componentStyle);
            });
            createDom();
        }
        function dispatchResize() {
            intf.dispatchEvent(new Event('resize'));
        }
        function setMode() {
            if (intf.mode === 'dialog') {
                self.dialogOptions.title = intf.title;
                if (!self.dialog) {
                    self.dialog = dialog(self.dialogOptions);
                }
                // TODO, prevent double resize binding
                self.dialog.addEventListener('resize', dispatchResize);
                if (self.userStyleSheet) {
                    self.shadowRoot.appendChild(self.userStyleSheet);
                }
                self.dialog.content.appendChild(self.form);
                self.shadowRoot.appendChild(self.dialog);
                self.dialog.attached = true;
                if (self.shadowRoot.contains(self.fieldset)) { self.shadowRoot.removeChild(self.fieldset); }
            } else if (intf.mode === 'fieldset') {
                if (!self.fieldset) {
                    self.fieldset = util.createElement('fieldset', self.shadowRoot, {className: 'fieldset'});
                }
                self.fieldset.appendChild(self.legend);
                self.fieldset.appendChild(self.form);
                if (self.shadowRoot.contains(self.dialog)) { self.shadowRoot.removeChild(self.dialog); }
            } else {
                if (self.userStyleSheet) {
                    self.shadowRoot.appendChild(self.userStyleSheet);
                }
                self.shadowRoot.appendChild(self.form);
                if (self.shadowRoot.contains(self.fieldset)) { self.shadowRoot.removeChild(self.fieldset); }
                if (self.shadowRoot.contains(self.dialog)) { self.shadowRoot.removeChild(self.dialog); }
            }
        }
        function init() {
            if (intf.initialized) { return; }
            self.shadowRoot = intf.attachShadow ? intf.attachShadow({mode: 'open'}) : intf;
            if (!self.cssAttached) {
                util.createElement('link', self.shadowRoot, {
                    rel: 'stylesheet',
                    href: /^file:\/\/\//.test(window.location) ? '../lib/index.css' : 'data:text/css;base64,Lm5vc2VsZWN0LCAudGFicywgLmRpYWxvZy10aXRsZS1iYXIgewogICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lOwogICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsKICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7CiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7CiAgICB1c2VyLXNlbGVjdDogbm9uZTsKfQoubG9hZGluZyB7CiAgICBjdXJzb3I6IHdhaXQ7Cn0KLnBpdm90LWZvcm0gewogICAgZGlzcGxheTogdmFyKC0tcGl2b3QtZm9ybS1kaXNwbGF5LCBmbGV4KTsKICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1waXZvdC1mb3JtLWZsZXgtZGlyZWN0aW9uLCByb3cpOwogICAgZmxleC13cmFwOiB2YXIoLS1waXZvdC1mb3JtLWZsZXgtd3JhcCwgd3JhcCk7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtanVzdGlmeS1jb250ZW50LCBzcGFjZS1iZXR3ZWVuKTsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLXdpZHRoLCAxMDAlKTsKfQouY29tcG9uZW50LWl0ZW0gewogICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICAgIGRpc3BsYXk6IHZhcigtLXBpdm90LWZvcm0tZGlzcGxheSwgZmxleCk7CiAgICBmbGV4LWRpcmVjdGlvbjogdmFyKC0tcGl2b3QtZm9ybS1mbGV4LWRpcmVjdGlvbiwgcm93KTsKICAgIGZsZXgtd3JhcDogdmFyKC0tcGl2b3QtZm9ybS1mbGV4LXdyYXAsIHdyYXApOwogICAganVzdGlmeS1jb250ZW50OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LWp1c3RpZnktY29udGVudCwgc3BhY2UtYmV0d2Vlbik7CiAgICBtYXJnaW46IHZhcigtLXBpdm90LWZvcm0tY29tcG9uZW50LWl0ZW0tbWFyZ2luLCA0cHgpOwp9Ci5sYWJlbCB7CiAgICBtaW4td2lkdGg6IHZhcigtLXBpdm90LWZvcm0tbGFiZWwtbWluLXdpZHRoLCAxMDBweCk7CiAgICBtYXgtd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tbGFiZWwtbWF4LXdpZHRoLCAxNTBweCk7CiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICBmb250LWZhbWlseTogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1mb250LWZhbWlseSwgc2Fucy1zZXJpZik7CiAgICBjb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1sYWJlbC1jb2xvciwgIzAwMCk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWxhYmVsLWJhY2tncm91bmQtY29sb3IsIHRyYW5zcGFyZW50KTsKfQouc2VsZWN0IHsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIG1pbi13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1zZWxlY3QtbWluLXdpZHRoLCAxMzNweCk7CiAgICBtYXgtd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tc2VsZWN0LW1heC13aWR0aCwgMTUwcHgpOwp9Ci5pbnB1dCB7CiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICBtaW4td2lkdGg6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtbWluLXdpZHRoLCAxMDBweCk7CiAgICBtYXgtd2lkdGg6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtbWF4LXdpZHRoLCAxNTBweCk7CiAgICBmb250LXNpemU6IHZhcigtLXBpdm90LWZvcm0taW5wdXQtZm9udC1zaXplLCAxMnB4KTsKfQouZmllbGRzZXQgewogICAgbWFyZ2luLXRvcDogdmFyKC0tcGl2b3QtZm9ybS1maWVsZHNldC1tYXJnaW4tdG9wLCA1cHgpOwogICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWZpZWxkc2V0LW1hcmdpbi1yaWdodCwgMTBweCk7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLWZpZWxkc2V0LW1hcmdpbi1ib3R0b20sIDVweCk7CiAgICBtYXJnaW4tbGVmdDogdmFyKC0tcGl2b3QtZm9ybS1maWVsZHNldC1tYXJnaW4tbGVmdCwgNXB4KTsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1maWVsZHNldC1ib3JkZXItY29sb3IsICNDQ0MpOwogICAgYm9yZGVyLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLWZpZWxkc2V0LWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWZpZWxkc2V0LWJvcmRlci13aWR0aCwgMXB4KTsKfQouaXRlbS1oYW5kbGUsIC5yZW9yZGVyLW1hcmtlciB7CiAgICBjdXJzb3I6IG1vdmU7CiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICB3aWR0aDogN3B4OwogICAgaGVpZ2h0OiAxOXB4OwogICAgbWluLXdpZHRoOiA1cHg7CiAgICBtYXJnaW4tcmlnaHQ6IDVweDsKICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIGNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1jb2xvciwgIzMzMyk7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1iYWNrZ3JvdW5kLWNvbG9yLCAjRUVFKTsKICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci1yYWRpdXMsIDRweCk7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci1jb2xvciwgI0NDQyk7CiAgICBib3JkZXItc3R5bGU6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLXdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1ib3JkZXItd2lkdGgsIDFweCk7Cn0KLnJlb3JkZXItZHJhZy1vdmVyIC5pdGVtLWhhbmRsZTpudGgtY2hpbGQoMSkgewogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtZHJhZy1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDExMCwgMTY4LCAyNTUsIDEpKTsKfQoucmVvcmRlci1tYXJrZXIgewogICAgY29sb3I6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLXJlb3JkZXJpbmctbWFya2VyLWNvbG9yLCAjMzMzKTsKICAgIGJhY2tncm91bmQ6IHZhcigtLXBpdm90LWZvcm0taGFuZGxlLXJlb3JkZXJpbmctbWFya2VyLWNvbG9yLCAjRUVFKTsKICAgIGhlaWdodDogdmFyKC0tcGl2b3QtZm9ybS1oYW5kbGUtcmVvcmRlcmluZy1tYXJrZXItaGVpZ2h0LCAyM3B4KTsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWhhbmRsZS1yZW9yZGVyaW5nLW1hcmtlci13aWR0aCwgMTBweCk7CiAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICB6LWluZGV4OiAxMDsKfQoudGFiYmVkLWNvbXBvbmVudCB7CiAgICB3aGl0ZS1zcGFjZTogbm93cmFwOwogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tYm90dG9tLCA4cHgpOwogICAgbWFyZ2luLXRvcDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tdG9wLCA0cHgpOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtbWFyZ2luLWxlZnQsIDApOwogICAgbWFyZ2luLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi1yaWdodCwgMCk7CiAgICB3aWR0aDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC13aWR0aCwgMTAwJSk7Cn0KLnRhYnMgewogICAgZGlzcGxheTogdmFyKC0tcGl2b3QtZm9ybS10YWItY29tcG9uZW50LWRpc3BsYXksIGlubGluZS1mbGV4KTsKICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb21wb25lbnQtZmxleC1kaXJlY3Rpb24sIHJvdyk7CiAgICBmbGV4LXdyYXA6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbXBvbmVudC1mbGV4LXdyYXAsIHdyYXAtcmV2ZXJzZSk7CiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItdG9wLWxlZnQtcmFkaXVzLCA0cHgpOwogICAgYm9yZGVyLWxlZnQtc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLWxlZnQtd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci13aWR0aCwgMXB4KTsKICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItY29sb3IsICNCQkIpOwogICAgbWFyZ2luLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtbWFyZ2luLXJpZ2h0LCAxMHB4KTsKICAgIG1hcmdpbi1yaWdodDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tcmlnaHQsIDEwcHgpOwp9Ci50YWIgewogICAgcGFkZGluZy10b3A6IHZhcigtLXBpdm90LWZvcm0tdGFiLXBhZGRpbmctdG9wLCA0cHgpOwogICAgcGFkZGluZy1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1wYWRkaW5nLWxlZnQsIDRweCk7CiAgICBwYWRkaW5nLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItcGFkZGluZy1ib3R0b20sIDRweCk7CiAgICBwYWRkaW5nLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1wYWRkaW5nLXJpZ2h0LCA0cHgpOwogICAgY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbG9yLCAjMzMzKTsKICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJhY2tncm91bmQtY29sb3IsICNFRUUpOwogICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cywgNHB4KTsKICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1cywgNHB4KTsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLWNvbG9yLCAjQkJCKTsKICAgIGJvcmRlci1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS10YWItYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci13aWR0aCwgMXB4KTsKICAgIGJvcmRlci1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1ib3R0b20sIG5vbmUpOwogICAgYm9yZGVyLWxlZnQ6IHZhcigtLXBpdm90LWZvcm0tdGFiLWJvcmRlci1sZWZ0LCBub25lKTsKICAgIGZvbnQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS10YWItZm9udC1zaXplLCAxNHB4KTsKICAgIGRpc3BsYXk6IHZhcigtLXBpdm90LWZvcm0tdGFiLWRpc3BsYXksIGlubGluZS1ibG9jayk7CiAgICBjdXJzb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWN1cnNvciwgcG9pbnRlcik7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1tYXJnaW4tYm90dG9tLCAtMXB4KTsKICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1tYXJnaW4tbGVmdCwgMCk7CiAgICBmb250LWZhbWlseTogdmFyKC0tcGl2b3QtZm9ybS10YWItZm9udC1mYW1pbHksIHNhbnMtc2VyaWYpOwogICAgYm94LXNoYWRvdzogaW5zZXQgMCAtMnB4IDJweCB2YXIoLS1waXZvdC1mb3JtLXRhYi1pbmFjdGl2ZS1ib3gtc2hhZG93LWNvbG9yLCAjREREKTsKfQoudGFiLWFjdGl2ZSB7CiAgICBib3JkZXItY29sb3I6IHZhcigtLXBpdm90LWZvcm0tdGFiLWFjdGl2ZS1ib3JkZXItY29sb3IsICNBQUEpOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS10YWItYWN0aXZlLWJhY2tncm91bmQtY29sb3IsICNGRUZFRkUpOwogICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tcGl2b3QtZm9ybS10YWItYWN0aXZlLW1hcmdpbi1ib3R0b20sIC0xcHgpOwogICAgYm94LXNoYWRvdzogaW5zZXQgMCAtM3B4IDNweCB0cmFuc3BhcmVudDsKfQoudGFiLWNvbnRlbnQgewogICAgZGlzcGxheTogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1kaXNwbGF5LCBmbGV4KTsKICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LWZsZXgtZGlyZWN0aW9uLCByb3cpOwogICAgZmxleC13cmFwOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LWZsZXgtd3JhcCwgd3JhcCk7CiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi1ib3R0b20sIDApOwogICAgbWFyZ2luLXRvcDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tdG9wLCAwKTsKICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LW1hcmdpbi1sZWZ0LCAxMHB4KTsKICAgIG1hcmdpbi1yaWdodDogdmFyKC0tcGl2b3QtZm9ybS10YWItY29udGVudC1tYXJnaW4tcmlnaHQsIDEwcHgpOwogICAgcGFkZGluZy1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LXBhZGRpbmctbGVmdCwgMCk7CiAgICBwYWRkaW5nLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LXBhZGRpbmctcmlnaHQsIDApOwogICAgcGFkZGluZy10b3A6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtcGFkZGluZy10b3AsIDApOwogICAgcGFkZGluZy1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtcGFkZGluZy1ib3R0b20sIDApOwogICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXRhYi1jb250ZW50LWJvcmRlci1jb2xvciwgIzk5OSk7CiAgICBib3JkZXItc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tdGFiLWNvbnRlbnQtYm9yZGVyLXdpZHRoLCAxcHgpOwp9Ci50YWItY29udGVudC1pbmFjdGl2ZSB7CiAgICBkaXNwbGF5OiBub25lOwp9Ci50YWItY29udGVudC1hY3RpdmUgewogICAgZGlzcGxheTogYmxvY2s7Cn0KLmNhbnZhcy1kYXRhZ3JpZC1jaGlsZCB7CiAgICB3aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1jYW52YXMtZGF0YWdyaWQtd2lkdGgsIDEwMCUpOwogICAgaGVpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWNhbnZhcy1kYXRhZ3JpZC1taW4taGVpZ2h0LCAxNzVweCk7Cn0KLmRpYWxvZyB7CiAgICB3aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctd2lkdGgsIDUwMHB4KTsKICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctYm9yZGVyLWNvbG9yLCAjODg4KTsKICAgIGJvcmRlci1zdHlsZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctYm9yZGVyLXN0eWxlLCBzb2xpZCk7CiAgICBib3JkZXItd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWJvcmRlci13aWR0aCwgMXB4KTsKICAgIHBvc2l0aW9uOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1wb3NpdGlvbiwgYWJzb2x1dGUpOwogICAgb3ZlcmZsb3c6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLW92ZXJmbG93LCBoaWRkZW4pOwogICAgei1pbmRleDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctei1pbmRleCwgMTAwMDApOwp9Ci5kaWFsb2ctY29udGVudCB7CiAgICBwYWRkaW5nLXRvcDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udGVudC1wYWRkaW5nLXRvcCwgMnB4KTsKICAgIHBhZGRpbmctbGVmdDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udGVudC1wYWRkaW5nLWxlZnQsIDApOwogICAgcGFkZGluZy1ib3R0b206IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRlbnQtcGFkZGluZy1ib3R0b20sIDJweCk7CiAgICBwYWRkaW5nLXJpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250ZW50LXBhZGRpbmctcmlnaHQsIDApOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udGVudC1iYWNrZ3JvdW5kLWNvbG9yLCAjRkZGKTsKICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwJSAtIHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWJhci1oZWlnaHQsIDI3cHgpKTsKICAgIG1heC1oZWlnaHQ6IGNhbGMoMTAwJSAtIHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWJhci1oZWlnaHQsIDI3cHgpKTsKICAgIG1pbi13aWR0aDogMTAwJTsKICAgIG1heC13aWR0aDogMTAwJTsKICAgIG92ZXJmbG93OiBhdXRvOwp9Ci5kaWFsb2ctdGl0bGUgewogICAgZmxvYXQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLWZsb2F0LCBsZWZ0KTsKICAgIGZvbnQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtZm9udC1zaXplLCAyMHB4KTsKICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1tYXJnaW4tbGVmdCwgN3B4KTsKICAgIG1hcmdpbi10b3A6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLXRpdGxlLW1hcmdpbi10b3AsIDNweCk7CiAgICBmb250LWZhbWlseTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtZm9udC1mYW1pbHksIHNhbnMtc2VyaWYpOwogICAgY3Vyc29yOiBkZWZhdWx0OwogICAgcG9zaXRpb246IHJlbGF0aXZlOwogICAgdG9wOiAwcHg7CiAgICBsZWZ0OiAwcHg7Cn0KLmRpYWxvZy10aXRsZS1iYXIgewogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFja2dyb3VuZC1jb2xvciwgI0RERCk7CiAgICB0ZXh0LWFsaWduOiByaWdodDsKICAgIGhlaWdodDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFyLWhlaWdodCwgMjdweCk7CiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYXItYm9yZGVyLWJvdHRvbS1jb2xvciwgI0JCQik7CiAgICBib3JkZXItYm90dG9tLXN0eWxlOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy10aXRsZS1iYXItYm9yZGVyLWJvdHRvbS1zdHlsZSwgc29saWQpOwogICAgYm9yZGVyLWJvdHRvbS13aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctdGl0bGUtYmFyLWJvcmRlci1ib3R0b20td2lkdGgsIDFweCk7Cn0KLmRpYWxvZy1taW5pbWl6ZSwgLmRpYWxvZy1yZXN0b3JlLCAuZGlhbG9nLW1heGltaXplLCAuZGlhbG9nLWNsb3NlIHsKICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgIGJhY2tncm91bmQtc2l6ZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtYmFja2dyb3VuZC1zaXplLCAyN3B4KTsKICAgIGJhY2tncm91bmQtcmVwZWF0OiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1iYWNrZ3JvdW5kLXJlcGVhdCwgbm8tcmVwZWF0KTsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC13aWR0aCwgMjdweCk7CiAgICBoZWlnaHQ6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXdpZHRoLCAxOHB4KTsKICAgIG1hcmdpbjogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtbWFyZ2luLCAzcHgpOwogICAgY3Vyc29yOiB2YXIoLS1waXZvdC1mb3JtLWRpYWxvZy1jb250cm9sLWJveC1jdXJzb3IsIHBvaW50ZXIpOwp9Ci5kaWFsb2ctbWluaW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtbWluaW1pemUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVAvLy8zZDNkeUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUloakkrcHkrMFBvNXkwMm91ejNyejdENFlZUUpabFo2Wm9lb3J1QzhmeVRFOEZBRHM9KSk7Cn0KLmRpYWxvZy1yZXN0b3JlIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXJlc3RvcmUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVBIeDhYWjJkaUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUl2akkrcHkrMFBvNXkwMm91ekJyd0RuWGdkaUh3bEtYS0d1YVVyR3I0Z3U0NXpUTW9IUGJ2NUR3d0toOFFpcVFBQU93PT0pKTsKfQouZGlhbG9nLW1heGltaXplIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LW1heGltaXplLWJhY2tncm91bmQtaW1hZ2UsIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJZ0FZQUlBQUFQLy8vM2QzZHlINUJBQUFBQUFBTEFBQUFBQWlBQmdBQUFJdGpJK3B5KzBQbzV5MDJvdXozZzM0LzNFQlNJb2thQzVBcXF5Y204Q2FmTkNZUFpxbkovYitEd3dLaDVvQ0FEcz0pKTsKfQouZGlhbG9nLWNsb3NlIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LWNsb3NlLWJhY2tncm91bmQtaW1hZ2UsIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJZ0FZQUlBQUFQSHg4WGQzZHlINUJBQUFBQUFBTEFBQUFBQWlBQmdBQUFJcGpJK3B5KzBQbzV5MDJvdXozdndDOVhWQmFKQmlhSXBqcWdKc2g2b2w4bUpzTGVmNnp2ZStXQUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWF4aW1pemVkIC5kaWFsb2ctbWF4aW1pemUgewogICAgYmFja2dyb3VuZC1pbWFnZTogdmFyKC0tcGl2b3QtZm9ybS1kaWFsb2ctY29udHJvbC1ib3gtcmVzdG9yZS1iYWNrZ3JvdW5kLWltYWdlLCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoSWdBWUFJQUFBUEh4OFhaMmRpSDVCQUFBQUFBQUxBQUFBQUFpQUJnQUFBSXZqSStweSswUG81eTAyb3V6QnJ3RG5YZ2RpSHdsS1hLR3VhVXJHcjRndTQ1elRNb0hQYnY1RHd3S2g4UWlxUUFBT3c9PSkpOwp9Ci5kaWFsb2ctbWF4aW1pemVkIHsKICAgIGhlaWdodDogMTAwJTsKICAgIHdpZHRoOiAxMDAlOwogICAgcG9zaXRpb246IGZpeGVkOwogICAgdG9wOiAwOwogICAgbGVmdDogMDsKfQouZGlhbG9nLW1pbmltaXplZCB7CiAgICB3aWR0aDogMjAwcHg7CiAgICBoZWlnaHQ6IDI3cHg7CiAgICByaWdodDogMDsKfQouZGlhbG9nLW1pbmltaXplZCAuZGlhbG9nLW1pbmltaXplIHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHZhcigtLXBpdm90LWZvcm0tZGlhbG9nLWNvbnRyb2wtYm94LXJlc3RvcmUtYmFja2dyb3VuZC1pbWFnZSwgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaElnQVlBSUFBQVBIeDhYWjJkaUg1QkFBQUFBQUFMQUFBQUFBaUFCZ0FBQUl2akkrcHkrMFBvNXkwMm91ekJyd0RuWGdkaUh3bEtYS0d1YVVyR3I0Z3U0NXpUTW9IUGJ2NUR3d0toOFFpcVFBQU93PT0pKTsKfQouZGlhbG9nLW1pbmltaXplZCAuZGlhbG9nLXRpdGxlIHsKICAgIGZvbnQtc2l6ZTogMTdweDsKfQouZGlhbG9nLW1pbmltaXplZCAuZGlhbG9nLXJlc3RvcmUsCi5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctY2xvc2UsCi5kaWFsb2ctbWluaW1pemVkIC5kaWFsb2ctY29udGVudCB7CiAgICBkaXNwbGF5OiBub25lOwp9Ci5kaWFsb2ctY2xvc2VkIHsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLnNwbGl0LWNvbnRhaW5lci1jb21wb25lbnQgewogICAgd2lkdGg6IDEwMCU7Cn0KLnNwbGl0LWNvbnRhaW5lci1jdXR0ZXIgewogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl2b3QtZm9ybS1zcGxpdC1jb250YWluZXItYmFja2dyb3VuZC1jb2xvciwgI0RERCk7CiAgICBvdXRsaW5lLWNvbG9yOiB2YXIoLS1waXZvdC1mb3JtLXNwbGl0LWNvbnRhaW5lci1vdXRsaW5lLWNvbG9yLCAjQkJCKTsKICAgIG91dGxpbmUtc3R5bGU6IHZhcigtLXBpdm90LWZvcm0tc3BsaXQtY29udGFpbmVyLW91dGxpbmUtc3R5bGUsIHNvbGlkKTsKICAgIG91dGxpbmUtd2lkdGg6IHZhcigtLXBpdm90LWZvcm0tc3BsaXQtY29udGFpbmVyLW91dGxpbmUtd2lkdGgsIDFweCk7CiAgICBvdmVyZmxvdzogaGlkZGVuOwp9Ci5zcGxpdC1jb250YWluZXItcGFuZWwgewogICAgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgIHZlcnRpY2FsLWFsaWduOiB2YXIoLS1waXZvdC1mb3JtLXNwbGl0LWNvbnRhaW5lci1wYW5lbC12ZXJ0aWNhbC1hbGlnbiwgdG9wKTsKfQouc3BsaXQtY29udGFpbmVyLWN1dHRlci12ZXJ0aWNhbCB7CiAgICB3aWR0aDogdmFyKC0tcGl2b3QtZm9ybS1zcGxpdC1jb250YWluZXItY3V0dGVyLXZlcnRpY2FsLXdpZHRoLCAzcHgpOwogICAgaGVpZ2h0OiB2YXIoLS1waXZvdC1mb3JtLXNwbGl0LWNvbnRhaW5lci1jdXR0ZXItdmVydGljYWwtaGVpZ2h0LCAxMDAlKTsKfQouc3BsaXQtY29udGFpbmVyLWN1dHRlci1ob3Jpem9udGFsIHsKICAgIHdpZHRoOiB2YXIoLS1waXZvdC1mb3JtLXNwbGl0LWNvbnRhaW5lci1jdXR0ZXItaG9yaXpvbnRhbC13aWR0aCwgMTAwJSk7CiAgICBoZWlnaHQ6IHZhcigtLXBpdm90LWZvcm0tc3BsaXQtY29udGFpbmVyLWN1dHRlci1ob3Jpem9udGFsLWhlaWdodCwgM3B4KTsKfQo='
                });
                self.cssAttached = true;
            }
            setMode();
            intf.form = self.form;
            intf.initialized = true;
            loadState();
            if (self.dialog) {
                setTimeout(function () { self.dialog.centerHorizontally(); }, 1);
            }
        }
        function dataSetter(value) {
            if (!self.initialized) {
                Object.assign(self.preInitData, value);
                intf.childForms.forEach(function (form) {
                    form.data = value;
                });
                return;
            }
            initData(value);
        }
        function dataGetter() {
            var d = {};
            function componentDataGetter(component) {
                if (!component.header.name) { return; }
                d[component.header.name] = component.value;
            }
            self.components.forEach(componentDataGetter);
            intf.childForms.forEach(function (form) {
                form.components.forEach(componentDataGetter);
            });
            Object.keys(d).forEach(function (key) {
                var val = d[key];
                Object.defineProperty(d, key, {
                    set: function (value) {
                        var cData = {};
                        cData[key] = value;
                        if (!self.initialized) {
                            Object.assign(self.data, cData);
                            self.components.forEach(function (component) {
                                component.value = self.data;
                            });
                        }
                        intf.childForms.forEach(function (form) {
                            form.data = cData;
                        });
                    },
                    get: function () {
                        return val;
                    }
                });
            });
            return d;
        }
        function schemaSetter(value) {
            self.schema = value;
            initSchema();
        }
        function addChildForm(form) {
            form.id = getNewId();
            function childFormChange() {
                // tell the parent to dispatch an even to its listeners
                intf.dispatchEvent(new Event('change'));
            }
            form.name = self.name ? (self.name + '_pivot-form_' + self.childForms.length) : undefined;
            form.addEventListener('change', childFormChange);
            intf.addEventListener('stylesheetchanged', function () {
                form.stylesheet = intf.stylesheet;
            });
            if (intf.stylesheet) {
                form.stylesheet = intf.stylesheet;
            }
            self.initializingComponents[form.id] = form;
            form.addEventListener('initialized', function () {
                delete self.initializingComponents[form.id];
                doneInitializing();
            });
            self.childForms.push(form);
        }
        // public interface definitions
        intf.init = init;
        intf.dispose = dispose;
        intf.getComponentByName = getComponentByName;
        intf.getComponentById = getComponentById;
        intf.getComponentsByPropertyValue = getComponentsByPropertyValue;
        intf.addChildForm = addChildForm;
        Object.defineProperty(intf, 'childForms', {
            get: function () {
                var forms = [];
                function addForm(form) {
                    forms.push(form);
                    forms = forms.concat(form.childForms);
                }
                self.childForms.forEach(addForm);
                return forms;
            }
        });
        Object.defineProperty(intf, 'isContainer', {
            get: function () { return true; }
        });
        Object.defineProperty(intf, 'components', {
            get: function () {
                return self.components;
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
                var validModes = {
                    dialog: 'dialog',
                    block: 'block',
                    fieldset: 'fieldset'
                };
                self.mode = validModes[value] || 'block';
                if (!self.initialized) { return; }
                setMode();
            }
        });
        Object.defineProperty(intf, 'initializingComponents', {
            get: function () {
                return self.initializingComponents;
            }
        });
        Object.defineProperty(intf, 'title', {
            get: function () {
                return self.title;
            },
            set: function (value) {
                self.title = value;
                self.legend.innerHTML = self.title;
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
                if (!self.userStyleSheet) {
                    return undefined;
                }
                return self.userStyleSheet.originalValue;
            },
            set: function (value) {
                if (self.userStyleSheet && self.userStyleSheet.parentNode) {
                    self.userStyleSheet.parentNode.removeChild(self.userStyleSheet);
                    self.userStyleSheet = undefined;
                }
                if (!value) { return; }
                self.userStyleSheet = util.createElement('link');
                self.userStyleSheet.rel = 'stylesheet';
                self.userStyleSheet.type = 'text/css';
                self.userStyleSheet.href = value;
                self.userStyleSheet.originalValue = value;
                intf.dispatchEvent(new Event('stylesheetchanged'));
                if (self.shadowRoot) {
                    self.shadowRoot.appendChild(self.userStyleSheet);
                }
            }
        });
        // events
        window.addEventListener('resize', dispatchResize);
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
            var id = util.createId(),
                component = util.createElement('span', null, {className: 'component input-type-' + inputOptions.type}),
                label = util.createElement('label', component, {className: 'label', for: id }),
                input;
            inputOptions.id = id;
            input = util.createElement('input', component, inputOptions);
            label.innerHTML = header.title === undefined ? header.name : header.title;
            component.label = label;
            component.input = input;
            util.addEvents(input, header.events);
            util.addEvents(label, header.labelEvents);
            util.setProperties(input.style, header.style);
            label.style = header.labelStyle;
            component.containerStyle = header.containerStyle;
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
            id = util.createId(),
            component = util.createElement('span', null, {className: 'component'}),
            label = util.createElement('label', component, {className: 'label', for: id}),
            input = util.createElement('select', component, {className: 'select', id: id}),
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
        util.setProperties(component.containerStyle, header.containerStyle);
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
        component.containerStyle = header.containerStyle;
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
        component.appendChild(grid);
        util.setProperties(grid, header);
        util.setProperties(component.containerStyle, header.containerStyle);
        grid.name = pContext.name ? (pContext.name + '_canvas-datagrid_' + index) : undefined;
        util.addEvents(grid, header.events);
        util.addEvents(component, header.componentEvents);
        pivotForm.addEventListener('resize', function () {
            component.resize();
        });
        component.addEventListener('resize', function () {
            component.resize();
        });
        component.resize = function () {
            setTimeout(function () { grid.resize(true); }, 10);
        };
        function changeEvent() {
            if (!pivotForm.data) { return; }
            pivotForm.dispatchEvent(new Event('change'));
        }
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
        var component;
        component = window.pivotForm();
        component.containerStyle = {};
        component.className = 'pivot-form-child';
        pivotForm.addChildForm(component);
        component.index = index;
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
    components['split-container'] = function (header, index, pivotForm) {
        var pContext = this,
            component = util.createElement('div', null, {className: 'split-container-component'}),
            cutter = util.createElement('div', null, {className: 'split-container-cutter'}),
            margin = 10,
            position,
            pct = 0.5,
            moveStart,
            orientation = 'vertical',
            cursor = {
                vertical: 'ew-resize',
                horizontal: 'ns-resize'
            },
            size = {
                vertical: 'width',
                horizontal: 'height'
            },
            minSize = {
                vertical: 'minWidth',
                horizontal: 'minHeight'
            },
            offset = {
                vertical: 'offsetWidth',
                horizontal: 'offsetHeight',
            };
        component.cutter = cutter;
        Object.defineProperty(component, 'position', {
            get: function () {
                return position;
            },
            set: function (value) {
                var n = component[offset[orientation]];
                if (isNaN(value)) { throw new TypeError('position must be a number.'); }
                if (value < 0) { value = 0; }
                if (value > n) { value = 0; }
                position = value;
                pct = position / n;
                component.resize();
            }
        });
        Object.defineProperty(component, 'orientation', {
            get: function () {
                return orientation;
            },
            set: function (value) {
                if (!(value === 'vertical' || value === 'horizontal')) {
                    throw new TypeError('orientation must be vertical or horizontal.');
                }
                orientation = value;
                cutter.style.cursor = cursor[value];
                cutter.classList.remove('split-container-cutter-horizontal');
                cutter.classList.remove('split-container-cutter-vertical');
                cutter.classList.add('split-container-cutter-' + orientation);
                component.resize();
            }
        });
        function moveCutter(e) {
            var offsetDelta = {
                width: moveStart.x - e.clientX,
                height: moveStart.y - e.clientY,
            };
            component.position = moveStart.p - offsetDelta[size[orientation]];
        }
        function endMoveCutter(e) {
            pivotForm.classList.remove('noselect');
            document.body.removeEventListener('mousemove', moveCutter);
            document.body.removeEventListener('mouseup', endMoveCutter);
        }
        cutter.onmousedown = function (e) {
            moveStart = {
                x: e.clientX,
                y: e.clientY,
                p: position
            };
            pivotForm.classList.add('noselect');
            document.body.addEventListener('mouseup', endMoveCutter);
            document.body.addEventListener('mousemove', moveCutter);
        };
        component.resize = function (pct) {
            var s = component[offset[orientation]];
            if (pct || position === undefined) {
                position = s * pct;
            }
            component.panels[0].style[size[orientation]] = position - margin + 'px';
            component.panels[1].style[size[orientation]] = margin + s - position - (margin * 0.5) + 'px';
            component.panels[0].style[minSize[orientation]] = position - margin + 'px';
            component.panels[1].style[minSize[orientation]] = margin + s - position - (margin * 0.5) + 'px';
            [0, 1].forEach(function (n) {
                var panel = component.panels[n];
                if (panel.dispatchEvent) {
                    panel.dispatchEvent(new Event('resize'));
                }
            });
        };
        pivotForm.addEventListener('resize', function () {
            component.resize(pct);
        });
        component.isContainer = true;
        component.panels = [];
        component.containerStyle = {
            width: '100%'
        };
        [header.panel1, header.panel2].forEach(function (n, panelIndex) {
            var panel;
            if (n) {
                panel = components['pivot-form'].call(pContext, n, index, pivotForm);
                panel.classList.add('split-container-panel');
                panel.classList.add('split-container-panel-' + panelIndex);
                util.setProperties(panel, n);
                util.addEvents(panel, header.events);
                component.appendChild(panel);
                if (panelIndex === 0) {
                    component.appendChild(cutter);
                }
                component.panels.push(panel);
            }
        });
        position = component[offset[orientation]] * pct;
        component.orientation = orientation;
        window.dispatchEvent(new Event('resize'));
        return component;
    };
    components.tabs = function (header, index, pivotForm) {
        var pContext = this,
            component = util.createElement('div', null, {className: 'tabbed-component'}),
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
                    tab.content.parentNode.removeChild(tab.content);
                    component.dispatchEvent(ev);
                }
            });
            activeTabItem.tabElement.classList.add('tab-active');
            activeTabItem.tabElement.classList.remove('tab-inactive');
            activeTabItem.content.classList.add('tab-content-active');
            component.appendChild(activeTabItem.content);
            component.dispatchEvent(e);
            activeTabItem.content.dispatchEvent(new Event('resize'));
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
            tab.content = components['pivot-form'].call(pContext, tabHeader, index, pivotForm);
            pivotForm.addEventListener('resize', function () {
                tab.content.dispatchEvent(new Event('resize'));
            });
            tab.content.classList.add('tab-content');
            util.setProperties(tab.content, tabHeader);
            util.setProperties(tab.tabElement, tabHeader.tabStyle);
            util.addEvents(tab.tabElement, tabHeader.tabEvents);
            util.addEvents(tab.content, tabHeader.contentEvents);
            util.addEvents(tab.content, tabHeader.events);
            tabs.push(tab);
        });
        util.addEvents(component, header.events);
        util.setProperties(component.containerStyle, header.containerStyle);
        // instantiate each tab
        header.tabs.forEach(function (tabName, index) {
            if (defaultTab === index) { return; }
            activateTab(index);
        });
        requestAnimationFrame(function () { activateTab(defaultTab || 0); });
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
                    Object.assign(d, tab.data);
                });
                return d;
            },
            set: function (value) {
                tabs.forEach(function (tab) {
                    tab.value = value;
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
            e.preventDefault();
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
            intf.dispatchEvent(new Event('resize'));
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
