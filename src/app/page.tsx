import type { Metadata, NextPage } from "next";
import Chat from "./component/chat";
const description = `an app that reminds you fo your memories`;

export const metadata: Metadata = {
  title: "Memory App",
  description,
};

const Home: NextPage = () => {
  return (
    <div className="app">
      <div className="app-header">
        <div className="profile-picture">🧠</div>
        <div className="info-container">
          <h1>The Memories</h1>
          <p>Ask me anything</p>
        </div>
      </div>
      <Chat />
    </div>
  );
};
export default Home;
