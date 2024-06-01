import { FlowNodeConnectionsLength, FlowNodeCustomType, PartialFlowNode } from "./types/nodes"

const NODES_LIST: Array<PartialFlowNode> = [
  {
    key: "send_message",
    type: FlowNodeCustomType.MESSAGE,
    data: {
      playgroundNodeLabel: 'Send Message',
      playgroundNodeLogoSVGId: 'text-message-icon',
      playgroundNodeMessage: 'New Message',
      panelNodeLabel: 'Message',
      panelNodeLogoSVGId: 'text-message-icon',
    },
    allowedIncomingConnections: FlowNodeConnectionsLength.ONE,
    allowedOutgoingConnections: FlowNodeConnectionsLength.MANY,
  },
]

export {
  NODES_LIST
}
