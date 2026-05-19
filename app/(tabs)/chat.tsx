import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

// Data chat inbox bawaan awal dengan tanda pengenal pengirim terakhir (lastSender)
const INITIAL_CHATS = [
  { id: "1", name: "Rizky Pratama", text: "Apakah alatnya masih tersedia?", time: "10:30 AM", unread: true, lastSender: "other", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
  { id: "2", name: "Dina", text: "Terima kasih, kameranya berfungsi dengan baik!", time: "09:15 AM", unread: false, lastSender: "other", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }
];

// Mock database isi chat room internal
const INITIAL_MESSAGES_DB: { [key: string]: { id: string; sender: "me" | "other"; text: string; time: string }[] } = {
  "1": [
    { id: "m1", sender: "other", text: "Halo, saya tertarik dengan unit tripodnya.", time: "10:28 AM" },
    { id: "m2", sender: "me", text: "Halo! Iya silakan, ada yang bisa dibantu?", time: "10:29 AM" },
    { id: "m3", sender: "other", text: "Apakah alatnya masih tersedia?", time: "10:30 AM" },
  ],
  "2": [
    { id: "m4", sender: "me", text: "Bagaimana kondisi kamera kemarin aman?", time: "09:10 AM" },
    { id: "m5", sender: "other", text: "Terima kasih, kameranya berfungsi dengan baik!", time: "09:15 AM" },
  ],
  "new_room": [] 
};

export default function ChatScreen() {
  const { ownerName, productTitle } = useLocalSearchParams<{ ownerName?: string; productTitle?: string }>();

  const [inboxList, setInboxList] = useState(INITIAL_CHATS);
  const [messagesDB, setMessagesDB] = useState(INITIAL_MESSAGES_DB);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isRoomVisible, setIsRoomVisible] = useState(false);
  const [replyText, setReplyText] = useState("");

  const getRealtimeTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  useEffect(() => {
    if (ownerName && !inboxList.some(chat => chat.name.toLowerCase() === ownerName.toLowerCase())) {
      const newRoomId = "new_room";
      const initialMessageText = `Hi, apakah ${productTitle || "produk ini"} masih tersedia untuk disewa?`;
      const currentTime = getRealtimeTime();

      const newInboxItem = {
        id: newRoomId,
        name: ownerName,
        text: initialMessageText,
        time: currentTime,
        unread: false,
        lastSender: "me", // Karena dipicu otomatis dari klik tombol user, pengirimnya "me"
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      };

      setInboxList([newInboxItem, ...INITIAL_CHATS]);
      setMessagesDB(prev => ({
        ...prev,
        [newRoomId]: [{ id: "init_1", sender: "me", text: initialMessageText, time: currentTime }]
      }));
    }
  }, [ownerName, productTitle]);

  const handleOpenRoom = (chatItem: any) => {
    setSelectedChat(chatItem);
    setIsRoomVisible(true);
    setInboxList(prevList =>
      prevList.map(item => (item.id === chatItem.id ? { ...item, unread: false } : item))
    );
  };

  const handleSendMessage = () => {
    if (!replyText.trim() || !selectedChat) return;

    const timeStamp = getRealtimeTime();
    const newMsgId = Math.random().toString();
    const typedText = replyText;

    const currentRoomMessages = messagesDB[selectedChat.id] || [];
    const updatedMessages = [
      ...currentRoomMessages,
      { id: newMsgId, sender: "me" as const, text: typedText, time: timeStamp }
    ];
    
    setMessagesDB(prev => ({
      ...prev,
      [selectedChat.id]: updatedMessages
    }));

    setInboxList(prevList => {
      const filtered = prevList.map(item => {
        if (item.id === selectedChat.id) {
          // Update teks terakhir dan tandai kalau yang ngirim terakhir adalah "me"
          return { ...item, text: typedText, time: timeStamp, lastSender: "me" };
        }
        return item;
      });

      const targetIndex = filtered.findIndex(item => item.id === selectedChat.id);
      if (targetIndex > 0) {
        const targetItem = filtered[targetIndex];
        const rest = filtered.filter(item => item.id !== selectedChat.id);
        return [targetItem, ...rest];
      }
      return filtered;
    });

    setReplyText("");
  };

  const theme = {
    bg: "#F9FAFB",         
    card: "white",         
    text: "#111827",       
    subText: "#6B7280",    
    border: "#E5E7EB",     
    brandText: "#2D8B81",  
    brandPrimary: "#49C5B6", // Hijau Toska Sewaja
    chatMe: "#49C5B6",
    chatOther: "#E5E7EB"
  };

  const activeRoomMessages = selectedChat ? messagesDB[selectedChat.id] || [] : [];

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: 60 }}>
      
      {/* HEADER BAR INBOX */}
      <View style={{ 
        paddingHorizontal: 20, 
        paddingBottom: 20, 
        backgroundColor: "white",
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        borderBottomWidth: 1, 
        borderBottomColor: theme.border 
      }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: theme.brandText }}>Messages</Text>
      </View>

      {/* SEARCH BAR */}
      <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 10 }}>
        <View style={{ 
          flexDirection: "row", 
          alignItems: "center", 
          backgroundColor: "white", 
          paddingHorizontal: 16, 
          height: 56, 
          borderRadius: 18,
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 10,
          elevation: 2
        }}>
          <Ionicons name="search-outline" size={22} color="#6B7280" />
          <TextInput placeholder="Search message history..." placeholderTextColor="#9CA3AF" style={{ marginLeft: 10, color: theme.text, flex: 1, fontSize: 15 }} />
        </View>
      </View>

      {/* INBOX LIST VIEW */}
      <FlatList
        data={inboxList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => handleOpenRoom(item)}
            style={{ 
              flexDirection: "row", 
              padding: 16, 
              backgroundColor: theme.card, 
              borderRadius: 24,              
              marginBottom: 14,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.03,
              shadowRadius: 8,
              elevation: 2
            }}
          >
            <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 14 }} />
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "700", fontSize: 15, color: theme.text }}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: item.unread ? theme.brandPrimary : theme.subText, fontWeight: item.unread ? "700" : "400" }}>{item.time}</Text>
              </View>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <Text numberOfLines={1} style={{ color: item.unread ? theme.text : theme.subText, fontWeight: item.unread ? "600" : "400", fontSize: 13, flex: 1, marginRight: 10 }}>
                  {item.text}
                </Text>

                {/* LOGIKA CENTANG DI INBOX: Hanya muncul kalau pengirim terakhirnya adalah KITA ("me") */}
                {item.lastSender === "me" && (
                  <Ionicons name="checkmark-done" size={18} color={theme.brandPrimary} />
                )}
              </View>
            </View>

            {item.unread && (
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.brandPrimary, marginLeft: 10 }} />
            )}
          </TouchableOpacity>
        )}
      />

      {/* ==================== INTERACTIVE ROOM CHAT MODAL ==================== */}
      <Modal
        animationType="slide"
        visible={isRoomVisible}
        onRequestClose={() => setIsRoomVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, backgroundColor: "#F9FAFB" }}
        >
          {/* ROOM CHAT HEADER */}
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            paddingTop: 55, 
            paddingHorizontal: 16, 
            paddingBottom: 16, 
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: theme.border
          }}>
            <TouchableOpacity onPress={() => setIsRoomVisible(false)} style={{ padding: 4, marginRight: 8 }}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>

            {selectedChat && (
              <>
                <Image source={{ uri: selectedChat.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", fontSize: 16, color: theme.text }}>{selectedChat.name}</Text>
                  <Text style={{ fontSize: 12, color: theme.brandPrimary, fontWeight: "600" }}>Online</Text>
                </View>
              </>
            )}
          </View>

          {/* MESSAGE BUBBLES LIST */}
          <FlatList
            data={activeRoomMessages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 }}
            renderItem={({ item }) => {
              const isMe = item.sender === "me";
              return (
                <View style={{ 
                  alignSelf: isMe ? "flex-end" : "flex-start", 
                  maxWidth: "75%", 
                  marginBottom: 14 
                }}>
                  <View style={{
                    backgroundColor: isMe ? theme.chatMe : theme.chatOther,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 20,
                    borderBottomRightRadius: isMe ? 4 : 20,
                    borderBottomLeftRadius: isMe ? 20 : 4,
                  }}>
                    <Text style={{ color: isMe ? "white" : theme.text, fontSize: 15, lineHeight: 20 }}>
                      {item.text}
                    </Text>
                  </View>

                  {/* BAR INDIKATOR WAKTU & STATUS CENTANG DI BAWAH BUBBLE */}
                  <View style={{ 
                    flexDirection: "row", 
                    alignItems: "center", 
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    marginTop: 4,
                    paddingHorizontal: 4
                  }}>
                    <Text style={{ fontSize: 10, color: theme.subText, marginRight: isMe ? 4 : 0 }}>
                      {item.time}
                    </Text>
                    
                    {/* LOGIKA CENTANG DI DALAM ROOM CHAT: Hanya muncul di bubble milik kita ("me") */}
                    {isMe && (
                      <Ionicons name="checkmark-done" size={14} color={theme.brandPrimary} />
                    )}
                  </View>
                </View>
              );
            }}
          />

          {/* BOTTOM REPLY BAR */}
          <View style={{ 
            paddingHorizontal: 16, 
            paddingVertical: 12, 
            backgroundColor: "white", 
            flexDirection: "row", 
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: theme.border,
            paddingBottom: Platform.OS === 'ios' ? 25 : 12
          }}>
            <View style={{ 
              flex: 1, 
              flexDirection: "row", 
              alignItems: "center", 
              backgroundColor: "#F3F4F6", 
              borderRadius: 24, 
              paddingHorizontal: 16, 
              height: 48,
              marginRight: 12 
            }}>
              <TextInput 
                placeholder="Type your message..." 
                placeholderTextColor="#9CA3AF"
                value={replyText}
                onChangeText={setReplyText}
                style={{ flex: 1, color: theme.text, fontSize: 15 }}
              />
            </View>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleSendMessage}
              style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 24, 
                backgroundColor: theme.brandPrimary, 
                justifyContent: "center", 
                alignItems: "center",
                shadowColor: theme.brandPrimary,
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 3
              }}
            >
              <Ionicons name="send" size={18} color="white" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}