
import Vue from 'vue'
import Toolbar from '~/components/global/Toolbar'
import ToolbarLanding from '~/components/global/ToolbarLanding'
import { Icon } from '@iconify/vue2';

const components = {
  //Global
  Toolbar,
  ToolbarLanding,

  //Plugins
  Icon
}


Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
