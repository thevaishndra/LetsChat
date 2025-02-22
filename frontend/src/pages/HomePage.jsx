import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6 pt-24">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl h-[calc(100vh-10rem)] flex flex-col md:flex-row overflow-hidden relative">
        {/* Sidebar - Full width on small screens, 1/3 width on larger screens */}
        <div className="w-full md:w-1/3 bg-base-100 rounded-t-2xl md:rounded-l-2xl p-4 border-b md:border-b-0 md:border-r border-base-300">
          <Sidebar />
        </div>

        {/* Chat Area - Full width on small screens, 2/3 width on larger screens */}
        <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-6">
          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            <div className="w-full h-full flex flex-col bg-base-100 p-4 rounded-b-2xl md:rounded-r-2xl">
              <ChatContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
