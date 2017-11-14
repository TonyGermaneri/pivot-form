/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var tabSchema, data, schema, form = window.pivotForm();
    form.mode = 'dialog';
    schema = [
        {
            name: 'test1'
        },
        {
            name: 'test1'
        },
        {
            name: 'test5',
            value: function (callback) {
                setTimeout(function () {
                    callback('initial async value');
                }, 1000);
            }
        },
        {
            name: 'test2',
            className: 'blah',
            labelStyle: {
                color: 'green'
            },
            style: {
                backgroundColor: 'red'
            },
            events: {
                keyup: function () {
                    form.data.test1 = '12345';
                }
            },
            value: function (callback) {
                setTimeout(function () {
                    callback('initial async value');
                }, 1000);
            }
        },
        {
            name: 'sample',
            type: 'canvas-datagrid',
            data: [{blah: 'blah'}]
        }
    ];
    tabSchema = [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'tab1',
                    schema: schema
                },
                {
                    name: 'tab1',
                    schema: schema.concat([{
                        name: 'test3'
                    }])
                }
            ]
        }
    ];
    form.schema = tabSchema;
    data = {test2: 'NEW VALUE', test3: 'test'};
    form.data = data;
    form.styleSheet = 'sample.css';
    document.body.appendChild(form);
    form.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(form.data, null, '\t');
    });
});
