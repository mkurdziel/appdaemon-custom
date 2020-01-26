function baseweatherforcast(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...

    self = this;

    self.weather_icons =
    {
      "rain": 'mdi mdi-weather-pouring',
      "snow": 'mdi mdi-weather-snowy',
      "sleet": 'mdi mdi-weather-snowy-rainy',
      "wind": 'mdi mdi-weather-windy',
      "fog": 'mdi mdi-weather-fog',
      "cloudy": 'mdi mdi-weather-cloudy',
      "clear-day": 'mdi mdi-weather-sunny',
      "clear-night": 'mdi mdi-weather-night',
      "partly-cloudy-day": 'mdi mdi-weather-partly-cloudy',
      "partly-cloudy-night": 'mdi mdi-weather-cloudy'
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
        {"entity": self.parameters.day_1_icon, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_1_name, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_1_high_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_1_low_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_2_icon, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_2_name, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_2_high_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_2_low_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_3_icon, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_3_name, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_3_high_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_3_low_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_4_icon, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_4_name, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_4_high_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_4_low_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_5_icon, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_5_name, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_5_high_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.day_5_low_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
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
        if (state.entity_id == self.parameters.day_1_icon)
        {
            self.set_field(self, "day_1_icon", self.weather_icons[state.state])
        } 
        else if (state.entity_id == self.parameters.day_1_name)
        {
            self.set_field(self, "day_1_name", state.state.toUpperCase())
        }
        else if (state.entity_id == self.parameters.day_1_high_temperature)
        {
            self.set_field(self, "day_1_high_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_1_low_temperature)
        {
            self.set_field(self, "day_1_low_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_2_icon)
        {
            self.set_field(self, "day_2_icon", self.weather_icons[state.state])
        } 
        else if (state.entity_id == self.parameters.day_2_name)
        {
            self.set_field(self, "day_2_name", state.state.toUpperCase())
        }
        else if (state.entity_id == self.parameters.day_2_high_temperature)
        {
            self.set_field(self, "day_2_high_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_2_low_temperature)
        {
            self.set_field(self, "day_2_low_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_3_icon)
        {
            self.set_field(self, "day_3_icon", self.weather_icons[state.state])
        } 
        else if (state.entity_id == self.parameters.day_3_name)
        {
            self.set_field(self, "day_3_name", state.state.toUpperCase())
        }
        else if (state.entity_id == self.parameters.day_3_high_temperature)
        {
            self.set_field(self, "day_3_high_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_3_low_temperature)
        {
            self.set_field(self, "day_3_low_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_4_icon)
        {
            self.set_field(self, "day_4_icon", self.weather_icons[state.state])
        } 
        else if (state.entity_id == self.parameters.day_4_name)
        {
            self.set_field(self, "day_4_name", state.state.toUpperCase())
        }
        else if (state.entity_id == self.parameters.day_4_high_temperature)
        {
            self.set_field(self, "day_4_high_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_4_low_temperature)
        {
            self.set_field(self, "day_4_low_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_5_icon)
        {
            self.set_field(self, "day_5_icon", self.weather_icons[state.state])
        } 
        else if (state.entity_id == self.parameters.day_5_name)
        {
            self.set_field(self, "day_5_name", state.state.toUpperCase())
        }
        else if (state.entity_id == self.parameters.day_5_high_temperature)
        {
            self.set_field(self, "day_5_high_temperature", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.day_5_low_temperature)
        {
            self.set_field(self, "day_5_low_temperature", Math.round(state.state))
        }
    }
}
