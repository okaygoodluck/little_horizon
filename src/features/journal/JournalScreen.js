import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Spacing, Border } from '../../shared/theme';
import { TextHeading, TextSubheading, TextBody, TextCaption } from '../../shared/widgets/Typography';
import { Card } from '../../shared/widgets/Card';
import { Button } from '../../shared/widgets/Button';
import { mockJournalEntries } from './journalData';

export default function JournalScreen({ navigation }) {
  const [entries, setEntries] = useState(mockJournalEntries);
  const [filter, setFilter] = useState('all'); // all | sleep | memory
  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState('memory');
  const [newTitle, setNewTitle] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const filteredEntries = entries.filter(e => filter === 'all' || e.type === filter);

  const handleAddEntry = () => {
    if (newTitle.trim()) {
      const entry = {
        id: Date.now().toString(),
        type: newType,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: newTitle,
        notes: newNotes,
        durationHours: newType === 'sleep' ? 0 : undefined
      };
      setEntries([entry, ...entries]);
      setNewTitle('');
      setNewNotes('');
      setIsAdding(false);
    }
  };

  const renderEntry = (entry) => {
    const isSleep = entry.type === 'sleep';
    return (
      <View key={entry.id} style={styles.timelineItem}>
        <View style={styles.timelineLine} />
        <View style={[styles.timelineDot, isSleep ? styles.dotSleep : styles.dotMemory]}>
          <TextCaption style={styles.dotIcon}>{isSleep ? '💤' : '📸'}</TextCaption>
        </View>
        <Card style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <TextSubheading style={isSleep ? styles.titleSleep : styles.titleMemory}>
              {entry.title}
            </TextSubheading>
            <TextCaption style={styles.entryDate}>{entry.date} às {entry.time}</TextCaption>
          </View>
          {isSleep && entry.durationHours > 0 && (
            <TextCaption style={styles.sleepDuration}>Duração: {entry.durationHours}h</TextCaption>
          )}
          {entry.notes ? <TextBody style={styles.entryNotes}>{entry.notes}</TextBody> : null}
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <TextHeading>←</TextHeading>
        </TouchableOpacity>
        <TextHeading style={styles.title}>Diário e Rotina</TextHeading>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.filterActive]}
          onPress={() => setFilter('all')}
        >
          <TextCaption style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>Tudo</TextCaption>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'sleep' && styles.filterActive]}
          onPress={() => setFilter('sleep')}
        >
          <TextCaption style={[styles.filterText, filter === 'sleep' && styles.filterTextActive]}>Sono</TextCaption>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'memory' && styles.filterActive]}
          onPress={() => setFilter('memory')}
        >
          <TextCaption style={[styles.filterText, filter === 'memory' && styles.filterTextActive]}>Memórias</TextCaption>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {isAdding ? (
          <Card style={styles.addForm}>
            <TextSubheading style={styles.formTitle}>Novo Registro</TextSubheading>
            
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[styles.typeBtn, newType === 'memory' && styles.typeBtnActiveMem]}
                onPress={() => setNewType('memory')}
              >
                <TextCaption style={newType === 'memory' ? styles.typeTextActive : {}}>📸 Memória</TextCaption>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.typeBtn, newType === 'sleep' && styles.typeBtnActiveSleep]}
                onPress={() => setNewType('sleep')}
              >
                <TextCaption style={newType === 'sleep' ? styles.typeTextActive : {}}>💤 Sono</TextCaption>
              </TouchableOpacity>
            </View>

            <TextInput 
              style={styles.inputTitle}
              placeholder="Título (ex: Soneca da Tarde)"
              value={newTitle}
              onChangeText={setNewTitle}
              placeholderTextColor={Colors.textTertiary}
            />
            
            <TextInput 
              style={styles.inputNotes}
              placeholder="Anotações..."
              value={newNotes}
              onChangeText={setNewNotes}
              multiline
              placeholderTextColor={Colors.textTertiary}
            />
            
            <View style={styles.formActions}>
              <Button title="Cancelar" variant="secondary" style={styles.actionBtn} onPress={() => setIsAdding(false)} />
              <Button title="Salvar" style={styles.actionBtn} onPress={handleAddEntry} />
            </View>
          </Card>
        ) : (
          <TouchableOpacity style={styles.fabInline} onPress={() => setIsAdding(true)}>
            <TextSubheading style={styles.fabInlineText}>+ Adicionar Registro</TextSubheading>
          </TouchableOpacity>
        )}

        <View style={styles.timelineContainer}>
          {filteredEntries.map(renderEntry)}
          {filteredEntries.length === 0 && (
             <TextBody style={styles.emptyText}>Nenhum registro encontrado.</TextBody>
          )}
        </View>
        
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: Spacing.s,
    backgroundColor: Colors.background,
  },
  filterActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: '#fff',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.m,
  },
  fabInline: {
    backgroundColor: '#E3F2FD',
    padding: Spacing.m,
    borderRadius: Border.radius_m,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderStyle: 'dashed',
  },
  fabInlineText: {
    color: '#1976D2',
  },
  addForm: {
    marginBottom: Spacing.xl,
    backgroundColor: '#fff',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  formTitle: {
    marginBottom: Spacing.m,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: Spacing.m,
  },
  typeBtn: {
    flex: 1,
    padding: Spacing.s,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 4,
    borderRadius: Border.radius_s,
  },
  typeBtnActiveMem: {
    backgroundColor: '#F3E5F5',
    borderColor: '#9C27B0',
  },
  typeBtnActiveSleep: {
    backgroundColor: '#E8EAF6',
    borderColor: '#3F51B5',
  },
  typeTextActive: {
    fontWeight: 'bold',
  },
  inputTitle: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Border.radius_s,
    padding: Spacing.m,
    marginBottom: Spacing.m,
    fontSize: 16,
  },
  inputNotes: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Border.radius_s,
    padding: Spacing.m,
    marginBottom: Spacing.m,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 0.48,
  },
  timelineContainer: {
    paddingLeft: Spacing.m,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: Spacing.l,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 14,
    top: 30,
    bottom: -Spacing.l,
    width: 2,
    backgroundColor: Colors.border,
  },
  timelineDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.m,
    zIndex: 2,
    marginTop: 4,
  },
  dotSleep: {
    backgroundColor: '#E8EAF6',
    borderWidth: 2,
    borderColor: '#3F51B5',
  },
  dotMemory: {
    backgroundColor: '#F3E5F5',
    borderWidth: 2,
    borderColor: '#9C27B0',
  },
  dotIcon: {
    fontSize: 12,
  },
  entryCard: {
    flex: 1,
    padding: Spacing.m,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  titleSleep: {
    color: '#3F51B5',
    flex: 1,
  },
  titleMemory: {
    color: '#9C27B0',
    flex: 1,
  },
  entryDate: {
    color: Colors.textTertiary,
    fontSize: 11,
  },
  sleepDuration: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: Spacing.s,
  },
  entryNotes: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
  emptyText: {
    color: Colors.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.xl,
  }
});
