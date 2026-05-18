import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useWishlist } from "../../context/WishlistContext";

const items = [
  {
    id: 1,
    title: "Sony Alpha a7 III",
    category: "Photography",
    price: "Rp750.000/hari",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Makita Cordless Drill",
    category: "Tools",
    price: "Rp120.000/hari",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "DJI Mavic Air 2",
    category: "Electronics",
    price: "Rp950.000/hari",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Camping Tent",
    category: "Sports",
    price: "Rp180.000/hari",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Photography",
  "Tools",
  "Electronics",
  "Books",
  "Sports",
  "Fashion",
  "Vehicles",
  "Real Estate",
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const { favorites, toggleFavorite } = useWishlist();

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      
      {/* HEADER */}
      <View
        style={{
          paddingTop: 60,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: "#49C5B6",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Ionicons
              name="cube-outline"
              size={20}
              color="white"
            />
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: "#2D8B81",
            }}
          >
            Sewaja
          </Text>
        </View>

        {/* NOTIFICATION */}
        <TouchableOpacity
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: "#EEFDFB",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#2D8B81"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
      >
        
        {/* SEARCH */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "white",
            borderRadius: 18,
            paddingHorizontal: 16,
            height: 56,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <Ionicons
            name="search-outline"
            size={22}
            color="#6B7280"
          />

          <TextInput
            placeholder="Search cameras, tools, etc..."
            placeholderTextColor="#9CA3AF"
            style={{
              flex: 1,
              marginLeft: 10,
              fontSize: 15,
            }}
          />

          <Ionicons
            name="options-outline"
            size={22}
            color="#2D8B81"
          />
        </View>

        {/* CATEGORY */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
        >
          {categories.map((category, index) => {
            const isActive =
              selectedCategory === category;

            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedCategory(category)
                }
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 999,
                  backgroundColor: isActive
                    ? "#49C5B6"
                    : "white",
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: isActive
                      ? "white"
                      : "#374151",
                    fontWeight: "600",
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* CARD GRID */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/product/[id]",
                  params: {
                    id: item.id.toString(),
                  },
                })
              }
              activeOpacity={0.9}
              style={{
                width: "48%",
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
              <View>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: 160,
                  }}
                />

                <TouchableOpacity
                  onPress={() =>
                    toggleFavorite(item)
                  }
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor:
                      "rgba(255,255,255,0.9)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name={
                      favorites.some(
                        (fav) => fav.id === item.id
                      )
                        ? "heart"
                        : "heart-outline"
                    }
                    size={18}
                    color={
                      favorites.some(
                        (fav) => fav.id === item.id
                      )
                        ? "#EF4444"
                        : "#374151"
                    }
                  />
                </TouchableOpacity>
              </View>

              <View style={{ padding: 14 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: "#49C5B6",
                    marginBottom: 6,
                  }}
                >
                  {item.category}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "800",
                    color: "#2D8B81",
                  }}
                >
                  {item.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}