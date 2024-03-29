import * as React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import Ingredient from './ingredient'
import Footer from './footer'

function TabPanel(props) {
  const { children, value, index, recipeObject } = props
  const tabLabels = ['original', 'optimized', 'vegetarian', 'vegan']

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ flex: 1, p: 3, flexGrow: 1 }}
    >
      {value === index && (
        <>
          <Ingredient recipeType={tabLabels[index]} recipeObject={recipeObject}></Ingredient>
        </>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function FullWidthTabs({ recipeObject }) {
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', flex: 1, flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#8BC34A' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#228B22', // Custom color for the tab indicator
            },
          }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Original" {...a11yProps(0)} />
          <Tab label="Low Emission" {...a11yProps(1)} />
          <Tab label="Vegetarian" {...a11yProps(2)} />
          <Tab label="Vegan" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          recipeObject={recipeObject}
          value={value}
          index={0}
          dir={theme.direction}
        ></TabPanel>
        <TabPanel
          recipeObject={recipeObject}
          value={value}
          index={1}
          dir={theme.direction}
        ></TabPanel>
        <TabPanel
          recipeObject={recipeObject}
          value={value}
          index={2}
          dir={theme.direction}
        ></TabPanel>
        <TabPanel
          recipeObject={recipeObject}
          value={value}
          index={3}
          dir={theme.direction}
        ></TabPanel>
      </SwipeableViews>
      <div style={{ height: 20 }}></div>
      <Footer></Footer>
    </Box>
  )
}
