import React from "@rbxts/react";
import { RootProvider } from "../providers/root-provider";
import { ScreenContainer } from "../components/screen-container";
import { Counter } from "../components/counter";
import assets from "shared/assets";
import { useCoin } from "../hooks/use-coin";

export function App() {
	const coin = useCoin();
	return (
		<RootProvider>
			<ScreenContainer>
				<Counter icon={assets.coin} count={coin} color={Color3.fromHex("#FDBC0D")} />
			</ScreenContainer>
		</RootProvider>
	);
}
