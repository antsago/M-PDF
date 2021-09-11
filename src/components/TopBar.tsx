import React from "react"
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core"
import { FormattedMessage } from "react-intl"
import { usePdfManager } from "../pdfManager"

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
}))

const TopBar = () => {
  const classes = useStyles()
  const { downloadDestination, triggerUpload } = usePdfManager() 

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          M-PDF
        </Typography>
        <Button onClick={triggerUpload}>Upload</Button>
        <Button onClick={downloadDestination}>
          <FormattedMessage
            id="myMessage"
            defaultMessage="Download"
          />
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
