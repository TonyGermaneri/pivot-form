/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false*/
define(['../util.js'], function (util) {
    'use strict';
    var components = {}, ce = util.createElement, sp = util.setProperties;
    // components that contain other components must be described here because
    // of the inherit circular reference to the components module
    function inputComponentFactory(inputOptions) {
        return function (header) {
            var component = ce('div', null, {className: 'component'}),
                label = ce('div', component, {className: 'label'}),
                input = ce('input', component, inputOptions);
            label.innerHTML = header.name;
            component.header = header;
            component.label = label;
            Object.defineProperty(component, 'value', {
                get: function () {
                    return input.value;
                },
                set: function (value) {
                    input.value = value;
                }
            });
            util.asyncValueSetter(component);
            return component;
        };
    }
    components.select = function (header) {
        var component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'}),
            input = ce('select', component, {className: 'select'}),
            options = [];
        label.innerHTML = header.name;
        component.label = label;
        if (header.enum) {
            header.enum.forEach(function (item) {
                if (!Array.isArray(item)) { item = [item, item]; }
                options.push(ce('option', input, {value: item[0], innerHTML: item[1]}));
            });
        }
        Object.defineProperty(component, 'value', {
            get: function () {
                return input.value;
            },
            set: function (value) {
                input.value = value;
            }
        });
        util.asyncValueSetter(component);
        return component;
    };
    components.title = function (header) {
        var component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'});
        label.innerHTML = header.name;
        sp(label, header.titleStyle);
        sp(component, header.titleContainerStyle);
        return component;
    };
    // html 4 input types
    ['button', 'checkbox', 'file', 'hidden', 'image', 'password', 'radio', 'reset', 'submit', 'text',
        // html 5 input types
        'color', 'date', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time',
        'url', 'week'].forEach(function (typeKey) {
        components[typeKey] = inputComponentFactory({className: 'input', type: typeKey});
    });
    components.HTMLElement = function (header) {
        return ce(header.tagName, null, header);
    };
    components.button = function (header) {
        return ce('button', null, header);
    };
    components.string = function (header) {
        var component = ce('div', null, {className: 'component'}),
            label = ce('div', component, {className: 'label'}),
            input = ce('input', component, {className: 'input'});
        label.innerHTML = header.name;
        component.header = header;
        component.label = label;
        Object.defineProperty(component, 'value', {
            get: function () {
                return input.value;
            },
            set: function (value) {
                input.value = value;
            }
        });
        util.asyncValueSetter(component);
        return component;
    };
    components['canvas-datagrid'] = function (header, index) {
        var pContext = this,
            component = ce('div', null, {className: 'canvas-datagrid-child'}),
            grid = window.canvasDatagrid();
        component.appendChild(grid);
        Object.keys(header).forEach(function (propertyKey) {
            grid[propertyKey] = header[propertyKey];
        });
        grid.name = pContext.name ? (pContext.name + '_canvas-datagrid_' + index) : undefined;
        component.containerStyle = {
            width: '100%'
        };
        component.resize = function () {
            grid.resize(true);
        };
        Object.defineProperty(component, 'value', {
            get: function () {
                return grid.data;
            },
            set: function (value) {
                grid.data = value;
            }
        });
        return component;
    };
    components['pivot-form'] = function (header, index) {
        var pContext = this,
            f,
            name = pContext.name ? (pContext.name + '_pivot-form_' + index) : undefined;
        f = window.pivotForm();
        f.className = 'pivot-form-child';
        f.name = name;
        f.schema = header.schema;
        f.data = header.data;
        f.addComponents(pContext.components);
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
    components.tabs = function (header) {
        var componentContext = this,
            component = ce('div', null, {className: 'tabbed-component'}),
            tabs = ce('div', component, {className: 'tabs'}),
            activeTab;
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
            activeTabItem.resize();
            component.appendChild(activeTabItem.content);
        }
        Object.keys(header.tabs).forEach(function (tabName) {
            var tabItem = header.tabs[tabName];
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
                    el = t.apply(componentContext, [header, index]);
                tabItem.resize = function () {
                    if (el.resize) { requestAnimationFrame(el.resize); }
                };
                tabItem.content.appendChild(el);
            });
        });
        activateTab(Object.keys(header.tabs)[header.defaultTabIndex || 0]);
        return component;
    };
    return components;
});
