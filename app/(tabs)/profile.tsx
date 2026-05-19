import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Impor router expo

export default function ProfileScreen() {
  const router = useRouter(); // Definisikan hook router
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State data profil
  const [name, setName] = useState("Dina Amelia");
  const [email, setEmail] = useState("dinaamelia@gmail.com");
  const [phone, setPhone] = useState("081234567890");
  const [password, setPassword] = useState("********");

  const theme = {
    bg: "#F9FAFB",         
    card: "white",         
    text: "#111827",       
    subText: "#6B7280",    
    border: "#E5E7EB",     
    brandPrimary: "#49C5B6", 
    brandDark: "#2D8B81",    
    badgeBg: "#EEFDFB",    
    inputBg: "#F3F4F6"
  };

  const handleSaveSettings = () => {
    console.log("Data berhasil disimpan");
    setIsModalVisible(false);
  };

  // FUNGSI HANDLER UNTUK KELUAR APLIKASI
  const handleLogout = () => {
    setIsModalVisible(false); // Tutup modal dulu
    console.log("User telah logout.");
    router.replace("/login"); // Tendang balik secara realtime ke halaman login
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, paddingTop: 60 }}>
      
      {/* HEADER BAR PROFILE */}
      <View style={{ 
        paddingHorizontal: 24, 
        paddingBottom: 15, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
      }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: theme.brandDark }}>Profile</Text>
        
        {/* ICON SETTINGS */}
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => setIsModalVisible(true)}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.03,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <Ionicons name="settings-outline" size={22} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10 }}>
        
        {/* USER INFO CARD */}
        <View style={{ 
          alignItems: "center", 
          backgroundColor: theme.card, 
          borderRadius: 28, 
          padding: 24, 
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.03,
          shadowRadius: 10,
          elevation: 2
        }}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" }} 
            style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 14 }} 
          />
          
          <Text style={{ fontSize: 22, fontWeight: "800", color: theme.text }}>{name}</Text>
          
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            backgroundColor: theme.badgeBg, 
            paddingHorizontal: 14, 
            paddingVertical: 6, 
            borderRadius: 12, 
            marginTop: 8 
          }}>
            <Ionicons name="checkmark-circle" size={16} color={theme.brandPrimary} style={{ marginRight: 6 }} />
            <Text style={{ color: theme.brandDark, fontWeight: "700", fontSize: 13 }}>Trusted Owner</Text>
          </View>
        </View>

        {/* MENU UTAMA PROFILE */}
        <Text style={{ fontSize: 18, fontWeight: "700", color: theme.text, marginBottom: 14, marginLeft: 4 }}>
          Dashboard
        </Text>

        <View style={{ 
          backgroundColor: theme.card, 
          borderRadius: 24, 
          paddingVertical: 8,
          shadowColor: "#000",
          shadowOpacity: 0.03,
          shadowRadius: 10,
          elevation: 2,
          marginBottom: 40
        }}>
          
          {/* MY PRODUCTS */}
          <TouchableOpacity 
            activeOpacity={0.6}
            // 💡 FIX: Diarahkan push ke halaman my-products
            onPress={() => router.push("/profile/my-products")}
            style={{ 
              flexDirection: "row", 
              alignItems: "center", 
              paddingHorizontal: 20, 
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.border
            }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: theme.badgeBg, justifyContent: "center", alignItems: "center", marginRight: 16 }}>
              <Ionicons name="cube-outline" size={20} color={theme.brandDark} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 16, color: theme.text }}>My Products</Text>
              <Text style={{ fontSize: 12, color: theme.subText, marginTop: 2 }}>Kelola barang yang kamu sewakan</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* HISTORY RENTS */}
          <TouchableOpacity 
            activeOpacity={0.6}
            // 💡 FIX: Diarahkan push ke halaman history-rents 
            onPress={() => router.push("/profile/history-rents")}
            style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#FFF7ED", justifyContent: "center", alignItems: "center", marginRight: 16 }}>
              <Ionicons name="time-outline" size={20} color="#EA580C" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 16, color: theme.text }}>History Rents</Text>
              <Text style={{ fontSize: 12, color: theme.subText, marginTop: 2 }}>Riwayat transaksi sewa menyewa kamu</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL SETTINGS */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ backgroundColor: "white", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, maxHeight: "85%" }}>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: "800", color: theme.text }}>Account Settings</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{ padding: 4 }}>
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ fontWeight: "700", fontSize: 14, color: theme.text, marginBottom: 8 }}>Full Name</Text>
              <TextInput value={name} onChangeText={setName} style={{ backgroundColor: theme.inputBg, paddingHorizontal: 16, height: 50, borderRadius: 14, marginBottom: 16, color: theme.text, fontWeight: "600" }} />

              <Text style={{ fontWeight: "700", fontSize: 14, color: theme.text, marginBottom: 8 }}>Email Address</Text>
              <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={{ backgroundColor: theme.inputBg, paddingHorizontal: 16, height: 50, borderRadius: 14, marginBottom: 16, color: theme.text, fontWeight: "600" }} />

              <Text style={{ fontWeight: "700", fontSize: 14, color: theme.text, marginBottom: 8 }}>Phone Number</Text>
              <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={{ backgroundColor: theme.inputBg, paddingHorizontal: 16, height: 50, borderRadius: 14, marginBottom: 16, color: theme.text, fontWeight: "600" }} />

              <Text style={{ fontWeight: "700", fontSize: 14, color: theme.text, marginBottom: 8 }}>Password</Text>
              <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ backgroundColor: theme.inputBg, paddingHorizontal: 16, height: 50, borderRadius: 14, marginBottom: 24, color: theme.text, fontWeight: "600" }} />

              <TouchableOpacity activeOpacity={0.8} onPress={handleSaveSettings} style={{ backgroundColor: theme.brandPrimary, height: 54, borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 12 }}>
                <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Save Changes</Text>
              </TouchableOpacity>

              {/* BUTTON LOGOUT BERFUNGSI MEMANGGIL HANDLER REDIRECT */}
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={handleLogout}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#FEF2F2", height: 54, borderRadius: 16, marginBottom: 20 }}
              >
                <Ionicons name="log-out-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
                <Text style={{ color: "#EF4444", fontWeight: "700", fontSize: 16 }}>Log Out</Text>
              </TouchableOpacity>
            </ScrollView>

          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}