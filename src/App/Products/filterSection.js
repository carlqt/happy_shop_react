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
  onFilterSelect = (e) => {
    const { checked, value } = e.target

    if (checked) {
      this.addCategory(value)
    } else {
      this.removeCategory(value)
    }
  }

  onSliderChange = (value) => {
    const { setFilters, queryParams } = this.props;

    setFilters({
      ...queryParams,
      priceRange: value,
      page: 1,
    })
  }

  addCategory = (val) => {
    const { setFilters, queryParams } = this.props;
    const { categories } = queryParams;

    setFilters({
      ...queryParams,
      categories: categories.concat(val),
      page: 1,
    })
  }

  removeCategory = (val) => {
    const { setFilters, queryParams } = this.props;
    const { categories } = queryParams;

    setFilters({
      ...queryParams,
      categories: categories.filter(item => item !== val),
      page: 1,
    })
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderCategoryOptions = (category) => {
    const { queryParams: { categories } } = this.props;
    const checked = categories.includes(category);

    return (
      <FormControlLabel
        key={category}
        control={
          <Checkbox 
            checked={checked}
            onChange={this.onFilterSelect}
            value={category}
            color="primary"
          />
        }
        label={this.capitalize(category)}
      />
    )
  }

  render() {
    const { 
      classes,
      queryParams: { priceRange },
    } = this.props;

    const categoryOptions = ["makeup", "organic", "men", "women", "accessories", "natural"]

    return (
      <Grid className={classes.drawer} item xs={12}>
        <FormControl>
          <FormLabel>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
          </FormLabel>
          <FormGroup>
            { categoryOptions.map(this.renderCategoryOptions) }
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
                onChange={this.onSliderChange}
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
