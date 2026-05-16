import React from 'react';
import CaseList from './CaseList.jsx';

export default class CaseSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cases: [] };
        this.loadCases = this.loadCases.bind(this);
    }

    loadCases() {
        var url = '/api/data/v8.0/incidents?$filter=statecode eq 0&$orderby=createdon desc&$top=10&$select=incidentid,title,createdon,ticketnumber';

        var xrmContext = window.parent && window.parent.Xrm && window.parent.Xrm.Page && window.parent.Xrm.Page.context;
        if (xrmContext) {
            url = xrmContext.prependOrgName(url);
        }

        fetch(url, {
            credentials: 'same-origin'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok: ' + res.status);
                }
                return res.json();
            })
            .then(json => this.setState({ cases: json.value }))
            .catch(err => console.error('Failed to load cases:', err));
    }

    componentDidMount() {
        this.loadCases();
        this.timerId = window.setInterval(this.loadCases, 10000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timerId);
    }

    render() {
        return (
            <CaseList cases={this.state.cases} />
        );
    }

}
