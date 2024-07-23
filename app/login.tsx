import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";

import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { signIn } = useSignIn();

  const handleChangeCountryCode = (value: string) => {
    setCountryCode(value);
  };

  const handleChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };
  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => factor.strategy === "phone_code"
        );
        const { phoneNumberId } = firstPhoneFactor;
        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (error) {
        console.log("Error", error);
      }
    }
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Welcome Back</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number associated with your account
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Country Code"
          placeholderTextColor={Colors.gray}
          value={countryCode}
          onChangeText={handleChangeCountryCode}
        />
        <TextInput
          style={[styles.input, { flex: 5 }]}
          placeholder="Mobile Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handleChangePhoneNumber}
        />
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enable : styles.disable,
          { marginBottom: 20 },
        ]}
        onPress={() => onSignIn(SignInType.Phone)}
      >
        <Text style={defaultStyles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.gray,
          }}
        />
        <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.gray,
          }}
        />
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            flexDirection: "row",
            gap: 16,
            marginTop: 20,
            backgroundColor: "white",
          },
        ]}
        onPress={() => onSignIn(SignInType.Email)}
      >
        <Ionicons name="mail" size={24} color={"#000"} />
        <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
          Continue with email
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            flexDirection: "row",
            gap: 16,
            marginTop: 20,
            backgroundColor: "white",
          },
        ]}
        onPress={() => onSignIn(SignInType.Google)}
      >
        <Ionicons name="logo-google" size={24} color={"#000"} />
        <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
          Continue with google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            flexDirection: "row",
            gap: 16,
            marginTop: 20,
            backgroundColor: "white",
          },
        ]}
        onPress={() => onSignIn(SignInType.Apple)}
      >
        <Ionicons name="logo-apple" size={24} color={"#000"} />
        <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
          Continue with apple
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enable: {
    backgroundColor: Colors.primary,
  },
  disable: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Login;
