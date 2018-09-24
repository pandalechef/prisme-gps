import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {},

  select: {
    marginRight: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class CasTest extends Component {
  state = {
    reseau: this.props.reseau.indexOf(this.props.reseauChoisi)
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.majReseau(this.props.reseau[event.target.value]);
  };
  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
        Condition réseau
        <br />
        <Select
          className={classes.select}
          value={this.state.reseau}
          onChange={this.handleChangeSelect}
          inputProps={{
            name: "reseau",
            id: "reseau"
          }}
        >
          {this.props.reseau.map((reseau, index) => (
            <MenuItem key={index} value={index}>
              {reseau}
            </MenuItem>
          ))}
        </Select>
        <br />
      </FormControl>
    );
  }
}

CasTest.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(CasTest);
