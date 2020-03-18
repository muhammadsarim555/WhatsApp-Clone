import React from "react";
import {KeyboardAvoidingView, TextInput, Text} from "react-native"

export default function TextInputComponent(props) {
  let { value, onChange, type, title, state, errors } = props;
  return (
    <>
     <KeyboardAvoidingView>
      <TextInput
        label={title}
        keyboardType={type ? type : "default"}
        value={value}
        onChangeText={text => {
          onChange({target: {name: state, value: text}});
        }}
      />
      <Text>{errors}</Text>
    </KeyboardAvoidingView>
    </>
  );
}