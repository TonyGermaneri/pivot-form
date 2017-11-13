/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var p = window.pivotForm();
    p.name = 'blah';
    p.title = 'Taizo Sakai';
    //p.mode = 'dialog';
    var data = {col1: 'updated value', col2: 'updated value 2', col3: 2, col4: [{a: 'b', c: 'd'}]};
    var schema = [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'Text',
                    schema: [
                        {
                            name: 'col1',
                            value: function (callback) {
                                var context = this;
                                callback('default value ' + context.header.name);
                            }
                        },
                        {
                            name: 'col5',
                            value: function (callback) {
                                var context = this;
                                callback('default value ' + context.header.name);
                            }
                        },
                        {
                            name: 'col6',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col7',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col8',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col9',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col10',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col11',
                                type: 'select',
                                enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col12',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col13',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        },
                        {
                            name: 'col14',
                            type: 'select',
                            enum: function (callback) { callback([1, 2, 3]); }
                        }
                    ]
                },
                {
                    name: 'Text 2',
                    schema: [{
                        name: 'col2',
                        value: function (callback) {
                            var context = this;
                            callback('default value ' + context.header.name);
                        }
                    }]
                },
                {
                    name: 'Select',
                    schema: [{
                        name: 'col3',
                        type: 'select',
                        enum: function (callback) {
                            callback([1, 2, 3]);
                        },
                        value: function (callback) {
                            callback(3);
                        }
                    }]
                },
                {
                    name: 'grid',
                    schema: [{
                        name: 'col4',
                        type: 'canvas-datagrid',
                        data: function (callback) {
                            callback([{'Grid-col-1': 'a'}]);
                        }
                    }]
                },
                {
                    name: 'Tab 5',
                },
                {
                    name: 'Tab 6',
                },
                {
                    name: 'Tab 7',
                },
                {
                    name: 'Tab 8',
                },
                {
                    name: 'Tab 9',
                },
                {
                    name: 'Tab 10',
                },
                {
                    name: 'Tab 11',
                }
            ]
        }
    ];
    p.schema = schema;
    p.data = data;
    p.style.width = '50%';
    p.style.display = 'inline-block';
    document.body.appendChild(p);
    p.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(p.data);
    });
});
