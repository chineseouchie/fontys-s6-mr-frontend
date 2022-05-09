import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function VehicleDetail() {
	const params = useParams();
	const location = useLocation();
	const vehicle = location.state.vehicle;
	const navigate = useNavigate();

	console.log(vehicle)

	const openRequest = () => {
		navigate(`/vehicles/${params.id}/request`)
	}

	return (
		<>
			Vehicle details
			<div>
				<Box
					component="img"
					sx={{
						maxWidth: { xs: 200, md: 300 },
					}}
					alt="Selected vehicle."
					src={vehicle.image_url}
				/>
				<Box>
					<Typography mt={3} variant="h5">Details</Typography>
					<Typography>Car: {vehicle.brand} {vehicle.model}</Typography>

				</Box>
				<Box>
					Colors:
					{vehicle.colors.map((c, i) => (
						<div key={i}>{c}</div>
					))}
				</Box>
				<Box>
					Price: {vehicle.price}
				</Box>
			</div>
			<Button variant="contained" onClick={openRequest}>Select this car</Button>
		</>
	)
}

