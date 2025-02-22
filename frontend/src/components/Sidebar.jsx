import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  //Fetching users
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  //filtering based on online status
  const filteredUsers = showOnlineOnly //user who are online show them only
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return;

  return (
    <aside className="h-full w-full md:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>
      </div>

      {/* Online Users Toggle*/}
      <div className="px-4 mt-3 flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">
          ({onlineUsers.length - 1} online){/* shows online users excluding curent user */}
        </span>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {/* loops through user list and show them as buttons */}
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}// updates selected user
            className={`w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            {/* User Profile */}
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}{/*  if user is online */}
            </div>

            {/* User Info */}
            <div className="text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Online Users Message */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

