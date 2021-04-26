import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { AvailableTeam } from './globalInterfaces';
import { groupBy } from 'lodash';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

interface CheckboxesTagsProps {
  availableTeams: AvailableTeam[],
  updateList: Function
}

export default function CheckboxesTags(props: CheckboxesTagsProps) {
  const updateList = (event: any) => {
    const id = event.target.value;
    const checked = event.target.checked;
    props.updateList(id, checked)
  }

  const groupedTeams = groupBy<AvailableTeam>(props.availableTeams, 'country');

  const createItem = (icon: any, team: AvailableTeam) => <div><label>
    <Checkbox onClick={updateList} value={team.id} icon={icon} style={{ marginRight: 8 }} />{team.name}</label></div>;

  const createGroup = (group: AvailableTeam[]) => <div><div>{group[0].country}</div> {group.map((team) => createItem(icon, team))}</div>;

  return (
    <React.Fragment>
      {
        Object.values(groupedTeams).map((group) => createGroup(group))
      }
    </React.Fragment>
  );
}
