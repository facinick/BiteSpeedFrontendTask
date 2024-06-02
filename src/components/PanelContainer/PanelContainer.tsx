import styles from './PanelContainer.module.css'

interface Props {
  children?: React.ReactNode
}

const PanelContainer = ({children}: Props): JSX.Element => {
  return (<div className={styles['panel-container']}>{children}</div>)
}

export {
  PanelContainer
}
