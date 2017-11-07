/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var p = window.pivotForm();
    p.name = 'blah';
    p.title = 'Taizo Sakai';
    p.schema = [
        {
            type: 'tabs',
            static: true,
            tabs: {
                'Iwo POW': [
                    {
                        type: 'pivot-form',
                        name: 'pivot-form-a',
                        schema: [
                            {
                                name: 'col1',
                                type: 'date'
                            },
                            {
                                name: 'col2'
                            },
                            {
                                name: 'col3'
                            }
                        ]
                    }
                ],
                'Taizo Sakamoto': [
                    {
                        type: 'pivot-form',
                        name: 'pivot-form-a',
                        schema: [
                            {
                                name: 'col35'
                            },
                            {
                                name: 'col36'
                            },
                            {
                                name: 'col37'
                            }
                        ]
                    }
                ],
                'Grid': [
                    {
                        type: 'canvas-datagrid',
                        style: {
                            height: '150px'
                        },
                        name: 'col49'
                    },
                ],
                'Dr. Akahige': [
                    {
                        type: 'pivot-form',
                        name: 'pivot-form-a',
                        schema: [
                            {
                                name: 'col45'
                            },
                            {
                                name: 'col46'
                            },
                            {
                                name: 'col47'
                            }
                        ]
                    }
                ],
                'Iwo': [
                    {
                        type: 'pivot-form',
                        name: 'pivot-form-a',
                        schema: [
                            {
                                name: 'col55'
                            },
                            {
                                name: 'col56'
                            },
                            {
                                name: 'col57'
                            }
                        ]
                    }
                ]
            }
        }
    ];
    p.data = {
        col1: 'blah1',
        col2: 'blah2',
        col3: 'blah',
        col57: '235',
        col49: [{foo: '235'}]
    };
    document.body.appendChild(p);
    p.addEventListener('change', function () {
        document.getElementById('data-sample').value = JSON.stringify(p.data);
    });
});
