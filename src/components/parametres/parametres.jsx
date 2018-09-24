import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    nouveauCasTest: "",
    nouveauReseau: ""
  };

  handleChangeNouveauReseau = event => {
    this.setState({ nouveauReseau: event.target.value });
  };

  handleClickReseau = () => {
    this.props.ajouterReseau(this.state.nouveauReseau);
  };

  handleChangeNouveauCasTest = event => {
    this.setState({ nouveauCasTest: event.target.value });
  };

  handleClick = () => {
    this.props.ajouterCasDeTest(this.state.nouveauCasTest);
  };
  handleClickDelete = () => {
    this.props.deleteAll();
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <fieldset>
          <legend>Ajouter une condition de réseau</legend>
          <TextField
            label="Nouvelle condition"
            className={classes.textField}
            value={this.state.nouveauReseau}
            onChange={this.handleChangeNouveauReseau}
            margin="normal"
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={this.handleClickReseau}
          >
            ajouter
            <Add />
          </Button>
        </fieldset>
        <br />
        <fieldset>
          <legend>Ajouter un cas de test</legend>
          <TextField
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
        <br />
        <br />
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={this.handleClickDelete}
        >
          Effacer toutes les données!
          <Delete />
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Parametres);
