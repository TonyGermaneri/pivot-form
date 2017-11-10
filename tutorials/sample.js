/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var p = window.pivotForm();
    p.name = 'blah';
    p.title = 'Taizo Sakai';
    p.mode = 'dialog';
    p.dialog.modal = true;
    var data = {col1: 'updated value', col2: 'updated value 2', col3: 2, col4: [{a: 'b', c: 'd'}]};
    var schema = [
        {
            name: 'col3'
        },
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
                }
            ]
        }
    ];
    p.schema = schema;
    p.data = data;
    document.body.appendChild(p);
    p.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(p.data);
    });
});
