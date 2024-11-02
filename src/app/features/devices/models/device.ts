import { DeviceCareMode } from "../enums/device-care-mode";
import { DeviceStatus } from "../enums/device-status";

export interface Device {
  guardianAreaDeviceRecordId: string;
  nickname: string;
  bearer: string;
  careMode: DeviceCareMode;
  status: DeviceStatus;
  userId: string;
  apiKey: string;
}
