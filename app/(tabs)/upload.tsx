import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useProducts } from "../../context/ProductContext";

const CATEGORIES = [
  "Photography",
  "Tools",
  "Electronics",
  "Books",
  "Sports",
  "Fashion",
  "Vehicles",
  "Real Estate",
];

type SpecType = {
  label: string;
  value: string;
};

export default function UploadScreen() {
  const { addProduct } = useProducts();

  // States Form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [locationCity, setLocationCity] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [specs, setSpecs] = useState<SpecType[]>([{ label: "", value: "" }]);
  const [rentalTerms, setRentalTerms] = useState<string[]>([""]);

  // Media Picker
  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your gallery to upload media.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setMediaFiles([...mediaFiles, ...uris]);
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  // Akurasi Lokasi (Hanya Kota/Kabupaten)
  const getLocation = async () => {
    setIsLoadingLocation(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Permission to access location was denied");
      setIsLoadingLocation(false);
      return;
    }

    try {
      const locationData = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        
        // Cari nama kota murni dari subregion atau city, lalu bersihkan kata "Kecamatan" jika terselip
        let rawCity = address.subregion || address.city || address.region || "Unknown City";
        
        // Membersihkan teks seperti "Kecamatan Tambun Selatan" menjadi nama kotanya saja
        const cleanCity = rawCity.replace(/kecamatan\s+/i, "").trim();
        
        setLocationCity(cleanCity);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Logika Specs Dinamis (DIPERBAIKI)
  const handleAddSpec = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const handleSpecChange = (index: number, fields: keyof SpecType, text: string) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index][fields] = text;
    setSpecs(updatedSpecs);
  };

  const handleRemoveSpec = (index: number) => {
    // Memperbaiki pemanggilan fungsi agar menghapus baris spec, bukan media file
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // Logika Rental Terms Dinamis (DIPERBAIKI)
  const handleAddTerm = () => {
    setRentalTerms([...rentalTerms, ""]);
  };

  const handleTermChange = (index: number, text: string) => {
    const updatedTerms = [...rentalTerms];
    updatedTerms[index] = text;
    setRentalTerms(updatedTerms);
  };

  const handleRemoveTerm = (index: number) => {
    // Memperbaiki fungsi hapus term agar berjalan dengan benar
    setRentalTerms(rentalTerms.filter((_, i) => i !== index));
  };

  // Publish Data
  const handlePublish = () => {
    if (!title || !price || !locationCity || mediaFiles.length === 0) {
      Alert.alert("Error", "Please fill in all mandatory fields and upload at least 1 media.");
      return;
    }

    const validSpecs = specs.filter((s) => s.label.trim() !== "" && s.value.trim() !== "");
    const validTerms = rentalTerms.filter((t) => t.trim() !== "");

    const newProduct = {
      // DIPERBAIKI: Mengubah id menjadi string (menggunakan toString()) 
      // agar sinkron dengan parameter router saat diakses di halaman detail.
      id: Date.now().toString() as unknown as number, 
      title,
      category: selectedCategory,
      price: `Rp ${parseInt(price).toLocaleString("id-ID")}/day`,
      image: mediaFiles[0], 
      allImages: mediaFiles, 
      rating: 5,
      reviewCount: 0,
      location: locationCity,
      description,
      owner: {
        name: "You (Owner)",
        role: "Verified Renter",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      },
      isUploadedByUser: true,
      specs: validSpecs,
      rentalTerms: validTerms,
    };

    addProduct(newProduct);

    Alert.alert("Success", "Your item has been published successfully!", [
      { text: "OK", onPress: () => router.replace("/(tabs)") }, 
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {/* HEADER */}
      <View style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#E5E7EB" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#111827" }}>Upload Rental Item</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        
        {/* MULTI MEDIA PICKER BOX */}
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 10 }}>Upload Photos & Videos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row", marginBottom: 20 }}>
          <TouchableOpacity onPress={pickMedia} style={{ width: 90, height: 90, borderRadius: 16, borderStyle: "dashed", borderWidth: 2, borderColor: "#49C5B6", backgroundColor: "#EEFDFB", justifyContent: "center", alignItems: "center", marginRight: 12 }}>
            <Ionicons name="camera-outline" size={28} color="#2D8B81" />
            <Text style={{ fontSize: 11, color: "#2D8B81", fontWeight: "600", marginTop: 4 }}>Add Media</Text>
          </TouchableOpacity>

          {mediaFiles.map((uri, index) => (
            <View key={index} style={{ width: 90, height: 90, marginRight: 12, position: "relative" }}>
              <Image source={{ uri }} style={{ width: "100%", height: "100%", borderRadius: 16 }} />
              <TouchableOpacity onPress={() => removeMedia(index)} style={{ position: "absolute", top: -4, right: -4, backgroundColor: "#EF4444", borderRadius: 12, padding: 2 }}>
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* INPUT TITLE */}
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 8 }}>Item Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="e.g., Sony Alpha 7 IV" placeholderTextColor="#9CA3AF" style={{ backgroundColor: "white", borderRadius: 14, padding: 14, color: "#111827", marginBottom: 18 }} />

        {/* CATEGORY SELECTOR */}
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 10 }}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginBottom: 18 }}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: selectedCategory === cat ? "#49C5B6" : "white", marginRight: 10, borderWidth: 1, borderColor: selectedCategory === cat ? "#49C5B6" : "#E5E7EB" }}>
              <Text style={{ color: selectedCategory === cat ? "white" : "#6B7280", fontWeight: "600" }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* INPUT PRICE */}
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 8 }}>Price per Day (Rp)</Text>
        <TextInput value={price} onChangeText={setPrice} keyboardType="number-pad" placeholder="e.g., 150000" placeholderTextColor="#9CA3AF" style={{ backgroundColor: "white", borderRadius: 14, padding: 14, color: "#111827", marginBottom: 18 }} />

        {/* LOCATION */}
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 8 }}>Location (City)</Text>
        <View style={{ flexDirection: "row", marginBottom: 18 }}>
          <TextInput value={locationCity} onChangeText={setLocationCity} placeholder="Click locate button or type city..." placeholderTextColor="#9CA3AF" style={{ flex: 1, backgroundColor: "white", borderRadius: 14, padding: 14, color: "#111827", marginRight: 10 }} />
          <TouchableOpacity onPress={getLocation} disabled={isLoadingLocation} style={{ backgroundColor: "#EEFDFB", paddingHorizontal: 16, borderRadius: 14, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#49C5B6" }}>
            <Ionicons name={isLoadingLocation ? "sync" : "location"} size={22} color="#2D8B81" />
          </TouchableOpacity>
        </View>

        {/* INPUT DESCRIPTION */}
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 8 }}>Description</Text>
        <TextInput value={description} onChangeText={setDescription} multiline numberOfLines={4} placeholder="Tell renters about your item condition, bundles, etc..." placeholderTextColor="#9CA3AF" style={{ backgroundColor: "white", borderRadius: 14, padding: 14, color: "#111827", height: 100, textAlignVertical: "top", marginBottom: 18 }} />

        {/* DYNAMIC FEATURES & SPECS */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>Features & Specs</Text>
          <TouchableOpacity onPress={handleAddSpec} style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="add-circle-outline" size={20} color="#2D8B81" />
            <Text style={{ color: "#2D8B81", fontWeight: "700", marginLeft: 4, fontSize: 14 }}>Add Spec</Text>
          </TouchableOpacity>
        </View>

        {specs.map((spec, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <TextInput value={spec.label} onChangeText={(text) => handleSpecChange(index, "label", text)} placeholder="Label (e.g., Resolution)" placeholderTextColor="#9CA3AF" style={{ flex: 1, backgroundColor: "white", borderRadius: 10, padding: 10, color: "#111827", marginRight: 8 }} />
            <TextInput value={spec.value} onChangeText={(text) => handleSpecChange(index, "value", text)} placeholder="Value (e.g., 24.2 MP)" placeholderTextColor="#9CA3AF" style={{ flex: 1, backgroundColor: "white", borderRadius: 10, padding: 10, color: "#111827", marginRight: 8 }} />
            {specs.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveSpec(index)}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* DYNAMIC RENTAL TERMS */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 12 }}>
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>Rental Terms & Regulations</Text>
          <TouchableOpacity onPress={handleAddTerm} style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="add-circle-outline" size={20} color="#2D8B81" />
            <Text style={{ color: "#2D8B81", fontWeight: "700", marginLeft: 4, fontSize: 14 }}>Add Term</Text>
          </TouchableOpacity>
        </View>

        {rentalTerms.map((term, index) => (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <TextInput value={term} onChangeText={(text) => handleTermChange(index, text)} placeholder="e.g., Must provide identity card / KTP" placeholderTextColor="#9CA3AF" style={{ flex: 1, backgroundColor: "white", borderRadius: 10, padding: 12, color: "#111827", marginRight: 8 }} />
            {rentalTerms.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveTerm(index)}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity onPress={handlePublish} style={{ backgroundColor: "#49C5B6", paddingVertical: 16, borderRadius: 16, justifyContent: "center", alignItems: "center", marginTop: 24, marginBottom: 40, shadowColor: "#49C5B6", shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Publish Item</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}