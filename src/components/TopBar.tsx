import React from "react"
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core"
import { useIntl } from "react-intl"
import { usePdfManager } from "../pdfManager"

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
}))

const TopBar = () => {
  const classes = useStyles()
  const intl = useIntl()
  const { downloadDestination, triggerUpload } = usePdfManager() 

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          M-PDF
        </Typography>
        <Button onClick={triggerUpload}>
          {intl.formatMessage({ defaultMessage: "Upload" })}
        </Button>
        <Button onClick={downloadDestination}>
          {intl.formatMessage({ defaultMessage: "Download" })}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
