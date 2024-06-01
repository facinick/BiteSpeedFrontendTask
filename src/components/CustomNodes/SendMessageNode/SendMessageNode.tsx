import classNames from 'classnames';
import { Handle, NodeProps, Position } from 'reactflow';
import { getIconForId } from '../../../utils';
import styles from './SendMessageNode.module.css';

const SendMessageNode = ({ data, selected }: NodeProps): JSX.Element => {

  const Icon = getIconForId(data.panelNodeLogoSVGId)

  return (
    <div className={classNames(styles['send-message-node'], selected ? styles['selected'] : '') }>
      <Handle className={styles['target-handle']} type={"target"} position={Position.Left}/>
      <div className={styles['send-message-node-content']}>
        <p className={styles['send-message-label']}>
          {Icon && <Icon />}
          {data.playgroundNodeLabel}
        </p>
        <p className={styles['send-message-message']}>{data.playgroundNodeMessage}</p>
      </div>
      <Handle className={styles['source-handle']} type={"source"} position={Position.Right}/>
    </div>
  );
}

export {
  SendMessageNode
};

