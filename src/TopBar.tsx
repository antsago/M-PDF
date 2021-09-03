import React from "react"
import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
}))

const TopBar = ({ onDownload }: { onDownload: () => void }) => {
  const classes = useStyles()

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          M-PDF
        </Typography>
        <Button onClick={onDownload}>Download</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
