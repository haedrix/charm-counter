import { client } from "@rbxts/charm-sync";
import { atoms } from "shared/store/sync/index";
import { remotes } from "shared/remotes";

const syncer = client({ atoms });
remotes.store.sync.connect((payload) => {
	syncer.sync(payload);
});

remotes.store.init();
