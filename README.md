Pivot the data you love.
------------------------

Take row data

    data = {column1: 'foo', column2: 'bar'}

    schema = [
        {
            name: 'column1'
        },
        {
            name: 'column2'
        }
    ]

And turn it into an extensible form.

    var form = document.createElement('pivot-form');
    form.schema = schema;
    form.data = data;
    document.body.appendChild(form);

Listen for changes.

    form.addEventListener('change', function (e) {
        console.log(e.data);
    });

Use built in UI widgets

    schema = [
        {
            name: 'column1',
            type: 'date'
        },
        {
            name: 'column2',
            type: 'time'
        }
    ]

Use tab widgets

    schema = [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'tab1',
                    schema: [
                        {
                            name: 'column1',
                            type: 'date'
                        }
                    ]
                }
            ]
        }
    ]


Output data is flattened into a single data object (row) dependent
on the UI objects defined in the schema.  Data input is assigned to UI
objects defined in the schema in the same way.  So no matter how complex
your schema, it will always map back down to a single object.
