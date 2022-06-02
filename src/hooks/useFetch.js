
import { useEffect, useState } from "react";
class FetchException {
	constructor(message, code) {
		this.message = message;
		this.code = code;

		return { message: this.message, code: this.code };
	}
}

export const useFetch = (url, token) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let config = {};
			if (token) {
				config = {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				};
			} else {
				config = {
					"Content-Type": "application/json",
				};
			}

			try {
				const res = await fetch(url, { headers: config });
				if (res.status !== 200) {
					// throw ({ message: await res.text(), code: res.status })
					throw new FetchException(await res.text(), res.status)
				}
				const json = await res.json();
				setData(json);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, token]);
	return { data, error, loading };
}
