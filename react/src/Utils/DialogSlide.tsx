import React, { useState } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CheckboxesTags from './CheckboxesTags';
import { AvailableTeam } from './globalInterfaces';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

interface DialogSlideProps {
  onClick: Function,
  text: string,
  buttonProperties: ButtonProps,
  availableTeams: AvailableTeam[]
}

export default function DialogSlide(props: DialogSlideProps) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const updateList = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(x => x !== id));
    }
  }

  const handleConfirm = () => {
    setOpen(false);
    props.onClick(selectedIds);
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const title = 'Select which team(s) you would like to track!'

  return (
    <div>
      <Button variant={props.buttonProperties.variant} color={props.buttonProperties.color} onClick={handleClickOpen}>
        {props.text}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <CheckboxesTags availableTeams={props.availableTeams} updateList={updateList}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
