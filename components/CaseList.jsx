import React from 'react';
import Case from './Case.jsx';

export default class CaseList extends React.Component {
    render() {
        return (
            <ul>
                { this.props.cases.map(c => <Case key={c.incidentid} incident={c} />) }
            </ul>
        );
    }
}

CaseList.defaultProps = {
    cases: []
};
