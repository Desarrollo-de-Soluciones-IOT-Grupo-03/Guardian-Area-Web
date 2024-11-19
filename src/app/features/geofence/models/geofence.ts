import { GeofenceStatus } from "../enums/geofence-state";
import { Coordinates } from "./coordinate";

export interface Geofence {
  id: string;
  name: string;
  geoFenceStatus: GeofenceStatus;
  coordinates: Coordinates[];
  guardianAreaDeviceRecordId: string;
}
