import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAppStore } from '../../core/store';
import { Colors, Spacing } from '../../shared/theme';
import { TextHeading, TextSubheading, TextBody, TextCaption } from '../../shared/widgets/Typography';
import { Card } from '../../shared/widgets/Card';
import { ProgressBar } from '../../shared/widgets/ProgressBar';

export default function DashboardScreen({ navigation }) {
  const childProfile = useAppStore((state) => state.childProfile);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <TextCaption style={styles.greeting}>Olá, responsável do(a) {childProfile?.name || 'Bebê'}</TextCaption>
          <TextHeading style={styles.title}>Foco do Mês</TextHeading>
        </View>

        <Card style={styles.progressCard}>
          <TextSubheading style={styles.cardTitle}>Índice de Desenvolvimento</TextSubheading>
          <ProgressBar progress={80} color={Colors.success} height={12} />
          <TextBody style={styles.cardSubtitle}>Semana fantástica! Continue com os estímulos.</TextBody>
        </Card>

        <View style={styles.section}>
          <TextHeading style={styles.sectionTitle}>O que fazer este mês?</TextHeading>
          
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Activities')}>
            <Card padding={Spacing.m} style={styles.taskCard}>
              <View style={styles.taskIconContainer}>
                <TextHeading>👀</TextHeading>
              </View>
              <View style={styles.taskInfo}>
                <TextSubheading>Brincadeiras e Estímulos</TextSubheading>
                <TextCaption>1 de 3 feitos hoje</TextCaption>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Vaccines')}>
            <Card padding={Spacing.m} style={styles.taskCard}>
              <View style={styles.taskIconContainer}>
                <TextHeading>🛡️</TextHeading>
              </View>
              <View style={styles.taskInfo}>
                <TextSubheading>Vacinas (Ver Calendário)</TextSubheading>
                <TextCaption style={{color: Colors.error}}>2 Atrasadas - Avalie SUS vs Particular</TextCaption>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Journal')}>
            <Card padding={Spacing.m} style={styles.taskCard}>
              <View style={styles.taskIconContainer}>
                <TextHeading>💤</TextHeading>
              </View>
              <View style={styles.taskInfo}>
                <TextSubheading>Rotina de Sono / Diário</TextSubheading>
                <TextCaption>Registros de hoje: 1</TextCaption>
              </View>
            </Card>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Copilot')}
        activeOpacity={0.9}
      >
        <TextHeading style={styles.fabIcon}>🤖</TextHeading>
      </TouchableOpacity>
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
  content: {
    padding: Spacing.m,
  },
  header: {
    marginTop: Spacing.l,
    marginBottom: Spacing.m,
  },
  greeting: {
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  title: {
    color: Colors.textPrimary,
  },
  progressCard: {
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    marginBottom: Spacing.m,
  },
  cardSubtitle: {
    marginTop: Spacing.m,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.m,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.s,
  },
  taskIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.m,
  },
  taskInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 28,
  }
});
