import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

class List extends Component {
  renderItem = (item) => {
    const { classes, onItemClick } = this.props;
    const { id, price } = item;

    return(
      <Card key={item.id} className={classes.card}>
        <CardActionArea onClick={() => onItemClick(id)}>
          <CardMedia
            component="img"
            height="140"
            src="https://cdn.images.express.co.uk/img/dynamic/12/590x/secondary/146504.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              { item.name }
            </Typography>
            <Typography component="p">
              { item.description }
            </Typography>
            <Typography variant="h5" color="secondary">
              { `${price.currency}${price.amount}` }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined">Add to cart</Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Grid className={classes.container} container>
        { data.map(this.renderItem) }
      </Grid>
    )
  }
}

const styles = theme => ({
  card: {
    maxWidth: 345,
    margin: 8,
  },
});

export default withStyles(styles)(List);
