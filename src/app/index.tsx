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
      marginTop: 24
    },
    weekDay: {
      width: `${100 / 7}%`,
      textAlign: 'center',
      fontSize: 14,
      color: colors.textSecondary
    },
    monthDays: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 12
    },
    monthDay: {
      width: `${100 / 7}%`,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center'
    },
    monthDayText: {
      fontSize: 16,
      color: colors.text
    },
    dayCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center'
    },
    todayDay: {
      backgroundColor: colors.surfaceSoft
    },
    todayDayText: {
      color: colors.onSurfaceSoft
    },
    selectedDay: {
      backgroundColor: colors.primary
    },
    selectedDayText: {
      color: colors.onPrimary
    },
    previousDayText: {
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

  const [selectedDay, setSelectedDay] = useState(dateData.day)

  const today = new Date()
  const todayDay = dateData.year === today.getFullYear() && dateData.month === today.getMonth()
    ? today.getDate()
    : null

  const daysInMonth = new Date(dateData.year, dateData.month + 1, 0).getDate()
  const MonthDays = new Array(daysInMonth).fill(null).map((_, index) => (index + 1))

  const previousMonthDate = new Date(dateData.year, dateData.month, 0)
  const previousMonthDays = previousMonthDate.getDate()
  const offset = previousMonthDate.getDay()

  const previousDays = new Array(offset)
    .fill(null)
    .map((_, index) => previousMonthDays - offset + index + 1)

  function previousMonth() {
    setDate(new Date(dateData.year, dateData.month - 1, 1))
    setSelectedDay(1)
  }

  function nextMonth() {
    setDate(new Date(dateData.year, dateData.month + 1, 1))
    setSelectedDay(1)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable style={({ pressed }) => [styles.monthButton, pressed && styles.buttonPressed]} onPress={previousMonth}>
            <Image
              source={ChevronLeft}
              style={styles.monthIcon}
              tintColor={styles.monthIcon.tintColor}
              contentFit="contain"
            />
          </Pressable>
          <Text style={styles.monthTitle}>{dateData.monthName} {dateData.year}</Text>
          <Pressable style={({ pressed }) => [styles.monthButton, pressed && styles.buttonPressed]} onPress={nextMonth}>
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
        <View style={styles.monthDays}>
          {previousDays.map(day => (
            <View key={`previous-${day}`} style={styles.monthDay}>
              <Text style={[styles.monthDayText, styles.previousDayText]}>{day}</Text>
            </View>
          ))}
          {MonthDays.map(day => (
            <Pressable
              key={`current-${day}`}
              style={styles.monthDay}
              onPress={() => setSelectedDay(day)}
            >
              <View style={[
                styles.dayCircle,
                selectedDay !== day && todayDay === day && styles.todayDay,
                selectedDay === day && styles.selectedDay
              ]}>
                <Text style={[
                  styles.monthDayText,
                  selectedDay !== day && todayDay === day && styles.todayDayText,
                  selectedDay === day && styles.selectedDayText
                ]}>{day}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
