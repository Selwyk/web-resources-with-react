import React from 'react';

export default class Case extends React.Component {
    render() {
        var xrmContext = window.parent && window.parent.Xrm && window.parent.Xrm.Page && window.parent.Xrm.Page.context;
        var url = xrmContext
            ? xrmContext.prependOrgName('/main.aspx?pagetype=entityrecord&etn=incident&id=' + this.props.incident.incidentid)
            : '/main.aspx?pagetype=entityrecord&etn=incident&id=' + this.props.incident.incidentid;

        var openedOn = this.props.incident.createdon
            ? new Date(this.props.incident.createdon).toLocaleDateString()
            : '';

        return (
            <li>
                <p><a href={url} target='_blank' rel='noopener noreferrer'>{ this.props.incident.title }</a></p>
                <p>Ticket #:{ this.props.incident.ticketnumber }</p>
                <p>Opened On { openedOn }</p>
            </li>
        );
    }
}
