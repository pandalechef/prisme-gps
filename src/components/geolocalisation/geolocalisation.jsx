import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddLocation from "@material-ui/icons/AddLocation";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CasTest from "../cas-test";
import Reseau from "../reseau";
import Carte from "../carte";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    padding: 15
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class Geolocalisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      casDeTest: this.props.casDeTest[0],
      reseau: this.props.reseau[0],
      latitude: undefined,
      longitude: undefined,
      accuracy: undefined,
      err: undefined,
      positionReelle: [],
      distance2points: undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.majCasDeTest = this.majCasDeTest.bind(this);
    this.majReseau = this.majReseau.bind(this);
    this.onMajPosReelle = this.onMajPosReelle.bind(this);
    this.convertRad = this.convertRad.bind(this);
    this.distance = this.distance.bind(this);
  }

  handleClick() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.setState({
      latitude: undefined,
      longitude: undefined,
      accuracy: undefined,
      err: undefined,
      positionReelle: [],
      distance2points: undefined
    });
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  success(pos) {
    const crd = pos.coords;
    this.setState({
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: Math.round(crd.accuracy)
    });
    this.props.ajoutReleve(
      this.state.reseau,
      this.state.casDeTest,
      crd.latitude,
      crd.longitude,
      crd.accuracy
    );
  }

  error(err) {
    this.setState({
      latitude: "erreur",
      longitude: "erreur",
      accuracy: err.code
    });
    this.props.ajoutReleve(this.state.casDeTest, "erreur", "erreur", "erreur");
  }

  majCasDeTest(casDeTest) {
    this.setState({ casDeTest });
  }

  majReseau(reseau) {
    this.setState({ reseau });
  }

  onMajPosReelle(lat, lng) {
    this.setState({
      positionReelle: [lat, lng],
      distance2points: this.distance(
        lat,
        lng,
        this.state.latitude,
        this.state.longitude
      )
    });
    this.props.majErreurMesureDernierReleve(this.state.distance2points);
  }

  convertRad(input) {
    return (Math.PI * input) / 180;
  }
  distance(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre) {
    const R = 6378000; //Rayon de la terre en mètre

    const lat_a = this.convertRad(lat_a_degre);
    const lon_a = this.convertRad(lon_a_degre);
    const lat_b = this.convertRad(lat_b_degre);
    const lon_b = this.convertRad(lon_b_degre);

    return Math.round(
      R *
        (Math.PI / 2 -
          Math.asin(
            Math.sin(lat_b) * Math.sin(lat_a) +
              Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)
          ))
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Reseau reseau={this.props.reseau} majReseau={this.majReseau} />
        <CasTest
          casDeTest={this.props.casDeTest}
          majCasDeTest={this.majCasDeTest}
        />
        <Grid item xs={12} className={classes.paper}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={this.handleClick}
            className={classes.button}
          >
            Geolocalisation
            <AddLocation className={classes.rightIcon} />
          </Button>
        </Grid>
        {this.state.latitude &&
          this.state.longitude &&
          this.state.accuracy && (
            <div className={classes.container}>
              <TextField
                label="Latitude"
                value={this.state.latitude}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                label="Longitude"
                value={this.state.longitude}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                label="Précision"
                value={this.state.accuracy}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              {this.state.distance2points && (
                <TextField
                  label="Erreur distance"
                  value={this.state.distance2points}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                />
              )}
            </div>
          )}
        {typeof this.state.latitude === "number" &&
          typeof this.state.longitude === "number" && (
            <Carte
              lat={this.state.latitude}
              lng={this.state.longitude}
              accuracy={this.state.accuracy}
              onMajPosReelle={this.onMajPosReelle}
            />
          )}
      </div>
    );
  }
}

Geolocalisation.propTypes = {
  classes: PropTypes.object.isRequired,
  ajoutReleve: PropTypes.func.isRequired
};

export default withStyles(styles)(Geolocalisation);
