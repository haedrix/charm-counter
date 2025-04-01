import { RunService } from "@rbxts/services";

if (RunService.IsStudio()) {
	_G.__DEV__ = true;
	_G.__REACT_MICROPROFILER_LEVEL = 10;
}
