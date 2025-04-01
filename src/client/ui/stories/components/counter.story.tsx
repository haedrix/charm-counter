import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { Choose, RGBA } from "@rbxts/ui-labs";
import { InferProps } from "@rbxts/ui-labs/src/Typing/Typing";
import { Counter } from "client/ui/components/counter";
import { RootProvider } from "client/ui/providers/root-provider";
import assets from "shared/assets";

const controls = {
	count: 0,
	color: RGBA(Color3.fromHex("#FDBC0D")),
	icon: Choose([assets["coin"]]),
};

const story = {
	react: React,
	reactRoblox: ReactRoblox,
	controls: controls,
	story: (props: InferProps<typeof controls>) => {
		return (
			<RootProvider>
				<Counter icon={props.controls.icon} count={props.controls.count} color={props.controls.color.Color} />
			</RootProvider>
		);
	},
};

export = story;
