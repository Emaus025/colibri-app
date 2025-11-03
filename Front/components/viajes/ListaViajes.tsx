import React, { useState } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useViajes } from '@/hooks/use-viajes';
import { TarjetaViaje } from './TarjetaViaje';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export function ListaViajes() {
  const { viajes, loading, error, cargarViajes } = useViajes();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <ThemedText style={{ textAlign: 'center', marginBottom: 20 }}>
          {error}
        </ThemedText>
        <ThemedText 
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => cargarViajes()}
        >
          Intentar de nuevo
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={viajes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TarjetaViaje viaje={item} onVerDetalles={(v) => console.log('Ver detalles:', v)} />}
      ListEmptyComponent={
        <ThemedView style={{ padding: 20, alignItems: 'center' }}>
          <ThemedText>No hay viajes disponibles</ThemedText>
        </ThemedView>
      }
      onRefresh={cargarViajes}
      refreshing={loading}
    />
  );
}