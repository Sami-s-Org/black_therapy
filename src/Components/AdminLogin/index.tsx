import React, {useState} from "react"
import {notifyError} from "../Toast"
import {
	FaEye,
	FaEyeSlash,
} from "react-icons/fa"

interface AdminLoginModalProps {
	onLogin: () => void
}

const AdminLoginModal: React.FC<
	AdminLoginModalProps
> = ({onLogin}) => {
	const [username, setUsername] =
		useState("")
	const [password, setPassword] =
		useState("")
	const [
		showPassword,
		setShowPassword,
	] = useState(false)

	const handleLogin = () => {
		const adminCredentials = {
			username: "admin",
			password: "123456",
		}

		if (
			username ===
				adminCredentials.username &&
			password ===
				adminCredentials.password
		) {
			localStorage.setItem(
				"isAdmin",
				"true",
			)
			onLogin()
		} else {
			notifyError(
				"Invalid username or password",
			)
		}
	}

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor:
					"rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 11111111111,
			}}>
			<div
				style={{
					background: "#fff",
					padding: "2rem",
					borderRadius: "8px",
					boxShadow:
						"0 0 10px rgba(0,0,0,0.3)",
					maxWidth: "500px",
				}}>
				<h2
					style={{
						textAlign: "center",
						color: "#a88757",
						marginBottom: "16px",
						letterSpacing: "3px",
						fontFamily:
							"Derivia Regular",
					}}>
					Admin Login
				</h2>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={(e) =>
						setUsername(
							e.target.value,
						)
					}
					style={{
						width: "100%",
						marginBottom: "12px",
						borderRadius: "4px",
					}}
				/>
				<div
					style={{
						position: "relative",
					}}>
					<input
						type={
							showPassword
								? "text"
								: "password"
						}
						placeholder='Password'
						value={password}
						onChange={(e) =>
							setPassword(
								e.target.value,
							)
						}
						style={{
							width: "100%",
							marginBottom:
								"12px",
							borderRadius:
								"4px",
							paddingRight:
								"30px",
						}}
					/>
					<div
						style={{
							position:
								"absolute",
							right: "10px",
							top: "50%",
							transform:
								"translateY(-50%)",
							cursor: "pointer",
						}}
						onClick={() =>
							setShowPassword(
								!showPassword,
							)
						}>
						{showPassword ? (
							<FaEyeSlash />
						) : (
							<FaEye />
						)}
					</div>
				</div>
				<button
					onClick={handleLogin}
					style={{
						width: "100%",
						height: "55px",
						fontSize: "18px",
						cursor: "pointer",
						marginTop: "32px",
						color: "white",
						backgroundColor:
							"#a88757",
						border:
							"2px solid #a88757",
					}}>
					Login
				</button>
			</div>
		</div>
	)
}

export default AdminLoginModal
