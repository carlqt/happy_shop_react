import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';


class ProductList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.container} container spacing={0}>
        <Grid className={classes.drawerContainer} item xs={3}>
          <Grid className={classes.drawer} item xs={12}>
            <FormControl>
              <FormLabel>
                <Typography variant="h6" gutterBottom>
                  Categories
                </Typography>
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox value="makeup" color="primary" />}
                  label="Makeup"
                />
                <FormControlLabel
                  control={<Checkbox value="organic" color="primary" />}
                  label="Organic"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid className={classes.drawer} item xs={9}>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  container: {
    height: '100vh',
  },
  drawer: {
    padding: 24,
  },
  item: {
  }
});

export default withStyles(styles)(ProductList);