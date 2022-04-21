import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function PurchaseRequestDetail() {
	const params = useParams();
	const uuid = params.id

	const { data, error, loading } = useFetch(`http://localhost:8087/api/v1/purchase-request/${uuid}`)

	if (loading) {
		return <>Loading</>
	}

	if (error) {
		return <>Something went wrong</>
	}

	console.log(data)

	return (
		<>
			Purchase request detail


		</>
	)
}

