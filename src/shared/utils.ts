export function formatNumber(num: number) {
	const units = [
		"",
		"K",
		"M",
		"B",
		"T",
		"Qa",
		"Qi",
		"Sx",
		"Sp",
		"Oc",
		"No",
		"Dc",
		"Ud",
		"Dd",
		"Td",
		"Qad",
		"Qid",
		"Sxd",
		"Spd",
		"Ocd",
		"Nod",
		"Vg",
		"Uvg",
		"Dvg",
		"Tvg",
		"Qavg",
		"Qivg",
		"Sxvg",
		"Spvg",
		"Ocvg",
		"Novg",
		"C",
	];
	let unitIndex = 0;

	while (num >= 1000 && unitIndex < units.size() - 1) {
		num /= 1000;
		unitIndex++;
	}

	return `${math.round(num * 10) / 10}`.gsub("%.0$", "")[0] + units[unitIndex].lower();
}
