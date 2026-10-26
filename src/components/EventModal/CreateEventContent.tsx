import { Pressable, Text, TextInput, View } from 'react-native'
import type { EventModalStyles } from '.'

type CreateEventContentProps = {
  styles: EventModalStyles
  eventTitle: string
  eventDate: string
  eventTime: string
  isEventSaving: boolean
  onChangeTitle: (value: string) => void
  onChangeDate: (value: string) => void
  onChangeTime: (value: string) => void
  onSave: () => void
  onClose: () => void
}

export function CreateEventContent({ styles, eventTitle, eventDate, eventTime, isEventSaving, onChangeTitle, onChangeDate, onChangeTime, onSave, onClose }: CreateEventContentProps) {
  return (
    <>
      <TextInput
        style={styles.input}
        value={eventTitle}
        onChangeText={onChangeTitle}
        placeholder="Название события"
        placeholderTextColor={styles.inputPlaceholder.color}
        editable={!isEventSaving}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        value={eventDate}
        onChangeText={onChangeDate}
        placeholder="Дата (ДД.ММ.ГГГГ)"
        placeholderTextColor={styles.inputPlaceholder.color}
        maxLength={10}
        editable={!isEventSaving}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        value={eventTime}
        onChangeText={onChangeTime}
        placeholder="Время начала (ЧЧ:ММ)"
        placeholderTextColor={styles.inputPlaceholder.color}
        maxLength={5}
        editable={!isEventSaving}
        returnKeyType="done"
      />
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
          onPress={onSave}
          disabled={isEventSaving}
          style={({ pressed }) => [
            styles.modalButton,
            pressed && styles.buttonPressed,
            isEventSaving && styles.buttonDisabled
          ]}
        >
          <Text style={styles.modalButtonText}>Сохранить</Text>
        </Pressable>
      </View>
    </>
  )
}
