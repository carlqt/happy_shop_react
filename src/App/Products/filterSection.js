import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'throttle-debounce';
import produce from 'immer';
import isEqual from 'lodash.isequal';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


class FilterSection extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      priceRange: [0, 30000]
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { categories } = this.state;

    if (!isEqual(prevState, this.state)) {
      this.loadProducts(categories)
    }
  }

  loadProducts = debounce(300, (categories) => {
    const { loadProducts } = this.props;
    loadProducts(this.formatFilterParams(this.state));
  })

  isEqual = (prev, current) => {
    if (prev.length !== current.length) {
      return false;
    }

    return prev.every( e => current.includes(e))
  }

  onFilterSelect = (e) => {
    if (e.target.checked) {
      this.addCategory(e.target.value)
    } else {
      this.removeCategory(e.target.value)
    }
  }

  addCategory = (val) => {
    this.setState(
      produce(draft => {
        draft.categories.push(val)
      })
    )
  }

  removeCategory = (val) => {
    this.setState(
      produce(draft => {
        draft.categories = draft.categories.filter(item => item !== val)
      })
    )
  }

  onSliderChange = (value) => {
    this.setState(
      produce(draft => {
        draft.priceRange = value;
      })
    )
  }

  formatFilterParams = (params) => {
    const { priceRange, ...otherParams } = params;

    return {
      ...otherParams,
      price: `${priceRange[0]}..${priceRange[1]}`,
    }
  }

  onAfterChange = (val) => {
    const { loadProducts } = this.props;

    loadProducts(this.formatFilterParams(this.state));
  }

  render() {
    const { classes } = this.props;
    const { priceRange } = this.state;

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
              control={<Checkbox onChange={this.onFilterSelect} value="makeup" color="primary" />}
              label="Makeup"
            />
            <FormControlLabel
              control={<Checkbox onChange={this.onFilterSelect} value="organic" color="primary" />}
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