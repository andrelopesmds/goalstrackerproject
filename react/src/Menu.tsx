import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Home, Help, BarChart, Person } from '@material-ui/icons';
import Section from './Enums/Section';

interface MenuProps {
  onClick: Function,
};

interface MenuStates {
  value: Number,
}

class Menu extends React.Component<MenuProps, MenuStates> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  render() {
    return <BottomNavigation
      value={this.state.value}
      onChange={(event: any, newValue: Section) => {
        this.setState({value: newValue });

        this.props.onClick(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Statistics" icon={<BarChart />} />
      <BottomNavigationAction label="Help" icon={<Help />} />
      <BottomNavigationAction label="Author" icon={<Person />} />
    </BottomNavigation>
  }
}

export default Menu;