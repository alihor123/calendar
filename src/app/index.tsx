import { useStyles } from '@/hooks/useStyles'
import { View } from 'react-native'

export default function Index() {
  const styles = useStyles((colors) => ({
    container: {
      flex: 1,
      backgroundColor: colors.background
    }
  }))

  return <View style={styles.container} />
}
