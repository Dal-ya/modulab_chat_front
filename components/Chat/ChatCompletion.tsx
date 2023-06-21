import { Chat } from '../../lib/type';

const ChatCompletion = ({ chat }: { chat: Chat }) => {
  return (
    <div className="mb-6">
      {/* bot */}
      {chat.botMsg && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1684369176170-463e84248b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=784&q=80"
                alt="bot"
              />
            </div>
          </div>
          <div className="chat-bubble">{chat.botMsg}</div>
        </div>
      )}

      {/* user */}
      {chat.userMsg && (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80"
                alt="user"
              />
            </div>
          </div>
          <div className="chat-bubble">{chat.userMsg}</div>
        </div>
      )}
    </div>
  );
};

export default ChatCompletion;
