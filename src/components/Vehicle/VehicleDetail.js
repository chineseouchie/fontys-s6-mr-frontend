import { Button, FormGroup, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function VehicleDetail() {
	const params = useParams();
	const { data, error, loading } = useFetch(`http://localhost:8081/api/v1/vehicle/${params.id}`);

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

	console.log(data)

	return (
		<>
			<Grid container spacing={2}>

				<Grid item xs={7}>
					Form hier
					<form>
						<FormGroup>
							<div style={{ display: "flex" }}>
								<TextField label="First name" type="text" name="first_name" variant="standard" required sx={{ flex: 1 }} />
								<TextField label="Last name" type="text" name="last_name" variant="standard" required sx={{ flex: 1 }} />
							</div>
							<TextField label="Email" type="email" name="email" variant="standard" required />
							<TextField label="Phone number" type="text" name="phone_number" variant="standard" required />
						</FormGroup>

						<FormGroup sx={{ mt: 3 }}>
							<TextField label="Street name" type="text" name="street" variant="standard" required />
							<TextField label="House nr" type="text" name="house_number" variant="standard" required />
							<TextField label="Zip code" type="text" name="zip_code" variant="standard" required />
							<TextField label="Provice" type="text" name="province" variant="standard" required />
							<TextField label="City" type="text" name="city" variant="standard" required />
							<TextField label="Country" type="text" name="country" variant="standard" required />
						</FormGroup>
						<FormGroup>
							<Button>Order</Button>

						</FormGroup>


					</form>
				</Grid>
				<Grid item xs={5}>
					Auto hier
				</Grid>
			</Grid>
		</>
	)
}
