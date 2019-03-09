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

class FilterSection extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { loadProducts } = this.props;
    const { categories } = this.state;

    if (!this.isEqual(prevState.categories, categories)) {
      loadProducts({ categories })
    }
  }

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

  render() {
    const { classes } = this.props;

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
});

export default withStyles(styles)(FilterSection);