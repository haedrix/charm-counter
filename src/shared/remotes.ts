import { SyncPayload } from "@rbxts/charm-sync";
import { Client, createRemotes, namespace, remote, Server } from "@rbxts/remo";
import { GlobalAtoms } from "./store/sync";

export const remotes = createRemotes({
	store: namespace({
		sync: remote<Client, [payload: SyncPayload<GlobalAtoms>]>(),
		init: remote<Server>(),
		tap: remote<Server>(),
	}),
});
