import "./vehicle.css"

import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
	const navigate = useNavigate();
	console.log(vehicle)

	return (
		<Grid item xs={2} sm={4} md={4}>
			<Card onClick={() => { navigate(`/vehicles/detail/${vehicle.uuid}`) }}>
				<CardActionArea>
					<CardMedia
						className={"vehicle-image"}
						component="img"
						height="200"
						image={vehicle.image_url}
					/>
					<CardContent>
						<Typography variant="h5" component="div">
							{vehicle.brand} - {vehicle.model}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							LEASEPRIJS VANAF €{vehicle.price} P/M
						</Typography>


					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

