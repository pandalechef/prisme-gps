import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Delete from "@material-ui/icons/Delete";

class ConfirmerSuppression extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAction = () => {
    this.props.action();
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          {this.props.texte}
          <Delete />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`${this.props.texte} ?`}
          </DialogTitle>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleAction} color="primary" autoFocus>
              Je confirme
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmerSuppression;
