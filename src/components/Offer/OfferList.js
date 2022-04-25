import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import { PanoramaSharp } from "@mui/icons-material";

const columns = [
	{ field: "vehicle", headerName: "Vehicle brand", flex: 2, valueGetter: (params) => console.log(params.rows.brand_name) },
	{ field: "vehicle.brand_model", headerName: "Vehicle model", flex: 2 },
	{ field: "color", headerName: "Vehicle color", flex: 1 },
	{ field: "vehicle.price", headerName: "Vehicle price", flex: 2 },
];

//Mock data
/*
const rows = [
	{ uuid: "offerABC", firstName: "Jip", lastName: "Veeke", vehicleBrand: "Opel", vehicleModel: "Astra", vehicleColor: "Zwart", vehiclePrice: 4300, deliveryDate: 1649923686 },
	{ uuid: "offerDEF", firstName: "Niek", lastName: "Moor", vehicleBrand: "Toyota", vehicleModel: "Prius", vehicleColor: "Roze", vehiclePrice: 2, deliveryDate: 1650536779 },
	{ uuid: "offerGHI", firstName: "Servi Pieter Gerardus Isaac", lastName: "Huijbregts", vehicleBrand: "Toyota", vehicleModel: "Aygo", vehicleColor: "Geel", vehiclePrice: 4300, deliveryDate: 1650536788 }
];
*/


export default function OfferList() {
	const [tableData, setTableData] = useState([])

	useEffect(() => {
		fetch("http://localhost:8086/api/v1/offer/")
			.then((data) => data.json())
			.then((data) => setTableData(data))
	}, [])

	console.log(tableData)

	const navigate = useNavigate();
	const onRowClicked = ({ uuid }) => {
		navigate(`/offers/detail/${uuid}`);
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