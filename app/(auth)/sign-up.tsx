import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onSignUpPress = async () => {

  }

  return (
    // <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //     <ScrollView className='flex-1 bg-white' contentContainerStyle={{ flexGrow: 1 }}
    //       keyboardShouldPersistTaps="handled"
    //       showsVerticalScrollIndicator={false}>
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black absolute bottom-5 left-5'>
            Create Your Account
          </Text>
        </View>

        <View className='p-5'>
          {/* Start input */}
          <InputField label={"Name"} placeholder="Enter your name" icon={icons.person} value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })} />
          {/* End input */}
          {/* Start input */}
          <InputField label={"Email"} placeholder="Enter your email" icon={icons.email} value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })} />
          {/* End input */}
          {/* Start input */}
          <InputField secureTextEntry={true} label={"Password"} placeholder="Enter your password" icon={icons.lock} value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })} />
          {/* End input */}

          <CustomButton title='Sign Up' onPress={onSignUpPress} className='mt-6' />

          <OAuth />

          <Link href={"/(auth)/sign-in"} className='font-normal text-base text-center text-neutral-400 my-10'>
            <Text>Already have an account ? </Text>
            <Text className='text-primary'>Log In</Text>
          </Link>
        </View>

        {/* Verfication Modal */}

      </View>
    </KeyboardAwareScrollView>
    //     </ScrollView>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  )
}

export default SignUp
