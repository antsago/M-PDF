import React, { MouseEventHandler, ReactElement } from "react"
import { IconButton, Tooltip } from "@material-ui/core"

type Props = { action: MouseEventHandler<HTMLButtonElement>, title: string, children: ReactElement<any, any> }

const PageActionButton = ({ action, title, children }: Props) => (
  <IconButton color="secondary" onClick={action} size="small">
    <Tooltip title={title}>
      {children}
    </Tooltip>
  </IconButton>
)

export default PageActionButton
