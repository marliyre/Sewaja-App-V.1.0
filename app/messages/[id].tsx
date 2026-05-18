import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { useState } from "react";

const chatUsers = [
  {
    id: 1,
    name: "Rizky Pratama",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Amanda Putri",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    online: false,
  },
  {
    id: 3,
    name: "Fajar Nugraha",
    image:
      "https://randomuser.me/api/portraits/men/22.jpg",
    online: true,
  },
  {
    id: 4,
    name: "Dina Aulia",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    online: false,
  },
];

export default function MessageDetailScreen() {
  const { id } = useLocalSearchParams();

  const user = chatUsers.find(
    (item) => item.id === Number(id)
  );

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi, is this item still available?",
      sender: "user",
    },
    {
      id: 2,
      text: "Yes, it's still available 😊",
      sender: "owner",
    },
    {
      id: 3,
      text: "Can I rent it tomorrow morning?",
      sender: "user",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0F172A",
        }}
      >
        <Text style={{ color: "white" }}>
          Chat not found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
      }}
    >
      {/* HEADER */}
      <View
        style={{
          paddingTop: 65,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: "#111827",
          flexDirection: "row",
          alignItems: "center",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        {/* BACK */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: "#1E293B",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="white"
          />
        </TouchableOpacity>

        {/* PROFILE */}
        <View>
          <Image
            source={{ uri: user.image }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              marginRight: 14,
            }}
          />

          {user.online && (
            <View
              style={{
                position: "absolute",
                bottom: 2,
                right: 14,
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: "#22C55E",
                borderWidth: 2,
                borderColor: "#111827",
              }}
            />
          )}
        </View>

        {/* INFO */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "800",
            }}
          >
            {user.name}
          </Text>

          <Text
            style={{
              color: user.online
                ? "#49C5B6"
                : "#94A3B8",
              marginTop: 4,
            }}
          >
            {user.online ? "Online" : "Offline"}
          </Text>
        </View>

        {/* CALL BUTTON */}
        <TouchableOpacity
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: "#1E293B",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="call-outline"
            size={22}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* CHAT AREA */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <View
              key={msg.id}
              style={{
                alignSelf: isUser
                  ? "flex-end"
                  : "flex-start",
                backgroundColor: isUser
                  ? "#49C5B6"
                  : "#1E293B",
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 22,
                marginBottom: 14,
                maxWidth: "80%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                {msg.text}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* INPUT */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 18,
          backgroundColor: "#111827",
          flexDirection: "row",
          alignItems: "center",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#1E293B",
            borderRadius: 18,
            paddingHorizontal: 16,
            height: 56,
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#94A3B8"
            style={{
              color: "white",
              fontSize: 15,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSend}
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            backgroundColor: "#49C5B6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="send"
            size={22}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}