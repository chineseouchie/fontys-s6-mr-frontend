import { Card, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

const columns = [
	{ field: "company_name", headerName: "Company Name", flex: 1 },
];

export default function PurchaseRequestDetailAccepted() {
	const params = useParams();
	const uuid = params.id
	const { user } = useContext(UserContext)
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();
	const { data, error, loading } = useFetch(`http://localhost:8087/api/v1/purchase-request/${uuid}/companies`, user.jwt)

	if (loading) {
		return <>Loading</>
	}

	if (error) {
		return <>Something went wrong</>
	}

	const assign = async (acceptedId) => {
		console.log(acceptedId)
		try {
			const res = await fetch(`http://localhost:8087/api/v1/purchase-request/assign`, {
				method: "PUT", headers: {
					"Content-Type": "application/json", "Authorization": user.jwt
				},
				body: JSON.stringify({ purchase_request_uuid: uuid, purchase_request_company_uuid: acceptedId })
			})
			console.log(res.status)
			if (res.status === 200) {
				enqueueSnackbar(`Purchase request assigned to a company`, {
					variant: "success", autoHideDuration: 2500,
				});
				navigate("/dasboard")
			} else {
				enqueueSnackbar(`Something went wrong. Try later again`, {
					variant: "error", autoHideDuration: 2500,
				});
			}

		} catch (e) {
			console.log(e)
			enqueueSnackbar(`Something went wrong. Try later again`, {
				variant: "error", autoHideDuration: 2500,
			});
		}

	}

	const rows = []
	data.map(row =>
		rows.push({
			uuid: row.uuid,
			company_name: row.company.companyName
		})
	)

	return (<>
		<div>
			<Card className={"purchaseRequest_container"}>
				<h1>Selected Purchase Request {uuid}</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							getRowId={(row) => row.uuid}
							rows={rows}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							onRowClick={(row) => { assign(row.id) }}
						/>
					</div>
				</Grid>
			</Card>
		</div>
	</>)
}

