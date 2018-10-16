function baseweathermini(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...
    
    self = this;
    
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
    self.OnSubStateAvailable = OnSubStateAvailable;
    self.OnSubStateUpdate = OnSubStateUpdate;

    var monitored_entities =
    [
        {"entity": self.parameters.temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.temperature_min, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.temperature_max, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
    ];

    // Finally, call the parent constructor to get things moving
    
    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks);

    // Function Definitions
    
    // The StateAvailable function will be called when 
    // self.state[<entity>] has valid information for the requested entity
    // state is the initial state
    // Methods

    function OnStateAvailable(self, state)
    {    
        set_value(self, state)
    }
 
    function OnStateUpdate(self, state)
    {
        set_value(self, state)
    }

    function OnSubStateAvailable(self, state)
    {
        set_sub_value(self, state)
    }

    function OnSubStateUpdate(self, state)
    {
        set_sub_value(self, state)
    }

    function set_value(self, state)
    {
      if (state.entity_id == self.parameters.temperature) {
            self.set_field(self, "temperature", parseFloat(state.state).toFixed(0));
            self.set_field(self, "temperature_unit", state.attributes.unit_of_measurement);
      } else if (state.entity_id == self.parameters.temperature_min) {
            self.set_field(self, "temperature_min", parseFloat(state.state).toFixed(0));
            self.set_field(self, "temperature_min_unit", state.attributes.unit_of_measurement);
      } else if (state.entity_id == self.parameters.temperature_max) {
            self.set_field(self, "temperature_max", parseFloat(state.state).toFixed(0));
            self.set_field(self, "temperature_max_unit", state.attributes.unit_of_measurement);
      }
    }
}
