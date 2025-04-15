import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import RootStack from './navigators/RootStack';

export default function App() {
    return (
        <RootSiblingParent>
            <RootStack />
        </RootSiblingParent>
    );
}
