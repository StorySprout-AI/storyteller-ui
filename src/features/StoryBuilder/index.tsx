import Provider, { StoryBuilderContext as Context, StoryBuilderContextType } from './Provider'
import Drawer, { StoryBuilderProps } from './SwipeableDrawer'
import Status, { StoryBuilderStatusProps } from './Status'
import { useContext } from 'react'

// export { default as Provider, StoryBuilderContext as Context } from './Provider'
export { default as Drawer } from './SwipeableDrawer'
export { default as Status } from './Status'

interface IStoryBuilderAPI {
  Provider: typeof Provider
  Context: React.Context<StoryBuilderContextType>
  Drawer: (props: StoryBuilderProps) => JSX.Element
  Status: (props: StoryBuilderStatusProps) => JSX.Element
  useContext: () => StoryBuilderContextType
}

const StoryBuilderAPI: IStoryBuilderAPI = {
  Provider,
  Context,
  Drawer,
  Status,
  useContext: () => useContext(Context)
}

export default StoryBuilderAPI
