import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Border } from '../../shared/theme';
import { TextHeading, TextSubheading, TextBody, TextCaption } from '../../shared/widgets/Typography';
import { Card } from '../../shared/widgets/Card';
import { VACCINE_CATALOG, mockChildVaccines } from './vaccineData';

export default function VaccineScreen({ navigation }) {
  const [records, setRecords] = useState(mockChildVaccines);

  const toggleVaccineStatus = (vaccineId) => {
    setRecords((prev) => 
      prev.map(r => {
        if (r.vaccineId === vaccineId) {
          return { ...r, status: r.status === 'aplicada' ? 'pendente' : 'aplicada' };
        }
        return r;
      })
    );
  };

  const renderVaccineCard = (vaccine) => {
    const record = records.find(r => r.vaccineId === vaccine.id) || { status: 'pendente' };
    const isApplied = record.status === 'aplicada';

    return (
      <Card key={vaccine.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <TextSubheading style={isApplied && styles.appliedText}>{vaccine.name}</TextSubheading>
            <TextCaption style={styles.ageBadge}>{vaccine.ageInMonths} meses</TextCaption>
          </View>
          <TouchableOpacity 
            style={[styles.checkbox, isApplied && styles.checkboxActive]}
            onPress={() => toggleVaccineStatus(vaccine.id)}
          >
            {isApplied && <TextBody style={styles.checkIcon}>✓</TextBody>}
          </TouchableOpacity>
        </View>

        <TextBody style={styles.description}>{vaccine.description}</TextBody>

        <View style={styles.comparisonBox}>
          <TextCaption style={styles.comparisonTitle}>Recomendação da IA Pediátrica:</TextCaption>
          <View style={styles.recommendationTagContainer}>
            <TextCaption style={[
              styles.recommendationTag, 
              vaccine.recommendation === 'SUS' ? styles.tagSus : styles.tagPrivate
            ]}>
              Vá de {vaccine.recommendation}
            </TextCaption>
          </View>
          <TextBody style={styles.whyText}>{vaccine.why}</TextBody>
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
        <TextHeading style={styles.title}>Carteira de Vacinas</TextHeading>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TextBody style={styles.introText}>
          Compare opções do SUS vs Particular e acompanhe o calendário ideal para evitar reações fortes.
        </TextBody>
        
        <TextHeading style={styles.sectionTitle}>Ao Nascer</TextHeading>
        {VACCINE_CATALOG.filter(v => v.ageInMonths === 0).map(renderVaccineCard)}

        <TextHeading style={styles.sectionTitle}>Aos 2 Meses</TextHeading>
        {VACCINE_CATALOG.filter(v => v.ageInMonths === 2).map(renderVaccineCard)}
        
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
  introText: {
    marginBottom: Spacing.l,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: Spacing.m,
    marginTop: Spacing.s,
    color: Colors.primary,
  },
  card: {
    padding: Spacing.m,
    marginBottom: Spacing.m,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.s,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ageBadge: {
    backgroundColor: Colors.border,
    paddingHorizontal: Spacing.s,
    paddingVertical: 2,
    borderRadius: Border.radius_pill,
    marginLeft: Spacing.s,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  appliedText: {
    textDecorationLine: 'line-through',
    color: Colors.textTertiary,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
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
  description: {
    marginBottom: Spacing.m,
    fontSize: 15,
  },
  comparisonBox: {
    backgroundColor: '#F8F9FA',
    padding: Spacing.m,
    borderRadius: Border.radius_s,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  comparisonTitle: {
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  recommendationTagContainer: {
    alignItems: 'flex-start',
    marginBottom: Spacing.s,
  },
  recommendationTag: {
    fontWeight: 'bold',
    paddingHorizontal: Spacing.s,
    paddingVertical: 4,
    borderRadius: Border.radius_pill,
    overflow: 'hidden',
  },
  tagSus: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
  },
  tagPrivate: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
  },
  whyText: {
    fontSize: 14,
    fontStyle: 'italic',
  }
});
