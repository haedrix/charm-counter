import { CenturionType, Command, CommandContext, Register } from "@rbxts/centurion";
import { getPlayerCoin, setPlayerCoin } from "shared/store/coin";

@Register()
class GiveCommand {
	@Command({
		name: "give",
		description: "Give someone coins",
		arguments: [
			{
				name: "player",
				type: CenturionType.Player,
				description: "The player to give coins to",
			},
			{
				name: "coins",
				type: CenturionType.Number,
				description: "The amount of coins to give yourself",
			},
		],
	})
	give(ctx: CommandContext, player: Player, amount: number) {
		if (amount !== math.floor(amount)) {
			ctx.error("You can only give whole numbers of coins.");
			return;
		}
		const currentCoins = getPlayerCoin(player.Name);
		const newCoins = (currentCoins ?? 0) + amount;

		setPlayerCoin(player.Name, newCoins);
		ctx.reply(`Gave ${player.Name} ${amount} coins. They now have ${newCoins} coins.`);
	}
}
