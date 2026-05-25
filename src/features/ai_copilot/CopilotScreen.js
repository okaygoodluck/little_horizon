import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Spacing, Border } from '../../shared/theme';
import { TextHeading, TextBody, TextCaption } from '../../shared/widgets/Typography';
import { Input } from '../../shared/widgets/Input';
import { getCopilotChat } from '../../core/ai';

export default function CopilotScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', text: 'Olá! Sou o seu Copiloto Little Horizon. Como posso ajudar com o desenvolvimento ou a rotina do seu filho hoje?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  
  // Guardamos a instância do chat para manter o contexto
  const chatSession = useRef(null);

  useEffect(() => {
    chatSession.current = getCopilotChat();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', text: inputText.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      if (!process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
        throw new Error('Chave de API não configurada.');
      }

      const result = await chatSession.current.sendMessage(userMessage.text);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { id: Date.now().toString() + 'ai', role: 'assistant', text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString() + 'err', 
        role: 'assistant', 
        text: 'Desculpe, tive um problema ao processar sua dúvida. Lembre-se de configurar a variável EXPO_PUBLIC_GEMINI_API_KEY no arquivo .env.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <TextHeading>←</TextHeading>
          </TouchableOpacity>
          <TextHeading style={styles.title}>Assistente SOS</TextHeading>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <TextBody style={[styles.messageText, msg.role === 'user' ? styles.userMessageText : {}]}>
                {msg.text}
              </TextBody>
            </View>
          ))}
          {loading && (
            <View style={[styles.bubble, styles.aiBubble, styles.loadingBubble]}>
              <ActivityIndicator color={Colors.primary} size="small" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputArea}>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Ex: O bebê não dorme há 2 horas..."
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
            />
          </View>
          <TouchableOpacity 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
            onPress={handleSend}
            disabled={!inputText.trim() || loading}
          >
            <TextBody style={styles.sendButtonText}>Enviar</TextBody>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  backButton: {
    marginRight: Spacing.m,
    padding: Spacing.xs,
  },
  title: {
    fontSize: 22,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: Spacing.m,
  },
  bubble: {
    maxWidth: '80%',
    padding: Spacing.m,
    borderRadius: Border.radius_m,
    marginBottom: Spacing.m,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  loadingBubble: {
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.xl,
  },
  messageText: {
    fontSize: 15,
  },
  userMessageText: {
    color: '#fff',
  },
  inputArea: {
    flexDirection: 'row',
    padding: Spacing.m,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    marginRight: Spacing.s,
  },
  input: {
    marginBottom: 0, 
  },
  sendButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: Border.radius_pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
