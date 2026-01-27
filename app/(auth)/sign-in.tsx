import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import OAuth from '@/components/OAuth'
import { icons, images } from '@/constants'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'


const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-[250px]'>
          <Image source={images.signUpCar} className='z-0 w-full h-[250px]' />
          <Text className='text-2xl text-black absolute bottom-5 left-5'>
            Welcome
          </Text>
        </View>
        <View className='p-5'>
          {/* Start input */}
          <InputField label={"Email"} placeholder="Enter your email" icon={icons.email} value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })} />
          {/* End input */}
          {/* Start input */}
          <InputField secureTextEntry={true} label={"Password"} placeholder="Enter your password" icon={icons.lock} value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })} />
          {/* End input */}

          <CustomButton title='Login' className='mt-6' />

          <OAuth />

          <Link href={"/(auth)/sign-in"} className='font-normal text-base text-center text-neutral-400 my-10'>
            <Text>Don't have an account ? </Text>
            <Text className='text-primary'>Sign Up</Text>
          </Link>
        </View>

        {/* Verfication Modal */}

      </View>
    </ScrollView>
  )
}

export default SignIn

