import React from "@rbxts/react";

interface ContainerProps extends React.PropsWithChildren {
	size: UDim2;
	position: UDim2 | React.Binding<UDim2>;
	anchorPoint?: Vector2;

	onClick?: () => void;
	mouseEnter?: () => void;
	mouseLeave?: () => void;
	mouseDown?: () => void;
	mouseUp?: () => void;
}

export function Container({
	size,
	position,
	anchorPoint,
	onClick,
	mouseEnter,
	mouseLeave,
	mouseDown,
	mouseUp,
	children,
}: ContainerProps) {
	return (
		<frame
			Size={size}
			Position={position}
			AnchorPoint={anchorPoint}
			BackgroundTransparency={1}
			Event={{ MouseEnter: mouseEnter, MouseLeave: mouseLeave }}
		>
			{children}
			<textbutton
				Size={UDim2.fromScale(1, 1)}
				BackgroundTransparency={1}
				Text={""}
				AutoButtonColor={false}
				Event={{ Activated: onClick, MouseButton1Down: mouseDown, MouseButton1Up: mouseUp }}
			/>
		</frame>
	);
}
