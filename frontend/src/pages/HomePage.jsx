import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6 pt-24">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl h-[calc(100vh-10rem)] flex overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-1/3 bg-base-100 rounded-l-2xl p-4 border-r border-base-300">
          <Sidebar />
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col items-center justify-center p-6">
          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            <div className="w-full h-full flex flex-col bg-base-100 p-4 rounded-r-2xl">
              <ChatContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
