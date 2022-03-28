import * as React from 'react';
import VehicleCard from "./VehicleCard";
import { useFetch } from "../../hooks/useFetch";
import { Grid } from '@mui/material';

export default function Vehicles() {
	const { data, error, loading } = useFetch("http://localhost:8080/vehicle");

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
			<div >
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{data.map((item, idx) => (
						<VehicleCard vehicle={item} key={idx} />
					))}
				</Grid>
			</div>
		</div>
	)
}
