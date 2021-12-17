import React from 'react';
import FakeServer from './FakeServer';
import EventEmitter from 'eventemitter3';

export const defaultContext = {
    title: 'Superprogram v1.0', 
    color: 'red',
    server: new FakeServer(),
    bus: new EventEmitter()
};
export const AppContext = React.createContext (defaultContext);
