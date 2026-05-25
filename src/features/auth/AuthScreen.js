import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useAppStore } from '../../core/store';
import { Colors, Spacing } from '../../shared/theme';
import { TextTitle, TextBody } from '../../shared/widgets/Typography';
import { Button } from '../../shared/widgets/Button';

import { createUserProfile, getUserProfile } from '../../core/database';
import { auth } from '../../core/firebaseConfig';
import { signInAnonymously } from 'firebase/auth';

export default function AuthScreen({ navigation }) {
  const setUser = useAppStore((state) => state.setUser);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Usando autenticação anônima real do Firebase para MVP
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      await createUserProfile(user.uid, 'anonymous@horizon.app', 'Responsável');
      const profile = await getUserProfile(user.uid);
      
      setUser(profile);
      navigation.replace('Onboarding');
    } catch (e) {
      console.error("Erro no AuthScreen: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextTitle style={styles.title}>Little Horizon 🌅</TextTitle>
          <TextBody style={styles.subtitle}>O copiloto da parentalidade inteligente</TextBody>
        </View>
        
        <View style={styles.footer}>
          <Button 
            title="Entrar com Conta Google" 
            onPress={handleLogin} 
            loading={loading}
            style={styles.button}
          />
          <Button 
            title="Criar nova conta" 
            variant="secondary"
            onPress={handleLogin} 
          />
        </View>
      </View>
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
    justifyContent: 'space-between',
    padding: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  footer: {
    width: '100%',
    paddingBottom: Spacing.xl,
  },
  button: {
    marginBottom: Spacing.m,
  }
});
