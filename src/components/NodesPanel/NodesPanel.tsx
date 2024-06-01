
import { NODES_LIST } from '../../constants'
import { PanelNode } from '../PanelNode/PanelNode'
import styles from './NodesPanel.module.css'

const NodesPanel = (): JSX.Element => {
  return (
    <div className={styles['nodes-panel']}>
      {NODES_LIST.map((panelNode, index, array) => {
          return (
            <PanelNode
              key={panelNode.key}
              panelNode={panelNode}
            />
          )
        })}
    </div>
  )
}

export {
  NodesPanel
}

