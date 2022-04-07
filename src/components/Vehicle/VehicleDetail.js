import { Button, FormGroup, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { getDateToday } from "../../utils/date";

export default function VehicleDetail() {
	const params = useParams();
	const { data, error, loading } = useFetch(`http://localhost:8081/api/v1/vehicle/${params.id}`);
	const today = getDateToday()
	const [date, setDate] = useState(new Date(`${today.yyyy}-${today.mm}-${today.dd}`));

	const handleChange = (date) => {
		setDate(date);
	};
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
			<form>
				<Grid container spacing={2}>

					<Grid item xs={7} pr={3}>
						Form hier
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

						<FormGroup sx={{ mt: 3 }}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Stack spacing={3}>
									<DesktopDatePicker
										label="Delivery date"
										inputFormat="MM/dd/yyyy"
										value={date}
										onChange={handleChange}
										renderInput={(params) => <TextField {...params} />}
									/>
								</Stack>
							</LocalizationProvider>
						</FormGroup>

					</Grid>
					<Grid item xs={5}>
						<Typography mt={2} variant="h5">Preview</Typography>
						<div>
							<Box
								component="img"
								sx={{
									maxWidth: { xs: 200, md: 300 },
								}}
								alt="The house from the offer."
								src={data.image_url}
							/>
							<Box>
								<Typography mt={3} variant="h5">Details</Typography>
								<Typography>Car: {data.brand.name} {data.model}</Typography>

							</Box>
							<Box>
								<Typography class="price">€ {data.price}</Typography>
							</Box>

							<FormGroup>
								<Button variant="contained">Request invoice</Button>
							</FormGroup>
						</div>
					</Grid>
				</Grid>
			</form>

		</>
	)
}

