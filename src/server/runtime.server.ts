import { Centurion } from "@rbxts/centurion";
import { initDataService } from "./services/data";

const server = Centurion.server();

function loadCommands() {
	const commandContainer = script.Parent?.FindFirstChild("commands") as Folder | undefined;
	if (!commandContainer) {
		warn("No command container found. Commands will not be loaded.");
		return;
	}
	server.registry.load(commandContainer);
}

loadCommands();
server.start();
initDataService();
