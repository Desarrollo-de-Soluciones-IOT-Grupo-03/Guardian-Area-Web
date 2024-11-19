import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '@devices/models';
import { Coordinates } from '@geofence/models';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _baseUrl: string = 'wss://guardianarea.azurewebsites.net/';

  getSensorsData(room: string): Observable<Sensor> {
    const url = `${this._baseUrl}health-measures-stream?room=${room}`;
    const socket = new WebSocket(url);

    return new Observable((observer) => {
      socket.onmessage = (event) => {
        try {
          const data: Sensor = JSON.parse(event.data);
          observer.next(data);
        } catch (e) {
          observer.error(e);
        }
      };

      socket.onerror = (error) => {
        observer.error(error);
      };

      socket.onclose = (event) => {
        observer.complete();
      };

      return () => {
        socket.close();
      };
    });
  }

  closeSocketLocation(room: string): void {
    const url = `${this._baseUrl}location-stream?room=${room}`;
    const socket = new WebSocket(url);
    socket.close();
  }

  getLocationData(room: string): Observable<Coordinates> {
    const url = `${this._baseUrl}location-stream?room=${room}`;
    const socket = new WebSocket(url);

    return new Observable((observer) => {
      socket.onmessage = (event) => {
        try {
          const data: Coordinates = JSON.parse(event.data);
          observer.next(data);
        } catch (e) {
          observer.error(e);
        }
      };

      socket.onerror = (error) => {
        observer.error(error);
      };

      socket.onclose = (event) => {
        observer.complete();
      };

      return () => {
        socket.close();
      };
    });
  }
}
