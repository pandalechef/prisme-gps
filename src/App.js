import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Geolocalisation from "./components/geolocalisation";
import Export from "./components/export";
import Parametres from "./components/parametres";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    releves: [],
    casDeTest: ["dehors", "bar"],
    casDeTestChoisi: "dehors",
    reseau: ["SIM voix+data", "SIM data", "pas de SIM"],
    reseauChoisi: "SIM voix+data"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  ajoutReleve = (reseau, casDeTest, latitude, longitude, accuracy) => {
    const date = new Date().toLocaleString();
    this.setState({
      releves: [
        ...this.state.releves,
        { reseau, casDeTest, latitude, longitude, accuracy, date }
      ]
    });
  };

  majErreurMesureDernierReleve = erreurMesure => {
    var releves = [...this.state.releves];
    releves[releves.length - 1].erreurMesure = erreurMesure;
    this.setState({ releves });
  };

  majCasDeTestChoisi = casDeTestChoisi => {
    this.setState({ casDeTestChoisi });
  };
  majReseauChoisi = reseauChoisi => {
    this.setState({ reseauChoisi });
  };

  ajouterCasDeTest = nouveauCas => {
    this.setState({ casDeTest: [...this.state.casDeTest, nouveauCas] });
  };
  ajouterReseau = nouveauReseau => {
    this.setState({ reseau: [...this.state.reseau, nouveauReseau] });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Géolocalisation" />
            <Tab label="Export" />
            <Tab label="Paramètres" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <Geolocalisation
              casDeTest={this.state.casDeTest}
              casDeTestChoisi={this.state.casDeTestChoisi}
              reseau={this.state.reseau}
              reseauChoisi={this.state.reseauChoisi}
              ajoutReleve={this.ajoutReleve}
              majCasDeTestChoisi={this.majCasDeTestChoisi}
              majReseauChoisi={this.majReseauChoisi}
              majErreurMesureDernierReleve={this.majErreurMesureDernierReleve}
            />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <Export releves={this.state.releves} />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <Parametres
              ajouterCasDeTest={this.ajouterCasDeTest}
              ajouterReseau={this.ajouterReseau}
            />
          </TabContainer>
        )}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
