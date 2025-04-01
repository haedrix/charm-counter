import { useAtom } from "@rbxts/react-charm";
import { Players } from "@rbxts/services";
import { getPlayerCoin } from "shared/store/coin";

export function useCoin() {
	return useAtom(() => getPlayerCoin(Players.LocalPlayer.Name) ?? 0);
}
