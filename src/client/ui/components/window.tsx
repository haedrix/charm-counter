import React from "@rbxts/react";

export interface WindowProps extends React.PropsWithChildren {
	size: UDim2;
	position: UDim2;
	anchorPoint?: Vector2;
	backgroundColor?: Color3 | ColorSequence;
	backgroundTransparency?: number;

	strokeColor?: Color3;
	strokeThickness?: number;

	cornerRadius?: number;
	rotation?: number | React.Binding<number>;

	onClick?: () => void;
	mouseEnter?: () => void;
	mouseLeave?: () => void;
}

export function Window({
	size,
	position,
	anchorPoint,
	backgroundColor,
	backgroundTransparency,
	strokeColor,
	strokeThickness,
	cornerRadius,
	rotation,
	onClick,
	mouseEnter,
	mouseLeave,
	children,
}: WindowProps) {
	const childrenProps = (
		<>
			{strokeColor || strokeThickness ? (
				<uistroke
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					Color={strokeColor}
					Thickness={strokeThickness}
				/>
			) : undefined}
			{cornerRadius ? <uicorner CornerRadius={new UDim(0, cornerRadius)} /> : undefined}
			{typeIs(backgroundColor, "ColorSequence") ? (
				<uigradient Color={backgroundColor} Rotation={rotation} />
			) : undefined}
		</>
	);

	return onClick ? (
		<frame
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			BackgroundColor3={typeIs(backgroundColor, "Color3") ? backgroundColor : Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={backgroundTransparency}
			Event={{
				MouseEnter: mouseEnter,
				MouseLeave: mouseLeave,
			}}
			BorderSizePixel={0}
		>
			{children}
			{childrenProps}
		</frame>
	) : (
		<textbutton
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			BackgroundColor3={typeIs(backgroundColor, "Color3") ? backgroundColor : undefined}
			BackgroundTransparency={backgroundTransparency}
			Text=""
			AutoButtonColor={false}
			BorderSizePixel={0}
			Event={{
				MouseEnter: mouseEnter,
				MouseLeave: mouseLeave,
				Activated: onClick,
			}}
		>
			{children}
			{childrenProps}
		</textbutton>
	);
}
