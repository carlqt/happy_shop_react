import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';
import PrevIcon from '@material-ui/icons/KeyboardArrowLeft';


class Pagination extends Component {
  pageUpdate = (page) => {
    const { setFilters, queryParams } = this.props;

    setFilters({
      ...queryParams,
      page,
    })
  }

  gotoFirstPage = () => {
    this.pageUpdate(1)
  }

  gotoLastPage = () => {
    const { meta } = this.props;
    const { total_pages: totalPages } = meta;

    this.pageUpdate(totalPages)
  }

  nextPage = () => {
    const { meta } = this.props;
    const {
      total_pages: totalPages,
      page,
    } = meta;

    if (page < totalPages) {
      this.pageUpdate(page + 1)
    }
  }

  previousPage = () => {
    const { meta } = this.props;
    const {
      page,
    } = meta;

    if (page > 1) {
      this.pageUpdate(page - 1)
    }
  }

  render() {
    return (
      <React.Fragment>
        <IconButton onClick={this.gotoFirstPage}><FirstPageIcon /></IconButton>
        <IconButton onClick={this.previousPage}><PrevIcon /></IconButton>
        <IconButton onClick={this.nextPage}><NextIcon /></IconButton>
        <IconButton onClick={this.gotoLastPage}><LastPageIcon /></IconButton>
      </React.Fragment>
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
});

export default withStyles(styles)(Pagination);
