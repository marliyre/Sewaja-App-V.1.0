import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  "Photography",
  "Tools",
  "Electronics",
  "Sports",
  "Fashion",
  "Vehicles",
];

export default function UploadScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState("Photography");

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        
        {/* HEADER */}
        <View
          style={{
            paddingTop: 60,
            paddingHorizontal: 22,
            paddingBottom: 24,
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EB",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "800",
              color: "#111827",
              marginBottom: 6,
            }}
          >
            Upload Product
          </Text>

          <Text
            style={{
              color: "#6B7280",
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            Share your rental product with others
          </Text>
        </View>

        <View style={{ padding: 22 }}>
          
          {/* IMAGE */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              height: 220,
              backgroundColor: "white",
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 28,
              borderWidth: 2,
              borderColor: "#D1FAF5",
              borderStyle: "dashed",
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "#EEFDFB",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="image-outline"
                size={34}
                color="#2D8B81"
              />
            </View>

            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 6,
              }}
            >
              Upload Product Photo
            </Text>

            <Text
              style={{
                color: "#6B7280",
                textAlign: "center",
                paddingHorizontal: 40,
                lineHeight: 22,
              }}
            >
              Add clear photos to attract more renters
            </Text>
          </TouchableOpacity>

          {/* PRODUCT NAME */}
          <View style={{ marginBottom: 22 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 10,
              }}
            >
              Product Name
            </Text>

            <TextInput
              placeholder="Enter product name"
              placeholderTextColor="#9CA3AF"
              style={{
                backgroundColor: "white",
                borderRadius: 18,
                paddingHorizontal: 18,
                height: 58,
                fontSize: 15,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            />
          </View>

          {/* CATEGORY */}
          <View style={{ marginBottom: 22 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 14,
              }}
            >
              Category
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
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
                      paddingVertical: 12,
                      borderRadius: 999,
                      backgroundColor: isActive
                        ? "#49C5B6"
                        : "white",
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: isActive
                        ? "#49C5B6"
                        : "#E5E7EB",
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
          </View>

          {/* PRICE */}
          <View style={{ marginBottom: 22 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 10,
              }}
            >
              Rental Price
            </Text>

            <TextInput
              placeholder="Rp / day"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              style={{
                backgroundColor: "white",
                borderRadius: 18,
                paddingHorizontal: 18,
                height: 58,
                fontSize: 15,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            />
          </View>

          {/* LOCATION */}
          <View style={{ marginBottom: 22 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 10,
              }}
            >
              Location
            </Text>

            <TextInput
              placeholder="Enter location"
              placeholderTextColor="#9CA3AF"
              style={{
                backgroundColor: "white",
                borderRadius: 18,
                paddingHorizontal: 18,
                height: 58,
                fontSize: 15,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            />
          </View>

          {/* DESCRIPTION */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 10,
              }}
            >
              Description
            </Text>

            <TextInput
              multiline
              placeholder="Describe your product..."
              placeholderTextColor="#9CA3AF"
              textAlignVertical="top"
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                paddingHorizontal: 18,
                paddingTop: 18,
                height: 130,
                fontSize: 15,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            />
          </View>

          {/* FEATURES & SPECS */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#111827",
                marginBottom: 14,
              }}
            >
              Features & Specs
            </Text>

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 22,
                padding: 18,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <TextInput
                placeholder="Feature Title (Example: Resolution)"
                placeholderTextColor="#9CA3AF"
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  height: 54,
                  marginBottom: 14,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              />

              <TextInput
                placeholder="Feature Description (Example: 24.2 MP)"
                placeholderTextColor="#9CA3AF"
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 14,
                  paddingHorizontal: 16,
                  height: 54,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              />
            </View>
          </View>

          {/* RENTAL TERMS */}
          <View style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#111827",
                marginBottom: 14,
              }}
            >
              Rental Terms
            </Text>

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 22,
                padding: 18,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <TextInput
                multiline
                placeholder="Write rental terms, requirements, penalties, etc..."
                placeholderTextColor="#9CA3AF"
                textAlignVertical="top"
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingTop: 16,
                  height: 140,
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  lineHeight: 24,
                }}
              />
            </View>
          </View>

          {/* TIPS */}
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#111827",
                marginBottom: 16,
              }}
            >
              Tips for Better Listings
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 14,
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                  lineHeight: 22,
                }}
              >
                Use clear and bright product photos
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 14,
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                  lineHeight: 22,
                }}
              >
                Add detailed product specifications
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                  lineHeight: 22,
                }}
              >
                Set fair and competitive rental prices
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* PUBLISH BUTTON */}
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            backgroundColor: "#49C5B6",
            paddingVertical: 18,
            borderRadius: 22,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#49C5B6",
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "800",
              fontSize: 17,
            }}
          >
            Publish Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}