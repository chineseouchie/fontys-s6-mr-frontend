import { DataGrid } from "@mui/x-data-grid";
import { useFetch } from "../../hooks/useFetch";
const columns = [
	{ field: "name", headerName: "company name", flex: 1 }
];

export default function DealerList({ setSelectedIds }) {
	const { data, error, loading } = useFetch("http://localhost:8086/api/v1/purchase-request/dealers");

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
		</div>
	)
}
