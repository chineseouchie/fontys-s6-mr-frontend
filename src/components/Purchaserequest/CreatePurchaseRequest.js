import { useSnackbar } from "notistack"
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function CreatePurchaseRequest() {
	const { enqueueSnackbar } = useSnackbar();

	const params = useParams();
	const [selectedCompanyIds, setSelectedIds] = useState([]);

	useEffect(() => {
		const offer = fetchOffer(params.id);
	});

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

	const submitSelection = function () {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				offerUuid: params.id,
				//deliveryDate: deliveryDate,
				//deliveryPrice: deliveryPrice,
				companyUuids: selectedCompanyIds
			})
		};
		performRequest(requestOptions);
	}

	const fetchOffer = function (offerUuid) {
		const offer = fetch("http://localhost:8086/api/v1/offer/" + offerUuid)
			.then(response => response.json()
				.then(console.log(response)));
	}

	const performRequest = function (requestOptions) {
		fetch("http://localhost:8087/api/v1/purchase-request/create", requestOptions)
			.then(response => response.json()
				.then(handleResponse(response)));
	}

	const handleResponse = function (response) {
		if (response.status === 200 || response.status === 201) {
			enqueueSnackbar(`Purchase request created.`, {
				variant: "success",
				autoHideDuration: 2500,
			});
		} else {
			if (response.status === 404)
				enqueueSnackbar(`Invalid offer id. The offer was not found.`, {
					variant: "warning",
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