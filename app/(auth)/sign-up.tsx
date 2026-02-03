import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ReactNativeModal } from "react-native-modal"

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: ''
  });



  const onSignUpPress = async () => {
    if (!isLoaded) return
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setVerification({
        ...verification,
        state: "pending"
      })
    } catch (err) {
      Alert.alert("Error", err.errors[0].longMessage)
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code
      })

      if (signUpAttempt.status === 'complete') {
        // TODO: Create a database user!
        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({
          ...verification, state: "success"
        })
      } else {
        setVerification({
          ...verification, error: "Verification Failed", state: "failed"
        })
      }
    } catch (err) {
      setVerification({
        ...verification, error: err.errors[0].longMessage, state: "failed"
      })
    }
  }


  return (
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

        {/* Pending Modal */}
        <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={
          () => {
            if (verification.state === "success") {
              setShowSuccessModal(true)
              setVerification({ ...verification, state: "success" })
            }
          }
        }>
          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Text className='text-2xl  mb-2'>Verification</Text>
            <Text className='mb-4 text-base'>
              We've sent a verification code to {form.email}</Text>

            <InputField onChange={(code) => setVerification({ ...verification, code })} icon={icons.lock} placeholder='12345' label='Code' value={verification.code} keyboardType='numeric' />

            {verification.error && (
              <Text className='text-red-500 text-sm mt-1'>
                {verification.error}
              </Text>
            )}

            <CustomButton className='mt-5 bg-green-500' title='Verify Email' onPress={onVerifyPress} />
          </View>
        </ReactNativeModal>


        {/* Verfication Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className='bg-white px-7 py-9 rounded-2xl min-h-[300px]'>
            <Image source={images.check} className='w-[110px] h-[110px] mx-auto my-5' />
            <Text className='text-2xl text-center'>
              Verified
            </Text>
            <Text className='text-sm text-gray-400 text-center mt-3'>
              You have successfully verified your account.
            </Text>
            <CustomButton className='mt-5' title='Browse Home' onPress={() => {
              setShowSuccessModal(false)
              router.push("/(root)/(tabs)/home")
            }} />
          </View>
        </ReactNativeModal>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SignUp
