/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var tabSchema, data, schema, form = window.pivotForm();
    form.mode = 'dialog';
    function weeksArray() {
        return [['a', 'a'], ['b', 'b']];
    }
    function refreshBoxOffice(callback) {
        var gridData = [{week: form.data.week, country: form.data.country}];
        callback(gridData);
    }
    function boxOfficeSearchFormChange() {
        refreshBoxOffice(function (data) {
            form.data.searchResults = data;
        });
    }
    schema = [
        {
            static: true,
            name: 'week',
            type: 'select',
            enum: weeksArray,
            value: function () {
                return weeksArray()[0][0];
            },
            events: {
                change: boxOfficeSearchFormChange
            }
        },
        {
            static: true,
            name: 'country',
            type: 'select',
            enum: ['US', 'UK'],
            value: 'US',
            events: {
                change: boxOfficeSearchFormChange
            }
        },
        {
            static: true,
            name: 'searchResults',
            type: 'canvas-datagrid',
            value: refreshBoxOffice
        }
    ];
    form.schema = schema;
    //data = {test2: 'NEW VALUE', test4: 'test'};
    form.data.test2 = 'NEW VALUE';
    form.stylesheet = './sample.css';
    form.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(form.data, null, '\t');
    });
    document.body.appendChild(form);
});
