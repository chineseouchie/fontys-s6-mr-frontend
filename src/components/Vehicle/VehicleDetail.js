import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function VehicleDetail() {
	const params = useParams();
	const { data, error, loading } = useFetch(`http://localhost:8081/vehicle/${params.id}`);

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
				<div style={{ height: 400, width: "100%" }}>
					{data.brand_name} {data.vehicle_model}
					<div>
						{data.colors.map((color, idx) => {
							return (<li key={idx}>{color}</li>)
						})}
					</div>
				</div>
			</div>
		</>
	)
}
