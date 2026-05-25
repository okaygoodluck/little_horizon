import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Border } from '../../shared/theme';
import { TextHeading, TextSubheading, TextBody, TextCaption } from '../../shared/widgets/Typography';
import { Card } from '../../shared/widgets/Card';
import { ProgressBar } from '../../shared/widgets/ProgressBar';
import { ACTIVITIES_CATALOG, mockDailyProgress } from './activitiesData';

export default function ActivitiesScreen({ navigation }) {
  const [completed, setCompleted] = useState(mockDailyProgress.completedIds);

  const toggleActivity = (id) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const getFilteredActivities = () => {
    // Para o MVP, filtramos atividades para um bebê de 0-3 meses
    const babyAgeMonths = 2; // Virá do Profile
    return ACTIVITIES_CATALOG.filter(a => babyAgeMonths >= a.minAgeMonths && babyAgeMonths <= a.maxAgeMonths);
  };

  const activities = getFilteredActivities();
  const progressPercent = Math.round((completed.length / activities.length) * 100) || 0;

  const renderActivity = (activity) => {
    const isDone = completed.includes(activity.id);

    return (
      <Card key={activity.id} style={[styles.card, isDone && styles.cardDone]}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <TextHeading>{activity.icon}</TextHeading>
          </View>
          <View style={styles.titleArea}>
            <TextSubheading style={isDone && styles.textDone}>{activity.title}</TextSubheading>
            <View style={styles.tagsRow}>
              <TextCaption style={styles.tag}>{activity.category}</TextCaption>
              <TextCaption style={styles.tagTime}>⏱ {activity.duration}</TextCaption>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.checkbox, isDone && styles.checkboxActive]}
            onPress={() => toggleActivity(activity.id)}
          >
            {isDone && <TextBody style={styles.checkIcon}>✓</TextBody>}
          </TouchableOpacity>
        </View>

        <TextBody style={styles.instructions}>{activity.instructions}</TextBody>
        
        <View style={styles.benefitsBox}>
          <TextCaption style={styles.benefitsTitle}>Por que é importante?</TextCaption>
          <TextCaption style={styles.benefitsText}>{activity.benefits}</TextCaption>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <TextHeading>←</TextHeading>
        </TouchableOpacity>
        <TextHeading style={styles.title}>Estímulos do Dia</TextHeading>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.progressContainer}>
          <TextSubheading style={styles.progressTitle}>Progresso Diário</TextSubheading>
          <ProgressBar progress={progressPercent} color={Colors.primary} height={12} />
          <TextCaption style={styles.progressLabel}>
            {completed.length} de {activities.length} brincadeiras feitas
          </TextCaption>
        </View>

        <TextHeading style={styles.sectionTitle}>Recomendado para Hoje</TextHeading>
        {activities.map(renderActivity)}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.m,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    marginRight: Spacing.m,
    padding: Spacing.xs,
  },
  title: {
    fontSize: 22,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.m,
  },
  progressContainer: {
    backgroundColor: '#fff',
    padding: Spacing.m,
    borderRadius: Border.radius_m,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  progressTitle: {
    marginBottom: Spacing.s,
  },
  progressLabel: {
    marginTop: Spacing.s,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: Spacing.m,
    color: Colors.primary,
  },
  card: {
    padding: Spacing.m,
    marginBottom: Spacing.l,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  cardDone: {
    borderLeftColor: Colors.success,
    opacity: 0.8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.m,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.m,
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  tagsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 8,
    fontSize: 11,
    fontWeight: 'bold',
  },
  tagTime: {
    backgroundColor: '#F5F5F5',
    color: Colors.textSecondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 11,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.s,
  },
  checkboxActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  checkIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 15,
    marginBottom: Spacing.m,
    lineHeight: 22,
  },
  benefitsBox: {
    backgroundColor: '#FFF8E1',
    padding: Spacing.m,
    borderRadius: Border.radius_s,
  },
  benefitsTitle: {
    fontWeight: 'bold',
    color: '#F57F17',
    marginBottom: 4,
  },
  benefitsText: {
    color: '#5D4037',
    lineHeight: 18,
  }
});
