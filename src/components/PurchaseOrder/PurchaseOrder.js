import "./purchaseorder.css"
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {Button, Card, Grid} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function PurchaseOrder() {
	const { data } = useFetch("http://localhost:8086/api/v1/purchase_order/company_ABC");
	const columns = [
		{ field: "image_url", headerName: "Preview",  width: 150,
			renderCell: (params) => <img className={"car_image"} src={params.value}  alt={"Car"}/>},
		{ field: "brand", headerName: "Brand", width: 150 },
		{ field: "model", headerName: "Model", width: 200 },
		{ field: "color", headerName: "Color", width: 200 },
		{ field: "delivery_price", headerName: "Delivery Price", width: 150 },
		{ field: "delivery_date", headerName: "Delivery Date", width: 150 },
		{ field: "created_time", headerName: "Request made on", width: 150 },
		{ field: "uuid", headerName: "Order Ready", width: 150,
			renderCell: (params) =>
				<div>
					<Button className={"buttonStyle"} variant="outlined" onClick={() => {onPurchaseOrderClick(params)}}>
						<CheckBoxIcon/>
					</Button>
				</div>
		},
	];
	const navigate = useNavigate();
	function onPurchaseOrderClick(uuid) {
		navigate(`/purchase-order/${uuid.formattedValue}`)
	}

	const arr = [];
	data.map((item) =>
		arr.push({
			uuid: item.uuid,
			created_time: new Date(item.created_time * 1000).toLocaleDateString(),
			delivery_date: new Date(item.delivery_date * 1000).toLocaleDateString(),
			delivery_price: `€ ${item.delivery_price}`,
			model: item.model,
			price: item.price.toString(),
			brand: item.brand,
			image_url: item.image_url,
			color: item.color,
		})
	);



	return (
		<div>
			<Card className={"purchaseOrder_container"}>
				<h1>Purchase Orders</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							getRowId={(row) => row.uuid}
							rows={arr}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							components={{ Toolbar: GridToolbar }}
						/>
					</div>
				</Grid>
			</Card>
		</div>
	)
}
