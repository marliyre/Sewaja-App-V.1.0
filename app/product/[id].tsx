import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";

const items = [
  {
    id: 1,
    title: "Sony Alpha a7 III",
    category: "Photography",
    price: "Rp750.000/hari",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    description:
      "Professional mirrorless camera perfect for photography and videography projects.",
  },
  {
    id: 2,
    title: "Makita Cordless Drill",
    category: "Tools",
    price: "Rp120.000/hari",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1200&auto=format&fit=crop",
    description:
      "High-performance cordless drill suitable for home and construction work.",
  },
  {
    id: 3,
    title: "DJI Mavic Air 2",
    category: "Electronics",
    price: "Rp950.000/hari",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Compact drone with stunning aerial photography and video capabilities.",
  },
  {
    id: 4,
    title: "Camping Tent",
    category: "Sports",
    price: "Rp180.000/hari",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Comfortable camping tent suitable for outdoor adventures and hiking trips.",
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = items.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* IMAGE */}
        <View>
          <Image
            source={{ uri: product.image }}
            style={{
              width: "100%",
              height: 340,
            }}
          />

          {/* BACK BUTTON */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: "absolute",
              top: 55,
              left: 20,
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(255,255,255,0.9)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#111827"
            />
          </TouchableOpacity>

          {/* HEART BUTTON */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 55,
              right: 20,
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(255,255,255,0.9)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="heart-outline"
              size={22}
              color="#111827"
            />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View
          style={{
            padding: 22,
            marginTop: -20,
            backgroundColor: "#F9FAFB",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          
          {/* CATEGORY */}
          <Text
            style={{
              color: "#49C5B6",
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            {product.category}
          </Text>

          {/* TITLE */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: "#111827",
              marginBottom: 12,
            }}
          >
            {product.title}
          </Text>

          {/* PRICE */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: "#2D8B81",
              marginBottom: 18,
            }}
          >
            {product.price}
          </Text>

          {/* INFO */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 28,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <Ionicons
                name="star"
                size={18}
                color="#F59E0B"
              />

              <Text
                style={{
                  marginLeft: 6,
                  color: "#6B7280",
                  fontWeight: "600",
                }}
              >
                4.9
              </Text>

              <Text
                style={{
                  marginLeft: 4,
                  color: "#9CA3AF",
                }}
              >
                (128 reviews)
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color="#6B7280"
              />

              <Text
                style={{
                  marginLeft: 6,
                  color: "#6B7280",
                }}
              >
                Bandung
              </Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 12,
              color: "#111827",
            }}
          >
            Description
          </Text>

          <Text
            style={{
              color: "#6B7280",
              lineHeight: 24,
              marginBottom: 30,
            }}
          >
            {product.description}
          </Text>

          {/* OWNER CARD */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 16,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOpacity: 0.03,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 14,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#111827",
                }}
              >
                Rizky Pratama
              </Text>

              <Text
                style={{
                  color: "#6B7280",
                  marginTop: 4,
                }}
              >
                Trusted Owner
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#9CA3AF"
            />
          </View>

          {/* ACTION BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/chat")}
              style={{
                flex: 1,
                backgroundColor: "#111827",
                paddingVertical: 16,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Message Owner
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 58,
                height: 58,
                borderRadius: 18,
                backgroundColor: "#EEFDFB",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="call-outline"
                size={24}
                color="#2D8B81"
              />
            </TouchableOpacity>
          </View>

          {/* FEATURES */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 14,
              color: "#111827",
            }}
          >
            Features & Specs
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 18,
              marginBottom: 28,
            }}
          >
            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  color: "#111827",
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Camera Type
              </Text>

              <Text style={{ color: "#6B7280" }}>
                Full Frame Mirrorless
              </Text>
            </View>

            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  color: "#111827",
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Resolution
              </Text>

              <Text style={{ color: "#6B7280" }}>
                24.2 MP
              </Text>
            </View>

            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  color: "#111827",
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Video
              </Text>

              <Text style={{ color: "#6B7280" }}>
                4K UHD Recording
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: "#111827",
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Included
              </Text>

              <Text style={{ color: "#6B7280" }}>
                Extra Battery & Charger
              </Text>
            </View>
          </View>

          {/* RENTAL TERMS */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 14,
              color: "#111827",
            }}
          >
            Rental Terms
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 18,
              marginBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="time-outline"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                }}
              >
                Minimum rental duration is 1 day
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="card-outline"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                }}
              >
                Must provide identity card before renting
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                }}
              >
                Late return will incur additional charges
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#49C5B6"
              />

              <Text
                style={{
                  marginLeft: 10,
                  color: "#6B7280",
                  flex: 1,
                }}
              >
                Damaged items must be compensated
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
<View
  style={{
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  }}
>
  <TouchableOpacity
    style={{
      backgroundColor: "#49C5B6",
      paddingVertical: 18,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#49C5B6",
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 4,
    }}
  >
    <Text
      style={{
        color: "white",
        fontWeight: "700",
        fontSize: 17,
      }}
    >
      Rent Now
    </Text>
  </TouchableOpacity>
</View>
    </View>
  );
}