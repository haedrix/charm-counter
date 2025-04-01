import { subscribe } from "@rbxts/charm";
import { New } from "@rbxts/profile-store";
import { Connection } from "@rbxts/profile-store/src/signal";
import { Players, RunService } from "@rbxts/services";
import { getPlayerCoin, removePlayer, setPlayerCoin } from "shared/store/coin";

export function initDataService() {
	const ProfileTemplate = {
		coins: 0,
	};

	if (RunService.IsStudio()) {
		print("Studio detectd, using studio data store.");
	}

	const PlayerDataStore = New(RunService.IsStudio() ? "PlayerData_STUDIO" : "PlayerData_PROD", ProfileTemplate);
	const Profiles: { [key: string]: ReturnType<typeof PlayerDataStore.StartSessionAsync> | undefined } = {};
	const Connections: { [key: string]: (() => void) | undefined } = {};
	const SessionEndConnections: { [key: string]: Connection | undefined } = {};

	function loadData(player: Player) {
		const profile = PlayerDataStore.StartSessionAsync(`${player.UserId}`, {
			Cancel: () => {
				return player.Parent !== Players;
			},
		});

		if (!profile) {
			player.Kick("Something went wrong. Reason: PROFILE_LOAD_FAILED");
			return;
		}

		profile.AddUserId(player.UserId);
		profile.Reconcile();

		SessionEndConnections[tostring(player.UserId)] = profile.OnSessionEnd.Connect(() => {
			Profiles[player.Name] = undefined;
			player.Kick("Something went wrong. Reason: PROFILE_SESSION_END");
		});

		if (player.Parent === Players) {
			Profiles[player.Name] = profile;
			setPlayerCoin(player.Name, profile.Data.coins);

			const getCoin = () => getPlayerCoin(player.Name) ?? 0;
			Connections[tostring(player.UserId)] = subscribe(getCoin, (coin) => {
				profile.Data.coins = coin;
			});
		} else {
			profile.EndSession();
		}
	}

	for (const player of Players.GetPlayers()) {
		task.spawn(loadData, player);
	}

	Players.PlayerAdded.Connect(loadData);
	Players.PlayerRemoving.Connect((player) => {
		const profile = Profiles[player.Name];
		if (profile) {
			profile.EndSession();

			const connection = Connections[tostring(player.UserId)];
			const sessionEndConnection = SessionEndConnections[tostring(player.UserId)];
			if (!connection || !sessionEndConnection) return;
			connection();
			Connections[tostring(player.UserId)] = undefined;
			sessionEndConnection.Disconnect();
			removePlayer(player.Name);
		}
	});
}
