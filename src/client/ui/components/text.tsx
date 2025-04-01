import React from "@rbxts/react";

export interface TextProps {
	text: string | React.Binding<string>;
	position?: UDim2;
	size?: UDim2;

	textColor?: Color3;
	textSize?: number;
	strokeColor?: Color3;
	strokeThickness?: number;
	anchorPoint?: Vector2;
	font?: Enum.Font;
}

export function Text({
	text,
	position,
	size,
	textColor,
	textSize,
	strokeColor,
	strokeThickness,
	anchorPoint,
	font = Enum.Font.FredokaOne,
}: TextProps) {
	return (
		<textlabel
			Size={size}
			Position={position}
			Text={text}
			TextColor3={textColor}
			TextSize={textSize}
			AnchorPoint={anchorPoint}
			Font={font}
			BackgroundTransparency={1}
		>
			{strokeColor || strokeThickness ? (
				<uistroke
					ApplyStrokeMode={Enum.ApplyStrokeMode.Contextual}
					Color={strokeColor}
					Thickness={strokeThickness}
				/>
			) : undefined}
		</textlabel>
	);
}
