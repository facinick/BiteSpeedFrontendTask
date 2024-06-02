import { ArrowLeft, MessageSquareText, Trash2 } from "lucide-react";
import { FC } from "react";
import { IconName } from "./types/icons";
import { FlowNodeConnectionsLength, FlowNodeCustomType, PartialFlowNode } from "./types/nodes";

const ICONS: Record<IconName, FC> = {
  [IconName.TextMessage]: MessageSquareText,
  [IconName.SettingsPanelBackButton]: ArrowLeft,
  [IconName.NodeDelete]: Trash2,
};

const NODES_LIST: Array<PartialFlowNode> = [
  {
    key: "send_message",
    type: FlowNodeCustomType.MESSAGE,
    data: {
      playgroundNodeLabel: 'Send Message',
      playgroundNodeLogoIconName: IconName.TextMessage,
      playgroundNodeMessage: 'New Message',
      panelNodeLabel: 'Message',
      panelNodeLogoIconName: IconName.TextMessage,
    },
    allowedIncomingConnections: FlowNodeConnectionsLength.ONE,
    allowedOutgoingConnections: FlowNodeConnectionsLength.MANY,
  },
]

export {
  ICONS, NODES_LIST
};

