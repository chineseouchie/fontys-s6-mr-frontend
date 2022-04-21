import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

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
		const res = fetch("http://localhost:8087/api/v1/purchase-request/accept", {
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

	return (
		<>
			Purchase request detail
			<Button variant="contained" onClick={acceptPR}>Accept</Button>
			<Button variant="contained" color="error" onClick={declinePR}>Decline</Button>

		</>
	)
}

