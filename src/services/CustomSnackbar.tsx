import { Alert, Snackbar } from '@mui/material'
import React, { Component } from 'react'
import { RESPONSE_MESSAGE } from '../utils/constant';
import { SnackbarProps, SnackbarState } from '../utils/types';

export default class CustomSnackbar extends Component<SnackbarProps, SnackbarState> {

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.props.openSnackbar}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <Alert
            onClose={this.handleClose}
            severity='error'
            sx={{ width: '100%' }}
          >
            {RESPONSE_MESSAGE.ERROR}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}
