/*jslint browser: true*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var form = document.createElement('pivot-form'),
        data = [{a: 'a', b: 'b', c: 'c'}];
    form.schema = [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'Tab 1',
                    schema: [
                        {
                            type: 'tabs',
                            tabs: [
                                {
                                    name: 'Tab A',
                                    schema: [
                                        {
                                            name: 'text1'
                                        }
                                    ]
                                },
                                {
                                    name: 'Tab B',
                                    schema: [
                                        {
                                            name: 'grid0',
                                            type: 'canvas-datagrid'
                                        }
                                    ]
                                },
                                {
                                    name: 'Tab C',
                                    schema: [
                                        {
                                            type: 'split-container',
                                            panel1: {
                                                schema: [
                                                    {
                                                        name: 'grid1',
                                                        type: 'canvas-datagrid'
                                                    }
                                                ]
                                            },
                                            panel2: {
                                                schema: [
                                                    {
                                                        name: 'grid2',
                                                        type: 'canvas-datagrid'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'Tab D',
                                    schema: [
                                        {
                                            type: 'split-container',
                                            panel1: {
                                                mode: 'fieldset',
                                                title: 'Example fields',
                                                schema: [
                                                    {
                                                        name: 'text4'
                                                    },
                                                    {
                                                        name: 'text5'
                                                    },
                                                    {
                                                        name: 'text6'
                                                    },
                                                    {
                                                        name: 'text7'
                                                    }
                                                ]
                                            },
                                            panel2: {
                                                schema: [
                                                    {
                                                        name: 'grid3',
                                                        type: 'canvas-datagrid'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'Tab E',
                                    schema: [
                                        {
                                            type: 'split-container',
                                            panel1: {
                                                mode: 'fieldset',
                                                title: 'Example fields',
                                                schema: [
                                                    {
                                                        name: 'text8'
                                                    },
                                                    {
                                                        name: 'text9'
                                                    },
                                                    {
                                                        name: 'text10'
                                                    },
                                                    {
                                                        name: 'text11'
                                                    }
                                                ]
                                            },
                                            panel2: {
                                                mode: 'fieldset',
                                                title: 'Example fields',
                                                schema: [
                                                    {
                                                        name: 'text12'
                                                    },
                                                    {
                                                        name: 'text13'
                                                    },
                                                    {
                                                        name: 'text14'
                                                    },
                                                    {
                                                        name: 'text15'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Tab 2',
                    schema: [
                        {
                            type: 'canvas-datagrid',
                            name: 'grid5'
                        }
                    ]
                },
                {
                    name: 'Tab 3',
                    schema: [
                        {
                            type: 'canvas-datagrid',
                            name: 'grid6'
                        }
                    ]
                },
                {
                    name: 'Tab 4',
                    schema: [
                        {
                            type: 'split-container',
                            panel1: {
                                mode: 'fieldset',
                                title: 'Example fields',
                                schema: [
                                    {
                                        name: 'text8'
                                    },
                                    {
                                        name: 'text9'
                                    },
                                    {
                                        name: 'text10'
                                    },
                                    {
                                        name: 'text11'
                                    }
                                ]
                            },
                            panel2: {
                                mode: 'fieldset',
                                title: 'Example fields',
                                schema: [
                                    {
                                        name: 'text12'
                                    },
                                    {
                                        name: 'text13'
                                    },
                                    {
                                        name: 'text14'
                                    },
                                    {
                                        name: 'text15'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ];
    form.data.text1 = 'test';
    document.body.appendChild(form);
    form.addEventListener('change', function () {
        console.log(form.data.text1);
    });
});
