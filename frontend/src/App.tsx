import "./App.css";
import Chatbox from "@/components/Chatbox.tsx";

function App() {
	return (
		<div className="h-full relative bg-gradient-to-r from-rose-100 to-teal-100">
			<main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-12 gap-4">
				<div className="flex justify-between max-w-4xl w-full items-center">
					<p className="text-4xl font-bold text-gradient text-center w-full">
						Support Smart
					</p>
				</div>

				<div className="z-10 border-2 border-black rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
					<Chatbox />
				</div>
			</main>
		</div>
	);
}

export default App;
