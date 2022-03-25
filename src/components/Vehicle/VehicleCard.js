import React from 'react';
import { useNavigate } from "react-router-dom"
import {Card, CardContent, CardMedia} from "@mui/material";

function route(id) {
    console.log(id)
}

export default function VehicleCard(props) {
    // const navigate = useNavigate();

    return (
        <div>
            <Card /*onClick={() => navigate("/", props)}*/>
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
