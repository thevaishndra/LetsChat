import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
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

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-base sm:text-lg"
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
