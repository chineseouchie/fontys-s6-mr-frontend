import * as React from 'react';
import VehicleCard from "./VehicleCard";
import {useFetch} from "../../hooks/useFetch";

export default function Vehicles() {
    const { data, error, loading } = useFetch("http://localhost:8080/vehicle");

    if (loading) {
        return (
            <div>
                ...loading
            </div>
        )
    }
    if (error) {
        return (
            <div>
                ...something went wrong
            </div>
        )
    }

    return (
        <>
            <div className={"vehicle"}>
                <div style={{ height: 400, width: '100%' }}>
                    {data.map((item) =>
                        <VehicleCard vehicle={item}/>)}
                </div>}
            </div>
        </>
    )
}
