import {
  Box,
} from "@chakra-ui/core";

import { Container } from "../components/Container";
import ReactPlayer from "react-player";

import RGL, { WidthProvider } from "react-grid-layout";
import { ChatTabs } from "../components/ChatTabs";
import { videos } from "../../constants";

const ReactGridLayout = WidthProvider(RGL);

const ChatWrapper = ({ ...props }) => {
  return (
    <Container {...props}>
      <ChatTabs></ChatTabs>
    </Container>
  );
};


const Wrapper = React.forwardRef((props, ref) => {
  const {
    style: { width, height },
  } = props;

  const config = videos[props.i];

  return (
    <Container {...props} ref={ref}>
      {config ? (
        <ReactPlayer
          url={config.url}
          config={config.config}
          width={width}
          height={height}
        ></ReactPlayer>
      ) : null}
      {props.children}
    </Container>
  );
});

const Index = () => {
  const [layout, setLayout] = React.useState([
    {
      x: 0,
      y: 0,
      w: 16,
      h: 3,
      i: "kevin",
    },
    {
      x: 16,
      y: 0,
      w: 16,
      h: 3,
      i: "izzy",
    },
    {
      x: 0,
      y: 4,
      w: 16,
      h: 3,
      i: "ricky",
    },
    {
      x: 16,
      y: 3,
      w: 16,
      h: 3,
      i: "eno",
    },
  ]);

  const onLayoutChange = (layout) => {
    setLayout(layout);
  };

  const getElem = layout.map(({ i }) => {
    return <Wrapper key={i} i={i} />;
  });
  return (
    <Container direction="row" height="100%">
      <Box flexGrow={1}>
        <ReactGridLayout
          isDraggable={false}
          isResizable={false}
          cols={32}
          className="layout"
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          {getElem}
        </ReactGridLayout>
      </Box>
      <ChatWrapper flexBasis={"20%"} height="100vh" width="100%" />
    </Container>
  );
};

export default Index;
