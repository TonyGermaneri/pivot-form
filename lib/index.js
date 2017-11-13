/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, performance: false, requestAnimationFrame: false, Event: false*/
define(['./components/index.js', './util.js', './dialog.js'], function (defaultComponents, util, dialog) {
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
        self.idCounter = -1;
        self.data = {};
        self.initializingComponents = [];
        self.dialogOptions = {};
        intf = window.customElements ? eval('Reflect.construct(HTMLElement, [], new.target)')
            : util.createElement('section');
        function getNewId() {
            self.idCounter += 1;
            return self.idCounter.toString(36);
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
            if (self.name && self.initialized) {
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
                    delete self.initializingComponents[organicComponentIndex];
                    if (self.initializingComponents.filter(function (i) { return !!i; })
                            .length === 0 && self.preInitDataSet) {
                        var f = self.preInitDataSet;
                        delete self.preInitDataSet;
                        intf.data = f;
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
                    self.initializingComponents[organicComponentIndex] = component;
                    component.addEventListener('initialized', initialized);
                    component.value = dataStub;
                }
            });
            updateFlexOrder();
        }
        function initData(newData) {
            if (!newData && self.preInitDataSet && self.initialized) {
                newData = self.preInitDataSet;
                self.data = newData;
            } else if (!self.initialized || self.initializingComponents.filter(function (i) { return !!i; }).length > 0) {
                self.preInitDataSet = newData;
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
            if (!self.initialized) { return; }
            if (!self.schema) { return; }
            if (self.components) {
                // dispose previous items
                disposeComponents();
            }
            self.idCounter = -1;
            self.components = [];
            self.schema.forEach(function (header, index) {
                var t = PivotForm.prototype.components.string,
                    id = header.name === undefined ? getNewId() : header.name,
                    component;
                if (getComponentById(id)) {
                    throw new Error('Duplicate id in schema ' + id);
                }
                if (PivotForm.prototype.components[header.type]) {
                    t = PivotForm.prototype.components[header.type];
                }
                // instantiate component
                component = t.apply(intf, [header, index, intf]);
                // listen to the component's change event
                component.addEventListener('change', function () {
                    // dispatch the change event to our listeners
                    intf.dispatchEvent(new Event('change'));
                });
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
                                // not sure if this should be here, might have to ditch it
                                if (self.preInitDataSet) {
                                    self.preInitDataSet[header.name] = v;
                                }
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
                component.pivotForm = self;
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
            if (self.initialized) { return; }
            self.shadowRoot = intf.attachShadow ? intf.attachShadow({mode: 'open'}) : intf;
            self.shadowRoot.appendChild(self.form);
            self.inputComponentOrganicOrder = [];
            if (!self.cssAttached) {
                util.createElement('link', self.shadowRoot, {
                    rel: 'stylesheet',
                    href: /^file:\/\/\//.test(window.location) ? '../lib/index.css' : 'data:text/css;base64,cssurl-target'
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
            self.initialized = true;
            loadState();
            initSchema();
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
            var d = self.data || {};
            self.components.forEach(function (component) {
                var cValue = {};
                if (component.isContainer) {
                    Object.assign(d, component.value);
                } else {
                    cValue[component.header.name] = component.value;
                    Object.assign(d, cValue);
                }
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
        Object.defineProperty(intf, 'isContainer', {
            get: function () { return true; }
        });
        Object.defineProperty(intf, 'components', {
            get: function () {
                return self.components;
            }
        });
        Object.defineProperty(intf, 'isValid', {
            get: function () {
                return false;
            }
        });
        Object.defineProperty(intf, 'preInitDataSet', {
            get: function () {
                return self.preInitDataSet;
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
});
