import {Button, Card, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useSnackbar} from "notistack";
import {useNavigate, useParams} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {unixToDate} from "../../utils/date";
import {DataGrid} from "@mui/x-data-grid";

export default function PurchaseRequestDetail() {
	const params = useParams();
	const uuid = params.id
	const [jwt] = useLocalStorage("mr-jwt");
	const navigate = useNavigate();
	const {enqueueSnackbar} = useSnackbar();
	const {data, error, loading} = useFetch(`http://localhost:8087/api/v1/purchase-request/${uuid}/accepted`, jwt)

	if (loading) {
		return <>Loading</>
	}

	if (error) {
		return <>Something went wrong</>
	}

	const responsePR = async (accepted) => {
		try {
			const res = await fetch(`http://localhost:8087/api/v1/purchase-request/${uuid}/companies`, {
				method: "POST", headers: {
					"Content-Type": "application/json", "Authorization": jwt
				}
			})
			if (res.status === 200) {
				enqueueSnackbar(`Purchase request ${accepted ? "accepted" : "declined"}`, {
					variant: "success", autoHideDuration: 2500,
				});
				navigate("/purchase-request")
			} else {
				enqueueSnackbar(`Something went wrong. Try later again`, {
					variant: "error", autoHideDuration: 2500,
				});
			}

		} catch (e) {
			enqueueSnackbar(`Something went wrong. Try later again`, {
				variant: "error", autoHideDuration: 2500,
			});
		}

	}

	console.log(data)
	const date = unixToDate(data.delivery_date * 1000);

	return (<>
		<div>
			<Card className={"purchaseRequest_container"}>
				<h1>Ons aanbod</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<div style={{ height: 400, width: "100%" }}>
						<DataGrid
							getRowId={(row) => row.purchase_request_company_uuid}
							rows={arr}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							onRowClick={(row) => { onPurchaseRequestClick(row.id) }}
						/>
					</div>
				</Grid>
			</Card>
		</div>
	</>)
}

