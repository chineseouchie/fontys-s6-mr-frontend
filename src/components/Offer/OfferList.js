import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../providers/UserProvider";

const columns = [
	{ field: "customer_name", headerName: "Customer name", flex: 2, valueGetter: (item) => `${item.row.customer.first_name} ${item.row.customer.last_name}` },
	{ field: "vehicle_brand", headerName: "Vehicle brand", flex: 2, valueGetter: (item) => item.row.vehicle.brand_name },
	{ field: "vehicle_model", headerName: "Vehicle model", flex: 2, valueGetter: (item) => item.row.vehicle.model_name },
	{ field: "vehicle_color", headerName: "Vehicle color", flex: 1, valueGetter: (item) => item.row.color },
	{ field: "vehicle_price", headerName: "Vehicle price", flex: 2, valueGetter: (item) => item.row.vehicle.price },
];

export default function OfferList() {
	const navigate = useNavigate();
	const {user} = useContext(UserContext)
	const { data, error, loading } = useFetch("http://localhost:8083/api/v1/offer/", user.jwt)

	if (loading) {
		return "loading"
	}

	if (error) {
		console.log(error);
		return "error"
	}

	const onRowClicked = ({ row }) => {
		navigate(`/offers/detail/${row.offerUuid}`);
	};

	return (
		<div className={"Offers"}>
			<DataGrid
				rows={data}
				columns={columns}
				autoHeight
				enableCellSelect={true}
				onRowClick={onRowClicked}

				getRowId={(item) => item.offerUuid}
			/>

		</div>
	);
}
