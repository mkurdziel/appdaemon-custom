function basehousemode(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...

    self = this;

    self.widget_icons =
    {
      "morning": 'mdi mdi-weather-sunset-up',
      "day": 'mdi mdi-weather-sunny',
      "evening": 'fa fa-moon-o',
      "night": 'fa fa-star-o'
    };

    // Initialization

    self.widget_id = widget_id;

    // Store on brightness or fallback to a default

    // Parameters may come in useful later on

    self.parameters = parameters;

    var callbacks = [];

    // Define callbacks for entities - this model allows a widget to monitor multiple entities if needed
    // Initial will be called when the dashboard loads and state has been gathered for the entity
    // Update will be called every time an update occurs for that entity

    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;

    var monitored_entities =
    [
        {"entity": "input_select.house_mode", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
    ];

    // Finally, call the parent constructor to get things moving

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks);

    // Function Definitions

    // The StateAvailable function will be called when
    // self.state[<entity>] has valid information for the requested entity
    // state is the initial state
    // Methods

    function OnStateUpdate(self, state)
    {
        set_view(self, state)
    }

    function OnStateAvailable(self, state)
    {
        set_view(self, state)
    }

    function set_view(self, state)
    {
        if (state.entity_id == 'input_select.house_mode')
        {
            self.set_field(self, "housemode_icon", self.widget_icons[state.state.toLowerCase()])
            self.set_field(self, "housemode_name", state.state)
        } 
    }
}
