import "./purchase.css"

import { useFetch } from "../../hooks/useFetch";
import { Card, Grid } from "@mui/material";

export default function PurchaseRequest() {
	const { data, error, loading } = useFetch("http://localhost:8081/api/v1/purchaserequest");;

	if (loading) {
		return (
			<>
				Loading
			</>
		)
	}
	if (error) {
		return (
			<>
				Something went wrong while loading
			</>
		)
	}

	return (
		<div>
			<Card className={"purchaseRequest_container"}>
				<h1>Ons aanbod</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{data.map((item, idx) => (
						<h1>test: {item} {idx}</h1>
					))}
				</Grid>
			</Card>
		</div>
	)
}
