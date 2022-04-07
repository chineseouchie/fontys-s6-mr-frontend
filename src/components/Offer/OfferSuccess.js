import { useLocation } from "react-router-dom";

export default function OfferSuccess() {
	const location = useLocation();
	const offer = location.state.offer;
	return (
		<>
			Invoice requested.
			Invoice ID: {offer.uuid}
		</>
	)
}
