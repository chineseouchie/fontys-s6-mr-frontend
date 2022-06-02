import "./purchase.css"
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {Card, Grid} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

const columns = [
	{
		field: "image_url", headerName: "Preview", flex: 2,
		renderCell: (params) => <img className={"car_image"} src={params.value} alt={"Car"} />
	},
	{ field: "brand", headerName: "Brand", flex: 1 },
	{ field: "model", headerName: "Model", flex: 1 },
	{ field: "color", headerName: "Color", flex: 1 },
	{ field: "delivery_price", headerName: "Delivery Price", flex: 1 },
	{ field: "delivery_date", headerName: "Delivery Date", flex: 1 }
];

export default function PurchaseRequest() {
	const {user} = useContext(UserContext)
	const { data, error, loading } = useFetch("http://192.168.48/17:30011/api/v1/purchase-request", user.jwt);
	const navigate = useNavigate();
	
	if (loading) {
		return <>loading</>
	}
	
	if (error) {
		console.log(error)
		return <>error</>
	}

	function onPurchaseRequestClick(uuid) {
		navigate(`/purchase-request-accepted/${uuid}`)
	}

	const arr = [];
	console.log(data)
	data.map((item) =>
		arr.push({
			purchase_request_uuid: item.uuid,
			delivery_date: new Date(item.delivery_date * 1000),
			delivery_price: `€ ${item.delivery_price}`,
			model: item.model,
			brand: item.brand,
			color: item.color,
			image_url: item.image_url
		})
	);

	return (
		<div>
			<Card className={"purchaseRequest_container"}>
				<h1>Request</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							getRowId={(row) => row.purchase_request_uuid}
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
