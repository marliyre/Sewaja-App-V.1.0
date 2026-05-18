import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const chats = [
  {
    id: 1,
    name: "Rizky Pratama",
    message: "Yes, the camera is still available 😊",
    time: "2 min ago",
    unread: 2,
    online: true,
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Amanda Putri",
    message: "Can you return it tomorrow morning?",
    time: "10 min ago",
    unread: 0,
    online: false,
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Fajar Nugraha",
    message: "Thank you for renting 🙌",
    time: "1 hour ago",
    unread: 1,
    online: true,
    image:
      "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 4,
    name: "Dina Aulia",
    message: "Is the drone still available this weekend?",
    time: "Yesterday",
    unread: 0,
    online: false,
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function ChatScreen() {
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
          paddingTop: 70,
          paddingBottom: 28,
          paddingHorizontal: 24,
          backgroundColor: "#111827",
          borderBottomLeftRadius: 34,
          borderBottomRightRadius: 34,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "800",
            }}
          >
            Messages
          </Text>

          <TouchableOpacity
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: "#1E293B",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="create-outline"
              size={22}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View
          style={{
            height: 56,
            backgroundColor: "#1E293B",
            borderRadius: 18,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color="#94A3B8"
          />

          <Text
            style={{
              color: "#94A3B8",
              marginLeft: 12,
              fontSize: 15,
            }}
          >
            Search conversations...
          </Text>
        </View>
      </View>

      {/* CHAT LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
      >
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() =>
              router.push({
                pathname: "/messages/[id]",
                params: { id: String(chat.id) },
              })
            }
            activeOpacity={0.8}
            style={{
              backgroundColor: "#111827",
              borderRadius: 24,
              padding: 16,
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* PROFILE */}
            <View>
              <Image
                source={{ uri: chat.image }}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 31,
                  marginRight: 14,
                }}
              />

              {chat.online && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 16,
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

            {/* CHAT INFO */}
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "700",
                  }}
                >
                  {chat.name}
                </Text>

                <Text
                  style={{
                    color: "#94A3B8",
                    fontSize: 12,
                  }}
                >
                  {chat.time}
                </Text>
              </View>

              <Text
                numberOfLines={1}
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                  lineHeight: 22,
                }}
              >
                {chat.message}
              </Text>
            </View>

            {/* UNREAD */}
            {chat.unread > 0 && (
              <View
                style={{
                  marginLeft: 12,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: "#49C5B6",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {chat.unread}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}