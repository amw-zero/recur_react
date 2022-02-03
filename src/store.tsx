import React from 'react';
import { Application as Client } from "./generated-client";
import { makeAutoObservable } from 'mobx';

export const client = new Client((c: Client) => makeAutoObservable(c));
export const ClientContext = React.createContext(client);

export const useStore = () => React.useContext(ClientContext);
