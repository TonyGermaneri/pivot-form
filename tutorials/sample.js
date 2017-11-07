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
                                name: 'col25',
                                type: 'date'
                            },
                            {
                                name: 'col26'
                            },
                            {
                                name: 'col27'
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
                        data: [{col1: 'a'}],
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
        col3: 'blah'
    };
    document.body.appendChild(p);
});
