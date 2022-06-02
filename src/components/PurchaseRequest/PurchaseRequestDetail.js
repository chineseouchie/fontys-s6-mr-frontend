import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserContext } from "../../providers/UserProvider";
import { unixToDate } from "../../utils/date";

export default function PurchaseRequestDetail() {
	const params = useParams();
	const uuid = params.id
	const {user} = useContext(UserContext)
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { data, error, loading } = useFetch(`http://localhost:8087/api/v1/purchase-request/${uuid}`, user.jwt)

	if (loading) {
		return <>Loading</>
	}

	if (error) {
		return <>Something went wrong</>
	}

	const responsePR = async (accepted) => {
		const type = accepted ? "accept" : "decline"

		try {
			const res = await fetch(`http://localhost:8087/api/v1/purchase-request/${uuid}/${type}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": user.jwt
				}
			})
			if (res.status === 200) {
				enqueueSnackbar(`Purchase request ${accepted ? "accepted" : "declined"}`, {
					variant: "success",
					autoHideDuration: 2500,
				});
				navigate("/purchase-request")
			} else {
				enqueueSnackbar(`Something went wrong. Try later again`, {
					variant: "error",
					autoHideDuration: 2500,
				});
			}

		} catch (e) {
			enqueueSnackbar(`Something went wrong. Try later again`, {
				variant: "error",
				autoHideDuration: 2500,
			});
		}

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
				<Button variant="contained" onClick={() => responsePR(true)}>Accept</Button>
				<Button variant="contained" color="error" onClick={() => responsePR(false)}>Decline</Button>
			</div>

		</>
	)
}

