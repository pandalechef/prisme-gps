import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  select: {
    width: '99px'
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class CasTest extends Component {
  state = {
    castest: 0
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.majCasDeTest(this.props.casDeTest[event.target.value]);
  };
  render() {
    const classes = this.props;
    return (
      <FormControl className={classes.formControl}>
        Cas de test
        <br />
        <Select
          className={classes.select}
          value={this.state.castest}
          onChange={this.handleChangeSelect}
          inputProps={{
            name: 'castest',
            id: 'castest'
          }}
        >
          {this.props.casDeTest.map((cas, index) => (
            <MenuItem key={index} value={index}>{cas}</MenuItem>
          ))}

        </Select>
        <br />
      </FormControl>
    );
  }
}

export default withStyles(styles)(CasTest);
