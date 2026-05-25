import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAppStore } from '../../core/store';
import { Colors, Spacing } from '../../shared/theme';
import { TextHeading, TextBody } from '../../shared/widgets/Typography';
import { Button } from '../../shared/widgets/Button';
import { Input } from '../../shared/widgets/Input';

import { createChildProfile } from '../../core/database';

export default function OnboardingScreen({ navigation }) {
  const setChildProfile = useAppStore((state) => state.setChildProfile);
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    if (name.trim()) {
      setLoading(true);
      try {
        const childData = { name, age: 0 };
        const id = await createChildProfile(childData);
        setChildProfile({ id, ...childData }); 
        navigation.replace('Dashboard');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TextHeading style={styles.title}>Quem vamos acompanhar?</TextHeading>
          <TextBody style={styles.subtitle}>Adicione o perfil da criança para criarmos a timeline inteligente.</TextBody>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Nome da Criança"
            placeholder="Ex: Miguel, Sofia..."
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.footer}>
          <Button 
            title="Continuar" 
            onPress={handleSave} 
            loading={loading}
            disabled={name.trim().length === 0}
          />
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
    padding: Spacing.xl,
  },
  header: {
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.s,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
});
