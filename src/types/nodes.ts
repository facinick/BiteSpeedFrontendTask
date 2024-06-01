import { MarkerType, type Edge, type Node } from 'reactflow';

/*
 Extend this to add more custom types to our application.
*/
enum FlowNodeCustomType {
  MESSAGE = "MESSAGE",
}

enum FlowNodeConnectionsLength {
  ONE,
  MANY,
}

/*
 I have used FlowNode type everywhere, which essentially extends React FLow's Node type.
 This allows us to add additional properties and have more control over the node data and allows easy swapping
 of third party library tomorrow as our code relies on our custom types.
*/
interface FlowNode extends Node {
  id: Node['id'];
  type: Node['type'] | FlowNodeCustomType;
  data: {
    playgroundNodeLabel: string,
    playgroundNodeLogoSVGId: string,
    playgroundNodeMessage: string,
    panelNodeLabel: string,
    panelNodeLogoSVGId: string,
  };
  allowedIncomingConnections: FlowNodeConnectionsLength
  allowedOutgoingConnections: FlowNodeConnectionsLength
  position: {
    x: number;
    y: number;
  };
  selected?: boolean
}

/*
 Similarly, I have used FlowEdge type everywhere, which essentially extends React FLow's Edge type.
 This allows us to add additional properties and have more control over the edge data and allows easy swapping
 of third party library tomorrow as our code relies on our custom types.
*/
type FlowEdge = Edge & {
  id: string;
  source: Node['id'];
  target: Node['id'];
  markerEnd: {
    type: MarkerType,
  },
}

type PartialFlowNode = Pick<FlowNode, 'type' | 'data' | 'allowedIncomingConnections' | 'allowedOutgoingConnections'> & {key: string}

export {
  FlowNodeConnectionsLength,
  FlowNodeCustomType
};

  export type {
    FlowEdge, FlowNode, PartialFlowNode
  };

