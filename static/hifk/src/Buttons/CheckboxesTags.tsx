import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { AvailableTeam } from '../Utils/globalInterfaces';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CheckboxesTagsProps {
  availableTeams: AvailableTeam[],
  updateList: Function
}

export default function CheckboxesTags(props: CheckboxesTagsProps) {
  const exportChanges = (event: any, value: any) => {
    var selectedIds: number[] = [];
    value.forEach((v: { id: string; }) => {
      selectedIds.push(parseInt(v.id));
    });

    props.updateList(selectedIds);
  }

  return (
    <Autocomplete
      multiple
      options={props.availableTeams}
      disableCloseOnSelect
      getOptionLabel={option => option.name}
      onChange={exportChanges}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            value={option.id}
          />
          {option.name}
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" label="Available teams"/>
      )}
    />
  );
}
