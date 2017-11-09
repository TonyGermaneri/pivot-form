/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, requestAnimationFrame: false, Event: false*/
define(['../util.js'], function (util) {
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
});
