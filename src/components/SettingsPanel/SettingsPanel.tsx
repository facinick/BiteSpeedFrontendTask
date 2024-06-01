import { FlowNodeCustomType, type FlowNode } from '../../types/nodes'
import { getIconForId } from '../../utils'
import { MessageNodeSettings } from '../MessageNodeSettings/MessageNodeSettings'
import styles from './SettingsPanel.module.css'

interface Props {
  children?: React.ReactNode
  selectedNode: FlowNode
  onTextNodeSettingsChange: (message: string) => void
  onGoBack: () => void
}

const SettingsPanel = ({ selectedNode, onTextNodeSettingsChange, onGoBack }: Props): JSX.Element => {

  const Icon = getIconForId('settings-panel-back-button')

  return (
    <div className={styles['settings-panel']}>
      <div className={styles.header}>
        <button title="Go Back" onClick={onGoBack} className={styles['back-button']}>
        { Icon && <Icon /> }
        </button>
        <div className={styles['title']}>{selectedNode.data.panelNodeLabel}</div>
      </div>
      <div className={styles['header-bottom-border']} />
      <div className={styles.content}>
        {selectedNode.type === FlowNodeCustomType.MESSAGE &&
          <MessageNodeSettings
            selectedNode={selectedNode}
            message={selectedNode.data.playgroundNodeMessage}
            onMessageChange={(message) => onTextNodeSettingsChange(message)}
          />
        }
      </div>
    </div>
  )
}

export {
  SettingsPanel
}
