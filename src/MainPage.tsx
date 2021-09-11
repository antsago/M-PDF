import React from "react"
import { useIntl } from "react-intl"
import { makeStyles, Typography } from "@material-ui/core"
import { Destination, SourcePDF, DragAndDrop } from "./components"
import { usePdfManager } from "./pdfManager"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplate: "100% / 25% 75%",
    flexGrow: 1,
  },
  section: {
    padding: theme.spacing(2),
    "&:not(:last-child)": {
      borderRight: `${theme.spacing(0.5)}px ${theme.palette.secondary.main} solid`,
    }
  },
  sectionTitle: {
    paddingBottom: theme.spacing(1),
  }
}))

const MainPage = () => {
  const classes = useStyles()
  const intl = useIntl()
  const { insertPage, sources, addSource, dropRef } = usePdfManager()

  return (
    <DragAndDrop onLoad={addSource} className={classes.root} ref={dropRef}>
      <div className={classes.section}>
        <Typography color="secondary" component="h2" variant="h6" className={classes.sectionTitle}>
          {intl.formatMessage({ defaultMessage: "Sources" })}
        </Typography>
        {sources?.map((source) => (
          <SourcePDF file={source} key={source.id} onInsert={insertPage} />
        ))}
      </div>
      <div className={classes.section}>
        <Typography color="secondary"  component="h2" variant="h6" className={classes.sectionTitle}>
          {intl.formatMessage({ defaultMessage: "Destination" })}
        </Typography>
        <Destination />
      </div>
    </DragAndDrop>
  )
}

export default MainPage
