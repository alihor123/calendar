import { Pencil, Trash } from '@/assets/icons'
import { useStyles } from '@/hooks/useStyles'
import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'

type EventCardProps = {
  event: {
    title: string
    startTime: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const styles = useStyles((colors) => ({
    event: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12
    },
    eventContent: {
      flex: 1,
      minWidth: 0,
      gap: 6
    },
    eventTitle: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: '600',
      color: colors.text
    },
    eventTime: {
      fontSize: 14,
      color: colors.textSecondary
    },
    eventActions: {
      flexDirection: 'row',
      gap: 4
    },
    eventActionButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center'
    },
    eventEditIcon: {
      width: 20,
      height: 20,
      tintColor: colors.primary
    },
    eventDeleteIcon: {
      width: 20,
      height: 20,
      tintColor: colors.error
    },
    buttonPressed: {
      opacity: 0.6
    }
  }))

  return (
    <View style={styles.event}>
      <View style={styles.eventContent}>
        <Text style={styles.eventTime}>{event.startTime}</Text>
        <Text style={styles.eventTitle}>{event.title}</Text>
      </View>
      <View style={styles.eventActions}>
        <Pressable
          onPress={onEdit}
          style={({ pressed }) => [styles.eventActionButton, pressed && styles.buttonPressed]}
        >
          <Image
            source={Pencil}
            style={styles.eventEditIcon}
            tintColor={styles.eventEditIcon.tintColor}
            contentFit="contain"
          />
        </Pressable>
        <Pressable
          onPress={onDelete}
          style={({ pressed }) => [styles.eventActionButton, pressed && styles.buttonPressed]}
        >
          <Image
            source={Trash}
            style={styles.eventDeleteIcon}
            tintColor={styles.eventDeleteIcon.tintColor}
            contentFit="contain"
          />
        </Pressable>
      </View>
    </View>
  )
}
