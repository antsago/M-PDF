import React, { PropsWithChildren } from "react"
import { makeStyles } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",
    alignContent: "flex-start",
    paddingLeft: theme.spacing(3),
  },
}))

type Props = PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

const Masonry = ({ children, className, ...other }: Props) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)} {...other}>
      {children}
    </div>
  )
}

export default Masonry
