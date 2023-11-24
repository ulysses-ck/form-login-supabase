"use client";
import supabase from "@/app/auth/supabase/client";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Page() {
	const handleClick = async (providerName) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: providerName,
		});
	};
	return (
		<main className="w-screen h-screen flex justify-center items-center flex-col gap-2">
			<h1 className="text-3xl">Sign up Page</h1>
			<button
				onClick={() => handleClick("discord")}
				className="p-4 bg-[#5865F2] rounded-md flex gap-2 items-center"
			>
				<Image
					src="/discord-svgrepo-com.svg"
					width={50}
					height={50}
					alt="Logo discord"
				/>
				Sign up with discord
			</button>
			<button
				onClick={() => handleClick("google")}
				className="p-4 bg-white text-black rounded-md flex gap-2 items-center"
			>
				<Image
					src="/google-svgrepo-com.svg"
					width={50}
					height={50}
					alt="Logo discord"
				/>
				Sign up with Google
			</button>
		</main>
	);
}
