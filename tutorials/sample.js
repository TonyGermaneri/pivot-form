/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var data, schema, form = window.pivotForm();
    form.name = 'blah';
    form.title = 'Taizo Sakai';
    form.mode = 'dialog';
    form.dialog.modal = true;
    function week() {
        var d = [['a', 'b']];
        return d;
    }
    function refreshBoxOffice(callback) {
        console.log(form.data.week, form.data.country);
        setTimeout(function () {
            callback([{a: 'data'}]);
        }, 500);
    }
    function boxOfficeSearchFormChange() {
        document.body.style.cursor = 'wait';
        refreshBoxOffice(function (data) {
            form.data = {searchResults: data};
            document.body.style.cursor = 'auto';
        });
    }
    data = {col1: 'updated value', col2: 'updated value 2', col3: 2, col4: [{a: 'b', c: 'd'}]};
    schema = [{
        type: 'tabs',
        static: true,
        tabs: [
            {
                name: 'Top Box Office',
                schema: [
                    {
                        type: 'pivot-form',
                        schema: [
                            {
                                name: 'week',
                                type: 'select',
                                enum: week,
                                value: function () {
                                    return week()[0][0];
                                },
                                events: {
                                    change: boxOfficeSearchFormChange
                                }
                            },
                            {
                                name: 'country',
                                type: 'select',
                                enum: ['US', 'UK'],
                                value: 'US',
                                events: {
                                    change: boxOfficeSearchFormChange
                                }
                            },
                            {
                                name: 'searchResults',
                                type: 'canvas-datagrid',
                                value: refreshBoxOffice
                            }
                        ]
                    }
                ]
            },
            // { name: 'Opening Movies' },
            // { name: 'RT Mapping' },
            // { name: 'Release Calendar' },
        ]
    }];
    form.schema = schema;
    //form.data = data;
    document.body.appendChild(form);
    form.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(form.data, null, '\t');
    });
});
