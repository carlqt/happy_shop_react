import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import styles from './styles.module.css';

const NotFound = () => (
	<div className={styles.container}>
		<div className={styles.notfound}>
			<div className={styles.notfound404}>
				<h1>Oops!</h1>
				<h2>404 - The Page can't be found</h2>
			</div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        component={Link}
        to="/"
      >
        Go TO Homepage
      </Button>
		</div>
	</div>
)

export default NotFound;

