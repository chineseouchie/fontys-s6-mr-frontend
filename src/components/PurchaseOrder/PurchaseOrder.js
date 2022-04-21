import "./purchaseorder.css"
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Card, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
	{ field: "brand_name", headerName: "Brand", width: 250 },
	{ field: "model_name", headerName: "Model", width: 250 },
];

export default function PurchaseOrder() {
	// const { data } = useFetch("http://localhost:8087/api/v1/purchase-order/dealer/orders", "company_ABC");

	const navigate = useNavigate();
	function onPurchaseOrderClick(uuid) {
		navigate(`/purchase-order/${uuid}`)
	}

	// const arr = [];
	// data.map((item) =>
	// 	arr.push({
	// 		uuid: item.uuid,
	// 		delivery_date: new Date(item.delivery_date * 1000),
	// 		delivery_price: `€ ${item.delivery_price}`,
	// 		model_name: item.model_name,
	// 		purchase_order_uuid: item.purchase_order_uuid,
	// 		brand_name: item.brand_name,
	// 	})
	// );

	const arrayData = [{"uuid": "uuid_a", "brand_name": "BMW", "model_name": "M3"}];



	return (
		<div>
			<Card className={"purchaseOrder_container"}>
				<h1>Purchase Orders</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							getRowId={(row) => row.uuid}
							rows={arrayData}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							components={{ Toolbar: GridToolbar }}
							onRowClick={(row) => { onPurchaseOrderClick(row.id) }}
						/>
					</div>
				</Grid>
			</Card>
		</div>
	)
}
