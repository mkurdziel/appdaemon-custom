function basetesla(widget_id, url, skin, parameters)
{
   const MAX_BATTERY = 400.00;
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...

    self = this;

    // Initialization

    self.widget_id = widget_id;
    self.climate_on = false;

    // Store on brightness or fallback to a default

    // Parameters may come in useful later on

    self.parameters = parameters;
    self.OnClimateClick = OnClimateClick;

    // Define callbacks for entities - this model allows a widget to monitor multiple entities if needed
    // Initial will be called when the dashboard loads and state has been gathered for the entity
    // Update will be called every time an update occurs for that entity

    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;

    var monitored_entities =
    [
        {"entity": self.parameters.climate, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.parking_brake_sensor, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.door_lock, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.battery_sensor, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.charger_sensor, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.range_sensor, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.temp_inside, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.temp_outside, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
    ];

    var callbacks =
            [
                {"selector": '#climateButton', "action": "click", "callback": self.OnClimateClick},
            ]

    // Finally, call the parent constructor to get things 400moving

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

    function OnClimateClick(self)
    {
      let args = {
        'service': 'climate/set_operation_mode',
        'entity_id': self.parameters.climate,
      };

      if (self.parameters.climate.state == 'on')
      {
         console.log('Climate is on');
         args.operation_mode = 'off';
      }
      else
      {
         console.log('Climate is off');
         args.operation_mode = 'on';
      }
      self.call_service(self, args);
    }

    function set_view(self, state)
    {
       if (state.entity_id == self.parameters.temp_inside) {
            self.set_field(self, "temp_inside", parseFloat(state.state).toFixed(0));
       } else if (state.entity_id == self.parameters.temp_outside) {
            self.set_field(self, "temp_outside", parseFloat(state.state).toFixed(0));
       } else if (state.entity_id == self.parameters.range_sensor) {
            self.set_field(self, "range_sensor", parseFloat(state.state).toFixed(0));
       } else if (state.entity_id == self.parameters.parking_brake_sensor) {
          if (state.state == 'on') {
            self.set_field(self, "icon_class", 'icon icon-inactive');
          } else {
            self.set_field(self, "icon_class", 'icon icon-active');
          }
       } else if (state.entity_id == self.parameters.battery_sensor) {
            self.set_field(self, "battery_sensor", parseFloat(state.state).toFixed(0));
            self.set_field(self, "battery_icon_width", MAX_BATTERY * parseFloat(state.state)/100.0);
       } else if (state.entity_id == self.parameters.door_lock) {
          if (state.state == 'locked') {
            self.set_field(self, "lock_icon", 'fa fa-lock');
          } else {
            self.set_field(self, "lock_icon", 'fa fa-unlock');
          }
       } else if (state.entity_id == self.parameters.climate) {
          if (state.state == 'on') {
            self.climate_on = true;
            self.set_field(self, "climate_icon", 'fa fa-snowflake-o on');
          } else {
            self.climate_on = false;
            self.set_field(self, "climate_icon", 'fa fa-snowflake-o off');
          }
       } else if (state.entity_id == self.parameters.charger_sensor) {
          if (state.state == 'on') {
            self.set_field(self, "charge_style", 'charge-icon-charging');
          } else {
            self.set_field(self, "charge_style", 'charge-icon');
          }
       }
    }
}
