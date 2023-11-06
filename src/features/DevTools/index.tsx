import Provider, { useDevToolsContext as useContext } from './Provider'
import Drawer from './Drawer'

export * from './Provider'

const DevToolsAPI = {
  Provider,
  Drawer,
  useContext
}

export default DevToolsAPI
