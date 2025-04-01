import { CenturionType, Command, CommandContext, Register } from "@rbxts/centurion";
import { getPlayerCoin, setPlayerCoin } from "shared/store/coin";

@Register()
class TakeCommand {
	@Command({
		name: "take",
		description: "Take coins away from someone",
		arguments: [
			{
				name: "player",
				type: CenturionType.Player,
				description: "The player to take coins from",
			},
			{
				name: "coins",
				type: CenturionType.Number,
				description: "The amount of coins to take away",
			},
		],
	})
	give(ctx: CommandContext, player: Player, amount: number) {
		if (amount !== math.floor(amount)) {
			ctx.error("You can only take whole numbers of coins.");
			return;
		}

		const currentCoins = getPlayerCoin(player.Name);
		if (currentCoins === 0 || currentCoins === undefined) {
			ctx.error(`Player ${player.Name} has no coins to take.`);
			return;
		}
		const newCoins = math.clamp((currentCoins ?? 0) - amount, 0, math.huge);

		setPlayerCoin(player.Name, newCoins);
		ctx.reply(`Took ${amount} coins from ${player.Name}. They now have ${newCoins} coins.`);
	}
}
