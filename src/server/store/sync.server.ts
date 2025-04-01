import { server, SyncPayload } from "@rbxts/charm-sync";
import { atoms, GlobalAtoms } from "shared/store/sync/index";
import { remotes } from "shared/remotes";

const syncer = server({ atoms });

function filterPayload(player: Player, payload: SyncPayload<GlobalAtoms>) {
	if (payload.type === "init") {
		return {
			...payload,
			data: {
				...payload.data,
				"coinStore/players": {
					[player.Name]: payload.data["coinStore/players"][player.Name],
				},
			},
		};
	}

	return {
		...payload,
		data: {
			...payload.data,
			"coinStore/players": payload.data["coinStore/players"] && {
				[player.Name]: payload.data["coinStore/players"][player.Name],
			},
		},
	};
}

syncer.connect((player, payload) => {
	remotes.store.sync(player, filterPayload(player, payload));
});

remotes.store.init.connect((player) => {
	syncer.hydrate(player);
});
