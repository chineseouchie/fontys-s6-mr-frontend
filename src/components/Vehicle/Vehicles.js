import * as React from 'react';
import VehicleCard from "./VehicleCard";
import { useFetch } from "../../hooks/useFetch";

export default function Vehicles() {
	const { data, error, loading } = useFetch("http://localhost:8080/vehicle");

	if (loading) {
		return (
			<div>
				...loading
			</div>
		)
	}
	if (error) {
		return (
			<div>
				...something went wrong
			</div>
		)
	}

	return (
		<>
			<div className={"vehicle"}>
				<div >
					{data.map((item, idx) =>
						<VehicleCard vehicle={item} key={idx} />
					)}
				</div>
			</div>
		</>
	)
}
