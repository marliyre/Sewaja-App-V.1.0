import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* HEADER */}
        <View
          style={{
            paddingTop: 70,
            paddingHorizontal: 24,
            paddingBottom: 32,
            backgroundColor: "#111827",
            borderBottomLeftRadius: 36,
            borderBottomRightRadius: 36,
          }}
        >
          {/* TOP BAR */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "800",
              }}
            >
              Profile
            </Text>

            {/* SETTINGS BUTTON */}
            <TouchableOpacity
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: "#1F2937",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* PROFILE CARD */}
          <View
            style={{
              backgroundColor: "#1E293B",
              borderRadius: 28,
              padding: 22,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 41,
                  marginRight: 18,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "800",
                    marginBottom: 4,
                  }}
                >
                  Siti Marliyah
                </Text>

                <Text
                  style={{
                    color: "#94A3B8",
                    marginBottom: 12,
                  }}
                >
                  Premium Member
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#49C5B6",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 14,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* STATS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 24,
          }}
        >
          {[
            {
              title: "Listings",
              value: "12",
              icon: "cube-outline",
            },
            {
              title: "Rented",
              value: "89",
              icon: "repeat-outline",
            },
            {
              title: "Rating",
              value: "4.9",
              icon: "star",
            },
          ].map((item, index) => (
            <View
              key={index}
              style={{
                width: "31%",
                backgroundColor: "#111827",
                borderRadius: 24,
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "#1E293B",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color="#49C5B6"
                />
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                {item.value}
              </Text>

              <Text
                style={{
                  color: "#94A3B8",
                  marginTop: 4,
                  fontSize: 12,
                }}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </View>

        {/* MY LISTINGS */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 32,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 18,
            }}
          >
            My Listings
          </Text>

          {[1, 2].map((item) => (
            <View
              key={item}
              style={{
                backgroundColor: "#111827",
                borderRadius: 24,
                padding: 16,
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri:
                    item === 1
                      ? "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
                }}
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 18,
                  marginRight: 14,
                }}
              />

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                    marginBottom: 6,
                  }}
                >
                  {item === 1
                    ? "Sony Alpha a7 III"
                    : "DJI Mavic Air 2"}
                </Text>

                <Text
                  style={{
                    color: "#49C5B6",
                    fontWeight: "700",
                    marginBottom: 10,
                  }}
                >
                  {item === 1
                    ? "Rp750.000/hari"
                    : "Rp950.000/hari"}
                </Text>

                <View
                  style={{
                    backgroundColor: "#1E293B",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "#94A3B8",
                      fontSize: 12,
                    }}
                  >
                    Active Listing
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* RENTAL HISTORY */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 18,
            }}
          >
            Rental History
          </Text>

          <View
            style={{
              backgroundColor: "#111827",
              borderRadius: 24,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: "#1E293B",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 14,
                }}
              >
                <Ionicons
                  name="time-outline"
                  size={24}
                  color="#49C5B6"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 16,
                    marginBottom: 4,
                  }}
                >
                  Canon EOS R6
                </Text>

                <Text
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Rented on 12 May 2026
                </Text>
              </View>

              <Text
                style={{
                  color: "#49C5B6",
                  fontWeight: "700",
                }}
              >
                Finished
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: "#1E293B",
                marginVertical: 4,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: "#1E293B",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 14,
                }}
              >
                <Ionicons
                  name="camera-outline"
                  size={24}
                  color="#49C5B6"
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 16,
                    marginBottom: 4,
                  }}
                >
                  DJI Mavic Air 2
                </Text>

                <Text
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Ongoing Rental
                </Text>
              </View>

              <Text
                style={{
                  color: "#F59E0B",
                  fontWeight: "700",
                }}
              >
                Active
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}