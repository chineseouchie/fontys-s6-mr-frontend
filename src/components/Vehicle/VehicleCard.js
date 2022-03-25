import React from 'react';
import {Button, Card, CardContent, CardMedia} from "@mui/material";
import VehicleDetail from "./VehicleDetail";
import {Route, useNavigate} from "react-router-dom";

// const test = (vehicleData) => {
//     const navigate = useNavigate();
//     return console.log(vehicleData);
// }

export default function VehicleCard(props) {
    const navigate = useNavigate();

    return (
        <div>
            <Card onClick={() => {navigate(`/detail/${props.vehicle.vehicle_id}`)}}>
                <CardMedia
                    component="img"
                    height={"100"}
                    image={"https://freepikpsd.com/file/2019/10/car-drawing-png-8-1.png"}
                />
                <CardContent>
                    Title
                    <br/>
                    {props.vehicle.vehicle_id}
                    <br/>
                    {props.vehicle.brand_name}

                </CardContent>
            </Card>
        </div>
    );
}

