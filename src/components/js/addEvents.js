import { useState } from "react";
import {InfluxDB } from '@influxdata/influxdb-client'
import "../css/addEvents.css";
const initState = {
    poop: false,
    pee: false
  }

function AddEvents(params) {
    const [events, setEvents] = useState(initState);

    const WriteEvents = (eventsToSend) => {
        eventsToSend.preventDefault();
        console.log(eventsToSend);
        setEvents(initState)
    }
    const handleToggle = ({ target }) =>
      setEvents(s => ({ ...s, [target.name]: !s[target.name] }));

      let now = new Date();
      let localOffset = now.getTimezoneOffset();
      now.setHours(now.getHours() - (localOffset / 60))
      let formatted_date = now.toISOString().split(".")[0]
      return (
        <div className="container">
          <h3>Add Events</h3>
          <form onSubmit={WriteEvents}>
              <input type="datetime-local" name="time" id="time" key="time" defaultValue={formatted_date} />
                {Object.keys(events).map(key => 
                    <div className="checkboxForm">
                        <input type="checkbox"
                        onChange={handleToggle}
                        key={key} name={key} checked={events[key]}
                        />
                        <label>{key}</label>
                    </div>
                )}
            <input type="submit" />
          </form>
          
        </div>
      );
  
}

export default AddEvents;