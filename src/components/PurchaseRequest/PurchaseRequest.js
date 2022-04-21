import "./purchase.css"
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Card, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "brand_name", headerName: "Brand", width: 250 },
	{ field: "model_name", headerName: "Model", width: 250 },
	{ field: "delivery_date", headerName: "Delivery Date", type: "date", width: 250 },
	{ field: "delivery_price", headerName: "Delivery Price", type: "date", width: 250 },
];

export default function PurchaseRequest() {
	const { data } = useFetch("http://localhost:8087/api/v1/purchase-request/dealer/requests", "company_ABC");

	const navigate = useNavigate();
	function onPurchaseRequestClick(uuid) {
		navigate(`/purchase-request/${uuid}`)
	}

	const arr = [];
	data.map((item) =>
		arr.push({
			uuid: item.uuid,
			delivery_date: new Date(item.delivery_date * 1000),
			delivery_price: String("€ " + item.delivery_price),
			model_name: item.model_name,
			purchase_request_uuid: item.purchase_request_uuid,
			brand_name: item.brand_name,
		})
	);

	return (
		<div>
			<Card className={"purchaseRequest_container"}>
				<h1>Ons aanbod</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							getRowId={(row) => row.uuid}
							rows={arr}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							onRowClick={(row) => { onPurchaseRequestClick(row.id) }}
						/>
					</div>
				</Grid>
			</Card>
		</div>
	)
}
