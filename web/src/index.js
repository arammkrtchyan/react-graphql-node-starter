import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./app/components/App";

import gql from "graphql-tag";
import { client } from "./app/common/apollo";

const query = gql`
  {
    user(id: "kXG8") {
      fullName
    }
  }
`;

client
  .query({ query })
  .then(data => console.log(data))
  .catch(error => console.error(error));

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
