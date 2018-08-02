function baseweatherplus(widget_id, url, skin, parameters)
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
      "partly-cloudy-day": 'mdi mdi-weather-partlycloudy',
      "partly-cloudy-night": 'mdi mdi-weather-cloudy'
    };

    // Initialization

    self.widget_id = widget_id;
    self.prev_widget_style = '';

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
        {"entity": self.parameters.today_icon, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.today_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.today_high_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.today_low_temperature, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.today_humidity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.today_wind_speed, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.today_precip_probability, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
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
        if (state.entity_id == self.parameters.today_icon)
        {
            self.set_field(self, "today_icon", self.weather_icons[state.state])
        } 
        else if (state.entity_id == self.parameters.today_temperature)
        {
            self.set_field(self, "today_temperature", Math.round(state.state))
            self.set_field(self, "today_temperature_unit", state.attributes.unit_of_measurement)
        }
        else if (state.entity_id == self.parameters.today_precip_probability)
        {
            self.set_field(self, "today_precip_probability", Math.round(state.state))
            if (state.state > 10) {
              self.set_field(self, "widget_style", "background-color: #0B416D;");
            } else {
              self.set_field(self, "widget_style", self.parameters.static_css.widget_style);
            }
        }
        else if (state.entity_id == self.parameters.today_high_temperature)
        {
            self.set_field(self, "today_high_temperature", Math.round(state.state) + ' °')
        }
        else if (state.entity_id == self.parameters.today_low_temperature)
        {
            self.set_field(self, "today_low_temperature", Math.round(state.state) + ' °')
        }
        else if (state.entity_id == self.parameters.today_humidity)
        {
            self.set_field(self, "today_humidity", Math.round(state.state))
        }
        else if (state.entity_id == self.parameters.today_wind_speed)
        {
            self.set_field(self, "today_wind_speed", Math.round(state.state))
        }
    }
}
