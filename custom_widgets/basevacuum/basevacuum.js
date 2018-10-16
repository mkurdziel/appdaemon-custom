function basevacuum(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...
    
    self = this;
    
    // Initialization
    
    self.widget_id = widget_id;
    
    // Store on brightness or fallback to a default
        
    // Parameters may come in useful later on
    
    self.parameters = parameters;

    // Toggle needs to be referenced from self for the timeout function
    
    self.toggle = toggle;

    // Define callbacks for on click events
    // They are defined as functions below and can be any name as long as the
    // 'self'variables match the callbacks array below
    // We need to add them into the object for later reference
   
    self.OnButtonClick = OnButtonClick;
       
    var callbacks =
        [
            {"selector": '#' + widget_id + ' > div', "action": "click", "callback": self.OnButtonClick},
        ]

    // Define callbacks for entities - this model allows a widget to monitor multiple entities if needed
    // Initial will be called when the dashboard loads and state has been gathered for the entity
    // Update will be called every time an update occurs for that entity
     
    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;
    self.OnSubStateAvailable = OnSubStateAvailable;
    self.OnSubStateUpdate = OnSubStateUpdate;

    var monitored_entities =  [];

    if ("entity" in parameters && parameters.entity != "")
    {
        // Make sure that we monitor the entity, not an attribute of it
        split_entity = parameters.entity.split(".")
        self.entity = split_entity[0] + "." + split_entity[1]
        if (split_entity.length > 2)
        {
            self.entity_attribute = split_entity[2]
        }
        // Check if the sub_entity should be created by monitoring an attribute of the entity
        if ("entity_to_sub_entity_attribute" in parameters && parameters.entity_to_sub_entity_attribute != "")
        {
            self.sub_entity = self.entity
            self.sub_entity_attribute = parameters.entity_to_sub_entity_attribute
        }
    }

    // Only set up the sub_entity if it was not created already with the entity + attribute
    if ("sub_entity" in parameters && parameters.sub_entity != "" && !("sub_entity" in self))
    {
        // Make sure that we monitor the sub_entity, not an attribute of it
        split_sub_entity = parameters.sub_entity.split(".")
        self.sub_entity = split_sub_entity[0] + "." + split_sub_entity[1]
        if (split_sub_entity.length > 2)
        {
            self.sub_entity_attribute = split_sub_entity[2]
        }
        // Check if the entity should be created by monitoring an attribute of the sub_entity
        if ("sub_entity_to_entity_attribute" in parameters && !("entity" in self))
        {
            self.entity = self.sub_entity
            self.entity_attribute = parameters.sub_entity_to_entity_attribute
        }
    }

    if ("entity" in self) 
    {
        monitored_entities.push({"entity": self.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate})
    }
    if ("sub_entity" in self) 
    {
        monitored_entities.push({"entity": self.sub_entity, "initial": self.OnSubStateAvailable, "update": self.OnSubStateUpdate})
    }

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

    function OnButtonClick(self)
    {
        if (self.state == self.parameters.state_active)
        {
            console.log('Vacuum: return to base');
            args = {
              service: 'vacuum/return_to_base',
              entity_id: self.entity
            };
        }
        else
        {
            console.log('Vacuum: start');
            args = {
              service: 'vacuum/turn_on',
              entity_id: self.entity
            };
        }

        self.call_service(self, args);

        toggle(self);
    }
    
    function toggle(self)
    {
        if (self.state == self.parameters.state_active)
        {
            self.state = self.parameters.state_inactive;
        }
        else
        {
            self.state = self.parameters.state_active;
        }
        set_view(self, self.state)
    }

    function set_value(self, state)
    {
        //console.log(state);

        var units = state.attributes['unit_of_measurement_dict'];

        if (state.attributes['friendly_name']) {
            self.set_field(self, "title", state.attributes['friendly_name']);
        }

        if (state.attributes['bin_full']) {
            self.set_field(self, "bin_full", state.attributes['bin_full']);
            self.set_field(self, 'bin_icon', 'bin_full fa fa-trash');
        } else {
            self.set_field(self, 'bin_icon', 'bin_empty fa fa-trash');
        }

        if (state.attributes['fan_speed']) {
            self.set_field(self, "fan_speed", state.attributes['fan_speed']);
            if (state.attributes['fan_speed'] == 'Eco') {
              self.set_field(self, 'fan_icon', 'fan-eco fa fa-leaf');
            } else if (state.attributes['fan_speed'] == 'Performance') {
              self.set_field(self, 'fan_icon', 'fan-performance mdi mdi-run-fast');
            } else if (state.attributes['fan_speed'] == 'Automatic') {
              self.set_field(self, 'fan_icon', 'fan-automatic fa fa-magic');
            }
        }

        if (state.attributes['battery_level']) {
            self.set_field(self, "battery", state.attributes['battery_level']);
        }

        if (state.attributes['status']) {
            self.set_field(self, "status", state.attributes['status']);
        }

        if ("entity_attribute" in self) {
            value = state.attributes[self.entity_attribute]
        }
        else
        {
            value = state.state
        }

        self.state = value;

        set_view(self, value);
    }

  function set_view(self, value) {
      if (value == 'on')
      {
          self.set_field(self, "icon", 'icon-on mdi mdi-robot-vacuum');
      }
      else
      {
          self.set_field(self, "icon", 'icon-off mdi mdi-robot-vacuum');
      }
  }
}
