
import Vue from 'vue'
import Toolbar from '~/components/global/Toolbar'

const components = {
  //Global
  Toolbar,

}


Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
