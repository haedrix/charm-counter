import React from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import "./react-config";
import { Players } from "@rbxts/services";
import { App } from "./app";

const root = createRoot(new Instance("Folder"));
const target = Players.LocalPlayer.WaitForChild("PlayerGui");

root.render(createPortal(<App />, target));
