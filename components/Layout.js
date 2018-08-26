import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default props => {
    return (
        <Fragment>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"/>
            </Head>
            <Container>
                <Header/>
                {props.children}
            </Container>
        </Fragment>
    )
};

