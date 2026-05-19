import React from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Alert // 💡 TAMBAHAN: Buat pop-up konfirmasi hapus
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// 1. Ambil context produk global lu (ditambahkan fungsi deleteProduct)
import { useProducts } from "../../context/ProductContext"; 

export default function MyProductsScreen() {
  const router = useRouter();
  // 💡 SEKARANG KITA AMBIL deleteProduct JUGA DARI CONTEXT
  const { products, deleteProduct } = useProducts();

  // 2. FILTER PRODUK: Menggunakan filter Dina Amelia yang kemarin udah berhasil jalan
  const myUploadedProducts = products.filter((product) => {
    if (typeof product.owner === "string") {
      return product.owner === "Dina Amelia" || product.isUploadedByUser === true;
    }
    if (product.owner && typeof product.owner === "object") {
      return product.owner.name === "Dina Amelia" || product.isUploadedByUser === true;
    }
    return product.isUploadedByUser === true;
  });

  // 💡 FUNGSI POP-UP KONFIRMASI HAPUS
  const handleDeletePress = (id: string | number, title: string) => {
    Alert.alert(
      "Hapus Produk",
      `Apakah anda yakin mau menghapus "${title}" dari daftar sewa, cok?`,
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Hapus", 
          style: "destructive", 
          onPress: () => deleteProduct(id) // Eksekusi hapus lewat ProductContext
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      {/* HEADER */}
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        paddingHorizontal: 20, 
        paddingVertical: 16, 
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB"
      }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#111827" }}>My Products</Text>
      </View>

      {/* LIST PRODUK */}
      {myUploadedProducts.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Ionicons name="cube-outline" size={64} color="#9CA3AF" style={{ marginBottom: 16 }} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#4B5563", textAlign: "center" }}>
            Belum ada produk yang anda upload.
          </Text>
          <Text style={{ fontSize: 14, color: "#9CA3AF", textAlign: "center", marginTop: 4 }}>
            Produk yang anda tambahin lewat menu upload bakal muncul di sini.
          </Text>
        </View>
      ) : (
        <FlatList
          data={myUploadedProducts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                padding: 14,
                borderRadius: 20,
                marginBottom: 14,
                shadowColor: "#000",
                shadowOpacity: 0.02,
                shadowRadius: 6,
                elevation: 2,
                alignItems: "center"
              }}
            >
              {/* BAGIAN KIRI & TENGAH (KLIK UNTUK LIHAT DETAIL PRODUK) */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push(`/product/${item.id}`)}
                style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
              >
                <Image 
                  source={{ uri: item.image }} 
                  style={{ width: 70, height: 70, borderRadius: 14, marginRight: 16, backgroundColor: "#F3F4F6" }} 
                />
                
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#49C5B6", textTransform: "uppercase", marginBottom: 4 }}>
                    {item.category}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: "#2D8B81", marginTop: 6 }}>
                    {item.price}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* 💡 TOMBOL TEMPAT SAMPAH (HAPUS) DI SEBELAH KANAN LIST */}
              <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => handleDeletePress(item.id, item.title)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "#FEF2F2",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8
                }}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}