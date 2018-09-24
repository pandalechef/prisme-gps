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
  state =
    JSON.parse(localStorage.getItem("prisme-gps")) === null
      ? {
          value: 0,
          releves: [],
          casDeTest: ["dehors", "bar"],
          casDeTestChoisi: "dehors",
          reseau: ["SIM voix+data", "SIM data", "pas de SIM"],
          reseauChoisi: "SIM voix+data"
        }
      : JSON.parse(localStorage.getItem("prisme-gps"));

  handleChange = (event, value) => {
    this.setState({ value });
  };

  ajoutReleve = (reseau, casDeTest, latitude, longitude, accuracy) => {
    const date = new Date().toLocaleString();
    const releves = [
      ...this.state.releves,
      { reseau, casDeTest, latitude, longitude, accuracy, date }
    ];
    this.setState({ releves });
    this.majLocalStorage("releves", releves);
  };

  majErreurMesureDernierReleve = erreurMesure => {
    var releves = [...this.state.releves];
    releves[releves.length - 1].erreurMesure = erreurMesure;
    this.setState({ releves });
  };

  majCasDeTestChoisi = casDeTestChoisi => {
    this.setState({ casDeTestChoisi });
    this.majLocalStorage("casDeTestChoisi", casDeTestChoisi);
  };
  majReseauChoisi = reseauChoisi => {
    this.setState({ reseauChoisi });
    this.majLocalStorage("reseauChoisi", reseauChoisi);
  };

  ajouterCasDeTest = nouveauCas => {
    const casDeTest = [...this.state.casDeTest, nouveauCas];
    this.setState({ casDeTest });
    this.majLocalStorage("casDeTest", casDeTest);
  };
  ajouterReseau = nouveauReseau => {
    const reseau = [...this.state.reseau, nouveauReseau];
    this.setState({ reseau });
    this.majLocalStorage("reseau", reseau);
  };

  majLocalStorage = (libelle, valeur) => {
    const stateLocalStorage = JSON.parse(localStorage.getItem("prisme-gps"));
    if (stateLocalStorage === null) {
      const stateAAjouter = {
        value: 0,
        releves: [],
        casDeTest: ["dehors", "bar"],
        casDeTestChoisi: "dehors",
        reseau: ["SIM voix+data", "SIM data", "pas de SIM"],
        reseauChoisi: "SIM voix+data"
      };
      stateAAjouter[libelle] = valeur;
      console.log(stateAAjouter);

      localStorage.setItem("prisme-gps", JSON.stringify(stateAAjouter));
    } else {
      stateLocalStorage[libelle] = valeur;
      localStorage.setItem("prisme-gps", JSON.stringify(stateLocalStorage));
    }
  };

  deleteReleves = () => {
    const stateLocalStorage = JSON.parse(localStorage.getItem("prisme-gps"));
    if (stateLocalStorage !== null) {
      stateLocalStorage["releves"] = [];
      localStorage.setItem("prisme-gps", JSON.stringify(stateLocalStorage));
    }
    this.setState({ releves: [] });
  };

  deleteAll = () => {
    localStorage.removeItem("prisme-gps");
    this.setState({
      value: 2,
      releves: [],
      casDeTest: ["dehors", "bar"],
      casDeTestChoisi: "dehors",
      reseau: ["SIM voix+data", "SIM data", "pas de SIM"],
      reseauChoisi: "SIM voix+data"
    });
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
            <Export
              releves={this.state.releves}
              deleteReleves={this.deleteReleves}
            />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <Parametres
              ajouterCasDeTest={this.ajouterCasDeTest}
              ajouterReseau={this.ajouterReseau}
              deleteAll={this.deleteAll}
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
