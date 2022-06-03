import { Button } from "@mui/material";
import { useSnackbar } from "notistack"
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../providers/UserProvider";
import DealerList from "./DealerList";

export default function CreatePurchaseRequest() {
	const {user} = useContext(UserContext)
	const { enqueueSnackbar } = useSnackbar();
	const params = useParams();
	const [selectedCompanyIds, setSelectedIds] = useState([]);
	const { data, error, loading } = useFetch(`http://192.168.48.17:30009/api/v1/offer/${params.id}`, user.jwt);
	const [deliveryPrice, setDeliveryPrice] = useState()

	if (loading) {
		return "loading...";
	}

	if (error) {
		console.log(error);
		return "error."
	}

	const submitSelection = async function () {
		try {
			const response = await fetch("http://192.168.48.17:30011/api/v1/purchase-request/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${user.jwt}`,
				},
				body: JSON.stringify({
					offerUuid: params.id,
					deliveryDate: data.delivery_date,
					deliveryPrice: deliveryPrice,
					companyUuids: selectedCompanyIds
				})
			});

			if (response.status === 200 || response.status === 201) {
				const json = await response.json();
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
			<DealerList setSelectedIds={setSelectedIds} deliveryPrice={deliveryPrice} setDeliveryPrice={setDeliveryPrice} />
			<Button onClick={submitSelection}>Create purchase request</Button>
		</div>
	);
}
