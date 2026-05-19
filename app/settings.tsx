import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../context/ThemeContext"; // 👈 Pastikan letak file Context ini sesuai dengan struktur foldermu

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, user, updateUser } = useTheme();

  // Lokal state form edit profile
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = () => {
    updateUser({ name, email, phone });
    router.back();
  };

  const theme = {
    bg: isDarkMode ? "#111827" : "#F9FAFB",
    card: isDarkMode ? "#1F2937" : "white",
    text: isDarkMode ? "white" : "#111827",
    subText: isDarkMode ? "#9CA3AF" : "#6B7280",
    border: isDarkMode ? "#374151" : "#E5E7EB",
    inputBg: isDarkMode ? "#1F2937" : "#F3F4F6"
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.bg }} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      {/* HEADER */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "800", color: theme.text }}>Account Settings</Text>
      </View>

      {/* THEME TOGGLE OPTION */}
      {/* 👈 DIPERBAIKI: Mengganti 'uppercase' properti langsung menjadi textTransform di dalam style */}
      <Text style={{ fontSize: 14, fontWeight: "700", color: "#49C5B6", marginBottom: 10, textTransform: "uppercase" }}>App Preferences</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: theme.card, padding: 16, borderRadius: 16, marginBottom: 25, borderWidth: 1, borderColor: theme.border }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name={isDarkMode ? "moon" : "sunny"} size={22} color={isDarkMode ? "#FBBF24" : "#6B7280"} />
          <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: "600", color: theme.text }}>Dark Mode Theme</Text>
        </View>
        <Switch value={isDarkMode} onValueChange={toggleTheme} trackColor={{ false: "#D1D5DB", true: "#49C5B6" }} thumbColor="white" />
      </View>

      {/* EDIT PROFILE FIELDS */}
      {/* 👈 DIPERBAIKI: Mengganti properti uppercase menjadi textTransform di style */}
      <Text style={{ fontSize: 14, fontWeight: "700", color: "#49C5B6", marginBottom: 10, textTransform: "uppercase" }}>Edit Profile Details</Text>
      <View style={{ backgroundColor: theme.card, padding: 20, borderRadius: 20, borderWidth: 1, borderColor: theme.border, marginBottom: 25 }}>
        
        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: "600" }}>Full Name</Text>
        <TextInput value={name} onChangeText={setName} style={{ backgroundColor: theme.inputBg, color: theme.text, padding: 14, borderRadius: 12, marginBottom: 16 }} />

        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: "600" }}>Email Address</Text>
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" style={{ backgroundColor: theme.inputBg, color: theme.text, padding: 14, borderRadius: 12, marginBottom: 16 }} />

        <Text style={{ color: theme.subText, marginBottom: 8, fontWeight: "600" }}>Phone Number</Text>
        <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={{ backgroundColor: theme.inputBg, color: theme.text, padding: 14, borderRadius: 12 }} />
      </View>

      {/* GENERAL SETTINGS ACCOUNT */}
      {/* 👈 DIPERBAIKI: Mengganti properti uppercase menjadi textTransform di style */}
      <Text style={{ fontSize: 14, fontWeight: "700", color: "#49C5B6", marginBottom: 10, textTransform: "uppercase" }}>Security & General</Text>
      <View style={{ backgroundColor: theme.card, borderRadius: 16, borderWidth: 1, borderColor: theme.border, overflow: "hidden", marginBottom: 35 }}>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
          <Text style={{ color: theme.text, fontWeight: "500" }}>Change Password</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.subText} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
          <Text style={{ color: theme.text, fontWeight: "500" }}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.subText} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
          <Text style={{ color: "#EF4444", fontWeight: "600" }}>Log Out Account</Text>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity onPress={handleSave} style={{ backgroundColor: "#49C5B6", paddingVertical: 16, borderRadius: 16, alignItems: "center", shadowColor: "#49C5B6", shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 }}>
        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Save Configuration</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}