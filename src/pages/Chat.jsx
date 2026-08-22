import { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";
import Container from "../components/Container";
import users from "../data/users.json";

function Chat() {
  const { currentUser, allMessages, sendMessage } = useContext(AppContext);
  const [activeUserId, setActiveUserId] = useState(null);
  const [text, setText] = useState("");

  if (!currentUser) {
    return (
      <Container>
        <p className="text-center text-muted py-12">Log in to view your messages.</p>
      </Container>
    );
  }

  const myMessages = allMessages.filter(
    (m) => m.senderId === currentUser.id || m.receiverId === currentUser.id
  );

  const otherUserIds = [
    ...new Set(
      myMessages.map((m) => (m.senderId === currentUser.id ? m.receiverId : m.senderId))
    ),
  ];

  const activeThread = activeUserId
    ? myMessages
        .filter((m) => m.senderId === activeUserId || m.receiverId === activeUserId)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    : [];

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(activeUserId, text);
    setText("");
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold text-text mb-6">Chat</h1>
      <div className="flex gap-6">
        <div className="w-1/3 border border-border rounded-lg overflow-hidden">
          {otherUserIds.map((id) => {
            const user = users.find((u) => u.id === id);
            return (
              <button
                key={id}
                onClick={() => setActiveUserId(id)}
                className={`w-full flex items-center gap-3 p-3 text-left border-b border-border ${
                  activeUserId === id ? "bg-background" : "bg-card"
                }`}
              >
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <span className="font-semibold text-text">{user.name}</span>
              </button>
            );
          })}
        </div>

        <div className="w-2/3 flex flex-col border border-border rounded-lg p-4">
          {!activeUserId ? (
            <p className="text-muted">Select a conversation.</p>
          ) : (
            <>
              <div className="flex-1 space-y-2 mb-4 max-h-96 overflow-y-auto">
                {activeThread.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      m.senderId === currentUser.id
                        ? "bg-primary text-white ml-auto"
                        : "bg-background text-text"
                    }`}
                  >
                    {m.message}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg"
                />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Chat;