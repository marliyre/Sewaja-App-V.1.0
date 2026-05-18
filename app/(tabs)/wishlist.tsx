import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistScreen() {
  const { favorites, toggleFavorite } = useWishlist();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9FAFB",
      }}
    >
      
      {/* HEADER */}
      <View
        style={{
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#2D8B81",
          }}
        >
          Wishlist
        </Text>
      </View>

      {/* CONTENT */}
      {favorites.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          <Ionicons
            name="heart-outline"
            size={70}
            color="#D1D5DB"
          />

          <Text
            style={{
              marginTop: 18,
              fontSize: 20,
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Belum ada wishlist
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "#9CA3AF",
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Barang yang kamu sukai akan muncul di sini
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 120,
          }}
        >
          {favorites.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                marginBottom: 18,
                overflow: "hidden",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 220,
                }}
              />

              <View style={{ padding: 16 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#49C5B6",
                    marginBottom: 6,
                  }}
                >
                  {item.category}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "800",
                      color: "#2D8B81",
                    }}
                  >
                    {item.price}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      toggleFavorite(item)
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#FEF2F2",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="heart"
                      size={20}
                      color="#EF4444"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}