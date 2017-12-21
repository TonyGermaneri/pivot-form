/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, requestAnimationFrame: false, Event: false*/
define(['../util.js'], function (util) {
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
    ['checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'text', 'textarea',
        // html 5 input types
        'color', 'date', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time',
        'url', 'week'].forEach(function (typeKey) {
        components[typeKey] = inputComponentFactory({className: 'input', type: typeKey});
    });
    components.datalist = function (header, index, pivotForm) {
        var componentContext = this,
            id = util.createId(),
            component = util.createElement('span', null, {className: 'component'}),
            label = util.createElement('label', component, {className: 'label', for: id}),
            input = util.createElement('input', component, {className: 'select', id: id, list: 'dl' + id}),
            datalist = util.createElement('datalist', component, {className: 'datalist', id: 'dl' + id}),
            fEnumVal,
            options = [];
        function fillOptions(arr) {
            datalist.innerHTML = '';
            arr.forEach(function (item) {
                var option;
                if (!Array.isArray(item)) { item = [item, item]; }
                option = util.createElement('option', datalist, {value: item[0], innerHTML: item[1]});
                util.setProperties(option, header.optionStyle);
                options.push(option);
            });
        }
        label.innerHTML = header.title === undefined ? header.name : header.title;
        component.label = label;
        component.input = input;
        input.fillOptions = fillOptions;
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
            var ipct, s = component[offset[orientation]];
            if (pct || position === undefined) {
                position = s * pct;
            }
            pct = position / component[offset[orientation]];
            ipct = (s - position) / component[offset[orientation]];
            component.panels[0].style[size[orientation]] = (pct * 100) + '%';
            component.panels[1].style[size[orientation]] = (ipct * 100) + '%';
            component.panels[0].style[minSize[orientation]] = (pct * 100) + '%';
            component.panels[1].style[minSize[orientation]] = (ipct * 100) + '%';
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
                    component.removeChild(tab.content);
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
            pContext.addEventListener('resize', function () {
                if (activeTabIndex === index) {
                    tab.content.dispatchEvent(new Event('resize'));
                }
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
});
