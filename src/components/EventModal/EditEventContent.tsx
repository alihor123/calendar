import { Pressable, Text, TextInput, View } from 'react-native'
import type { EventModalStyles } from '.'

type EditEventContentProps = {
  styles: EventModalStyles
  eventTitle: string
  eventDate: string
  eventTime: string
  onChangeTitle: (value: string) => void
  onChangeDate: (value: string) => void
  onChangeTime: (value: string) => void
  onClose: () => void
}

export function EditEventContent({ styles, eventTitle, eventDate, eventTime, onChangeTitle, onChangeDate, onChangeTime, onClose }: EditEventContentProps) {
  return (
    <>
      <TextInput
        style={styles.input}
        value={eventTitle}
        onChangeText={onChangeTitle}
        placeholder="Название события"
        placeholderTextColor={styles.inputPlaceholder.color}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        value={eventDate}
        onChangeText={onChangeDate}
        placeholder="Дата (ДД.ММ.ГГГГ)"
        placeholderTextColor={styles.inputPlaceholder.color}
        maxLength={10}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        value={eventTime}
        onChangeText={onChangeTime}
        placeholder="Время начала (ЧЧ:ММ)"
        placeholderTextColor={styles.inputPlaceholder.color}
        maxLength={5}
        returnKeyType="done"
      />
      <View style={styles.modalActions}>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [styles.modalButton, styles.modalCancelButton, pressed && styles.buttonPressed]}
        >
          <Text style={[styles.modalButtonText, styles.modalCancelText]}>Отмена</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.modalButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.modalButtonText}>Сохранить</Text>
        </Pressable>
      </View>
    </>
  )
}
