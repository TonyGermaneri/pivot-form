/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var tabSchema, data, schema, form = window.pivotForm();
    form.mode = 'dialog';
    schema = [
        {
            name: 'test2',
            value: function (callback) {
                callback('test 1' + form.data.test1);
            }
        },
        {
            name: 'test1',
            value: function () {
                return 'blah';
            }
        }
    ];
    tabSchema = [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'tab1',
                    schema: schema
                }
            ]
        }
    ];
    form.schema = tabSchema;
    //data = {test2: 'NEW VALUE', test4: 'test'};
    form.data.test2 = 'NEW VALUE';
    form.stylesheet = './sample.css';
    form.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(form.data, null, '\t');
    });
    document.body.appendChild(form);
});
