import { Pressable, Text, View } from 'react-native'
import type { EventModalStyles } from '.'

type DeleteEventContentProps = {
  styles: EventModalStyles
  eventTitle: string
  isEventSaving: boolean
  onDelete: () => void
  onClose: () => void
}

export function DeleteEventContent({ styles, eventTitle, isEventSaving, onDelete, onClose }: DeleteEventContentProps) {
  return (
    <>
      <Text style={styles.modalMessage} numberOfLines={3}>
        Удалить событие «{eventTitle}»?
      </Text>
      <View style={styles.modalActions}>
        <Pressable
          onPress={onClose}
          disabled={isEventSaving}
          style={({ pressed }) => [
            styles.modalButton,
            styles.modalCancelButton,
            pressed && styles.buttonPressed,
            isEventSaving && styles.buttonDisabled
          ]}
        >
          <Text style={[styles.modalButtonText, styles.modalCancelText]}>Отмена</Text>
        </Pressable>
        <Pressable
          onPress={onDelete}
          disabled={isEventSaving}
          style={({ pressed }) => [
            styles.modalButton,
            styles.modalDeleteButton,
            pressed && styles.buttonPressed,
            isEventSaving && styles.buttonDisabled
          ]}
        >
          <Text style={styles.modalButtonText}>Удалить</Text>
        </Pressable>
      </View>
    </>
  )
}
