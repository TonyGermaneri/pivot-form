/*jslint browser: true, unparam: true, todo: true, evil: true*/
/*globals define: false, requestAnimationFrame: false, Event: false*/
define(['../util.js'], function (util) {
    'use strict';
    var components = {};
    // components that contain other components must be described here because
    // of the inherit circular reference to the components module
    function inputComponentFactory(inputOptions) {
        return function (header, index, form) {
            var component = util.createElement('div', null, {className: 'component'}),
                label = util.createElement('div', component, {className: 'label'}),
                input = util.createElement('input', component, inputOptions);
            component.containerStyle = {};
            label.innerHTML = header.title === undefined ? header.name : header.title;
            component.header = header;
            component.label = label;
            component.input = input;
            component.form = form;
            util.addEvents(input, header.events);
            util.addEvents(label, header.labelEvents);
            util.addEvents(component, header.componentEvents);
            util.setProperties(input.style, header.style);
            util.setProperties(label.style, header.labelStyle);
            util.setProperties(component.style, header.componentStyle);
            util.setProperties(component.containerStyle, header.containerStyle);
            component.addEventListener = input.addEventListener;
            component.removeEventListener = input.removeEventListener;
            input.onchange = function () {
                form.data[header.name] = input.value;
            };
            Object.defineProperty(component, 'value', {
                get: function () {
                    return input.value;
                },
                set: util.asyncValueSetter(component)
            });
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
            component = util.createElement('div', null, {className: 'component'}),
            label = util.createElement('div', component, {className: 'label'}),
            input = util.createElement('select', component, {className: 'select'}),
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
                option = util.createElement('option', input, {value: item[0], innerHTML: item[1]});
                util.setProperties(option, header.optionStyle);
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
        util.setProperties(input.style, header.style);
        util.setProperties(label.style, header.labelStyle);
        util.setProperties(component.style, header.componentStyle);
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
        var component = util.createElement('div', null, {className: 'component'}),
            label = util.createElement('div', component, {className: 'label'});
        label.innerHTML = header.title === undefined ? header.name : header.title;
        component.containerStyle = {};
        component.label = label;
        component.header = header;
        util.setProperties(label.style, header.style);
        util.setProperties(component.style, header.componentStyle);
        util.setProperties(component.containerStyle, header.containerStyle);
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
        return util.createElement(header.tagName, null, header);
    };
    components.button = function (header, index, form) {
        return util.createElement('button', null, header);
    };
    components.string = components.text;
    components['canvas-datagrid'] = function (header, index, form) {
        var pContext = this,
            component = util.createElement('div', null, {className: 'canvas-datagrid-child'}),
            grid = window.canvasDatagrid();
        grid.style = {
            height: '150px'
        };
        component.containerStyle = {};
        component.input = grid;
        component.header = header;
        header.static = header.static === undefined ? true : header.static;
        component.appendChild(grid);
        Object.keys(header).forEach(function (propertyKey) {
            grid[propertyKey] = header[propertyKey];
        });
        util.setProperties(grid, header);
        grid.name = pContext.name ? (pContext.name + '_canvas-datagrid_' + index) : undefined;
        util.addEvents(grid, header.events);
        util.addEvents(component, header.componentEvents);
        util.setProperties(component.style, header.componentStyle);
        util.setProperties(component.containerStyle, header.containerStyle);
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
        header.static = header.static === undefined ? true : header.static;
        util.setProperties(f.containerStyle, header.containerStyle);
        util.setProperties(f.style, header.style);
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
        component.header = header;
        component.form = form;
        header.static = header.static === undefined ? true : header.static;
        function activateTab(tabIndex) {
            var activeTabItem = tabs[tabIndex];
            if (!activeTabItem) { return; }
            activeTabIndex = tabIndex;
            tabs.forEach(function (tab) {
                tab.tabElement.classList.add('tab-inactive');
                tab.tabElement.classList.remove('tab-active');
                tab.content.classList.remove('tab-content-active');
                if (tab.content.parentNode) {
                    tab.content.parentNode.removeChild(tab.content);
                }
            });
            activeTabItem.tabElement.classList.add('tab-active');
            activeTabItem.tabElement.classList.remove('tab-inactive');
            activeTabItem.content.classList.add('tab-content-active');
            component.appendChild(activeTabItem.content);
            activeTabItem.form.resize();
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
            tab.form = window.pivotForm();
            tab.form.addEventListener('change', function () {
                form.intf.dispatchEvent(new Event('change'));
            });
            util.setProperties(tab.form, tabHeader);
            util.setProperties(tab.tabElement, tabHeader.tabStyle);
            util.setProperties(tab.content, tabHeader.contentStyle);
            util.addEvents(tab.tabElement, tabHeader.tabEvents);
            util.addEvents(tab.content, tabHeader.contentEvents);
            util.addEvents(tab.form, tabHeader.events);
            tab.content.appendChild(tab.form);
            tabs.push(tab);
        });
        component.getCompoentsByPropertyValue = function getCompoentsByPropertyValue(key, value) {
            var found = [];
            tabs.forEach(function (tab) {
                found = found.concat(tab.form.getCompoentsByPropertyValue(key, value));
            });
            return found;
        };
        component.getCompoentByName = function getCompoentByName(value) {
            return component.getCompoentsByPropertyValue('name', value)[0];
        };
        component.getCompoentById = function getCompoentById(value) {
            return component.getCompoentsByPropertyValue('id', value)[0];
        };
        util.addEventInterface(component, header, index, form);
        util.addEvents(component, header.events);
        util.setProperties(component.style, header.componentStyle);
        util.setProperties(component.containerStyle, header.containerStyle);
        util.setProperties(tabsContainer, header.tabsContainerStyle);
        header.tabs.forEach(function (tabName, index) {
            if (defaultTab === index) { return; }
            requestAnimationFrame(function () { activateTab(index); });
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
                    Object.assign(d, tab.form.data);
                });
                return d;
            },
            set: function (value) {
                tabs.forEach(function (tab) {
                    tab.form.data = value;
                });
                return;
            }
        });
        return component;
    };
    return components;
});
