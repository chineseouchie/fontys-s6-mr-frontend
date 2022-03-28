import { useEffect, useState } from "react";

export const useFetch = url => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		try {
			const response = await fetch(url).then(function (response) {
				return response.json();
			}).then(function (response) {
				setData(response);
			});
			setLoading(false);
		} catch (error) {
			setError(error)
		}
	}, []);

	return { data, error, loading };
}
