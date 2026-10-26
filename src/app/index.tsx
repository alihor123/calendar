import { ChevronLeft, ChevronRight, Plus } from '@/assets/icons'
import { EventCard } from '@/components/EventCard'
import EventModal, { type ModalOpen } from '@/components/EventModal'
import { showMessage } from '@/helpers'
import { useStyles } from '@/hooks/useStyles'
import { BlurTargetView } from 'expo-blur'
import { randomUUID } from 'expo-crypto'
import { Image } from 'expo-image'
import { useRef, useState } from 'react'
import { Pressable, ScrollView, Text, View, type ViewInstance } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

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

type Event = {
  title: string
  date: string
  startTime: string
}

const mockEvents: Record<string, Event> = {
  '1': {
    title: 'Лекция по мобильной разработке',
    date: '2026-10-26',
    startTime: '09:00'
  },
  '2': {
    title: 'Лабораторная работа',
    date: '2026-10-26',
    startTime: '14:00'
  },
  '3': {
    title: 'Подготовка к защите',
    date: '2026-10-27',
    startTime: '12:30'
  }
}

export default function Index() {
  const insets = useSafeAreaInsets()

  const styles = useStyles((colors) => ({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    scroll: {
      flex: 1
    },
    content: {
      flex: 1,
      width: '100%',
      maxWidth: 600,
      alignSelf: 'center',
      padding: 24,
      paddingBottom: 0
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
    events: {
      flex: 1,
      marginTop: 24,
      gap: 12
    },
    eventsList: {
      gap: 12,
      paddingBottom: 104
    },
    eventsTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text
    },
    addButton: {
      position: 'absolute',
      right: 18,
      bottom: insets.bottom + 18,
      width: 56,
      height: 56,
      borderRadius: 28,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    addIcon: {
      width: 28,
      height: 28,
      tintColor: colors.onPrimary
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  const [events, setEvents] = useState<Record<string, Event>>(mockEvents)
  const [date, setDate] = useState(() => new Date())

  const dateData = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    monthName: date.toLocaleDateString('ru-RU', { month: 'long' })
  }

  const [selectedDay, setSelectedDay] = useState(dateData.day)
  const [modalOpen, setModalOpen] = useState<ModalOpen>(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const blurTargetRef = useRef<ViewInstance | null>(null)

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

  const selectedDate = `${dateData.year}-${String(dateData.month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
  const filteredEvents = Object.entries(events).filter(([, event]) => event.date === selectedDate)
  const formattedDate = new Date(dateData.year, dateData.month, selectedDay)
    .toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

  function openCreateModal() {
    setEventTitle('')
    setEventDate(new Date(dateData.year, dateData.month, selectedDay).toLocaleDateString('ru-RU'))
    setEventTime('')
    setModalOpen({ type: 'create' })
  }

  function openEditModal(id: string) {
    setEventTitle(events[id].title)
    setEventDate(events[id].date.split('-').reverse().join('.'))
    setEventTime(events[id].startTime)
    setModalOpen({ type: 'edit', id })
  }

  function openDeleteModal(id: string) {
    setEventTitle(events[id].title)
    setModalOpen({ type: 'delete', id })
  }

  function closeModal() {
    setModalOpen(null)
    setEventTitle('')
    setEventDate('')
    setEventTime('')
  }

  function createEvent() {
    if (!eventTitle.trim() || !eventDate.trim() || !eventTime.trim()) {
      showMessage('Заполните все поля')
      return
    }

    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(eventTime.trim())) {
      showMessage('Введите время в формате ЧЧ:ММ от 00:00 до 23:59')
      return
    }

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(eventDate.trim())) {
      showMessage('Введите дату в формате ДД.ММ.ГГГГ')
      return
    }

    const id = randomUUID()

    setEvents(previousEvents => ({
      ...previousEvents,
      [id]: {
        title: eventTitle.trim(),
        date: eventDate.trim().split('.').reverse().join('-'),
        startTime: eventTime.trim()
      }
    }))

    closeModal()
  }

  function previousMonth() {
    setDate(new Date(dateData.year, dateData.month - 1, 1))
    setSelectedDay(1)
  }

  function nextMonth() {
    setDate(new Date(dateData.year, dateData.month + 1, 1))
    setSelectedDay(1)
  }


  return (
    <>
      <BlurTargetView ref={blurTargetRef} style={styles.container}>
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
            {filteredEvents.length > 0 && (
              <View style={styles.events}>
                <Text style={styles.eventsTitle}>События на {formattedDate}</Text>
                <ScrollView style={styles.scroll} contentContainerStyle={styles.eventsList}>
                  {filteredEvents.map(([id, event]) => (
                    <EventCard
                      key={id}
                      event={event}
                      onEdit={() => openEditModal(id)}
                      onDelete={() => openDeleteModal(id)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <Pressable
            onPress={openCreateModal}
            style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]}
          >
            <Image
              source={Plus}
              style={styles.addIcon}
              tintColor={styles.addIcon.tintColor}
              contentFit="contain"
            />
          </Pressable>
        </SafeAreaView>
      </BlurTargetView>
      <EventModal
        modalOpen={modalOpen}
        eventTitle={eventTitle}
        eventDate={eventDate}
        eventTime={eventTime}
        blurTarget={blurTargetRef}
        onChangeTitle={setEventTitle}
        onChangeDate={setEventDate}
        onChangeTime={setEventTime}
        onCreate={createEvent}
        onClose={closeModal}
      />
    </>
  )
}
