import React from 'react';
import MenuContainer from './containers/MenuContainer.jsx';
import { Container } from 'semantic-ui-react';
import type { ProviderStat } from '../types.js';

import AddWebRequest from './containers/AddWebRequest.jsx';
import VisibleWebRequests from './containers/VisibleWebRequests.jsx';

type State = {
  providerStats: Array<ProviderStat>
}

export default class App extends React.Component<State> {
    constructor(props) {
        super(props);
        this.state = {
            providerStats: [
                {
                    logo: 'snowplow.png',
                    canoncialName: 'snowplow',
                    value: 8
                },
                {
                    logo: 'adobe-audience-manager.png',
                    canoncialName: 'adobe',
                    value: 4
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <AddWebRequest />
                <Container fluid>
                    <MenuContainer />
                </Container>
                <Container fluid className='data-rows'>
                    <VisibleWebRequests />
                </Container>
            </div>
        );
    }
}
