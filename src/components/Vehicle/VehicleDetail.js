import React from 'react';

export default function VehicleDetail(props) {
    return (
        <div>
            <img src={"https://freepikpsd.com/file/2019/10/car-drawing-png-8-1.png"}/>
            {props.vehicle.vehicle_model}
            {props.vehicle.brand_name}
            {props.vehicle.colors}
            {props.vehicle.vehicle_price}
        </div>
    );
}
