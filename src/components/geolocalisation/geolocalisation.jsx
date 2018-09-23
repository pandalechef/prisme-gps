import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddLocation from '@material-ui/icons/AddLocation';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CasTest from '../cas-test';
import Reseau from '../reseau';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    padding: 15
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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
      err: undefined
    };
    this.handleClick = this.handleClick.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.majCasDeTest = this.majCasDeTest.bind(this);
    this.majReseau = this.majReseau.bind(this);
  }

  handleClick() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  success(pos) {
    const crd = pos.coords;
    this.setState({
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy
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
      latitude: 'erreur',
      longitude: 'erreur',
      accuracy: err.code
    });
    this.props.ajoutReleve(this.state.casDeTest, 'erreur', 'erreur', 'erreur');
  }

  majCasDeTest(casDeTest) {
    this.setState({ casDeTest });
  }

  majReseau(reseau) {
    this.setState({ reseau });
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
          this.state.accuracy &&
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
          </div>}

      </div>
    );
  }
}

Geolocalisation.propTypes = {
  classes: PropTypes.object.isRequired,
  ajoutReleve: PropTypes.func.isRequired
};

export default withStyles(styles)(Geolocalisation);
