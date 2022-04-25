import { useSnackbar } from "notistack"
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function CreatePurchaseRequest() {
	const { enqueueSnackbar } = useSnackbar();

	const params = useParams();
	const [selectedCompanyIds, setSelectedIds] = useState([]);
	const { data, error, loading } = useFetch("http://localhost:8086/api/v1/offer/" + params.id);

	if (loading) {
		return "loading...";
	}

	if (error) {
		return "error."
	}

	console.log(data);

	//Mock data
	const dealers = [
		{ uuid: "company_ABC", name: "Broken vehicles LLC" },
		{ uuid: "company_DEF", name: "Outdated parts garage" },
		{ uuid: "company_GHI", name: "DIY safetycars" },
		{ uuid: "company_JKL", name: "Servicable cars shop" }
	];

	const columns = [
		{ field: "name", headerName: "company name", flex: 1 }
	];

	const submitSelection = async function () {
		console.log(data.vehicle.price);

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
			<div className="{}">

			</div>
			<div className={"Offer-details"}>
				<DataGrid
					rows={dealers}
					columns={columns}
					autoHeight
					getRowId={(dealers) => dealers.uuid}
					checkboxSelection

					onSelectionModelChange={(ids) => {
						setSelectedIds(ids)
					}}
				/>
			</div>

			<button onClick={submitSelection}>Create purchase request!</button>
		</div>
	);
}