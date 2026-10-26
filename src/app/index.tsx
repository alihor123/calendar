import { ChevronLeft, ChevronRight } from '@/assets/icons'
import { useStyles } from '@/hooks/useStyles'
import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  const styles = useStyles((colors) => ({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    content: {
      width: '100%',
      maxWidth: 600,
      alignSelf: 'center',
      padding: 24
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    monthTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text
    },
    monthButton: {
      width: 44,
      height: 44,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center'
    },
    monthIcon: {
      width: 24,
      height: 24,
      tintColor: colors.primary
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable style={({ pressed }) => [styles.monthButton, pressed && styles.buttonPressed]}>
            <Image
              source={ChevronLeft}
              style={styles.monthIcon}
              tintColor={styles.monthIcon.tintColor}
              contentFit="contain"
            />
          </Pressable>
          <Text style={styles.monthTitle}>Октябрь 2026</Text>
          <Pressable style={({ pressed }) => [styles.monthButton, pressed && styles.buttonPressed]}>
            <Image
              source={ChevronRight}
              style={styles.monthIcon}
              tintColor={styles.monthIcon.tintColor}
              contentFit="contain"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
