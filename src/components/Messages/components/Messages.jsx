import React, { Fragment, useState, useEffect } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../theme';
import { messageType } from '../actions';

const useStyles = makeStyles({
  snackbarError: {
    backgroundColor: theme.palette.error.main,
  },
  snackbarSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  snackbarWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  snackbarInfo: {
    backgroundColor: theme.palette.info.main,
  },
});

function Messages() {
  const messageQueue = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    if (messageQueue.length > 0) {
      setMessageInfo(messageQueue[0]);
      setOpen(true);
    }
  }, [messageQueue]);

  function handleClose(event, reason, id) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function onExited(id) {
    dispatch(clearMessage(id));
  }

  function setSnackbarType(type) {
    switch (type) {
      case messageType.ERROR:
        return classes.snackbarError;
      case messageType.SUCCESS:
        return classes.snackbarSuccess;
      case messageType.INFO:
        return classes.snackbarInfo;
      case messageType.WARNING:
        return classes.snackbarWarning;
      default:
        return classes.snackbarError;
    }
  }

  return (
    <Fragment>
      {messageQueue.length && messageInfo ? (
        <Snackbar
          key={messageInfo.id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          onClose={() => handleClose(messageInfo.id)}
          onExited={() => onExited(messageInfo.id)}
        >
          <SnackbarContent
            message={messageInfo.message}
            className={setSnackbarType(messageInfo.messageType)}
            action={
              <Fragment>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  onClick={() => handleClose(messageInfo.id)}
                >
                  <CloseIcon />
                </IconButton>
              </Fragment>
            }
          />
        </Snackbar>
      ) : null}
    </Fragment>
  );
}

export default Messages;
