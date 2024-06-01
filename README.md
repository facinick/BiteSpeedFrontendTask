# Project Structure

## NodeGraph Data

The nodes and edges data resides in `src/data/NodeGraph.ts`, representing a Graph data structure. This design choice allows us to maintain control over the domain logic independently of the UI library. If we decide to swap ReactFlow for another library in the future, we can do so easily without significant changes.

For example, the `NodeGraph.ts` file includes logic for managing connections, such as allowing only one incoming connection but multiple outgoing connections for each node (in `addNode()` method). Each node specifies its own rules for incoming and outgoing connections. By embedding this logic directly into our graph data, we ensure that our domain rules are consistently enforced across the application.

## Custom UI Components

Similarly, I use custom UI components (src/components/UI) that can extend third-party libraries like Headless UI. This allows my code to depend on my own codebase. If I need to swap the UI library in the future, I only need to update the custom UI components, ensuring minimal impact on the rest of the application.

## Custom Types

I have used custom FlowNode and FlowEdge types everywhere (src/types/Nodes.ts), which essentially extends React FLow's Node and Edge type. This allows us to add additional properties and have more control over the nodes and edge data and allows easy swapping of third party library tomorrow as our code relies on our custom types.

## Drag and Drop Implementation

Drag and Drop is implemented using native APIs by setting node data using the `DataTransfer` property of the `DragStart` event when a user starts dragging a node from the panel. When dropped, the `DataTransfer` property is used to get the node to be added information and using `reactFlowInstance` to translate `clientX`, `clientY` to flow position and adding this node to our graph.

## Error Handling

Errors are thrown only at places where an unexpected situation occurs, indicating an error in code logic.

## Future Nodes Extension

file src/constants.ts can be modified to add more custom node types, they will be added to the nodes panel and ready to be dragged and dropped. Custom node components can be created and added to src/components/custom_nodes file. file src/types/nodes.ts has FlowNodeCustomType that also has to be updated with new node types for typescript support.

## Page Layout

The page layout is divided into:
- **Header**: Contains the save button.
- **Main**: Contains the React Flow component.
- **Aside**: Contains the Nodes and Settings Panels.

## Naming Conventions

Most functions, variables, and other elements are named in a way that explains their purpose and functionality.

## Node Types

- **Panel Node**: A node on the nodes panel, which holds information about what node to be added.
- **Playground Node / Custom Nodes (e.g., `SendMessageNode`)**: Nodes that exist in the React Flow component.

## UI Folder

The `UI` folder contains components purely for organization and semantics with no application logic in them.

## External Libraries

There was no real need for using any external library except ReactFlow. However, we used the following out of habit:
- `uuid` (for generating unique IDs)
- `class-variance-authority` (for creating variants of Flex component)
- `lucide-react` (for icons)
- `classnames` (for merging classnames)

## Resources

- [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [StackOverflow: DataTransfer Explanation](https://stackoverflow.com/a/21341021)
- [ReactFlow API Reference](https://reactflow.dev/api-reference)
- [Create React App](https://create-react-app.dev/docs/adding-typescript/)