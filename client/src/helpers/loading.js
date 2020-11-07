import React, {Fragment} from 'react';
import Spinner from 'react-bootstrap/Spinner';


export const showLoading = () => (
  <Fragment>
<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
    </Fragment>
)