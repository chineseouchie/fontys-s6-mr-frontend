
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function FetchException(message, code) {
	this.message = message
	this.code = code

	return { message: this.message, code: this.code }
}

export const useFetch = (url, token) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
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
				if (err.code === 404) {
					return navigate(`/404`)
				}

				/*eslint indent: ["error","tab", {"SwitchCase": 1}]*/
				switch (err.code) {
					case 404:
						navigate(`/404`)
						break;
					default:
						navigate("/500")
				}
				setError(err);
				setLoading(false);
			}
		};

		fetchData();
	}, [url, token]);
	return { data, error, loading };
}
