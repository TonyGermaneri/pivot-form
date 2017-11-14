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
            name: 'test1',
            value: function (callback) {
                setTimeout(function () {
                    callback('initial test 1 value');
                }, 500);
            }
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
                    callback('test 1' + form.data.test1);
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
    data = {test2: 'NEW VALUE', test4: 'test'};
    form.data.test2 = 'NEW VALUE';
    form.stylesheet = './sample.css';
    form.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(form.data, null, '\t');
    });
    document.body.appendChild(form);
});
