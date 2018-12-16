function baseaqi(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...
    
    self = this;
    
    // Initialization
    
    self.widget_id = widget_id;
    
    // Parameters may come in useful later on
    
    self.parameters = parameters;

    var callbacks = [];

    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;

    var monitored_entities = 
        [
            {"entity": parameters.entity, "initial": self.OnStateAvailable, "update": self.OnStateUpdate}
        ];
    
    // Finally, call the parent constructor to get things moving
    
    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks);

    // Function Definitions
    
    // The StateAvailable function will be called when 
    // self.state[<entity>] has valid information for the requested entity
    // state is the initial state
    
    function OnStateAvailable(self, state)
    {        
        self.state = state.state;
        set_view(self, self.state)
    }
    
    // The OnStateUpdate function will be called when the specific entity
    // receives a state update - its new values will be available
    // in self.state[<entity>] and returned in the state parameter
    
    function OnStateUpdate(self, state)
    {
        self.state = state.state;
        set_view(self, self.state)
    }

    // Set view is a helper function to set all aspects of the widget to its 
    // current state - it is called by widget code when an update occurs
    // or some other event that requires a an update of the view
    var foregrounds = {
      1: "rgb(113,139,58)",
      2: "rgb(165,127,35)",
      3: "rgb(178,88,38)",
      4: "rgb(175,44,59)",
      5: "rgb(99,70,117)",
      6: "rgb(104,62,81)"
    };
    
    var backgrounds = {
      1: "rgb(168,224,95)",
      2: "rgb(253,215,75)",
      3: "rgb(254,155,87)",
      4: "rgb(254,106,105)",
      5: "rgb(169,122,188)",
      6: "rgb(168,115,131)"
    };
    
    function set_view(self, state, level)
    {
        var aqi = parseInt(state); 

        var state;
        var stateText;
        var stateTextClass = "state_text ";
        var icon;

        self.set_field(self, 'icon_1_style', null);
        self.set_field(self, 'icon_2_style', null);
        self.set_field(self, 'icon_3_style', null);
        self.set_field(self, 'icon_4_style', null);
        self.set_field(self, 'icon_5_style', null);
        self.set_field(self, 'icon_6_style', null);

        if (aqi <= 50) {
          icon = 'icon_1_style';
          stateText = 'Good';
          stateTextClass += 'state-1';
          state = 1;
        } else if (aqi > 50 && aqi <= 100) {
          icon = 'icon_2_style';
          stateText = 'Moderate';
          stateTextClass += 'state-2';
          state = 2;
        } else if (aqi > 100 && aqi <= 150) {
          icon = 'icon_3_style';
          stateText = 'Sensitive';
          stateTextClass += 'state-3';
          state = 3;
        } else if (aqi > 150 && aqi <= 200) {
          icon = 'icon_4_style';
          stateText = 'Unhealthy';
          stateTextClass += 'state-4';
          state = 4;
        } else if (aqi > 200 && aqi <= 300) {
          icon = 'icon_5_style';
          stateText = 'Very Unhealthy';
          stateTextClass += 'state-5';
          state = 5;
        } else {
          icon = 'icon_6_style';
          stateText = 'Dangerous';
          stateTextClass += 'state-6';
          state = 6;
        }


        if (state > 1) {
          self.set_field(self, "widget_style", 'background: ' + backgrounds[state] + ';');
        }
        self.set_field(self, icon, 'display: inline !important;');
        self.set_field(self, "state_text", stateText);
        self.set_field(self, "state_text_class", stateTextClass);
        self.set_field(self, "value_text", aqi);
    }
}
