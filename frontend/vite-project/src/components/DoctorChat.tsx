import { useState } from 'react';
import { Send, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  timestamp: Date;
}

interface ChatConversation {
  patientId: string;
  patientName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  messages: Message[];
}

export function DoctorChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      patientId: '1',
      patientName: 'Maria Müller',
      lastMessage: 'Thank you doctor, I will take the medication as prescribed.',
      lastMessageTime: new Date(Date.now() - 300000),
      unread: 2,
      messages: [
        {
          id: '1',
          sender: 'doctor',
          text: 'Good morning Maria. How are you feeling today?',
          timestamp: new Date(Date.now() - 600000)
        },
        {
          id: '2',
          sender: 'patient',
          text: 'Good morning Dr. Schmidt. I am feeling much better, thank you.',
          timestamp: new Date(Date.now() - 480000)
        },
        {
          id: '3',
          sender: 'doctor',
          text: 'Excellent. Please continue taking your medication twice daily with meals.',
          timestamp: new Date(Date.now() - 360000)
        },
        {
          id: '4',
          sender: 'patient',
          text: 'Thank you doctor, I will take the medication as prescribed.',
          timestamp: new Date(Date.now() - 300000)
        }
      ]
    },
    {
      patientId: '2',
      patientName: 'Hans Schmidt',
      lastMessage: 'Is it normal to have some swelling?',
      lastMessageTime: new Date(Date.now() - 900000),
      unread: 1,
      messages: [
        {
          id: '1',
          sender: 'patient',
          text: 'Hello doctor, I have a question about my wound.',
          timestamp: new Date(Date.now() - 1200000)
        },
        {
          id: '2',
          sender: 'patient',
          text: 'Is it normal to have some swelling?',
          timestamp: new Date(Date.now() - 900000)
        }
      ]
    },
    {
      patientId: '3',
      patientName: 'Anna Weber',
      lastMessage: 'My appointment is confirmed for next week.',
      lastMessageTime: new Date(Date.now() - 3600000),
      unread: 0,
      messages: [
        {
          id: '1',
          sender: 'doctor',
          text: 'Hello Anna, I wanted to confirm your appointment for next week.',
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          id: '2',
          sender: 'patient',
          text: 'My appointment is confirmed for next week.',
          timestamp: new Date(Date.now() - 3600000)
        }
      ]
    }
  ]);

  const selectedConversation = conversations.find(c => c.patientId === selectedChat);

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'doctor',
      text: inputText,
      timestamp: new Date()
    };

    setConversations(conversations.map(conv => {
      if (conv.patientId === selectedChat) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: inputText,
          lastMessageTime: new Date()
        };
      }
      return conv;
    }));

    setInputText('');
  };

  const handleSelectChat = (patientId: string) => {
    setSelectedChat(patientId);
    // Mark messages as read
    setConversations(conversations.map(conv => {
      if (conv.patientId === patientId) {
        return { ...conv, unread: 0 };
      }
      return conv;
    }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-700">Patient Communication</h2>
        <p className="text-gray-600">Chat with your patients via secure messaging</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4" style={{ height: '600px' }}>
        {/* Conversations List */}
        <Card className="p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.patientId}
                onClick={() => handleSelectChat(conversation.patientId)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === conversation.patientId
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-xs">
                        {conversation.patientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-sm text-gray-900">{conversation.patientName}</h4>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-red-500 text-xs">{conversation.unread}</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate ml-10">{conversation.lastMessage}</p>
                <p className="text-xs text-gray-400 ml-10">{formatTime(conversation.lastMessageTime)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500">
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                      {selectedConversation.patientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-blue-700">{selectedConversation.patientName}</h3>
                    <p className="text-xs text-green-600">Patient</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'doctor' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === 'doctor'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
export default DoctorChat;