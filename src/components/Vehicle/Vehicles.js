import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import VehicleCard from "./VehicleCard";

const useFetch = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const response = await fetch(url).then(function(response) {
            return response.json();
        }).then(function(response) {
            setData(response);
        });
        setLoading(false);
    }, []);

    return { data, loading };
};

export default function Vehicles() {
    const [count, setCount] = useState(0);
    const { data, loading } = useFetch("http://localhost:8080/vehicle");

    return (
        <>
            <div className={"vehicle"}>
                {loading ? <div>...loading</div> :
                    <div style={{ height: 400, width: '100%' }}>
                        {data.map((item) =>
                            <VehicleCard vehicle={item}/>)}
                </div>}
            </div>
        </>
    )
}
