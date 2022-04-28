import { useSnackbar } from "notistack"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import DealerList from "./DealerList";

export default function CreatePurchaseRequest() {
	const { enqueueSnackbar } = useSnackbar();
	const params = useParams();
	const [selectedCompanyIds, setSelectedIds] = useState([]);
	const { data, error, loading } = useFetch(`http://localhost:8083/api/v1/offer/${params.id}`);

	if (loading) {
		return "loading...";
	}

	if (error) {
		console.log(error);
		return "error."
	}

	console.log(data);

	const submitSelection = async function () {
		try {
			const response = await fetch("http://localhost:8087/api/v1/purchase-request/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					offerUuid: params.id,
					deliveryDate: data.delivery_date,
					deliveryPrice: data.delivery_price,
					companyUuids: selectedCompanyIds
				})
			});

			if (response.status === 200 || response.status === 201) {
				const json = response.json();
				console.log(json);
				enqueueSnackbar(`Purchase request created.`, {
					variant: "success",
					autoHideDuration: 2500,
				});
			} else {
				console.log(response.status);
				enqueueSnackbar(`Something went wrong.`, {
					variant: "error",
					autoHideDuration: 2500,
				});
			}
		} catch (e) {
			console.log(e)
			enqueueSnackbar("Something went wrong.", {
				variant: "error",
				autoHideDuration: 2500,
			});
		}
	}

	return (
		<div className="offer">
			<DealerList setSelectedIds={setSelectedIds} />
			<button onClick={submitSelection}>Create purchase request!</button>
		</div>
	);
}
