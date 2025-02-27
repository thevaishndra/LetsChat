import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 border-b border-base-300 flex items-center justify-between bg-white w-full sm:w-[600px] z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedUser(null)}
          className=" text-base sm:text-lg"
        >
          <ArrowLeft />
        </button>

        {/* Profile Pic */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>

        {/* User info */}
        <div>
          <h3 className="font-medium text-sm sm:text-base">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>

      </div>
    </div>
  );
};
export default ChatHeader;
