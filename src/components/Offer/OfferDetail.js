import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function OfferDetail() {
	const params = useParams();
	//const { data, error, loading } = useFetch(`http://localhost:8081/api/v1/vehicle/${params.id}`);

	let selectedCompanyIds;

	//Mock data
	const dealers = [
		{ uuid: "gshd-asd232-asdhgaj83-haha01", name: "Broken vehicles LLC" },
		{ uuid: "gshd-asd232-asdhgaj83-haha02", name: "outdated parts garage" },
		{ uuid: "gshd-asd232-asdhgaj83-haha03", name: "company 1" },
		{ uuid: "gshd-asd232-asdhgaj83-haha04", name: "company 2" },
		{ uuid: "gshd-asd232-asdhgaj83-haha05", name: "company 3" },
		{ uuid: "gshd-asd232-asdhgaj83-haha06", name: "company 4" },
		{ uuid: "gshd-asd232-asdhgaj83-haha07", name: "company 5" },
		{ uuid: "gshd-asd232-asdhgaj83-haha08", name: "company 6" }
	];

	const columns = [
		{ field: "name", headerName: "company name" }
	];

	const submitSelection = function () {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					//title: "React POST Request Example"
				})
		};

		fetch("https://reqres.in/api/posts", requestOptions)
			.then(response => response.json())
			.then(data => this.setState({ postId: data.id }));
	}

	return (
		<div className="offer">
			<div className={"Offer-details"} style={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={dealers}
					columns={columns}
					autoHeight
					getRowId={(dealers) => dealers.uuid}
					checkboxSelection
					onSelectionModelChange={(ids) => {
						selectedCompanyIds = new Set(ids);
						console.log(selectedCompanyIds)
					}}
				/>
			</div>

			<button onClick={submitSelection}>

			</button>
		</div>
	);
}