import { DragEventHandler } from 'react';
import { FlowNode, PartialFlowNode } from '../../types/nodes';
import { generateID, getIcon } from '../../utils';
import styles from './PanelNode.module.css';

interface Props {
  panelNode: PartialFlowNode
}

const PanelNode = ({ panelNode }: Props): JSX.Element => {

  const { panelNodeLogoIconName, panelNodeLabel } = panelNode.data

  const handleDragStart: DragEventHandler<HTMLButtonElement> = (event) => {

    const newNode: FlowNode = {

      // unique IDs ensure react can use them as keys to efficiently re render upon changes in nodes / edges
      id: generateID(),
      type: panelNode.type,
      data: {
        playgroundNodeLabel: panelNode.data.playgroundNodeLabel,
        playgroundNodeLogoIconName: panelNode.data.playgroundNodeLogoIconName,
        playgroundNodeMessage: panelNode.data.playgroundNodeMessage,
        panelNodeLabel: panelNode.data.panelNodeLabel,
        panelNodeLogoIconName: panelNode.data.panelNodeLogoIconName
      },
      allowedIncomingConnections: panelNode.allowedIncomingConnections,
      allowedOutgoingConnections: panelNode.allowedOutgoingConnections,

      // following will be updated upon dropping of this node on the ReactFlow component.
      position: {
        x: 0,
        y: 0
      }
    }

    event.dataTransfer.setData('panelNode', JSON.stringify(newNode))
  }

  const PanelNodeLogoIcon = getIcon(panelNodeLogoIconName)

  return (
    <button title="Drag to viewport to add" onDragStart={handleDragStart} draggable className={styles['panel-node']}>
      <div className={styles['panel-node-icon']}>{PanelNodeLogoIcon && <PanelNodeLogoIcon />}</div>
      <span className={styles['panel-node-label']}>{panelNodeLabel}</span>
    </button>
  )
}

export {
  PanelNode
};
