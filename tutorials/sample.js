/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var tabSchema, data, schema, form = window.pivotForm();
    form.name = 'sample-root';
    form.mode = 'dialog';
    function weeksArray() {
        return [['a', 'a'], ['b', 'b']];
    }
    function refreshBoxOffice(callback) {
        console.log(form.data.week0);
        var gridData = [{
            week: form.data.week0
        }];
        setTimeout(function () {
            callback(gridData);
        }, 1000);
    }
    function boxOfficeSearchFormChange() {
        refreshBoxOffice(function (data) {
            form.data.searchResults0 = data;
        });
    }
    function topBoxOffice(form) {
        return [
            {
                static: true,
                name: 'week0',
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
                name: 'week0',
                title: 'blah',
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
                name: 'country0',
                type: 'select',
                enum: ['US', 'UK'],
                value: 'US',
                events: {
                    change: boxOfficeSearchFormChange
                }
            },
            {
                static: true,
                name: 'searchResults0',
                type: 'canvas-datagrid',
                value: refreshBoxOffice
            }
        ];
    }
    schema = [{
        type: 'tabs',
        static: true,
        tabs: [
            {
                name: 'Top Box Office',
                schema: topBoxOffice(form)
            }
        ]
    }];
    form.schema = schema;
    data = {country0: 'UK'};
    // form.data.country0 = 'UK';
    form.data = data;
    form.stylesheet = './sample.css';
    form.addEventListener('initialized', function () {
        document.getElementById('data-sample').style.backgroundColor = 'lightGreen';
    });
    form.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(form.data, null, '\t');
    });
    document.body.appendChild(form);
});
