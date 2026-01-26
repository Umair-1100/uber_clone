import { Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Home = () => {

  const handlePress = () => {
     alert("Hello world");
  }
  return (
    <SafeAreaView style={{paddingVertical: 10}}>
      <Text>Hello World</Text>
      <Button onPress={handlePress} title='Check kar' />
    </SafeAreaView>
  )
}

export default Home