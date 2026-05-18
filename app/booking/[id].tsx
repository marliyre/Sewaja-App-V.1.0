import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { products as items } from "../../data/product"; // Sesuaikan path jika berbeda

export default function BookingForm() {
  const { id } = useLocalSearchParams();
  const [rentDays, setRentDays] = useState(1);
  const [notes, setNotes] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Cari data produk berdasarkan ID
  const product = items.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // Mengubah string harga (misal: "Rp 150.000/day") menjadi angka murni untuk kalkulasi
  const pricePerDay = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 0;
  const totalPrice = pricePerDay * rentDays;

  // Fungsi format mata uang Rupiah
  const formatRupiah = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  // Fungsi penanganan setelah sukses membayar
  const handleSuccessRedirect = () => {
    setShowSuccessModal(false);
    // Mengembalikan user langsung ke halaman detail produk sebelumnya
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#111827" }}>
          Rental Confirmation
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
        {/* PRODUCT SUMMARY CARD */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 18,
            padding: 14,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Image
            source={{ uri: product.image }}
            style={{ width: 90, height: 90, borderRadius: 12, marginRight: 16 }}
          />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ color: "#49C5B6", fontWeight: "700", fontSize: 13, marginBottom: 4 }}>
              {product.category}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 6 }} numberOfLines={1}>
              {product.title}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#2D8B81" }}>
              {product.price}
            </Text>
          </View>
        </View>

        {/* RENTAL DURATION SELECTOR */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12 }}>
          Rental Duration
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <Text style={{ color: "#6B7280", fontWeight: "500" }}>Total Days</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => rentDays > 1 && setRentDays(rentDays - 1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#F3F4F6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="remove" size={18} color="#111827" />
            </TouchableOpacity>
            
            <Text style={{ marginHorizontal: 18, fontSize: 16, fontWeight: "700", color: "#111827" }}>
              {rentDays}
            </Text>

            <TouchableOpacity
              onPress={() => setRentDays(rentDays + 1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#EEFDFB",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={18} color="#2D8B81" />
            </TouchableOpacity>
          </View>
        </View>

        {/* NOTES INPUT */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12 }}>
          Notes (Optional)
        </Text>
        <TextInput
          placeholder="e.g., Please ensure the cable length is 2 meters..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            height: 100,
            textAlignVertical: "top",
            color: "#111827",
            marginBottom: 24,
          }}
        />

        {/* PRICE DETAILS */}
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12 }}>
          Price Details
        </Text>
        <View style={{ backgroundColor: "white", borderRadius: 16, padding: 18, marginBottom: 40 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: "#6B7280" }}>Rental Fee ({rentDays} Days)</Text>
            <Text style={{ color: "#111827", fontWeight: "500" }}>{formatRupiah(totalPrice)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: "#6B7280" }}>Service Fee</Text>
            <Text style={{ color: "#111827", fontWeight: "500" }}>Rp 0</Text>
          </View>
          <View style={{ height: 1, backgroundColor: "#E5E7EB", marginVertical: 6 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text style={{ color: "#111827", fontWeight: "700" }}>Total Payment</Text>
            <Text style={{ color: "#2D8B81", fontWeight: "800", fontSize: 16 }}>{formatRupiah(totalPrice)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        }}
      >
        <TouchableOpacity
          onPress={() => setShowSuccessModal(true)}
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
          <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>
            Confirm & Pay
          </Text>
        </TouchableOpacity>
      </View>

      {/* PROFESSIONAL SUCCESS MODAL */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(17, 24, 39, 0.6)", // Backdrop gelap transparan
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: 28,
              padding: 24,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 15,
              elevation: 8,
            }}
          >
            {/* LINGKARAN IKON SUKSES */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#EEFDFB",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Ionicons name="checkmark-circle" size={48} color="#49C5B6" />
            </View>

            {/* TEKS INFORMASI */}
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: "#111827",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Booking Successful!
            </Text>
            
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
                lineHeight: 20,
                marginBottom: 24,
                paddingHorizontal: 10,
              }}
            >
              Your item rental has been successfully processed for {rentDays} days. Please stay in touch with the owner.
            </Text>

            {/* TOMBOL KEMBALI KE DETAIL */}
            <TouchableOpacity
              onPress={handleSuccessRedirect}
              style={{
                backgroundColor: "#111827",
                width: "100%",
                paddingVertical: 16,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
                Back to Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}