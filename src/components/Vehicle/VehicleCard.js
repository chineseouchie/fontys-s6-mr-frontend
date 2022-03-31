import "./vehicle.css"

import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
	const navigate = useNavigate();

	return (
		<Grid item xs={2} sm={4} md={4}>
			<Card onClick={() => { navigate(`/vehicles/detail/${vehicle.vehicle_id}`) }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image={"https://freepikpsd.com/file/2019/10/car-drawing-png-8-1.png"}
					/>
					<CardContent>
						<Typography variant="h5" component="div">
							{vehicle.brand_name} - {vehicle.vehicle_model}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							LEASEPRIJS VANAF €{vehicle.vehicle_price} P/M
						</Typography>


					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

