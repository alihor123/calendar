import { Pressable, Text, View } from 'react-native'
import type { EventModalStyles } from '.'

type DeleteEventContentProps = {
  styles: EventModalStyles
  eventTitle: string
  onClose: () => void
}

export function DeleteEventContent({ styles, eventTitle, onClose }: DeleteEventContentProps) {
  return (
    <>
      <Text style={styles.modalMessage} numberOfLines={3}>
        Удалить событие «{eventTitle}»?
      </Text>
      <View style={styles.modalActions}>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [styles.modalButton, styles.modalCancelButton, pressed && styles.buttonPressed]}
        >
          <Text style={[styles.modalButtonText, styles.modalCancelText]}>Отмена</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.modalButton, styles.modalDeleteButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.modalButtonText}>Удалить</Text>
        </Pressable>
      </View>
    </>
  )
}
