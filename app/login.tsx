import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, StatusBar } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  // WARNA TEMA TERANG KHAS SEWAJA
  const theme = {
    bg: "#F9FAFB",         
    card: "white",         
    text: "#111827",       
    subText: "#6B7280",    
    brandPrimary: "#49C5B6", // Hijau Toska Sewaja
    brandDark: "#2D8B81",    // Hijau Gelap Sewaja
    inputBg: "#F3F4F6",
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Tolong isi email dan password kamu");
      return;
    }
    
    console.log("Login sukses dengan:", email);
    router.replace("/(tabs)"); // Arahkan ke homepage setelah sukses
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.bg }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" translucent={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 28, paddingTop: 60 }}>
        
        {/* AREA LOGO DENGAN LOGO BARU (Sudah Fix Error TypeScript) */}
<View style={{ alignItems: "center", marginBottom: 40 }}>
  
  {/* Pembungkus Image untuk efek shadow/bayangan */}
  <View style={{
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 5,
    backgroundColor: theme.bg, // samakan dengan background biar gak bocor
    borderRadius: 24,
    marginBottom: 16,
  }}>
    <Image 
      source={require('../assets/images/logo-sewaja.png')} 
      style={{ 
        width: 90, 
        height: 90, 
        borderRadius: 24, // Melengkung rapi khas Sewaja
      }} 
    />
  </View>
  
  <Text style={{ fontSize: 32, fontWeight: "900", color: theme.brandDark }}>Sewaja</Text>
  <Text style={{ fontSize: 14, color: theme.subText, marginTop: 4, textAlign: "center", paddingHorizontal: 10, lineHeight: 20 }}>
    Sewa barang terpercaya dan mudah di sekitarmu
  </Text>
</View>

        {/* FORM LOGIN CARD */}
        <View style={{ backgroundColor: "white", padding: 24, borderRadius: 28, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 12, elevation: 3, marginBottom: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: theme.text, marginBottom: 20 }}>Welcome Back</Text>

          {/* INPUT EMAIL */}
          <Text style={{ fontWeight: "700", fontSize: 13, color: theme.text, marginBottom: 8, marginLeft: 4 }}>Email Address</Text>
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            backgroundColor: theme.inputBg, 
            borderRadius: 14, 
            paddingHorizontal: 16, 
            height: 52, 
            marginBottom: 16,
            borderWidth: 1, borderColor: "#E5E7EB"
          }}>
            <Feather name="mail" size={18} color={theme.subText} style={{ marginRight: 10 }} />
            <TextInput 
              placeholder="test@gmail.com" 
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ flex: 1, color: theme.text, fontWeight: "600", fontSize: 15 }}
            />
          </View>

          {/* INPUT PASSWORD */}
          <Text style={{ fontWeight: "700", fontSize: 13, color: theme.text, marginBottom: 8, marginLeft: 4 }}>Password</Text>
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            backgroundColor: theme.inputBg, 
            borderRadius: 14, 
            paddingHorizontal: 16, 
            height: 52, 
            marginBottom: 12,
            borderWidth: 1, borderColor: "#E5E7EB"
          }}>
            <Feather name="lock" size={18} color={theme.subText} style={{ marginRight: 10 }} />
            <TextInput 
              placeholder="******" 
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              autoCapitalize="none"
              style={{ flex: 1, color: theme.text, fontWeight: "600", fontSize: 15 }}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color={theme.subText} />
            </TouchableOpacity>
          </View>

          {/* FORGOT PASSWORD */}
          <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 24, marginRight: 4 }}>
            <Text style={{ color: theme.brandPrimary, fontWeight: "700", fontSize: 13 }}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* BUTTON LOGIN */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleLogin}
            style={{
              backgroundColor: theme.brandPrimary,
              height: 54,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: theme.brandPrimary, shadowOpacity: 0.25, shadowRadius: 8, elevation: 3,
              marginBottom: 16
            }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Sign In</Text>
          </TouchableOpacity>

          {/* REGISTER LINK */}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: theme.subText, fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={{ color: theme.brandPrimary, fontWeight: "700", fontSize: 14 }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}