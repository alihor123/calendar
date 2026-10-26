import { ChevronLeft, ChevronRight } from '@/assets/icons'
import { useStyles } from '@/hooks/useStyles'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const weekDays: Record<number, string> = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  0: 'Вс'
}

const days = [...Object.values(weekDays).slice(1), Object.values(weekDays)[0]]

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
      textTransform: 'capitalize',
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
    weekDays: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24
    },
    weekDay: {
      flex: 1,
      textAlign: 'center',
      fontSize: 14,
      color: colors.textSecondary
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  const [date, setDate] = useState(() => new Date())

  const dateData = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    monthName: date.toLocaleDateString('ru-RU', { month: 'long' })
  }

  const daysInMonth = new Date(dateData.year, dateData.month + 1, 0).getDate()
  const monthDays = new Array(daysInMonth).fill(null).map((_, index) => (index + 1))

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
          <Text style={styles.monthTitle}>{dateData.monthName} {dateData.year}</Text>
          <Pressable style={({ pressed }) => [styles.monthButton, pressed && styles.buttonPressed]}>
            <Image
              source={ChevronRight}
              style={styles.monthIcon}
              tintColor={styles.monthIcon.tintColor}
              contentFit="contain"
            />
          </Pressable>
        </View>
        <View style={styles.weekDays}>
          {days.map(day => (
            <Text key={day} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
