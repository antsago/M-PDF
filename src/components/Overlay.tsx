import React from "react"
import { makeStyles, alpha, Typography } from "@material-ui/core"
import { useIntl } from "react-intl"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
  },
  accept: {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.5),
  },
  reject: {
    backgroundColor: alpha(theme.palette.error.light, 0.75),
  },
  message: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
}))

const Overlay = ({ isReject, isActive }) => {
  const classes = useStyles()
  const intl = useIntl()

  if (!isActive) {
    return null
  }

  return (
    <div className={clsx({ [classes.base]: true, [classes.accept]: !isReject, [classes.reject]: isReject })}>
      <Typography component="p" variant="h5" className={classes.message}>
        {isReject
          ? intl.formatMessage({ defaultMessage: "Non-pdf files will be ignored" })
          : intl.formatMessage({ defaultMessage: "Drop pdf files here to upload them as sources" })
        }
      </Typography>
    </div>
  )
}

export default Overlay
