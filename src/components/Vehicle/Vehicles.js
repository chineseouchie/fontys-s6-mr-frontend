import "./vehicle.css"

import VehicleCard from "./VehicleCard";
import { useFetch } from "../../hooks/useFetch";
import {Card, Grid} from "@mui/material";

export default function Vehicles() {
	const { data, error, loading } = useFetch("http://localhost:8081/api/v1/vehicle");

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
	console.log(data)
	return (
		<div className={"vehicle"}>
			<Card className={"vehicle_container"}>
				<h1>Ons aanbod</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{data.map((item, idx) => (
						<VehicleCard vehicle={item} key={idx} />
					))}
				</Grid>
			</Card>
		</div>
	)
}
