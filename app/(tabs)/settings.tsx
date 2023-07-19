import { Void, Text, Spacer } from "@/components/Themed";
import { useTheme } from "@/stores";
import { wait } from "@/util";
import { useState } from "react";
import { Switch, View as Container,TouchableOpacity } from 'react-native';

export default function Settings() {

  const { theme, setTheme, getColor } = useTheme();

  const toggleTheme = () => {
    theme == 'dark'
      ? setTheme('light')
      : setTheme('dark')
  }

  return <Void save style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
    <Container style={{ display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Text style={{ fontWeight: '600' }}>
        Dark Theme
      </Text>
      <Switch
        onValueChange={toggleTheme}
        value={theme == 'dark'}
      />
    </Container>
    <Spacer height={32}/>
    <TouchableOpacity>
      <Container style={{ backgroundColor: getColor('bad'), paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: theme ? getColor('void') : getColor('neutral') }}>
          Clear Data
        </Text>
      </Container>
    </TouchableOpacity>
  </Void>
}