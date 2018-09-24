import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class CasTest extends Component {
  state = {
    castest: this.props.casDeTest.indexOf(this.props.casDeTestChoisi)
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.majCasDeTest(this.props.casDeTest[event.target.value]);
  };
  render() {
    return (
      <FormControl>
        Cas de test
        <br />
        <Select
          value={this.state.castest}
          onChange={this.handleChangeSelect}
          inputProps={{
            name: "castest",
            id: "castest"
          }}
        >
          {this.props.casDeTest.map((cas, index) => (
            <MenuItem key={index} value={index}>
              {cas}
            </MenuItem>
          ))}
        </Select>
        <br />
      </FormControl>
    );
  }
}

export default CasTest;
