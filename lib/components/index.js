/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, requestAnimationFrame: false*/
define(['../util.js'], function (util) {
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
});
