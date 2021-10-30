import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Grid,
} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import getAuth from '../auth/selector';

const QRCode = require('qrcode.react');

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_UACL_BASE_URL;
const url = `${host}://${base}/autologin`;

// Page that is used to create autologin tokens
const AutologinView = ({ auth }) => {
  // Make sure the user is authenticated
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const { id } = useParams();

  const [autologinToken, setAutologinToken] = useState(undefined);

  if (!autologinToken) {
    axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((result) => {
        const { data } = result;
        let responseResult = data ? data.result : null;
        if (responseResult === null) {
          responseResult = undefined;
        }
        setAutologinToken(responseResult);
      }).catch(() => {
        setAutologinToken(null);
      });
  }

  const print = () => {
    window.print();
  };

  const qr = autologinToken ? (
    <div>
      <QRCode
        style={{
          width: '25em', height: '25em', marginLeft: 'auto', marginRight: 'auto',
        }}
        value={`${autologinToken.site}${autologinToken.autologin_token}`}
      />
    </div>
  ) : null;

  return (
    <>
      <Grid role="main" id="main">
        <Grid.Row columns="three" textAlign="center" style={{ height: '75vh' }} verticalAlign="middle" stackable>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <h1>Here is your QR Code</h1>
            <br />
            {qr}
            <br />
            <Button
              className="no-print typical-button"
              content="print me"
              onClick={print}
            />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    </>
  );
};

// Only requires the auth information and doesn't need any dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(AutologinView);
