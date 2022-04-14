import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function PurchaseRequestDetail() {
	const params = useParams();
	const location = useLocation();
	const purchaseRequest = location.state.purchaseRequest;
	const navigate = useNavigate();

	console.log(purchaseRequest)

	const openRequest = () => {
		navigate(`/purchaseRequests/${params.id}/request`)
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
					alt="Selected purchaseRequest."
					src={purchaseRequest.image_url}
				/>
				<Box>
					<Typography mt={3} variant="h5">Details</Typography>
					<Typography>Car: {purchaseRequest.brand} {purchaseRequest.model}</Typography>

				</Box>
				<Box>
					Colors:
					{purchaseRequest.colors.map((c, i) => (
						<div key={i}>{c}</div>
					))}
				</Box>
				<Box>
					Price: {purchaseRequest.price}
				</Box>
			</div>
			<Button variant="contained" onClick={openRequest}>Select this car</Button>

		</>
	)
}

