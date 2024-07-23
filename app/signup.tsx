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
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { signUp } = useSignUp();
  const router = useRouter();
  const handleChangeCountryCode = (value: string) => {
    setCountryCode(value);
  };

  const handleChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };
  const onSignUp = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    router.push({
      pathname: "/verify/[phone]",
      params: { phone: fullPhoneNumber },
    });
    // try {
    //   await signUp!.create({
    //     phoneNumber: fullPhoneNumber,
    //   });
    //   router.push({
    //     pathname: "/verify/[phone]",
    //     params: { phone: fullPhoneNumber },
    //   });
    // } catch (error) {
    //   console.log("Error sign up", error);
    // }
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let get's started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number.We will send you a confirmation code there
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
          style={[styles.input, { flex: 3 }]}
          placeholder="Mobile Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={handleChangePhoneNumber}
        />
      </View>
      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </Link>

      <View style={{ flex: 1 }}></View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enable : styles.disable,
          { marginBottom: 20 },
        ]}
      >
        <Text style={defaultStyles.buttonText} onPress={onSignUp}>
          Sign Up
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

export default SignUp;
