import { useSnackbar } from "notistack"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../providers/UserProvider"
import { Button, FormControl, FormGroup, TextField } from "@mui/material";



export default function Login() {
	const { user, login } = useContext(UserContext)
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar();
	const [disableLogin, setDisableLogin] = useState(false)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	useEffect(() => {
		if (user?.jwt) {
			navigate("/")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.jwt])

	const onLogin = async (e) => {
		e.preventDefault()
		setDisableLogin(true)
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const res = await fetch("http://192.168.48.17:30007/api/v1/auth/login", {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({ email, password, isEmployee: false })
			})
			const result = await res.json()

			if (res.status === 200) {
				enqueueSnackbar(`Login success`, {
					variant: "success",
					autoHideDuration: 2500,
				});
				console.log(result)
				login(result.jwt)
				navigate("/")
			} else {
				enqueueSnackbar(`${result.message}`, {
					variant: "error",
					autoHideDuration: 2500,
				});
				setDisableLogin(false)
			}

		} catch (e) {
			setDisableLogin(false)
			enqueueSnackbar(`Something went wrong. Try later again`, {
				variant: "error",
				autoHideDuration: 2500,
			});
		}

	}

	function test123() {
		fetch(
			"http://192.168.48.17:30007/api/v1/auth")
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
			})
	}

	return (
		<>
			<form className="login-form" onSubmit={onLogin}>
				<FormControl>
					<FormGroup >
						<TextField label="Email" type="email" name="email" variant="standard" required value={email} />
						<TextField label="Password" type="password" name="password" variant="standard" required value={password} />
					</FormGroup>

					<Button variant="contained" type="submit" disabled={disableLogin}>
						Login
					</Button>
					<Button variant="contained" onClick={test123}>
						Test
					</Button>
				</FormControl>

			</form>

			<div style={{ marginTop: "50px" }}>
				<Button className="log-button" variant="contained" onClick={() => { setEmail("bmw@example.com"); setPassword("bmwPassword1!") }}>setCookie BMW (Log In)</Button>
				<Button className="log-button" variant="contained" onClick={() => { setEmail("audi@example.com"); setPassword("audiPassword1!") }}>setCookie AUDI (Log In)</Button>
			</div>
		</>
	)

}
