import React, { useState, useEffect } from 'react';
import {InfluxDB } from '@influxdata/influxdb-client'
import { INFLUX_CONFIG } from "../../env";

const { url, token, org } = INFLUX_CONFIG

// Return: Timestamp
async function getInfluxResult(bucket, measurement, filters)
{
    const queryApi = new InfluxDB({url, token}).getQueryApi(org);
    const filterString = Object.keys(filters).map((k, _) => `filter(fn: (r) => r["_field"] == "${k}" and r["_value"] == ${filters[k]})`).join("|>")
    const fluxQuery = `from(bucket:"${bucket}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "${measurement}") |> ${filterString} |> last()`;
    const data = await queryApi.collectRows(fluxQuery);
    return data.map(el => el._time);
}

async function getLastEvents(measurements){
    const results = await Promise.all(measurements.map(el => getInfluxResult(el.bucket, el.measurement, el.filter)));
    return results
}

function LastEvents(props)
{
    const [events, setEvents] = useState([]);
    const measurements = props.measurements ?? [
        {bucket: "bathroom", measurement: "went", filter: {"poop": true}, display: "Last Poop"}, 
        {bucket: "bathroom", measurement: "went", filter: {"pee": true}, display: "Last Pee"}
    ]
    useEffect(async () => {
        let results = await getLastEvents(measurements);
        setEvents(results)
    },[])

    let result = []
    for(let i =0; i < events.length; i++) {
        result.push(<div>{measurements[i].display}: {events[i]}</div>)
    }
    return result
}

export default LastEvents;