import React, { PropsWithChildren } from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
    padding: theme.spacing(3),
  },
}))

type Props = PropsWithChildren<{}>

const Masonry = ({ children }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}

export default Masonry
