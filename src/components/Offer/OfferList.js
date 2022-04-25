import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import { Navigation } from "@mui/icons-material";

const columns = [
	{ field: "customer_name", headerName: "Customer name", flex: 2, valueGetter: (item) => item.row.customer.first_name + " " + item.row.customer.last_name },
	{ field: "vehicle_brand", headerName: "Vehicle brand", flex: 2, valueGetter: (item) => item.row.vehicle.brand_name },
	{ field: "vehicle_model", headerName: "Vehicle model", flex: 2, valueGetter: (item) => item.row.vehicle.model_name },
	{ field: "vehicle_color", headerName: "Vehicle color", flex: 1, valueGetter: (item) => item.row.color },
	{ field: "vehicle_price", headerName: "Vehicle price", flex: 2, valueGetter: (item) => item.row.vehicle.price },
];

export default function OfferList() {
	const [tableData, setTableData] = useState([])

	useEffect(() => {
		fetch("http://localhost:8086/api/v1/offer/")
			.then((data) => data.json())
			.then((data) => setTableData(data))
	}, [])

	const navigate = useNavigate();
	const onRowClicked = ({ row }) => {
		navigate(`/offers/detail/${row.offerUuid}`);
	};

	return (
		<div className={"Offers"}>
			<DataGrid
				rows={tableData}
				columns={columns}
				autoHeight
				enableCellSelect={true}
				onRowClick={onRowClicked}

				getRowId={(item) => item.offerUuid}
			/>
		</div>
	);
}