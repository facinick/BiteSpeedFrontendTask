import styles from './PanelNode.module.css';

interface Props {
  imgSrc: string;
  label: string;
  onClick: () => void;
}

const PlaygroundNode = ({imgSrc, label, onClick}: Props): JSX.Element => {
  return (
  <button className={styles['panel-node']}>
    <img src={"imgSrc"} alt={label}/>
    <span>{label}</span>
  </button>)
}

export {
  PlaygroundNode
};
