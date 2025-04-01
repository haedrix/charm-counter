import React from "@rbxts/react";

interface ScreenContainerProps extends React.PropsWithChildren {
	displayOrder?: number;
	zIndexBehavior?: Enum.ZIndexBehavior;
	enabled?: boolean;
}

export function ScreenContainer({ displayOrder, zIndexBehavior, enabled, children }: ScreenContainerProps) {
	return (
		<screengui DisplayOrder={displayOrder} ZIndexBehavior={zIndexBehavior} Enabled={enabled} IgnoreGuiInset={true}>
			{children}
		</screengui>
	);
}
