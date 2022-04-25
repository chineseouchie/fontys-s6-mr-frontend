import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function OfferSuccess() {
	const location = useLocation();
	const offer = location.state.offer;
	const vehicle = location.state.vehicle;
	return (
		<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }} pr={20} pl={20}>
			<Typography variant="h3">Invoice requested</Typography>
			<Typography>Invoice successfully requested, our dealers are now looking at your request. You will receive an email if one of them responds with a good offer.</Typography>

			<Box
				component="img"
				sx={{
					maxWidth: { xs: 200, md: 300 },
				}}
				alt="Selected vehicle."
				src={vehicle.image_url}
			/>

			<Box mt={5}>
				<Typography>{vehicle.brand} {vehicle.model}</Typography>
				<Typography >Invoice ID: {offer.uuid}</Typography>
			</Box>
		</Box>
	)
}
