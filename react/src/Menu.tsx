import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, Help, BarChart, Feedback } from '@material-ui/icons';
import Section from './Enums/Section';

interface MenuProps {
  onClick: Function,
  section: Number,
};

const Menu = (props: MenuProps) => {
  return <BottomNavigation
    value={props.section}
    onChange={(_event: any, newValue: Section) => {
      props.onClick(newValue);
    }}
    showLabels
  >
    <BottomNavigationAction label="Home" icon={<Home />} />
    <BottomNavigationAction label="Statistics" icon={<BarChart />} />
    <BottomNavigationAction label="Help" icon={<Help />} />
    <BottomNavigationAction label="Feedback" icon={<Feedback />} />
  </BottomNavigation>
}

export default Menu;