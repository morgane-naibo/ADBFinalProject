import { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Message {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  timestamp: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'driver',
      text: 'Hello! I am on my way to your location. ETA is approximately 12 minutes.',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      sender: 'user',
      text: 'Thank you! I will be ready.',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      sender: 'driver',
      text: 'Great! Please make sure you have your insurance card ready.',
      timestamp: new Date(Date.now() - 180000)
    }
  ]);

  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate driver response after 2 seconds
    setTimeout(() => {
      const driverResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'driver',
        text: 'Message received. Thank you for letting me know!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, driverResponse]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-green-700">Chat with Driver</h2>
        <p className="text-gray-600">Communicate with your assigned nurse</p>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <Avatar className="w-12 h-12 bg-blue-600">
            <AvatarFallback className="bg-blue-600 text-white">
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-blue-700">Nurse Anna Schmidt</h3>
            <p className="text-green-600 text-sm">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-4" style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-100 text-gray-900'
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

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Quick Responses */}
      <div className="space-y-2">
        <p className="text-gray-600 text-sm">Quick Responses:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputText('I am ready')}
            className="border-green-500 text-green-700 hover:bg-green-50"
          >
            I am ready
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputText('Running 5 minutes late')}
            className="border-blue-500 text-blue-700 hover:bg-blue-50"
          >
            Running late
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputText('Where should I wait?')}
            className="border-green-500 text-green-700 hover:bg-green-50"
          >
            Where to wait?
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Chat;