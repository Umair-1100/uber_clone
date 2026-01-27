import { InputFieldProps } from "@/types/type"
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"

const InputField = ({
    label,
    labelStyle,
    placeholder,
    icon,
    secureTextEntry = false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
} : InputFieldProps ) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <Text className={`text-base mb-3 ${labelStyle}`}>{label}</Text>
                    <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary ${containerStyle}`}>
                        {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                        <TextInput
                            className={`rounded-full text-sm p-4 text-[15px] flex-1 text-left ${inputStyle}`}
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField
