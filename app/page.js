"use client";
import { useEffect, useState } from "react";
import supabase from "./auth/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState();
	useEffect(() => {
		const isLogged = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (data.session || error) {
				setUser(data);
				router.push("/dashboard");
			}
		};

		isLogged();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			Welcome to my first page
			<Link href="/auth/signup">Sign up</Link>
		</main>
	);
}
