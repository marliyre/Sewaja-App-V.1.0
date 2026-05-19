import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ProductProvider } from "../context/ProductContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { WishlistProvider } from "../context/WishlistContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ProductProvider>
      <WishlistProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* TAB UTAMA (Isinya Home, Wishlist, Upload, Chat, Profile) */}
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />

            {/* DETAIL PRODUK */}
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
            />

            {/* CONFIRMATION & BOOKING FORM */}
            <Stack.Screen
              name="booking/[id]"
              options={{ headerShown: false }}
            />

            {/* MODAL BAWAAN */}
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                title: "Modal",
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </WishlistProvider>
    </ProductProvider>
  );
}