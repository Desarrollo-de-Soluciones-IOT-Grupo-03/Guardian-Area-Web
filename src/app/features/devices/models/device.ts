import { DeviceMode } from "../enums/device-mode";
import { DeviceState } from "../enums/device-state";

export interface Device {
  name: string;
  deviceCode: string;
  mode: DeviceMode;
  state: DeviceState;
}
