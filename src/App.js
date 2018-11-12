import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Card, CardTitle } from "reactstrap";
import Autocomplete from "react-autocomplete";
import "./App.css";

const myIcon = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA15nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [22, 44],
  popupAnchor: [-3, -36],
  shadowSize: [68, 45],
  shadowAnchor: [22, 44]
});

let cur_lat = 0;
let cur_lng = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 0,
        lng: 0
      },
      cur: true,
      title: "",
      haveUsersLocation: false,
      zoom: 3,
      value: "",
      arr: [{ display_name: "", lat: 0, lon: 0 }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("get location from navigator");
        cur_lat = position.coords.latitude;
        cur_lng = position.coords.longitude;
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 15
        });
      },
      () => {
        console.log("get location from ip address");
        fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(location => {
            cur_lat = location.latitude;
            cur_lng = location.longitude;
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 15
            });
          });
      }
    );
  }
  handleClick(value) {
    var data = this.state.arr.filter(e => e.display_name === value);
    console.log(data);
    this.setState({
      cur: false,
      title: data[0].display_name,
      location: {
        lat: data[0].lat,
        lng: data[0].lon
      },
      haveUsersLocation: true,
      zoom: 15
    });
    console.log("handleClick:" + data);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.setState({
      arr: []
    });
    var geo;
    var arr = [];
    let url =
      "https://nominatim.openstreetmap.org/search?format=json&q=" +
      event.target.value;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          geo = result;
        },
        error => {
          console.log("error");
        }
      );
    setTimeout(() => {
      for (var i = 0; i < geo.length; i++) {
        arr.push({
          display_name: geo[i].display_name,
          lat: geo[i].lat,
          lon: geo[i].lon
        });
      }
      this.setState({
        arr: arr
      });
    }, 2000);
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.haveUsersLocation ? (
            <Marker icon={myIcon} position={position}>
              <Popup>
                {this.state.cur ? (
                  <h5>ตำแหน่งปัจจุบัน</h5>
                ) : (
                  <a
                    href={`https://www.google.com/maps/dir/${cur_lat},${cur_lng}/${
                      this.state.title
                    }`}
                    ref={el => {
                      if (el) {
                        this.anchorElement = el;
                      }
                    }}
                  >
                    <b>{this.state.title}</b>
                  </a>
                )}
              </Popup>
            </Marker>
          ) : (
            ""
          )}
        </Map>
        <Card body className="message-form">
          <CardTitle>ค้นหาสถานที่</CardTitle>
          <Autocomplete
            className="search"
            getItemValue={item => item.display_name}
            items={this.state.arr}
            renderItem={(item, isHighlighted) => (
              <div
                style={{ background: isHighlighted ? "lightgray" : "white" }}
              >
                {item.display_name}
              </div>
            )}
            value={this.state.value}
            onChange={this.handleChange}
            onSelect={value => this.handleClick(value)}
          />
        </Card>
      </div>
    );
  }
}

export default App;
