import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { defaultStyles } from "@/constants/Styles";

const Phone = () => {
  const { phone, signin } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, []);
  const verifyCode = () => {};
  const verifySignIn = () => {};
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code send to {phone} unless you already have an account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Phone;
