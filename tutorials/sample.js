/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var p = window.pivotForm();
    p.name = 'blah';
    p.title = 'Taizo Sakai';
    var data = {col1: 'updated value', column2: 'bar'};
    var schema = [
        {
            name: 'col3'
        },
        {
            type: 'tabs',
            tabs: {
                text: [{
                    type: 'pivot-form',
                    schema: [{
                        name: 'col1',
                        value: function (callback) {
                            var context = this;
                            setTimeout(function () {
                                callback('default value ' + context.header.name);
                            }, 100);
                        }
                    }]
                }],
                select: [{
                    type: 'pivot-form',
                    schema: [{
                        name: 'col2',
                        type: 'select',
                        enum: function (callback) {
                            callback([1, 2, 3]);
                        },
                        value: function (callback) {
                            setTimeout(function () {
                                callback(3);
                            }, 100);
                        }
                    }]
                }],
                grid: [{
                    name: 'col4',
                    type: 'canvas-datagrid',
                    style: {
                        height: '150px',
                        width: '300px'
                    },
                    data: function (callback) {
                        setTimeout(function () {
                            callback([{'Grid-col-1': 'a'}]);
                        }, 200);
                    }
                }]
            }
        }
    ];
    p.schema = schema;
    setTimeout(function (){
        p.data = data;
    }, 200);
    // p.schema = [
    //     {
    //         type: 'tabs',
    //         static: true,
    //         tabs: {
    //             'Iwo POW': [
    //                 {
    //                     type: 'pivot-form',
    //                     name: 'pivot-form-a',
    //                     schema: [
    //                         {
    //                             name: 'col1',
    //                             type: 'date'
    //                         },
    //                         {
    //                             name: 'col2'
    //                         },
    //                         {
    //                             name: 'col3'
    //                         }
    //                     ]
    //                 }
    //             ],
    //             'Taizo Sakamoto': [
    //                 {
    //                     type: 'pivot-form',
    //                     name: 'pivot-form-a',
    //                     schema: [
    //                         {
    //                             name: 'col35'
    //                         },
    //                         {
    //                             name: 'col36'
    //                         },
    //                         {
    //                             name: 'col37'
    //                         }
    //                     ]
    //                 }
    //             ],
    //             'Grid': [
    //                 {
    //                     type: 'canvas-datagrid',
    //                     style: {
    //                         height: '150px'
    //                     },
    //                     name: 'col49'
    //                 },
    //             ],
    //             'Dr. Akahige': [
    //                 {
    //                     type: 'pivot-form',
    //                     name: 'pivot-form-a',
    //                     schema: [
    //                         {
    //                             name: 'col45'
    //                         },
    //                         {
    //                             name: 'col46'
    //                         },
    //                         {
    //                             name: 'col47'
    //                         }
    //                     ]
    //                 }
    //             ],
    //             'Iwo': [
    //                 {
    //                     type: 'pivot-form',
    //                     name: 'pivot-form-a',
    //                     schema: [
    //                         {
    //                             name: 'col55'
    //                         },
    //                         {
    //                             name: 'col56'
    //                         },
    //                         {
    //                             name: 'col57'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     }
    // ];
    document.body.appendChild(p);
    p.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(p.data);
    });
});
