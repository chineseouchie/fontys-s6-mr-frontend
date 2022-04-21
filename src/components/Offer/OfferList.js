import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
	{
		field: "customer-name", headerName: "Customer name",
		valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
		flex: 2
	},
	{ field: "vehicleBrand", headerName: "Vehicle brand", flex: 2 },
	{ field: "vehicleModel", headerName: "Vehicle model", flex: 2 },
	{ field: "vehicleColor", headerName: "Vehicle color", flex: 1 },
	{ field: "vehiclePrice", headerName: "Vehicle price", flex: 2 },
];

//Mock data
const rows = [
	{ uuid: "offerABC", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Zwart", vehiclePrice: 4300, deliveryDate: 1649923686 },
	{ uuid: "offerDEF", firstName: "Niek", lastName: "Moor", vehicleBrand: "Toyota", vehicleModel: "Prius", vehicleColor: "Roze", vehiclePrice: 2, deliveryDate: 1650536779 },
	{ uuid: "offerGHI", firstName: "Servi Pieter Gerardus Isaac", lastName: "Huijbregts", vehicleBrand: "Toyota", vehicleModel: "Aygo", vehicleColor: "Geel", vehiclePrice: 4300, deliveryDate: 1650536788 }
];

export default function OfferList() {
	const navigate = useNavigate();
	const onRowClicked = ({ id, row }) => {

		navigate(`/offers/detail/${id}`, {
			state: {
				deliveryPrice: row.vehiclePrice,
				deliveryDate: row.deliveryDate,
			}
		});
	};

	return (
		<div className={"Offers"}>
			<DataGrid
				rows={rows}
				columns={columns}
				autoHeight
				enableCellSelect={true}
				onRowClick={onRowClicked}
				getRowId={(row) => row.uuid}
			/>
		</div>
	);
}