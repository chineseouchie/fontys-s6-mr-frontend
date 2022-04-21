import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { unixToDate } from "../../utils/date";

export default function PurchaseRequestDetail() {
	const params = useParams();
	const uuid = params.id
	const [cookies] = useCookies(["mr_jwt"]);
	const { data, error, loading } = useFetch(`http://localhost:8087/api/v1/purchase-request/${uuid}`, cookies.mr_jwt)

	if (loading) {
		return <>Loading</>
	}

	if (error) {
		return <>Something went wrong</>
	}

	const acceptPR = async () => {
		const res = await fetch(`http://localhost:8087/api/v1/purchase-request/${uuid}/accept`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": cookies.mr_jwt
			}
		})
		const result = await res.json();

		console.log(result)
	}

	const declinePR = () => {

	}

	console.log(data)
	const date = unixToDate(data.delivery_date * 1000);

	return (
		<>
			<div>
				<Box
					component="img"
					sx={{
						maxWidth: { xs: 200, md: 300 },
					}}
					alt="Selected vehicle."
					src={data.image_url}
				/>
				<Box>
					<Typography mt={3} variant="h5">Details</Typography>
					<Typography>Car: {data.brand} {data.model}</Typography>

				</Box>
				<Box>
					Price: € {data.delivery_price},00
				</Box>
				<Box>
					Delivery Date: {date.dd}/{date.mm}/{date.yyyy}
				</Box>
			</div>
			<div>
				<Button variant="contained" onClick={acceptPR}>Accept</Button>
				<Button variant="contained" color="error" onClick={declinePR}>Decline</Button>
			</div>

		</>
	)
}

