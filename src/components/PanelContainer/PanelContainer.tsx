import styles from './PanelContainer.module.css'

interface Props {
  children?: React.ReactNode
}

const PanelContainer = ({children}: Props): JSX.Element => {
  return (<aside className={styles['panel-container']}>{children}</aside>)
}

export {
  PanelContainer
}
