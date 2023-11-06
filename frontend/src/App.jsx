import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
	const [user, setUser] = useState([]);
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [action, setAction] = useState("save");
	const [isLoading, setIsLoading] = useState(true);

	const inputUsernameField = useRef();

	const autoFocus = () => {
		inputUsernameField.current.focus();
	};

	const clearInputField = () => {
		setUsername("");
		setPassword("");
	};

	const submitData = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("http://127.0.0.1:3001/user", {
				user: username,
				password: password,
			});
			setUser(data);
			clearInputField();
		} catch (error) {
			console.log(error);
		}
	};

	const editData = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(`http://127.0.0.1:3001/user/${id}`, {
				user: username,
				password: password,
			});
			setUser(data);
			clearInputField();
			setAction("save");
		} catch (error) {
			console.log(error);
		}
	};

	const deleteData = async (id) => {
		try {
			const { data } = await axios.delete(`http://127.0.0.1:3001/user/${id}`);
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	const passingData = async (data) => {
		setUsername(data.user);
		setPassword(data.password);
		setAction("edited");
		setId(data._id);
		autoFocus();
	};

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await axios.get("http://127.0.0.1:3001/user");
				setUser(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		getData();
	}, []);

	console.log(action);

	if (isLoading) return "Loading";

	return (
		<>
			<main className="flex">
				<div className="w-[400px] fixed left-0 top-0 bg-green-300 h-screen p-[50px] flex items-center flex-col gap-5">
					<div className="font-bold text-xl">
						<h1>Belajar MERN</h1>
					</div>
					<form
						className="flex flex-col items-center justify-center gap-2"
						onSubmit={(e) => {
							action == "save" ? submitData(e) : editData(e);
						}}>
						<input
							type="text"
							placeholder="Username"
							className="p-2"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							ref={inputUsernameField}
							required
						/>
						<input
							type="text"
							placeholder="Password"
							className="p-2"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
						<button type="submit" className="bg-green-500 p-2">
							Submit
						</button>
					</form>
				</div>
				<div className="ml-[400px] p-[50px] grid grid-cols-3 grid-rows-6 gap-2">
					{user.map((item) => {
						return (
							<div key={item._id} className="bg-green-300 p-2">
								<div className="pb-2">
									<h3>ID : {item._id}</h3>
									<h3>User : {item.user}</h3>
									<span>Password : {item.password}</span>
								</div>
								<div className="p-2 border-t border-slate-200 flex items-center justify-end gap-2">
									<button onClick={() => passingData(item)}>Edit</button>
									<button onClick={() => deleteData(item._id)}>Delete</button>
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
}

export default App;
