import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class Parametres extends Component {
  state = {
    nouveauCasTest: ''
  };

  handleChangeNouveauCasTest = event => {
    this.setState({ nouveauCasTest: event.target.value });
  };

  handleClick = () => {
    this.props.ajouterCasDeTest(this.state.nouveauCasTest);
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <fieldset>
          <legend>Ajouter un cas de test</legend>
          <TextField
            id="standard-name"
            label="Nouveau cas"
            className={classes.textField}
            value={this.state.nouveauCasTest}
            onChange={this.handleChangeNouveauCasTest}
            margin="normal"
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            ajouter
            <Add />
          </Button>
        </fieldset>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Parametres);
