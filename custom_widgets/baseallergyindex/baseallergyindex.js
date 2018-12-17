function baseallergyindex(widget_id, url, skin, parameters)
{
    var ALLERGY_INDEX_LOW = 2.4;
    var ALLERGY_INDEX_LOW_MEDIUM = 4.8;
    var ALLERGY_INDEX_MEDIUM = 7.2;
    var ALLERGY_INDEX_MEDIUM_HIGH = 9.6;
    var ALLERGY_INDEX_HIGH = 12;

    var COLOR_INDEX_LOW = '#03672a';
    var COLOR_INDEX_LOW_MEDIUM = '#8dc300';
    var COLOR_INDEX_MEDIUM = '#F3C700';
    var COLOR_INDEX_MEDIUM_HIGH = '#E2841B';
    var COLOR_INDEX_HIGH = '#D74302';

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
        {"entity": self.parameters.allergy_index, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
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

    function getLevel(index)
    {
      var level = null;
      if (index <= ALLERGY_INDEX_LOW) {
        level = 'Low';
      } else if (index <= ALLERGY_INDEX_LOW_MEDIUM) {
        level = 'Low-Medium';
      } else if (index <= ALLERGY_INDEX_MEDIUM) {
        level = 'Medium';
      } else if (index <= ALLERGY_INDEX_MEDIUM_HIGH) {
        level = 'Medium-High';
      } else {
        level = 'High';
      }

      return level;
    }

    function getIndexColor(index)
    {
      var color = null;
      if (index <= ALLERGY_INDEX_LOW) {
        color = null;
      } else if (index <= ALLERGY_INDEX_LOW_MEDIUM) {
        color = COLOR_INDEX_LOW_MEDIUM; 
      } else if (index <= ALLERGY_INDEX_MEDIUM) {
        color = COLOR_INDEX_MEDIUM; 
      } else if (index <= ALLERGY_INDEX_MEDIUM_HIGH) {
        color = COLOR_INDEX_MEDIUM_HIGH; 
      } else {
        color = COLOR_INDEX_HIGH; 
      }

      if (color) {
        return 'fill: ' + color + ' !important;';
      }
      return "";
    }

    function set_view(self, state)
    {
       if (state.entity_id == self.parameters.allergy_index) {
          let index = parseFloat(state.state).toFixed(1); 
          let iconStyle = getIndexColor(index);
          let level = getLevel(index);
          self.set_field(self, "allergy_index", index);
          self.set_field(self, "allergy_level", level);
          self.set_field(self, "icon_style", iconStyle);
       }
    }
}
