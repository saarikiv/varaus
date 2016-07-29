import React from "react";

import InfoList from '../components/info/InfoList.jsx'
import ContactInfo from '../components/home/ContactInfo.jsx'

export default class Info extends React.Component {
  render() {
    return (
      <div>
        <InfoList />
        <ContactInfo />
      </div>
    );
  }
}
