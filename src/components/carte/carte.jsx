import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import logoPinPerson from './marker-pin-person.svg';
import L from 'leaflet';

export default class Carte extends Component {
  iconPerson = new L.Icon({
    iconRetinaUrl: logoPinPerson,
    iconSize: new L.Point(40, 55),
    iconUrl: logoPinPerson
  });
  render() {
    const position = [this.props.lat, this.props.lng];
    return (
      <Map center={position} zoom={17}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={{ lat: this.props.lat, lng: this.props.lng }}
          icon={this.iconPerson}
        >
          <Popup>
            <span>Je suis là</span>
          </Popup>
        </Marker>

      </Map>
    );
  }
}
