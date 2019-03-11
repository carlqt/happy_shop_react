import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { getProduct } from 'Requests'
import { Typography } from '@material-ui/core';
import 'typeface-roboto';

class ProductInfo extends Component {
  constructor() {
    super()

    this.state = {
      product: null,
    }
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const product = await getProduct(id);

    this.setState({
      product: product.data
    })
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
    // console.log(this.props);
  }

  render() {
    const { classes } = this.props;
    const { product } = this.state;

    if (product === null) { return null }

    const {
      name,
      description,
      price,
      categories,
    } = product;

    const displayCategories = categories.join(", ")

    return (
      <Grid className={classes.container} container>
        <Grid className={classes.imageContainer} item xs={4}>
          <img alt="item" className={classes.img} src="https://cdn.images.express.co.uk/img/dynamic/12/590x/secondary/146504.jpg" />
        </Grid>
        <Grid className={classes.infoContainer} item xs={8}>
          <Typography variant="h4">
            { name } 
          </Typography>

          <Typography className={classes.body} variant="body1">
            { description } 
          </Typography>

          <Typography className={classes.body} variant="body1">
            Categories: <span className={classes.categories}>{ displayCategories }</span>
          </Typography>

          <Typography className={classes.body} variant="body1">
            Price: <span className={classes.price}>{ `${price.currency}${price.amount}` }</span>
          </Typography>

          <div className={classes.body} >
            <Button
              className={classes.actionButtons}
              variant="outlined"
              onClick={this.goBack}
             >
              Back
            </Button>
            <Button className={classes.actionButtons} variant="outlined">Add to cart</Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}

const styles = theme => ({
  container: {
    height: 500,
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  imageContainer: {
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  infoContainer: {
    paddingTop: 50,
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  body: {
    marginTop: 14,
  },
  categories: {
    fontWeight: 600,
  },
  price: {
    color: 'red',
    fontWeight: 600,
  },
  actionButtons: {
    marginRight: 4,
  },
});

export default withStyles(styles)(ProductInfo)