import { Button } from '../UI/Button/Button'
import styles from './SaveButton.module.css'

interface Props {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SaveButton = ({children, onClick}: Props): JSX.Element => {
  return (
    <Button title="Save Changes" onClick={onClick} className={styles['save-button']}>{children}</Button>
  )
}

export {
  SaveButton
}
