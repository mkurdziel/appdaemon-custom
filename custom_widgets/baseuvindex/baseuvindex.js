function baseuvindex(widget_id, url, skin, parameters)
{
    var UV_INDEX_LOW = 2;
    var UV_INDEX_MODERATE = 5;
    var UV_INDEX_HIGH = 7;
    var UV_INDEX_VERY_HIGH = 10;
    var UV_INDEX_EXTREME = 11;

    var COLOR_INDEX_LOW = "#299500";
    var COLOR_INDEX_MODERATE = "#f7e400";
    var COLOR_INDEX_HIGH = "#f95903";
    var COLOR_INDEX_VERY_HIGH = "#d90011";
    var COLOR_INDEX_EXTREME = "#6c49cb";

    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...

    self = this;

    // Initialization

    self.widget_id = widget_id;

    // Store on brightness or fallback to a default

    // Parameters may come in useful later on

    self.parameters = parameters;

    // Define callbacks for entities - this model allows a widget to monitor multiple entities if needed
    // Initial will be called when the dashboard loads and state has been gathered for the entity
    // Update will be called every time an update occurs for that entity

    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;

    var monitored_entities =
    [
        {"entity": self.parameters.current_uv_index, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.max_uv_index, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.protection_window, "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": self.parameters.safe_exposure_time, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
    ];

    var callbacks = [ ]

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

    function getUvStyle(index)
    {
      var color = null;
      if (index <= UV_INDEX_LOW) {
        color = null;
      } else if (index <= UV_INDEX_MODERATE) {
        color = COLOR_INDEX_MODERATE; 
      } else if (index <= UV_INDEX_HIGH) {
        color = COLOR_INDEX_HIGH; 
      } else if (index <= UV_INDEX_VERY_HIGH) {
        color = COLOR_INDEX_VERY_HIGH; 
      } else {
        color = COLOR_INDEX_EXTREME; 
      }

      console.log(index);

      if (color) {
        return 'color: ' + color + ' !important;';
      }
      return "";
    }

    function set_view(self, state)
    {
       if (state.entity_id == self.parameters.current_uv_index) {
            self.set_field(self, "current_uv_index", parseFloat(state.state).toFixed(1));
            self.set_field(self, "current_uv_style", getUvStyle(parseFloat(state.state)));
       } else if (state.entity_id == self.parameters.max_uv_index) {
            self.set_field(self, "max_uv_index", parseFloat(state.state).toFixed(0));
            self.set_field(self, "max_uv_style", getUvStyle(parseFloat(state.state)));
       } else if (state.entity_id == self.parameters.safe_exposure_time) {
            if (state.state == 'unknown') {
              self.set_field(self, "safe_exposure_time", "∞");
            } else {
              self.set_field(self, "safe_exposure_time", parseFloat(state.state).toFixed(0));
            }
       } else if (state.entity_id == self.parameters.protection_window) {
          if (state.state == 'off') {
            self.set_field(self, "icon_class", 'icon icon-inactive');
          } else {
            self.set_field(self, "icon_class", 'icon icon-active');
          }
       }
    }
}
