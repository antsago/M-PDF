import React from "react"
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core"
import { usePdfManager } from "../pdfManager"

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
}))

const TopBar = () => {
  const classes = useStyles()
  const { downloadDestination } = usePdfManager() 

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          M-PDF
        </Typography>
        <Button onClick={downloadDestination}>Download</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
