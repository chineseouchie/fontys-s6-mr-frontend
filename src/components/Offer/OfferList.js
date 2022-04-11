import * as React from "react";
import { DataGrid, DataGridProps, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ClassNames } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const columns = [
	{
		field: "customer-name", headerName: "Customer name",
		valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`
	},
	{ field: "vehicleBrand", headerName: "Vehicle brand" },
	{ field: "vehicleModel", headerName: "Vehicle model" },
	{ field: "vehicleColor", headerName: "Vehicle color" },
	{ field: "vehiclePrice", headerName: "Vehicle price" },
];

//Mock data
const rows = [
	{ uuid: "gshd-asd232-asdhgaj83-sadtu1", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu2", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu3", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu4", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu5", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu6", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu7", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu8", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu9", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu10", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 },
	{ uuid: "gshd-asd232-asdhgaj83-sadtu11", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Black", vehiclePrice: 4300.99 }
];

export default function OfferList() {
	const navigate = useNavigate();

	const onRowClicked = ({ id }) => {
		navigate(`/offers/detail/${id}`);
	};

	return (
		<div className={"Offers"} style={{ height: 400, width: "100%" }}>
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