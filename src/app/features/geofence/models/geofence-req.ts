import { Coordinates } from "./coordinate";

export interface GeofenceReq {
  name: string;
  geoFenceStatus: string;
  coordinates:Coordinates[];
  guardianAreaDeviceRecordId: string;
}
