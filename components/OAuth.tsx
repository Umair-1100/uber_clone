import { Image, Text, View } from "react-native"
import CustomButton from "./CustomButton"
import { icons } from "@/constants"

const OAuth = () => {

    const handleGoogleSignIn = async () => {
                
    }
  return (
      <View>
        <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
            <View className="flex-1 h-px bg-neutral-200" />
            <Text className="text-base mx-4">Or</Text>
            <View className="flex-1 h-px bg-neutral-200" />
        </View>

        <CustomButton title="Log in with google" onPress={handleGoogleSignIn} bgVariant="outline" textVariant="primary" className="mt-5 w-full shadow-none" IconLeft={() => (
             <Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />
        )} />
      </View>  
  )
}

export default OAuth
