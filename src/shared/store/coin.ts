import { atom } from "@rbxts/charm";

export interface CoinData {
	readonly coin: number;
}

type PlayerCoinMap = {
	readonly [K in string]?: CoinData;
};

export const coinStore = {
	players: atom<PlayerCoinMap>({}),
};

export function getPlayerCoin(id: string) {
	return coinStore.players()[id]?.coin;
}

export function setPlayerCoin(id: string, amount: number) {
	coinStore.players((state) => ({
		...state,
		[id]: { coin: amount },
	}));
}

export function removePlayer(id: string) {
	coinStore.players((state) => ({
		...state,
		[id]: undefined,
	}));
}
