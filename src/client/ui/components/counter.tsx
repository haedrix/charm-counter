import React, { useBinding, useEffect, useMemo, useState } from "@rbxts/react";
import { Container } from "./container";
import { useRem } from "../hooks/use-rem";
import { Window } from "./window";
import { Image } from "./image";
import { Text } from "./text";
import { formatNumber } from "shared/utils";
import { useMotion } from "../hooks/use-motion";
import { string } from "@rbxts/react/src/prop-types";

export interface CounterProps {
	count?: number;
	icon: string;
	color?: Color3;
}

export function Counter({ count, icon, color }: CounterProps) {
	const rem = useRem();
	const [countBinding, countMotion] = useMotion(count ?? 0, (value) => formatNumber(math.round(value)));

	useEffect(() => {
		countMotion.spring(count ?? 0);
	}, [count]);

	return (
		<Container
			size={UDim2.fromOffset(rem(230 / 16), rem(60 / 16))}
			position={new UDim2(0.5, 0, 0.925, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
		>
			<Window
				size={UDim2.fromOffset(rem(200 / 16), rem(40 / 16))}
				position={new UDim2(0, rem(20 / 16), 0.5, 0)}
				backgroundColor={Color3.fromHex("#000000")}
				backgroundTransparency={0.5}
				cornerRadius={rem(1.5)}
				strokeColor={Color3.fromHex("#000000")}
				strokeThickness={rem(0.125)}
			>
				<Image
					image={icon}
					size={UDim2.fromOffset(rem(60 / 16), rem(60 / 16))}
					position={UDim2.fromScale(0, 0.5)}
					anchorPoint={new Vector2(0.5, 0.5)}
				/>
				<Text
					text={countBinding}
					size={UDim2.fromScale(1, 1)}
					textSize={rem(32 / 16)}
					textColor={color || Color3.fromHex("#ffffff")}
					strokeThickness={rem(1 / 16)}
				/>
			</Window>
		</Container>
	);
}
