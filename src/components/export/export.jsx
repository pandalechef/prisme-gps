import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CSVLink } from "react-csv";
import GetApp from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Export extends Component {
  render() {
    const { classes } = this.props;
    if (this.props.releves.length === 0) {
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Aucune donnée
          </Typography>
          <Typography component="p">Il y a rien à exporter!</Typography>
        </Paper>
      );
    }
    const headers = [
      { label: "Réseau", key: "reseau" },
      { label: "Cas de test", key: "casDeTest" },
      { label: "Date", key: "date" },
      { label: "Latitude", key: "latitude" },
      { label: "Longitude", key: "longitude" },
      { label: "Précision", key: "accuracy" },
      { label: "Erreur de Mesure", key: "erreurMesure" }
    ];
    return (
      <React.Fragment>
        <CSVLink
          data={this.props.releves}
          headers={headers}
          filename="export.csv"
        >
          <Button size="large" variant="contained" color="primary">
            Export en CSV
            <GetApp />
          </Button>
        </CSVLink>
        <br />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Réseau</TableCell>
                <TableCell>Cas de test</TableCell>
                <TableCell> Date </TableCell>
                <TableCell numeric>Latitude</TableCell>
                <TableCell numeric>Longitude</TableCell>
                <TableCell numeric>Précision (en m)</TableCell>
                <TableCell numeric>Erreur de mesure (en m)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.releves.map((row, id) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{row.reseau}</TableCell>
                    <TableCell>{row.casDeTest}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell numeric>{row.latitude}</TableCell>
                    <TableCell numeric>{row.longitude}</TableCell>
                    <TableCell numeric>{row.accuracy}</TableCell>
                    <TableCell numeric>{row.erreurMesure}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

Export.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Export);
