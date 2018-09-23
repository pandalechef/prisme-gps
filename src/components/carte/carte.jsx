import React, { Component } from 'react';
import { CircleMarker, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import logoPinPerson from './marker-pin-person.svg';
import L from 'leaflet';

export default class Carte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: []
    };
    this.addMarker = this.addMarker.bind(this);
  }

  iconPerson = new L.Icon({
    iconRetinaUrl: logoPinPerson,
    iconSize: new L.Point(40, 55),
    iconUrl: logoPinPerson
  });
  addMarker(e) {
    this.setState({ marker: [e.latlng.lat, e.latlng.lng] });
    this.props.onMajPosReelle(e.latlng.lat, e.latlng.lng);
  }
  render() {
    const position = [this.props.lat, this.props.lng];
    return (
      <Map center={position} zoom={17} onClick={this.addMarker}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={{ lat: this.props.lat, lng: this.props.lng }}
          icon={this.iconPerson}
        >
          <Popup>
            <span>Position trouvée par le GPS</span>
          </Popup>
        </Marker>
        {this.state.marker.length !== 0 &&
          <Marker
            position={{ lat: this.state.marker[0], lng: this.state.marker[1] }}
            icon={this.iconPerson}
          >
            <Popup>
              <span>Je pense que je suis là</span>
            </Popup>
          </Marker>}
        {/* {this.props.accuracy &&
          <CircleMarker
            center={L.latLng(this.props.lat, this.props.lng)}
            radius={this.props.accuracy}
            fill="true"
            color="red"
          >
            <Popup>
              <span>rayon de précision</span>
            </Popup>
          </CircleMarker>} */}
      </Map>
    );
  }
}
