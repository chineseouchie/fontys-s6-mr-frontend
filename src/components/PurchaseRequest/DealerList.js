import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../providers/UserProvider";
const columns = [
	{ field: "name", headerName: "company name", flex: 1 }
];

export default function DealerList({ setSelectedIds, deliveryPrice, setDeliveryPrice }) {
	const {user} = useContext(UserContext)
	const { data, error, loading } = useFetch("http://192.168.48/17:30011/api/v1/purchase-request/dealers", user.jwt);

	if (loading) {
		return "loading...";
	}

	if (error) {
		console.log(error);
		return "error."
	}

	// const dealers = [
	// 	{ uuid: "company_ABC", name: "Broken vehicles LLC" },
	// 	{ uuid: "company_DEF", name: "Outdated parts garage" },
	// 	{ uuid: "company_GHI", name: "DIY safetycars" },
	// 	{ uuid: "company_JKL", name: "Servicable cars shop" }
	// ];

	return (
		<div className={"offer-details"}>
			<DataGrid
				rows={data}
				columns={columns}
				autoHeight
				getRowId={(dealers) => dealers.uuid}
				checkboxSelection
				onSelectionModelChange={(ids) => {
					setSelectedIds(ids)
				}}
			/>

			<FormControl fullWidth sx={{ mt: 1 }}>
				<InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
				<OutlinedInput
					id="outlined-adornment-amount"
					type="number"
					defaultValue={deliveryPrice}
					inputProps={{
						maxLength: 20,
						step: "1",
						min: 0
					}}
					placeholder="15.00"
					onChange={(e) => setDeliveryPrice(parseFloat(e.target.value).toFixed(2))}
					startAdornment={<InputAdornment position="start">€</InputAdornment>}
					label="Delivery price"
				/>
			</FormControl>
		</div>
	)
}
