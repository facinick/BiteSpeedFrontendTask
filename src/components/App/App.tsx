/*
  Check README.md for the same notes as these.

  The nodes and edges data resides in src/data/NodeGraph.ts, which represents a Graph data structure.
  This design choice allows us to maintain control over the domain logic independently of the UI library.
  If we decide to swap ReactFlow for another library in the future, we can do so easily without significant changes.

  Any operation to the ReactFlow like adding a node, removing node, chaning content etc, will require to use NodeGraph to make those
  operations happen, get latest set of nodes / edges and update state in the app.

  For example, the NodeGraph.ts file includes logic for managing connections, such as allowing only one incoming 
  connection but multiple outgoing connections for each node (in addNode() method). Each node specifies its own rules for incoming and 
  outgoing connections. By embedding this logic directly into our graph data, we ensure that our domain rules are 
  consistently enforced across the application.

  Similarly, I use custom UI components (src/components/UI) that can extend third-party libraries like Headless UI. This allows my code 
  to depend on my own codebase. If I need to swap the UI library in the future, I only need to update the custom 
  UI components, ensuring minimal impact on the rest of the application.

  I have used custom FlowNode and FlowEdge types everywhere (src/types/Nodes.ts), which essentially extends React FLow's Node and Edge type.
  This allows us to add additional properties and have more control over the nodes and edge data and allows easy swapping
  of third party library tomorrow as our code relies on our custom types.

  file src/constants.ts can be modified to add more custom node types, they will be added to the nodes 
  panel and ready to be dragged and dropped. Custom node components can be created and added to 
  src/components/custom_nodes file. 
  file src/types/nodes.ts has FlowNodeCustomType that also has to be updated with new node types 
  for typescript support.

  Drag and Drop is implemented using native apis, by setting node data using DataTransfer property of DragStart event
  when user starts dragging a node from panel, and when dropped, using DataTransfer property to get the node to be added
  information and using reactFlowInstance to translate clientX, clientY to flow position and adding this node to our graph.

  I've thrown Errors only at places where I don't expect something to happen unless there is an error in code logic.

  Rest of the code is very simple, The page Layout is divided into Header (save button), Main (React Flow), Aside(Nodes and Settings Panels)

  Most of the things if not all, are named in a way to explain themselves. Functions, variables and such.

  A Panel node is a node on the nodes panel, which holds information about what node to be added.
  A Playground node / Custom nodes like SendMessageNode is a node that exists in the React Flow Component.

  UI Folder contains components purely for organisation and semantics with No App logic in them.

  There was NO real need of using any external library for this eexcept ReactFlow, I however used these of habit:
  uuid (for generating unique IDs), 
  class-variance-authority (for creating varients of Flex component),
  lucide-react (for icons)
  classnames (for merging classnames)

  Resources: 
  https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
  https://stackoverflow.com/a/21341021
  https://reactflow.dev/api-reference
  https://create-react-app.dev/docs/adding-typescript/
*/

import { useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, MarkerType, MiniMap, NodeChange, NodePositionChange, NodeSelectionChange, OnConnect, OnNodesChange, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeGraph from '../../data/NodeGraph';
import { FlowEdge, FlowNode } from '../../types/nodes';
import { generateID } from '../../utils';
import { SendMessageNode } from '../CustomNodes/SendMessageNode/SendMessageNode';
import { NodesPanel } from '../NodesPanel/NodesPanel';
import { PanelContainer } from '../PanelContainer/PanelContainer';
import { Playground } from '../Playground/Playground';
import { SaveButton } from '../SaveButton/SaveButton';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import { Aside } from '../UI/Aside/Aside';
import { Flex } from '../UI/Flex/Flex';
import { Header } from '../UI/Header/Header';
import { Main } from '../UI/Main/Main';
import styles from './App.module.css';

const nodeTypes = { MESSAGE: SendMessageNode };

const App = (): JSX.Element => {

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any> | null>(null);

  const nodeGraph = useMemo(() => new NodeGraph(), [])

  const [nodes, setNodes] = useState<Array<FlowNode>>([]);
  const [edges, setEdges] = useState<Array<FlowEdge>>([]);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {

    switch (changes[0].type) {
      case 'add': {
        return;
      }
      case 'dimensions': {
        return;
      }
      case 'position': {    
        updatePosition(changes as unknown as NodePositionChange[])
        return;
      }
      case 'remove': {
        return;
      }
      case 'reset': {
        return;
      }
      case 'select': {    
        updateSelection(changes as unknown as NodeSelectionChange[])
        return;
      }
    }
  };

  const onConnect: OnConnect = (change) => {
    const {source, target} = change

    try {
      nodeGraph.addEdge({
        id: generateID(),
        source: source as string,
        target: target as string,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 40,
          height: 40
        }
      })
      const nextEdges = nodeGraph.getEdges()
      setEdges(nextEdges)
    } catch(error) {
      if (error instanceof Error) {
        alert(`${error.message}`);
      } else {
        console.error("Caught an unexpected error:", error);
      }
    }

  };

  const onTextNodeSettingsChange = (message: string) => {
    if(!selectedNode) {
      throw new Error(`Unexpected Error: selectedNode should have been set by now.`)
    }

    const { id } = selectedNode 
    
    const nodeToUpdate = nodeGraph.nodes.get(id);
    
    if (nodeToUpdate) {
      nodeToUpdate.data.playgroundNodeMessage = message;
      nodeGraph.nodes.set(id, nodeToUpdate);
      setNodes(nodeGraph.getNodes());
    }
  }

  const deleteNode = (node: FlowNode) => {
    nodeGraph.removeNode(node.id);
    const nextNodes = nodeGraph.getNodes()
    const nextEdges = nodeGraph.getEdges()
    setNodes(nextNodes)
    setEdges(nextEdges)
  }

  const saveFlow = () => {
    const nNodes = nodeGraph.getNumberOfNodes()

    if(nNodes <= 1) {
      alert("Saved!");
      return;
    }

    const nNodesWithEmptyTargets = nodeGraph.getNodesWithNoIncomingEdges()

    if(nNodesWithEmptyTargets.length <= 1) {
      alert("Saved!");
      return;
    }

    alert("Cannot save flow");
  }

  const updateSelection = (changes: NodeSelectionChange[]) => {

    const updatedChanges = changes.map(({id, selected}) => ({
      id,
      updates: {
          selected,
      }
    }));
  
    nodeGraph.updateNodes(updatedChanges)
    const nextNodes = nodeGraph.getNodes()
    setNodes(nextNodes)

    // set current selected node:
    const selectedNode = changes.find(node => node.selected === true);
    if(selectedNode) {
      setSelectedNode(nodeGraph.getNode(selectedNode.id))
    } else {
      setSelectedNode(null)
    }
  }

  const goBackFromSettings = () => {
    if(selectedNode?.id) {
      updateSelection([{
        id: selectedNode?.id,
        selected: false,
        type: 'select'
      }])
    }
  }

  const updatePosition = (changes: NodePositionChange[]) => {

    const updatedChanges = changes.map(({id, position}) => ({
      id,
      updates: {
        // because upon position change, last event fired has draggable false and no position object
        ...(position && { position })
      }
    }));
  
    nodeGraph.updateNodes(updatedChanges)
    const nextNodes = nodeGraph.getNodes()
    setNodes(nextNodes)
  }

  /*
    Why cancelling onDragOver and onDragEnter events:
    https://stackoverflow.com/a/21341021
  */
  const handleOnDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  } 

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if(!reactFlowInstance) {
      throw new Error(`Unexpected Error: reactFlowInstance isn't initialised while dropping node.`)
    }

    const newNode = JSON.parse(event.dataTransfer.getData('panelNode')) as FlowNode

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    newNode.position = position

    nodeGraph.addNode(newNode);
    const nextNodes = nodeGraph.getNodes()
    setNodes(nextNodes)
  }

  return (
    <div className={styles.app}>
      <Header>
        <SaveButton onClick={saveFlow}>Save Changes</SaveButton>
      </Header>
      <Flex justify={"center"} align={"start"} direction={"row"} className={styles['main-aside']}>
        <Main>
          <Playground>
            <ReactFlow
              onDragOver={handleOnDragOver}
              onDragEnter={handleOnDragEnter}
              onDrop={handleOnDrop}
              nodes={nodes}
              edges={edges}              
              onNodesChange={onNodesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </Playground>
        </Main>
        <Aside>
          <PanelContainer>
            {!selectedNode && <NodesPanel />}
            {selectedNode && <SettingsPanel onGoBack={goBackFromSettings} onTextNodeSettingsChange={(message) => onTextNodeSettingsChange(message)} selectedNode={selectedNode} />}
          </PanelContainer>
        </Aside>
      </Flex>
    </div>
  );
}

export {
  App
};
