
import { useEffect, useState } from "react";
export const useFetch = url => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch(url, {});
				if (res.status !== 200) {
					throw await res.text();
				}
				const json = await res.json();
				setData(json);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setError(err);
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);
	return { data, error, loading };
}
