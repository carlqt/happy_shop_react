import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


class FilterSection extends Component {
  render() {
    const { 
      classes,
      onFilterSelect,
      queryParams: { priceRange },
      onSliderChange,
    } = this.props;

    return (
      <Grid className={classes.drawer} item xs={12}>
        <FormControl>
          <FormLabel>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={onFilterSelect} value="makeup" color="primary" />}
              label="Makeup"
            />
            <FormControlLabel
              control={<Checkbox onChange={onFilterSelect} value="organic" color="primary" />}
              label="Organic"
            />

            <FormLabel>
              <Typography variant="h6" gutterBottom>
                Price Range
              </Typography>
            </FormLabel>
            <Typography variant="subtitle2">
              <Range
                min={0}
                max={30000}
                className={classes.range}
                allowCross={false}
                value={priceRange}
                step={1}
                onChange={onSliderChange}
              />
              Price: { `$${priceRange[0] / 100} - $${priceRange[1] / 100}` }
            </Typography>
          </FormGroup>
        </FormControl>
      </Grid>
    )
  }
}

const styles = theme => ({
  drawer: {
    padding: 24,
  },
  range: {
    width: 300,
    height: 50,
  },
});

export default withStyles(styles)(FilterSection);