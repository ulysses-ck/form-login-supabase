"use client";
import supabase from "@/app/auth/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
	const [user, setUser] = useState();
	const [word, setWord] = useState("");
	const [results, setResults] = useState();
	const router = useRouter();

	// useEffect to verify if user is logged
	useEffect(() => {
		const isLogged = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (!data.session.user || error) {
				router.push("/login");
			}

			setUser(data);
		};
		isLogged();
	}, []);

	const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

	const searchWord = async () => {
		const fullUrl = `${url}${word}`;

		console.log(fullUrl);
		const resultsFetch = await fetch(fullUrl);
		const dataResults = await resultsFetch.json();

		if (resultsFetch.ok) {
			console.log(resultsFetch);
			console.log(dataResults);
			setResults(dataResults);
		} else {
			console.log(resultsFetch);
			setResults("");
		}
	};

	// Button signout
	const handleClickSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		router.push("/");
	};

	// Function to set word from input
	const handleInput = (event) => {
		setWord(event.target.value);

		console.log(`"buscando palabra: ${word}"`);
	};

	useEffect(() => {
		searchWord();
	}, [word]);

	return (
		<main className="flex p-2 flex-col gap-8">
			<nav className="flex justify-between p-4">
				<h1 className="text-xl">Dashboard</h1>
				<button
					className="bg-black rounded-md border-white border p-2"
					onClick={handleClickSignOut}
				>
					Sign out
				</button>
			</nav>
			{user ? (
				<div className="flex justify-center items-center gap-4">
					<Image
						src={user.session.user.user_metadata.avatar_url}
						width={100}
						height={100}
						alt="profile picture"
						className="rounded-full"
					/>
					<h2 className="text-sm">{user.session.user.email}</h2>
				</div>
			) : (
				""
			)}

			{/* API */}
			<div className="flex flex-col items-center">
				<input
					type="text"
					onInput={handleInput}
					value={word}
					className="text-black rounded-md p-2"
				/>
				<div className="text-4xl">
					{word || "Type for search a word"}
				</div>

				<div>
					{results
						? results.map((result, index) => (
								<div key={`${index}${result}`}>
									<h4 className="text-2xl">{result.word}</h4>
									<ul>
										{result.meanings[0].definitions.map(
											(el) => (
												<li>{el.definition}</li>
											),
										)}
									</ul>
								</div>
						  ))
						: ""}
				</div>
			</div>
		</main>
	);
}
