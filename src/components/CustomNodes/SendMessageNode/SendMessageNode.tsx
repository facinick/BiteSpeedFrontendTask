import classNames from 'classnames';
import { Handle, NodeProps, Position } from 'reactflow';
import { IconName } from '../../../types/icons';
import { FlowNode } from '../../../types/nodes';
import { getIcon } from '../../../utils';
import { Button } from '../../UI/Button/Button';
import styles from './SendMessageNode.module.css';

interface SendMessageNodeProps extends NodeProps {
  onDelete: (nodeId: FlowNode['id']) => void;
}

const SendMessageNode = ({ data, selected, id, onDelete }: SendMessageNodeProps): JSX.Element => {

  const SendMessageIcon = getIcon(data.panelNodeLogoIconName)
  const DeleteNodeIcon = getIcon(IconName.NodeDelete)

  const handleDelete = () => {
    const deleteConfirmation: boolean = window.confirm(`Are you sure you want to delete ${data.panelNodeLabel} node?`);

    if (deleteConfirmation) {
      onDelete(id)
    }
  }

  return (
    <div className={classNames(styles['send-message-node'], selected ? styles['selected'] : '')}>
      <Handle className={styles['target-handle']} type={"target"} position={Position.Left} />
      <div className={styles['send-message-node-content']}>
        <p className={styles['send-message-label']}>
          {SendMessageIcon && <SendMessageIcon />}
          {data.playgroundNodeLabel}
          {selected && DeleteNodeIcon && 
          <Button title="delete node" onClick={handleDelete} className={styles['delete-node-button']}>
            <DeleteNodeIcon />
          </Button>}
        </p>
        <p className={styles['send-message-message']}>{data.playgroundNodeMessage}</p>
      </div>
      <Handle className={styles['source-handle']} type={"source"} position={Position.Right} />
    </div>
  );
}

export {
  SendMessageNode,
  type SendMessageNodeProps
};

