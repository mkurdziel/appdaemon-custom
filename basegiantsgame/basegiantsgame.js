function basegiantsgame(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...

    self = this;

    self.widget_icons =
    {
      "check": 'mdi mdi-check-circle',
      "train": 'mdi mdi-train',
      "baseball": 'mdi mdi-alert-circle-outline alert-color'
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
        {"entity": "sensor.giants_game", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
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
        set_view(self, state);
    }

    function OnStateAvailable(self, state)
    {
        set_view(self, state);
    }

    function set_view(self, state)
    {
        if (state.entity_id == 'sensor.giants_game');
        {
            if (state.state == 'No') {
              self.set_field(self, "game_icon", self.widget_icons['train']);
              self.set_field(self, "widget_class", null);
              self.set_field(self, "game_time", "No Game");
            } else {
              self.set_field(self, "widget_style", "background-color: #D14C15;");
              self.set_field(self, "widget_class", "game");
              self.set_field(self, "game_icon", self.widget_icons['train']);
              //self.set_field(self, "game_icon", self.widget_icons['baseball']);
              self.set_field(self, "game_time", state.state);
            }
        } 
    }
}
