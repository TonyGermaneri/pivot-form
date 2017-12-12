pivot-form
==========

Pivot a single row of data 90 degrees counter-clockwise, placing the table headers to the left of the inputs
implicitly creating a lovely form.  This program takes that concept to the next level by allowing
that pivoted row schema to be defined in spectacular number of configurations.

[Demo](https://tonygermaneri.github.io/pivot-form/tutorials/sample.html)

You can define not only the hierarchy and types of fields, but attach events, change styles, setup
asynchronous data and much more all from a lightweight JSON schema object, no DOM, JavaScript or HTML required.

This allows the creation of complex, granular, and language agnostic UI definitions.

Applications include.

* Automated generation of forms directly from database schemas.
* Granular access control to UI elements.
* Simplifying the display of complex and hierarchical data without writing code.
* Abstraction of complex asynchronous validation routines.  (e.g.: data validation is based on async select values)
* Getting and setting row data via asynchronous functions.

Currently pivot-form is pre-alpha software.  Meaning we use it in production on a daily basis.

To get a demo running, clone this repository, then drop `./tutorials/sample.html` into your browser.

There is little or no documentation, more will come as the program matures.  Formal documentation will follow.

Take row data

    data = {column1: 'foo', column2: 'bar'}

    schema = [
        {
            name: 'column1'
        },
        {
            name: 'column2'
        }
    ]

And turn it into an extensible form.

    var form = document.createElement('pivot-form');
    form.schema = schema;
    form.data = data;
    document.body.appendChild(form);

Listen for changes.

    form.addEventListener('change', function (e) {
        console.log(e.data);
    });

Use built in UI widgets

    schema = [
        {
            name: 'column1',
            type: 'date'
        },
        {
            name: 'column2',
            type: 'time'
        }
    ]

Use tab widgets

    schema = [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'tab1',
                    schema: [
                        {
                            name: 'column1',
                            type: 'date'
                        }
                    ]
                }
            ]
        }
    ]

Output data is flattened into a single data object (row) dependent
on the UI objects defined in the schema.  Data input is assigned to UI
objects defined in the schema in the same way.  So no matter how complex
your schema, it will always map back down to a single object.


schema
======

Schema is a collection (array) of header objects.


header
======

In its most simple state, a header consists of a single column name.  In some cases name is even optional.

    {
        name: 'column1'
    }

Type `string` is implicit.  It will get you a single text field with a label that matches the name of the field.


    {
        name: 'column1',
        type: 'string'
    }

You can change `type` into all sorts of things.  A complete list is provided at the end of this document.
Depending on what `type` you set, other properties will become available to the header object.
For example, the select type has the additional property `enum` that represents the data in the drop down.

    {
        name: 'column1',
        type: 'select',
        enum: [1, 2, 3]
    }

You can pass `enum` a 2D array for value/innerHTML e.g.: `[[1, 'one', 2, 'two']]`
or pass `enum` a function or async function that returns such an array.

Some types are more complex because they can contain schemas.

    {
        type: 'tabs',
        tabs: [
            {
                name: 'Tab 1',
                schema: [
                    {
                        name: 'column1'
                    },
                    {
                        name: 'column2'
                    }
                ]
            }
        ]
    }

Container types like `tabs` and `split-container` can contain other containers as well, creating truly complex forms.

    {
        type: 'tabs',
        tabs: [
            {
                name: 'Tab 1',
                schema: [
                    {
                        type: 'split-container',
                        panel1: {
                            title: 'Set 1',
                            mode: 'fieldset',
                            schema: [
                                {
                                    name: 'column1'
                                },
                                {
                                    name: 'column2'
                                }
                            ]
                        },
                        panel2: {
                            title: 'Set 2',
                            mode: 'fieldset',
                            schema: [
                                {
                                    name: 'column3'
                                },
                                {
                                    name: 'column4'
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }

Initial data can be set within the schema:

    {
        name: 'column1',
        value: 'Default value'
    }

Initial data can be a primitive type like string or number, or it can be a function that returns a primitive type.

    {
        name: 'column1',
        value: function () {
            return 'Default value';
        }
    }

You can also use asynchronous callbacks to define initial values.

    {
        name: 'column1',
        value: function (callback) {
            setTimeout(function () {
                callback('Default value');
            }, 1000);
        }
    }

Even if it takes time for your initial values to populate, data will not be set to the form until all fields are done initializing.
Data set prior to initialization is set aside until after initialization is complete, then set, transparent to the implementor and user.

There are a few properties that all headers contain.

    events
    labelEvents
    style
    containerStyle
    labelStyle

Events and styles are defined as objects:

    {
        click: function (e) { console.log('this was clicked'); }
    }

    {
        style: { border: 'solid 1px black' }
    }

Other properties in the header are passed though as attributes to the element, for example:

    {
        foo: 'bar'
    }

results in the HTML

    <input foo="bar">


Note: per the W3C specification, attributes can only contain strings.

data
====

Setting data at runtime is (supposed to be) painless.
Data is a getter/setter, data's properties are getter/setters.

Setting data runs through a very complex path of code that ensures that all components that
are supposed to receive data updates from the data you set get the data, while other components
do not.

You are allowed to have components (headers) that contain the same name.  In this case,
setting data will update both components.  Similarly, changing data in one will also cause a change
to the other due to the way the data setter/getters are written.

What this means you you is you can set data three ways:

Using a full dataset:

form.data = {foo: 'bar', baz: 'wiz'}

Using a partial dataset:

form.data = {foo: 'bar'} // baz field will not be effected

Using a property getter:

form.data.foo = 'bar';

As with initial value settings, you can use primitive values, or you can use a function.

form.data.foo = function () {
    return 'bar';
};

Due to the shared code paths with the initialization phase, the function can be asynchronous as well.

form.data.foo = function (callback) {
    setTimeout(function () {
        callback('bar');
    }, 1000);
};

events
======

* initialized - occurs when all components have finished initializing, meaning, all containers, primitives, functions or asynchronous functions have completed initializing.  This always takes at least 1 animation frame.
* change - occurs when any component (e.g.: input tag) has dispatched its change event.
* resize - occurs when the window resizes or a parent component (e.g.: a tab) has dispatched the resize event.

You can subscribe to the events using `addEventListener`

    form.addEventListener('changed', function () { console.log(form.data); });

methods
=======

These functions will probably be private at a later date:

* init - called internally.  Why is this public?  This shouldn't be public.  Don't run this.
* dispose - called internally to release resources.  You can call it too, but it might end poorly if you continue to use the form after calling it.
* addChildForm - called internally to add a container component link.  You could probably link two form instances together with this functions, but it might just break everything.

When a schema is passed into the pivot-form, each header object creates a "component" which is a distinct
field _maybe_ (if it has a name) linked to the data getter/setter.  You can get at these components at runtime
by calling the following functions:

* getComponentByName(name) - gets the first component that has a name that matches the first argument.
* getComponentById(id) - gets the component with the id of the first argument.
* getComponentsByPropertyValue(key, value) - Returns an array of components that match the key and value passed into the argument list.


properties
==========

* schema - The schema definition.  This is where you design your form.
* data - The grand data getter/setter.  Where all the runtime magic happens.
* mode - Can be set to `block` (default), `dialog` or `fieldset` (like block with a nifty border and title).  All produce really cool useful forms.  You can change this property at runtime, but why would you?
* title - Sets the title of the form which appears in the `dialog` and `fieldset` modes.
* dialog - When in dialog mode, this is a reference to the dialog sub-component.  It does a whole bunch of neat stuff like minimize, maximize, etc..  At the time of writing this there are no docs for dialog, but you can look at the public interface in the debugger to get some idea of the features.  Here's a short list:
    * Elements (properties that are HTMLElements): content, card, titleBar, controlBoxClose, controlBoxMaximize, controlBoxMinimize.
    * Properties: title, modal, closeable, maximizeable, stayCenteredHorizontally, stayCenteredVertically, minimizable.
    * Methods: open, close, dispose, minimize, maximize, center, centerHorizontally, centerVertically.
    * events: resize
* isContainer - Always returns true.  I'm sure there's a good reason for that being there.
* components - A list of components that belong to this immediate form.  The form could contain a child form that contains other components not listed here.
* initializingComponents - An array of components within this immediate form that are _still_ initializing.  Wondering why the form hasn't finished loading?  Look here.  Note: this does not contain components from child forms, you need to check the `childForms` property recursively to find _all_ still initializing components.  Future versions will simplify this.
* name - used to store the order the user arranged the components set to `moveable: true`.
* stylesheet - URL to a stylesheet that will be attached within the pivot-form's shadow dom allowing for overriding default styles without the use of CSS variables.

Adding new components
=====================

There are two types of components.  Inputs and containers.  Containers have the property `isContainer` set to true.

Each of the two types of components has a distinct contact to fill.

For input type components
-------------------------

* Must be like an HTMLElement input and contain the following:
    * Properties
        * value
    * Methods
        * addEventListener
        * removeEventListener
    * Events
        * change
        * resize (optional)

For container type components
-----------------------------

* Must be like an HTMLElement div and contain the following:
    * properties
        * value - returns or sets the data object
        * getComponentByName(name) - gets the first component that has a name that matches the first argument.
        * getComponentById(id) - gets the component with the id of the first argument.
        * getComponentsByPropertyValue(key, value) - Returns an array of components that match the key and value passed into the argument list.

Defining the component function
-------------------------------

Your function must return an HTMLElement or custom HTMLElement.

You must define your function by type using the PivotForm's ctor prototype property `components`, e.g.:

    PivotForm.prototype.components.yourComponentNameGoesHere = function (header, index, pivotForm) {
        // this is actually a valid component as it fills input component contract.
        // Data will be get and set to it correctly.
        return document.createElement('input');
    };

The arguments passed into the component factory function are as follows:

    * this - the immediate pivot form this component belongs to.
    * header - the actual header passed in from the schema.
    * index - the index position of the header.
    * pivotForm - the top most form this component belongs to.

Supported Types
===============

* HTMLElement (set property `tag` to control tag name)
* select
* datalist (autocomplete) - polyfill for safari: https://github.com/Fyrd/purejs-datalist-polyfill
* h1
* h2
* h3
* h4
* button
* hr
* pre
* label
* div
* p
* span
* i
* a
* string (same as input)
* number (same as input)
* text (same as input)
* tabs
* split-container
* pivot-form
* canvas-datagrid
* checkbox
* file
* hidden
* image
* password
* radio
* reset
* submit
* text
* textarea
* color
* date
* datetime-local
* email
* month
* number
* range
* search
* tel
* time
* url
* week
