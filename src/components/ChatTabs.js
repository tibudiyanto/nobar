import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import dynamic from "next/dynamic";
import { videos } from "../../constants";
import { Container } from "./Container";

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
            config 
          } = videos[name];
          return <Tab>{config?.youtube?.channel || config.twitch.channel}</Tab>;
        })}
      </TabList>

      <TabPanels h="95%" w="100%">
        {Object.keys(videos).map((name) => {
          if (name === "eno") {
            return (
              <TabPanel h={"100%"} w="100%">
              <iframe
                height="100%"
                src="https://www.youtube.com/live_chat?v=o7A3PbOWkVI&embed_domain=pemburuhantu.tibudiyanto.repl.co"
                width="100%"
              ></iframe>
              </TabPanel>
            );
          } else {
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
          }
        })}
      </TabPanels>
    </Tabs>
  );
};

export { ChatTabs };
