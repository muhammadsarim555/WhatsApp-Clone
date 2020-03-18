import React, {useState} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import {validation, defaultValues} from './validation';
import useForm from './../../components/UseForm';
import TextInputComponent from './../../components/TextInput';

export default function FromExample() {
  const {errors, handleSubmit, handleChange, values, setValues} = useForm(
    submit,
    validation,
    defaultValues,
  );

  function submit() {
    // will run if no validation errors
    alert(JSON.stringify(values));
  }

  return (
    <View stle={{flex: 1}}>
      <ScrollView stle={{flex: 1}}>
        <Text>something</Text>
        <TextInputComponent
          value={values.full_name}
          onChange={handleChange}
          title="Full Name"
          state="full_name"
          errors={errors.full_name}
        />
        <TextInputComponent
          value={values.contact_no}
          onChange={handleChange}
          title="contact_no"
          state="contact_no"
          errors={errors.contact_no}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
}
