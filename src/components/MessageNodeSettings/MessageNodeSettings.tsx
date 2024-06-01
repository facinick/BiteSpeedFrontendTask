import { FlowNode } from '../../types/nodes'
import styles from './MessageNodeSettings.module.css'

interface Props {
  selectedNode: FlowNode
  message: string
  onMessageChange: (message: string) => void
}

const MessageNodeSettings = ({selectedNode, message, onMessageChange}: Props): JSX.Element => {

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(event.target.value)
  }

  return (
    <>
      <h5 className={styles['node-type']}>Text</h5>
      <textarea onChange={handleChange} rows={5} value={message} className={styles['node-message-edit-area']}></textarea>
    </>
  )
}

export {
  MessageNodeSettings
}
