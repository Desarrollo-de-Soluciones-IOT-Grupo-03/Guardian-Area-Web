import { GeofenceState } from "../enums/geofence-state";

export interface Geofence {
  id: string;
  name: string;
  state: GeofenceState;
}
