import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const content = `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`

export default function DialogDemo() {
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper')
  const [enableActions, setEnableActions] = React.useState<boolean>(false)

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const dialogTitleRef = React.useRef<HTMLDivElement>(null)
  const dialogActionsRef = React.useRef<HTMLDivElement>(null)
  const descriptionElementRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleScrolling = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const isBottom = target.offsetHeight + target.scrollTop >= target.scrollHeight
    if (isBottom) {
      setEnableActions(true)
    }
  }

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title" ref={dialogTitleRef}>
          Subscribe
        </DialogTitle>
        <DialogContent id="scroll-dialog-content" dividers={scroll === 'paper'} onScroll={handleScrolling}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {[...new Array(50)].map(() => content).join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions ref={dialogActionsRef}>
          <Button onClick={handleClose} disabled={!enableActions}>
            Cancel
          </Button>
          <Button onClick={handleClose} disabled={!enableActions}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
