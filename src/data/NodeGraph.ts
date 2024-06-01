
import { FlowEdge, FlowNode, FlowNodeConnectionsLength } from "../types/nodes";

class NodeGraph {
  nodes: Map<string, FlowNode>;
  edges: Map<string, FlowEdge>;
  // source node to target node
  adjacencyList: Map<string, Set<string>>;

  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
    this.adjacencyList = new Map();
  }

  addNode(node: FlowNode) {
    if (this.nodes.has(node.id)) {
      throw new Error(`Unexpected Error: node with id: ${node.id} already exists.`);
    }
    this.nodes.set(node.id, node);
    this.adjacencyList.set(node.id, new Set());
  }

  updateNodes(changes: { id: string, updates: Partial<FlowNode> }[]) {
    changes.forEach(change => {
      const node = this.nodes.get(change.id);
      if (node) {
        Object.assign(node, change.updates);
      } else {
        throw new Error(`Unexpected Error: node with id: ${change.id} doesn't exist.`);
      }
    });
  }

  addEdge(edge: FlowEdge) {
    if (this.edges.has(edge.id)) {
        throw new Error(`Unexpected Error: edge with id: ${edge.id} already exists.`);
    }
    
    if (!this.nodes.has(edge.source) || !this.nodes.has(edge.target)) {
        throw new Error(`Unexpected Error: source or target doesn't exist.`);
    }
    
    const targetNode = this.nodes.get(edge.target) as FlowNode;
    if (targetNode.allowedIncomingConnections === FlowNodeConnectionsLength.ONE) {
        const incomingEdges = this.getIncomingEdges(edge.target);
        if (incomingEdges.length >= 1) {
            throw new Error(`${targetNode.data.panelNodeLabel} can only have one input!`);
        }
    }
    
    this.edges.set(edge.id, edge);
    
    const sourceAdjacencyList = this.adjacencyList.get(edge.source);
    if (!sourceAdjacencyList) {
        throw new Error(`Unexpected Error: adjacency list for source node ${edge.source} doesn't exist.`);
    }
    sourceAdjacencyList.add(edge.target);
  }

  getNodes() {
    return Array.from(this.nodes.values());
  }

  getNode(nodeId: string) {
    if(!this.nodes.has(nodeId)) {
      throw new Error(`Unexpected Error: node with id: ${nodeId} doesn't exist.`)
    }
    return this.nodes.get(nodeId) as FlowNode
  }

  getEdges() {
    return Array.from(this.edges.values());
  }

  removeNode(nodeId: string) {
    if (!this.nodes.has(nodeId)) {
      throw new Error(`Unexpected Error: Node with id: ${nodeId} doesn't exist.`);
    }

    this.nodes.delete(nodeId);
    this.adjacencyList.delete(nodeId);

    this.edges.forEach((edge, edgeId) => {
      if (edge.source === nodeId || edge.target === nodeId) {
        this.edges.delete(edgeId);
      }
    });

    this.adjacencyList.forEach((targets, source) => {
      if (targets.has(nodeId)) {
        targets.delete(nodeId);
      }
    });
  }

  removeEdge(edgeId: string) {
    if (!this.edges.has(edgeId)) {
      throw new Error(`Unexpected Error: edge with id: ${edgeId} doesn't exist.`);
    }
  
    const edge = this.edges.get(edgeId) as FlowEdge;
    const sourceAdjacencyList = this.adjacencyList.get(edge.source);
  
    if (sourceAdjacencyList) {
      sourceAdjacencyList.delete(edge.target);
    } else {
      throw new Error(`Unexpected Error: adjacency list for source node ${edge.source} doesn't exist.`);
    }
  
    this.edges.delete(edgeId);
  }

  getIncomingEdges(nodeId: string) {
    const incomingEdges: FlowEdge[] = [];
    this.edges.forEach((edge, edgeId) => {
      if (edge.target === nodeId) {
        incomingEdges.push(edge);
      }
    });
    return incomingEdges;
  }

  getNodesWithNoIncomingEdges() {
    const nodesWithNoIncomingEdges: FlowNode[] = [];
    this.nodes.forEach((node) => {
      const incomingEdges = this.getIncomingEdges(node.id);
      if (incomingEdges.length === 0) {
        nodesWithNoIncomingEdges.push(node);
      }
    });
    return nodesWithNoIncomingEdges;
  }

  getNumberOfNodes() {
    return this.nodes.size;
  }
}

export default NodeGraph;
