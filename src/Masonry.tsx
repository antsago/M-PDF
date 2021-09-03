import React, { PropsWithChildren } from "react"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
