import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import dynamic from "next/dynamic";
import { videos } from "../../constants";

const TwitchChat = dynamic(
  () => {
    return import("react-twitch-embed").then((mod) => mod.TwitchChat);
  },
  { ssr: false }
);

const ChatTabs = () => {
  return (
    <Tabs h="100%" w="100%">
      <TabList h="5%">
        {Object.keys(videos).map((name) => {
          const {
            config: {
              twitch: { channel },
            },
          } = videos[name];
          return <Tab>{channel}</Tab>;
        })}
      </TabList>

      <TabPanels h="95%" w="100%">
        {Object.keys(videos).map((name) => {
          const {
            config: {
              twitch: { channel },
            },
          } = videos[name];
          return (
            <TabPanel h={"100%"} w="100%">
              <TwitchChat
                theme="dark"
                height="100%"
                width={"100%"}
                channel={channel}
              ></TwitchChat>
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export { ChatTabs };
